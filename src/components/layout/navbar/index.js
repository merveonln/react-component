import React from 'react';
import './navbar.css';
import logo from '../../../logo.png';

const index = () => {
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <a href="/">
                <img src={logo} alt="Logo" className="navbar-logo" />
            </a>
        </div>
    </nav>
  )
}

export default index