import React, { useState } from 'react';
import './NavBar.css';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src="https://free-url-shortener.rb.gy/url-shortener.png" alt="Logo" />
        </a>
      </div>
      <div className="navbar-menu" onClick={toggleMenu}>
        <div className={`menu-icon ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul className={`navbar-nav ${isOpen ? 'open' : ''}`}>
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/about" className="nav-link">About Us</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
