import React from 'react'
import {Link} from 'react-router-dom';

//icons and images
import logo from '../assets/increadible_logo_black.png';

const Navbar = () => {
    return (
      <div id="navbar">
        <div id="brand_div">
          <Link id="brand" to="/home">
            <img src={logo} className = "logo" alt="increadible logo"/>
          </Link>
        </div>

        <ul id="nav_links" className="fade">

          <li>
            <Link className="nav_link" to="/search">
              <i className="fas fa-search"></i>
            </Link></li>
          <li>
            <Link className="nav_link" to="/home">
              <i className="fas fa-book"></i>
            </Link></li>
          <li>
            <Link className="nav_link" to="/about">
              <i className="far fa-question-circle"></i>
            </Link></li>

        </ul>
      </div>
    )
};

export default Navbar;
