import NavOtherPages from "../components/NavOtherPages";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react"; 

function ProfilePage() {

  const { user } = useContext(AuthContext)
  console.log("USER", user)

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
      <button className="profile-page-btn-white">New project</button>
      <button className="profile-page-btn-blue">Organize projects</button>
    </div>

    <div className="img-box-home-page">
          <div className="img-container-project1">
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

