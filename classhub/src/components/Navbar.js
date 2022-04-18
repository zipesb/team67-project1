import React from "react";

import '../styles/Navbar.css';

const Navbar = () => {

    const path = "http://localhost:3000/";
    const loggedInUser = localStorage.getItem("username");

    const handleLogout = () => {
      localStorage.clear();
      window.location.reload(false);
    };



//this is to display sign-in or sign-out button depending on if user is signed in but it might be a terrible way of doing so -ben
  if (!loggedInUser){
  return (
    <div className="NavbarItems">
      <h1>ClassHub</h1>
      <ul>
        <li><a className="nav-links" href={path+"dashboard"}>Dashboard</a></li>
        <li><a className="nav-links" href={path+"create"}>Create Class</a></li>
        <li><a className="nav-links" href={path+"search"}>Search</a></li>
      </ul>
      <a className="nav-links-btn" href={path+"login"}>Sign-in</a>
    </div>
  );
  }
  return (
    <div className="NavbarItems">
      <h1>ClassHub</h1>
      <ul>
        <li><a className="nav-links" href={path+"dashboard"}>Dashboard</a></li>
        <li><a className="nav-links" href={path+"create"}>Create Class</a></li>
        <li><a className="nav-links" href={path+"search"}>Search</a></li>
      </ul>
      Welcome {loggedInUser}!
      <button onClick={handleLogout}>Sign-out</button>
    </div>
  );
}

export default Navbar;