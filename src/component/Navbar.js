import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"


function Navbar() {

  
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link className="navbar-link" to="/app-test">Home</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/cart">Cart</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/orderingInformation">OrderingInfor</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/MyForm">Form</Link>
        </li>
        <li className="navbar-item"> 
          <Link className="navbar-link" to="/Logout">Logout</Link>
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;