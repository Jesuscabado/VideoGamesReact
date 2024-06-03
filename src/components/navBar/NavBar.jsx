import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/show-games">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/saved-games">Favorites</Link>
        </li>
        <li className="navbar-item">
          <Link to="/register">Register</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login">Login</Link>
        </li>
        <li className="navbar-item">
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
