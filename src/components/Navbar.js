import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";                    
import { AuthContext } from "../context/auth.context";  
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

  const navigate = useNavigate();

  const handleSearch = (query) => {
    console.log(`Searching for "${query}"`);
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  }

  const handleContainerClick = (e) => {
    if (e.target.tagName === 'A') {
        return;
      }
    setMenuOpen(false);
    navigate('/');
  }
  
  //  Update the rendering logic to display different content 
  //  depending on whether the user is logged in or not
  return (
    <nav>
    <div className="nav-box">
      <Link to="/">
        <h6>M A T E R I E L L E</h6>
      </Link>
        <SearchBar onSearch={handleSearch} />
      

        <FontAwesomeIcon icon={faBars} onClick={handleMenuClick} />
    
        {menuOpen &&
            <div id="menu-container" onClick={handleContainerClick}>
                <ul id="dropdown-menu" className={menuOpen ? 'open' : '' }>
                    <li>My Profile</li>
                    <li>Materials</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Language</li>
                    <li>
                    {isLoggedIn && (
                        <div>
                        <button onClick={logOutUser}>Logout</button>
                            <span>{user && user.name}</span>
                        </div>
                        )}
                    </li>
                    <li>
                    </li>
                </ul>
            </div>
        }
    </div>
    <div>
                    {!isLoggedIn && (
                        <div>
                            <Link to="/signup"> <button>Sign Up</button> </Link>
                            <Link to="/login"> <button>Login</button> </Link>
                        </div>
                    )}
    </div>
      

      
    </nav>
  );
}

export default Navbar;


