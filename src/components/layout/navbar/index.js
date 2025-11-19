import React from 'react';
import './navbar.css';

const index = () => {
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <a href="/">
                <img src="/logo.png" alt="Logo" className="navbar-logo" />
            </a>
        </div>
    </nav>
  )
}

export default index