import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className={`navbar ${isHome ? 'navbar-home' : ''}`}>
      <div className="navbar-toggle" onClick={toggleMenu}></div>
      <ul className={`navbar-list ${menuActive ? 'active' : ''} ${isHome ? 'navbar-list-home' : ''}`}>
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/show-games">Games</Link>
        </li>
        <li className="navbar-item">
          <Link to="/saved-games">Favorites</Link></li>
        <li className="navbar-item">
          <Link to="/all-amiibos">Amiibos</Link>
        </li>
        <li className="navbar-item">
          {localStorage.getItem('token') ? (
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.reload();
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
