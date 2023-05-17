import Navbar from "../components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";


function EditPage() {

  const authContext = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [username, setUserName] = useState(authContext.user);

  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [userType, setUserType] = useState('');
  const [interest, setInterest] = useState('');
  const [occupation, setOccupation] = useState('');
  const [newInfo, setNewInfo] = useState(user?.profile.username);


  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/";

  useEffect(() => {
    if (user) {
      setUserName(user.profile.username);
      setEmail(user.email);
      setCompany(user.profile.company);
      setUserType(user.profile.userType);
      setInterest(user.profile.interest);
      setOccupation(user.profile.occupation);
    }
  }, [user]);


  // const handleSave = () => {
  //   const updatedProfile = {
  //     username: newInfo,
  //     email,
  //     company,
  //     userType,
  //     interest,
  //     occupation,
  //     wishList: user?.profile?.wishList
  //   }

  //   const authToken = localStorage.getItem('authToken')

  //   axios.put(`${API_URL}auth/profile`, updatedProfile, {
  //     headers: {
  //       Authorization: `Bearer ${authToken}`
  //     }
  //   })
  //   .then((response) => {
  //     console.log(response.data)
  //     setIsEditing(false)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

//______________________________________

useEffect(() => {
  setUserName(authContext.user);
}, [authContext.user]);

const handleEdit = () => {
  setEditing(true);
};

const handleCancel = () => {
  setEditing(false);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const authToken = localStorage.getItem('authToken');


  try {
    const response = await axios.put('/auth/profile', {
      username,
      email,
      company,
      userType,
      interest,
      occupation,
    }, 
    {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      const updatedUser = response.data.user;
      const newAuthToken = response.data.authToken;
      localStorage.setItem('authToken', newAuthToken);
      authContext.updateUser(updatedUser);
      
      //setUserName(updatedUser);
      setEditing(false);
      alert('Profile updated successfully!');
    }
  } catch (error) {
    if(error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
    } else {
      console.log('Error updating profile');
    }
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUserName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'company') {
      setCompany(value);
    } else if (name === 'userType') {
      setUserType(value);
    } else if (name === 'interest') {
      setInterest(value);
    } else if (name === 'occupation') {
      setOccupation(value);
    }
  };

  return (
    <div>
    <Navbar />
    <div className="editing-page">
      <h2>User Profile</h2>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="username" value={username} onChange={handleInputChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={email} onChange={handleInputChange} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div>
        <p>Name: {user ? user.username : ''}</p>
          <p>Email: {user ? user.email : ''}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      )}
    </div>


    <img className="stories-on-top" src ="/images/my-profile/06.jpg" alt ='edit-pic' style={{width: '86px', height: '86px', borderRadius: '50%', marginLeft: "34px", marginTop: "100px"}} />
    <Link>edit photo</Link>

    {/* <div className="edit-profile-text">
  {user && (
    <div>
      <div className="edit-paragraph">
        username:{" "}
        {isEditing ? (
          <input
            type="text"
            name="username"
            value={newInfo}
            onChange={handleInputChange}
          />
        ) : (
          <span>{user.profile.username}</span>
        )}
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEditProfile}>
          </button>
        )}
      </div>
    </div>
  )}
</div> */}


       <p style={{margin: '20px 60px'}}>Deactivate Profile</p>
    
    <div style={{margin: '20px 60px'}} >
      <button className="profile-page-btn-blue">Done</button>
    </div>
       </div> 

  );
}

export default EditPage;

