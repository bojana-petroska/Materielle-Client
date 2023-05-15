import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

function EditPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [wishlist, setWishlist] = useState([])

  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005/";

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
    <Navbar />
    <img className="stories-on-top" src ="/images/my-profile/06.jpg" alt ='edit-profile-photo' style={{width: '86px', height: '86px', borderRadius: '50%', marginLeft: "34px", marginTop: "100px"}} />

    <div className="edit-profile-text">
      <div style={{display: 'flex', flexDirection: 'row'}}>username<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10.6399V12.6666C0 12.8533 0.146667 12.9999 0.333333 12.9999H2.36C2.44667 12.9999 2.53333 12.9666 2.59333 12.8999L9.87333 5.62659L7.37333 3.12659L0.1 10.3999C0.0333334 10.4666 0 10.5466 0 10.6399ZM11.8067 2.75325L10.2467 1.19325C10.185 1.13145 10.1117 1.08242 10.0311 1.04897C9.95043 1.01551 9.86398 0.998291 9.77667 0.998291C9.68935 0.998291 9.6029 1.01551 9.52225 1.04897C9.4416 1.08242 9.36834 1.13145 9.30667 1.19325L8.08667 2.41325L10.5867 4.91325L11.8067 3.69325C11.8685 3.63158 11.9175 3.55832 11.951 3.47767C11.9844 3.39702 12.0016 3.31057 12.0016 3.22325C12.0016 3.13594 11.9844 3.04949 11.951 2.96884C11.9175 2.88819 11.8685 2.81493 11.8067 2.75325Z" fill="black"/>
      </svg></div>
      <p>occupation:</p>
      <p>company:</p>
      <p>e-mail:</p>
      <p>password:</p>
      <p>I am interested in:</p>
      <p>Deactivate Profile</p>
    </div>
    
    <div>
      <button className="profile-page-btn-blue">Done</button>
    </div>
    
    </div>
  );
}

export default EditPage;

