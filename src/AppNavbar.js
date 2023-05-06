import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" className="navbar-logo-img" />
        </Link> */}
        <div className="navbar-menu">
          <ul className="navbar-list">
            <li className="navbar-item">
            <a className="navbar-link" href='/villes'>Ville</a>
            </li>
            <li className="navbar-item">
            <a className="navbar-link" href='/zone'>Zone</a>

            </li>
            <li className="navbar-item">
              <a className="navbar-link" href='/specialite'>specialite</a>
            </li>

            <li className="navbar-item">
              <a className="navbar-link" href='/serie'>serie</a>

            </li>
            <li className="navbar-item">
              <a className="navbar-link" href='/resto'>Resto</a>

            </li>
            <li className="navbar-item">
              <Link to="/contact" className="navbar-link">
                Contact
              </Link>
            </li>
          </ul>
          <button className="navbar-button">Get started</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;