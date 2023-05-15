import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ParquetPage(props) {

  const [materials, setMaterials] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [thumbnailSize, setThumbnailSize] = useState('small');

  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005/";

  const handleInputSearch = (event) => {
    setQuery(event.target.value);
  }

  const handleSortByChange = (event) => {
    const selectedSortBy = event.target.value

    let newSortBy;

    if (selectedSortBy === sortBy) {
      newSortBy = ""; 
    } else {
      newSortBy = selectedSortBy;
    }
    setSortBy(newSortBy)

    axios
      .get(`${API_URL}auth/search?query=${query}&sortBy=${sortBy}`)
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
    
  useEffect(() => {
    axios
    .get(`${API_URL}auth/search?query=${query}&sortBy=${sortBy}`)
    .then((response) => {
      setMaterials(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [query, sortBy]);

  const handleEnlargeClick = () => {
    setThumbnailSize('large');
  };

  const handleShrinkClick = () => {
    setThumbnailSize('small');
  };

 
  const [userProfile, setUserProfile] = useState()

  const getUserProfile = () => {
    const authToken = localStorage.getItem('authToken')

    axios.get(`${API_URL}auth/profile`, { headers: { Authorization: `Bearer ${authToken}` }})
    .then(response => {
      console.log(response.data.profile)
      setUserProfile(response.data.profile)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  const handleAddToWishList = (materialId) => {
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      console.log('Authorization token not found.')
      return
    }

    axios.post(`${API_URL}auth/wishlist/add`, { materialId }, { headers: { Authorization: `Bearer ${authToken}` }})
    .then((response) => {
      console.log('Material added to the wish list.')
    }).catch(err => {
      console.log(err)
    })

    const userWishList = userProfile.wishList
    
    const existingMaterial = userWishList.find(item => item._id === materialId)

    if(existingMaterial) {
        console.log('Material already in the wish list.')
    } else {
        userWishList.push(materialId)

        axios.put(`${API_URL}auth/user/profile`, { wishList: userWishList })
        .then(response => {
          console.log('Material added to the wish list.')
      })
        .catch(err => {
          console.log(err)
        })
      }
  }

  return (
    <div>
        <Navbar />

    <div className="nav-search-parquet">
    <div className="search-parquet">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.03999 13.28C3.58399 13.28 0.799988 10.496 0.799988 7.04005C0.799988 3.58405 3.58399 0.800049 7.03999 0.800049C10.496 0.800049 13.28 3.58405 13.28 7.04005C13.28 10.496 10.496 13.28 7.03999 13.28ZM7.03999 1.76005C4.11199 1.76005 1.75999 4.11205 1.75999 7.04005C1.75999 9.96805 4.11199 12.32 7.03999 12.32C9.96799 12.32 12.32 9.96805 12.32 7.04005C12.32 4.11205 9.96799 1.76005 7.03999 1.76005Z" fill="#989898"/>
        <path d="M11.6874 11.0081L15.9978 15.3185L15.3191 15.9972L11.0087 11.6868L11.6874 11.0081Z" fill="#989898"/>
      </svg>
      <input
        className="nav-search-parquet"
        type="text"
        placeholder='type keywords...'
        value={query}
        onChange={handleInputSearch}  
      />
    </div>
      <div className="list-of-parquet">

      <button onClick={handleEnlargeClick} 
        className="just-button">big</button>
      <button onClick={handleShrinkClick}
        className="just-button">small</button>


      <button style={{height: '25px', width: '200px', fontSize: '12px'}}
      onClick={(event) => {handleSortByChange(event)}} 
      className={`home-page-btn-white ${sortBy === "name" ? "active" : ""}`} 
      value="name">
      Sort by name (alphabetically)</button>
      <button style={{height: '25px', width: '200px', fontSize: '12px'}} onClick={handleSortByChange} 
      className={`home-page-btn-white ${sortBy === "price" ? "active" : ""}`} 
      value="price">
      Sort by price (lowest price)</button>

      <div>

      {materials && materials.map((material) => {
        return (
          <div className={`material-thumbnail ${thumbnailSize === 'large' ? 'large-thumbnail' : 'small-thumbnail'}`} 
          key={material._id}>
          <img style={{width: '350px', height: '350px', borderRadius: '10px'}} src={material.imageUrl} alt="parquet"></img>
            <p className="name"><strong>name: </strong>{material.name}</p>
            <p className="description"><strong>description: </strong>{material.description}</p>
            <p className="category"><strong>category: </strong>{material.category}</p>
            <p className="manufacturer"><strong>manufacturer: </strong>{material.manufacturer}</p>
            <p className="price"><strong>€: </strong>{material.price}</p>
            <p className="certification"><strong>certification: </strong>{material.sustainabilityFromLeed}</p>
            <button style={{height: '25px', fontSize: '12px'}} className="home-page-btn-white" onClick={() => handleAddToWishList(material._id)}>
              Add to Wish List
            </button>
          </div>
        )
      })}
      </div>
      </div>
    </div>
    </div>
  );
}

export default ParquetPage;
