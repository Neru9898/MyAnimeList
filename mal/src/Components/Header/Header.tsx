import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="app-header">
      <Link className="link" to="/">
        <h1>MAL </h1>
      </Link>

      <Link className="link" to="/anime">
        <span>Anime</span>
      </Link>
      <Link className="link" to="/manga">
        <span>Manga</span>
      </Link>
      <Link className="link" to="/movie">
        <span>Movie</span>
      </Link>
    </div>
  );
};

export default Header;
