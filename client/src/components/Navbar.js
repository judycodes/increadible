import React from 'react'
import {Link} from 'react-router-dom';
import logo from '../assets/increadible_logo.png';

const Navbar = () => {
    return (
      <div id="navbar">
        <div id="brand_div">
          <img src={logo} className = "logo" alt="increadible logo"/>
          <Link id="brand" to="/home">incREADible</Link>
        </div>

        <ul id="nav_links">

          <li className="nav-link"><Link to="/search">search</Link></li>
          <li className="nav-link"><Link to="/home">reflections</Link></li>
          <li className="nav-link"><Link to="/about">about</Link></li>

        </ul>
      </div>
    )
};

export default Navbar;
