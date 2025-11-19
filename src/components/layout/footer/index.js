import React from 'react';
import './footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import logo from '../../../logo.png';

const index = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <a href="/">
            <img src={logo} alt="Merve Önalan" className="footer-logo" />
          </a>
        </div>

        <div className="footer-center">
          <p className="footer-text">© 2025 Tüm Hakları Saklıdır. | Geliştirici: Merve Önalan</p>
        </div>

        <div className="footer-right">
          <a href="#">Gizlilik</a>
          <a href="#">Kullanım Şartları</a>
          <a href="#">İletişim</a>
        </div>
      </div>

      <div className="footer-socials">
        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
        <a href="#" aria-label="Instagram"><FaInstagram /></a>
        <a href="#" aria-label="Twitter"><FaTwitter /></a>
        <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
      </div>
    </footer>
  )
}

export default index