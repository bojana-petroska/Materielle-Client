import NavOtherPages from "../components/NavOtherPages";
import { AuthContext } from "../context/auth.context";
import { useContext, useState } from "react"; 
import axios from "axios";
import { Link } from "react-router-dom";

function ProfilePage() {

  const { user } = useContext(AuthContext)
  console.log("USER", user)
  const [wishlist, setWishlist] = useState([])


  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005/";


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('photo', selectedFile);

    axios
      .post(`${API_URL}auth/upload-photo`, formData)
      .then((response) => {
        const uploadedMaterial = response.data.imageUrl
        setWishlist((preWishList) => [...preWishList, uploadedMaterial])
        console.log(response.data.imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>
    <NavOtherPages />
    <div className=" ProfilePage profile-top">
      <div>
        <img className="stories-on-top" src="/images/my-profile/paris.jpg" alt="profile photo"  style={{width: '86px', height: '86px', borderRadius: '50%', marginLeft: "34px", marginTop: "0px"}}/>
      </div>
      {user && (
       <div className="user-description">
        <p><strong>{user.profile.username}</strong></p>
        <p>{user.profile.company}</p>
        {/* <p>{user.profile.interest}</p> */}
       </div> 
      )}
    </div>

    <div className='home-page-btns-wrap'>
    <Link to="/edit">

      <button className="profile-page-btn-white">New project(EDIT PAGE)</button>
    </Link>
      <button className="profile-page-btn-blue">Organize projects</button>
    </div>

    <div className="img-box-home-page">
        {wishlist.map((item, index) => (
          <div key={index} className="img-container-project1"  name="img-container-project1">
            <p>added to wish list: {item}</p>
          </div>
        ))}

          <div className="img-container-project1"  name="img-container-project1">
          <p className="text-under-projects">Anna's home</p>
          </div>
          <div className="img-container-project2">
          <p className="text-under-projects">Anna's home</p>
          </div>
          <div className="img-container-project3">
          <p className="text-under-projects">Anna's home</p>
          </div>
          <div className="img-container-project4">
          <p className="text-under-projects">Anna's home</p>
          </div>
          <div className="img-container-project5">
          <p className="text-under-projects">Anna's home</p>
          </div>
          <div className="img-container-project6">
          <p className="text-under-projects">Anna's home</p>
          </div>
          </div>

    </div>
  );
}

export default ProfilePage;

