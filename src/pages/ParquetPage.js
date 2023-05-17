import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';


function ParquetPage(props) {

  const [materials, setMaterials] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [thumbnailSize, setThumbnailSize] = useState('large');

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/";

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

    const existingMaterial = userProfile.wishList.some(item => item._id === materialId)

    console.log(existingMaterial)
    
    if(existingMaterial)
    return;
    console.log(existingMaterial)

    axios.post(`${API_URL}auth/wishlist/add`, { materialId }, { headers: { Authorization: `Bearer ${authToken}` }})
    .then(() => {
      console.log('Material added to the wish list.')
    }).catch(err => {
      console.log(err)
    })

    const updatedWishList = [...userProfile.wishList];
    updatedWishList.push({ _id: materialId })

    console.log('Before update:', userProfile.wishList);
    console.log('After update:', updatedWishList);

        axios.put(`${API_URL}auth/user/profile`, { wishList: updatedWishList }, { headers: { Authorization: `Bearer ${authToken}` }})
        .then(() => {
          setUserProfile((prevProfile) => ({
            ...prevProfile,
            wishList: updatedWishList.map((item) => ({ ...item }))
          }));
          console.log('Material added to the wish list.')
      })
        .catch(err => {
          console.log(err)
        })
  }

  return (
    <div>
        <Navbar />

    <div className="nav-search-parquet">
    

    <div className="big-small-icons">
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
      <svg onClick={handleEnlargeClick} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect  
        x="0.25" y="0.25" width="20.5" height="20.5" stroke="#9A9A9A" stroke-width="0.5"/>
      </svg>
      <svg onClick={handleShrinkClick}
       width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.821289" y="0.25" width="20.9286" height="20.9286" stroke="black" stroke-width="0.5"/>
              <path d="M11.5357 0.428711C11.5357 0.29064 11.4238 0.178711 11.2857 0.178711C11.1476 0.178711 11.0357 0.29064 11.0357 0.428711H11.5357ZM11.0357 21.0001V21.2501H11.5357V21.0001H11.0357ZM1 10.893C0.861929 10.893 0.75 11.0049 0.75 11.143C0.75 11.2811 0.861929 11.393 1 11.393V10.893ZM21.5714 11.393C21.7095 11.393 21.8214 11.2811 21.8214 11.143C21.8214 11.0049 21.7095 10.893 21.5714 10.893V11.393ZM11.0357 0.428711V21.0001H11.5357V0.428711H11.0357ZM1 11.393H21.5714V10.893H1V11.393Z" fill="black"/>
      </svg>
    </div>

    <div>
      <button style={{height: '25px', width: '200px', fontSize: '12px'}}
      onClick={(event) => {handleSortByChange(event)}} 
      className={`home-page-btn-white ${sortBy === "name" ? "active" : ""}`} 
      value="name">
      Sort by name (alphabetically)</button>
      <button style={{height: '25px', width: '200px', fontSize: '12px'}} onClick={handleSortByChange} 
      className={`home-page-btn-white ${sortBy === "price" ? "active" : ""}`} 
      value="price">
      Sort by price (lowest price)</button>
    </div>

      <div>
      <div className="list-of-parquet">

      {materials && materials.map((material) => {
        // wishlist.filter((obj) obj._id === material._id)
        return (
          <div className={`material-thumbnail ${thumbnailSize === 'large' ? 'large-thumbnail' : 'small-thumbnail'}`} 
          key={material._id}>
          <img src={material.imageUrl} alt="parquet"></img>
            <p className="name"><strong>name: </strong>{material.name}</p>
            <p className="description"><strong>description: </strong>{material.description}</p>
            <p className="category"><strong>category: </strong>{material.category}</p>
            <p className="manufacturer"><strong>manufacturer: </strong>{material.manufacturer}</p>
            <p className="price"><strong>€: </strong>{material.price}</p>
            <p className="certification"><strong>certification: </strong>{material.sustainabilityFromLeed}</p>
            <button style={{height: '25px', fontSize: '12px'}} className="home-page-btn-white" onClick={() => handleAddToWishList(material._id)}>
               Wish List
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
