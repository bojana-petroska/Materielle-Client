import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';


function ParquetPage(props) {

  const [materials, setMaterials] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [thumbnailSize, setThumbnailSize] = useState('large');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [wishlist, setWishlist] = useState([]);



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

  const handleThumbnailClick = (material) => {
    setSelectedMaterial(material);
    setThumbnailSize('small');
  };

  const handleAddToWishList = (id) => {
    // Check if the selected material is already in the wishlist
    const isMaterialInWishlist = wishlist.some((material) => material._id === id);
  
    if (thumbnailSize === 'large') {
      // If the thumbnail size is large, toggle to small thumbnails
      setThumbnailSize('small');
  
      if (!isMaterialInWishlist) {
        // Add the selected material to the wishlist
        const selectedMaterial = materials.find((material) => material._id === id);
        setWishlist([...wishlist, selectedMaterial]);
      }
    } else {
      // If the thumbnail size is already small, add/remove the material from the wishlist
      if (isMaterialInWishlist) {
        // Remove the material from the wishlist
        const updatedWishlist = wishlist.filter((material) => material._id !== id);
        setWishlist(updatedWishlist);
      } else {
        // Add the selected material to the wishlist
        const selectedMaterial = materials.find((material) => material._id === id);
        setWishlist([...wishlist, selectedMaterial]);
      }
    }
  };
  

  return (
  <div>
    <Navbar />

    <div className="nav-search-parquet">
      <div className="big-small-icons">
        <div className="search-parquet">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.04 13.28C3.584 13.28 0.8 10.496 0.8 7.04C0.8 3.584 3.584 0.8 7.04 0.8C10.496 0.8 13.28 3.584 13.28 7.04C13.28 10.496 10.496 13.28 7.04 13.28ZM7.04 1.76C4.112 1.76 1.76 4.112 1.76 7.04C1.76 9.968 4.112 12.32 7.04 12.32C9.968 12.32 12.32 9.968 12.32 7.04C12.32 4.112 9.968 1.76 7.04 1.76Z" fill="#989898" />
              <path d="M11.687 11.008L15.998 15.318L15.319 15.997L11.009 11.687L11.687 11.008Z" fill="#989898" />
          </svg>
          <input
              className="nav-search-parquet"
              type="text"
              placeholder="type keywords..."
              value={query}
              onChange={handleInputSearch}
            />
        </div>
        <svg className="white-btn-wish" onClick={handleEnlargeClick} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.25" y="0.25" width="20.5" height="20.5" stroke="#9A9A9A" strokeWidth="0.5" />
          </svg>
          <svg className="white-btn-wish" onClick={handleShrinkClick} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.821" y="0.25" width="20.929" height="20.929" stroke="black" strokeWidth="0.5" />
            <path d="M11.536 0.429C11.536 0.291 11.424 0.179 11.286 0.179C11.148 0.179 11.036 0.291 11.036 0.429H11.536ZM11.036 21V21.25H11.536V21H11.036ZM1 10.893C0.862 10.893 0.75 11.005 0.75 11.143C0.75 11.281 0.862 11.393 1 11.393V10.893ZM21.571 11.393C21.71 11.393 21.821 11.281 21.821 11.143C21.821 11.005 21.71 10.893 21.571 10.893V11.393ZM11.036 0.429V21H11.536V0.429H11.036ZM1 11.393H21.571V10.893H1V11.393Z" fill="black" />
          </svg>
      </div>
      <div>
        <button style={{ height: '25px', width: '200px', fontSize: '12px' }} onClick={(event) => { handleSortByChange(event) }} className={`home-page-btn-white ${sortBy === "name" ? "active" : ""} white-btn-wish`} value="name">
          Sort by name (alphabetically)
        </button>
        <button style={{ height: '25px', width: '200px', fontSize: '12px' }} onClick={handleSortByChange} className={`home-page-btn-white ${sortBy === "price" ? "active" : ""} white-btn-wish`} value="price">
          Sort by price (lowest price)
        </button>
      </div>

      <div className="list-of-parquet">
        {materials && materials.map((material) => (
          <div className={`material-thumbnail ${thumbnailSize === 'large' ? 'large-thumbnail' : 'small-thumbnail'}`} key={material._id} onClick={() => handleThumbnailClick(material)}>
            <img src={material.imageUrl} alt="parquet" />
            <div className="thumbnail-details">
              {thumbnailSize === 'large' && (
                <>
                  <p className="name">
                    <strong>name: </strong>
                    {material.name}
                  </p>
                  <p className="description">
                    <strong>description: </strong>
                    {material.description}
                  </p>
                  <p className="category">
                    <strong>category: </strong>
                    {material.category}
                  </p>
                  <p className="manufacturer">
                    <strong>manufacturer: </strong>
                    {material.manufacturer}
                  </p>
                  <p className="price">
                    <strong>€: </strong>
                    {material.price}
                  </p>
                  <p className="certification">
                    <strong>certification: </strong>
                    {material.sustainabilityFromLeed}
                  </p>
                </>
              )}
              <button className={`home-page-btn-white  ${thumbnailSize === 'small' ? 'add-wish-btn-small' : ''}`} onClick={() => handleAddToWishList(material._id)}>
                add to wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default ParquetPage;