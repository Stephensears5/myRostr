import "../css/NavBar.css";
import { Link } from "react-router-dom";
import HomePage from "../views/homepage";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useState } from "react";

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const showMenu = () => setMenu(!menu);
  return (
    <header class="navHeader">
      <FaIcons.FaBars class="hamburger" size={28} onClick={showMenu} />
      <nav class={menu ? "menu-open" : "menu-hidden"}>
        <ul id="nav-ul">
          {/* <div className='topnav-left'> */}
          <li id="nav-li">
            <Link to="/home">Home</Link>
            {/* <a href=''>Home</a> */}
          </li>
          <li id="nav-li">
            <Link to="/myeventspage">My Events</Link>
            {/* <a href="">My Events</a> */}
          </li>
          <li id="nav-li">
            <Link to="/create">Create</Link>
            {/* <a href="">My Events</a> */}
          </li>
          <li id="nav-li">
            <Link to="/find">Find</Link>
            {/* <a href="">My Events</a> */}
          </li>
          <li id="nav-li">
            <a href="">Profile</a>
          </li>
          {/* </div> */}
          {/* <div className='topnav-right'> */}
          <li id="nav-li">
            <a href="">Login</a>
          </li>
          {/* </div>            */}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
