import React from "react";

import '../styles/Navbar.css';

const Navbar = () => {

    const path = "http://localhost:3000/";

  return (
    <div className="NavbarItems">
      <h1>ClassHub</h1>
      <ul>
        <li><a className="nav-links" href={path+"dashboard"}>Dashboard</a></li>
        <li><a className="nav-links" href={path+"create"}>Create Class</a></li>
        <li><a className="nav-links" href={path+"search"}>Search</a></li>
      </ul>
      <a className="nav-links-btn" href={path+"signin"}>Sign-in</a>
    </div>
  );
}

export default Navbar;