import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
      <div>
        <p><Link to="/home">incREADible</Link></p>

        <ul>

          <li><Link to="/home">Home</Link></li>

          <li><Link to="/about">About</Link></li>

        </ul>
      </div>
    )
};

export default Navbar;
