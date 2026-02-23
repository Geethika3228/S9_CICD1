import { Link } from "react-router-dom";
import "./styles.css";

function Header() {
  return (
    <div className="head">
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/temperature">Weather</Link>
        <Link to="/population">Population</Link>
        <Link to="/institutions">Institutions</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/water">Water Resources</Link>
      </div>

      {/* ✅ HEADER LINE – VISIBLE ON ALL PAGES */}
      <p className="header-line">
        Exploring real-time information through elegant API integration using React & Axios
      </p>
    </div>
  );
}

export default Header;
