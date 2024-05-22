import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"


function Navbar() {

  
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link className="navbar-link" to="/app-test/home">Home</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/app-test/cart">Cart</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/app-test/orderingInformation">OrderingInfor</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/app-test/MyForm">Form</Link>
        </li>
        <li className="navbar-item"> 
          <Link className="navbar-link" to="/app-test/Logout">Logout</Link>
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;