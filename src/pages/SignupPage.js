import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "./../services/auth.service";
import Navbar from "../components/Navbar";


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [userType, setUserType] = useState("")
  const [company, setCompany] = useState("")
  const [interest, setInterest] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined);

  console.log('THIS IS THE VALUE', agreeToTerms)
  
  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleUserType = (e) => setUserType(e.target.value)
  const handleCompany = (e) => setCompany(e.target.value)
  const handleIAmInterestedIn = (e) => setInterest(e.target.value)
  const handleAgreeToTerms = () => setAgreeToTerms(!agreeToTerms)
  
  const handleSignupSubmit = (e) => {
    console.log('hi :' + userType)
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username, userType, company, interest, agreeToTerms };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state

    authService.signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div>
      <Navbar />
      <div className="SignupPage">

      <h1 style={{fontSize: "16px"}}>SIGN UP</h1>


      <form onSubmit={handleSignupSubmit}>
        <label>Email *</label>
        <input placeholder="email@email.com" type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password *</label>
        <input placeholder="Password" type="password" name="password" value={password} onChange={handlePassword} />

        <label>Repeat Password *</label>
        <input placeholder="Repeat Password" type="password" name="password" value={password} onChange={handlePassword} />

        <label>User Name *</label>
        <input 
        placeholder="Name" 
        type="text" 
        name="name" 
        value={username} 
        onChange={handleName} />

        <label>I am: (optional)</label>
        <div className="selection-circle">
          <input  
          type="radio" 
          id="curious-individual" 
          name="userType" 
          value="Curious individual" 
          onChange={handleUserType} />
            <label htmlFor="curious-individual">Curious Individual</label>
        </div>
        <div className="selection-circle">
          <input  
          type="radio" 
          id="professional" 
          name="userType" 
          value="Professional" 
          onChange={handleUserType} />
            <label htmlFor="professional">Professional</label>
        </div>

        <label>Company: (optional)</label>
        <input 
        placeholder="Name of company" 
        type="text" 
        name="company" 
        value={company} 
        onChange={handleCompany} />

        <label>I am interested in: (optional)</label>
        <div className="selection-circle">
          <input  
          type="radio" 
          id="exterior" 
          name="interest" 
          value="Exterior" 
          onChange={handleIAmInterestedIn} />
            <label htmlFor="exterior">Exterior</label>
        </div>
            <div className="selection-circle">
          <input 
           type="radio" id="interior" name="interest" value="Interior" onChange={handleIAmInterestedIn} />
            <label htmlFor="interior">Interior</label>
            </div>
            <div className="selection-circle">
          <input 
            type="radio" 
            id="both"
            name="interest" value="Both" onChange={handleIAmInterestedIn} />
            <label htmlFor="both">Both</label>
            </div>

          <div className="agreeToTerms">
            <input type="checkbox" id="agreeToTerms" name="agreeToTerms" value={agreeToTerms} onClick={handleAgreeToTerms} />
            <label for="agreeToTerms">By continuing you agree to our Terms of Service and Privacy Policy.</label>
          </div>

        <button className="sign-login-btn" type="submit">SIGN UP</button>
      </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }

        <p style={{fontSize: "12px"}}>Already have an account?</p>
        <Link to={"/login"} style={{textDecoration: "none", color: "#323232", fontSize: "14px"}}> LOG IN</Link>
      </div>
  </div>
  )
}

export default SignupPage;