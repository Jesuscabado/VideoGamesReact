import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && isHome) {
        setMenuActive(true);
      } else {
        setMenuActive(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isHome]);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuActive(false);
    }
  };

  return (
    <nav className={`navbar ${isHome ? 'navbar-home' : ''}`}>
      <div className="navbar-toggle" onClick={toggleMenu}></div>
      <ul className={`navbar-list ${menuActive ? 'active' : ''} ${isHome ? 'navbar-list-home' : ''}`}>
        <li className="navbar-item">
          <Link to="/" onClick={handleLinkClick}>Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/show-games" onClick={handleLinkClick}>Games</Link>
        </li>
        <li className="navbar-item">
          <Link to="/saved-games" onClick={handleLinkClick}>Favorites</Link>
        </li>
        <li className="navbar-item">
          <Link to="/all-amiibos" onClick={handleLinkClick}>Amiibos</Link>
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
            <Link to="/login" onClick={handleLinkClick}>Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
