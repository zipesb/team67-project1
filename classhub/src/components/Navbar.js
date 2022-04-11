import React from "react";

import '../styles/Navbar.css';

const Navbar = () => {

  return (
    <div className="NavbarItems">
      <h1>ClassHub</h1>
      <ul>
        <li><a className="nav-links" href="#">Dashboard</a></li>
        <li><a className="nav-links" href="create">Create Class</a></li>
        <li><a className="nav-links" href="#">Search</a></li>
      </ul>
      <a className="nav-links-btn" href="signin">Sign-in</a>
    </div>
  );
}

export default Navbar;