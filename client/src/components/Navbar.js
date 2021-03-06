import React from 'react'
import {Link} from 'react-router-dom';

//icons and images
import logo from '../assets/increadible_logo_white.png';

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

          <li>
            <a href="/" id="log_out_btn"><i className="fas fa-door-open"></i></a>            
          </li>

        </ul>
      </div>
    )
};

export default Navbar;

//If deployment of this application is active on AWS, the href should be changed for below
//TODO: Implement truly functional logout, currently a workaround do to time constraints
// <a href="http://increadible-aws.s3-website-us-east-1.amazonaws.com/" id="log_out_btn"><i className="fas fa-door-open"></i></a>