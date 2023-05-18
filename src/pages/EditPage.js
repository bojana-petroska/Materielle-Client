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


  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005/";

  useEffect(() => {
    if (user) {
      const { username, email,company, userType, interest, occupation } = user.profile
      setUserName(username);
      setEmail(email);
      setCompany(company);
      setUserType(userType);
      setInterest(interest);
      setOccupation(occupation);
    }
  }, [user]);

const handleEdit = () => {
  setEditing(true);
};

const handleCancel = () => {
  setEditing(false);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const authToken = localStorage.getItem('authToken');

  console.log(authToken)


  try {
    const response = await axios.put(`${API_URL}auth/profile`, {
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

    console.log(response.data)
    if (response.status === 200) {
      const { updatedUser } = response.data;
      setUserName(updatedUser.username)
      setEmail(updatedUser.email)
      setCompany(updatedUser.company)
      setUserType(updatedUser.userType)
      console.log(username)
      console.log(email)
      console.log(company)
      console.log(userType)
      
      setEditing(false);
      alert('Profile updated successfully!');
    }
  } catch (error) {
      console.log('Error updating profile', error);
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

  if(!user){
    return <h4 style={{marginTop: '150px'}}>Loading...</h4>
  }

  return (
    <div>
    <Navbar />

    <img className="stories-on-top" src ="/images/my-profile/paris.jpg" alt ='edit-pic' style={{width: '95px', height: '95px', borderRadius: '50%', marginLeft: "150px", marginTop: "150px"}} />

    <div >
      {editing ? (
        <form className="edit-profile-text" onSubmit={handleSubmit}>
          <label>
            name:
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </label>
          <label>
            email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            company:
            <input
              type="text"
              name="company"
              value={company}
              onChange={handleInputChange}
            />
          </label>
          <label>
            I am interested in:
            <input
              type="text"
              name="userType"
              value={userType}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="profile-page-btn-white">Save</button>
          <button type="button" onClick={handleCancel} className="profile-page-btn-blue">
            Cancel
          </button>
        </form>
      ) : (
        <div className="edit-profile-text">
          <p>name: {user && username?.toString()}</p>
          <p>email: {user && email.toString()}</p>
          <p>company: {user && company.toString()}</p>
          <p>I am interested in: {user && userType.toString()}</p>
            <button onClick={handleEdit} className="profile-page-btn-blue" style={{padding: '0', marginLeft: '25px'}}>Edit Profile</button>
        </div>
      )}
    </div>
  </div> 

  );
}

export default EditPage;

