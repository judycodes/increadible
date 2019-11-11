import React from 'react'
import {Link} from 'react-router-dom';
import logo from '../assets/increadible_logo_black.png';

const Navbar = () => {
    return (
      <div id="navbar">
        <div id="brand_div">
          <img src={logo} className = "logo" alt="increadible logo"/>
          <Link id="brand" to="/home">INCREADIBLE</Link>
        </div>

        <ul id="nav_links" className="fade">

          <li><Link className="nav_link" to="/search">search</Link></li>
          <li><Link className="nav_link" to="/home">reflections</Link></li>
          <li><Link className="nav_link" to="/about">about</Link></li>

        </ul>
      </div>
    )
};

export default Navbar;
