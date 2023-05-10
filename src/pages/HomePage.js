import { Link } from "react-router-dom";
import SignupPage from "./SignupPage";

function HomePage() {
    return (
      <div>
        <h1>M A T E R I E L L E</h1>
        <p>
         <Link to={"/signup"}>Sign Up</Link>
        </p>
      </div>
    );
  }
  
  export default HomePage;

