import { Link } from "react-router-dom";

function FindInspiration() {
 
  return (
    <div>
    <Link className="home-page-btn-white" to="https://www.pinterest.de/search/pins/?q=interior%20designs&rs=typed">
     Find Inspiration
    </Link>
    </div>
  );
}

export default FindInspiration;
