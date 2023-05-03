import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <h2 className="footer__title">Contact Us</h2>
        <p className="footer__text">123 Main St.</p>
        <p className="footer__text">Anytown, USA 12345</p>
        <p className="footer__text">Phone: (123) 456-7890</p>
        <p className="footer__text">Email: info@yourcompany.com</p>
      </div>
      <div className="footer__right">
        <div className="footer__social-icons">
          <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
          <a href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
          <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
          <a href="https://github.com/"><i className="fab fa-github"></i></a>
        </div>
        <p className="footer__copy">&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
