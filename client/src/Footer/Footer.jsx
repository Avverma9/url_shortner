import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <h2 className="footer__title">Contact Us</h2>
        <p className="footer__text">Patna</p>
        <p className="footer__text">Bihar , 80312</p>
        <p className="footer__text">Phone: 9576630507</p>
        <p className="footer__text">Email: Av95766@gmail.com</p>
      </div>
      <div className="footer__right">
       
        <p className="footer__copy">&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
