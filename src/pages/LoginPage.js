import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import authService from "./../services/auth.service";
import Navbar from "../components/Navbar";


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };


    authService.login(requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
      	const errorDescription = error.response.data.message;
      	setErrorMessage(errorDescription);
    	})
  };
  
  return (
    <div>
      <Navbar />
    <div className="LoginPage">
      <h1 style={{fontSize: "16px"}}>LOG IN</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email</label>
        <input placeholder="email@email.com" type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password</label>
        <input placeholder="Password" type="password" name="password" value={password} onChange={handlePassword} />

      <br></br>
        <button className="sign-login-btn" type="submit">LOG IN</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p style={{fontSize: "12px"}}>Don't have an account yet?</p>
      <Link to={"/signup"} style={{textDecoration: "none", color: "#323232", fontSize: "14px"}}>SIGN UP</Link>
    </div>
    </div>
  )
}

export default LoginPage;