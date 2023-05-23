import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Nav } from 'reactstrap';

function Navbar() {
  return (
    <nav className="navbar" style={{backgroundColor:'black'}}>
      <div className="navbar-container">
        <div className="navbar-menu">
          <ul className="navbar-list">
            <li className="navbar-item">
            <a className="navbar-link" href='/villes'><strong>Ville</strong></a>
            </li>
            <li className="navbar-item">
            <a className="navbar-link" href='/zone'><strong>Zone</strong></a>

            </li>
            <li className="navbar-item">
              <a className="navbar-link" href='/specialite'><strong>specialite</strong></a>
            </li>

            <li className="navbar-item">
              <a className="navbar-link" href='/serie'><strong>Serie</strong></a>

            </li>
            <li className="navbar-item">
              <a className="navbar-link" href='/resto'><strong>Resto</strong></a>

            </li>
            <li className="navbar-item">
              <a className="navbar-link" href='/photo'><strong>Photo</strong></a>

            </li>

          </ul>
          <a className="navbar-button" href='http://localhost:3000'>Get started</a>

        </div>
      </div>
    </nav>


  );
}

export default Navbar;