import Cards from "../components/Cards";
import "../css/Homepage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="grid-container">
      <Link className="image-container-create" to="/create">
        <div className="center">
          <div className="text-tile">Create</div>
          <div className="dropdown-content">
            <p className="dropdown-content-paragraph">
              Create an event for others to find!
            </p>
          </div>
        </div>
      </Link>
      <Link className="image-container-find" to="/find">
        <div className="center">
          <div className="text-tile">Find</div>
          <div className="dropdown-content">
            <p className="dropdown-content-paragraph">
              Find events or athletes looking for events!
            </p>
          </div>
        </div>
      </Link>
      <Link className="image-container-list" to="/list">
        <div className="center">
          <div className="text-tile">List</div>
          <div className="dropdown-content">
            <p className="dropdown-content-paragraph">
              List yourself and someone can find you!
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomePage;
