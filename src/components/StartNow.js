import { useNavigate } from "react-router-dom";
import { useContext } from "react";                    
import { AuthContext } from "../context/auth.context";

function StartNow() {

  const { isLoggedIn } = useContext(AuthContext); 

  const navigate = useNavigate();

  const handleStartClick = () => {

    if(isLoggedIn) {
      navigate("/profile")
    } else if (!isLoggedIn) {
      navigate("/signup")
    }
  }
 
  return (
    <div>
      <button className="home-page-btn-blue"  onClick={handleStartClick}>Start Now</button>
    </div>
  );
}

export default StartNow;

