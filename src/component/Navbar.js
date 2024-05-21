import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
import * as Realm from 'realm-web';

const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });
const user = app.currentUser;

function Navbar() {

  const logout = async () => {
    if (user) {
      try {
        await user.logOut();
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  };
  
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
          <Link className="navbar-link" to="/Logout" onClick = {logout}>Logout</Link>
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;