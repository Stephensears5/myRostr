import '../css/NavBar.css'
import {Link} from 'react-router-dom';
import HomePage from '../views/homepage';

const NavBar = () => {
    return (
        <ul id='nav-ul'>
            <div className='topnav-left'>
            <li id='nav-li'>
                <Link to="/home">Home</Link>
               {/* <a href=''>Home</a> */}
            </li>
            <li id='nav-li'>
            <a href=''>My Events</a>
            </li>
            <li id='nav-li'>
            <a href=''>Profile</a> 
            </li>
            </div>
            <div className='topnav-right'>
            <li id='nav-li'>
               <a href=''>Login</a>
            </li>
            </div>           
        </ul>
    )
}

export default NavBar;