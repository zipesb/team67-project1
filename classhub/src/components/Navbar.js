import React from "react";

import '../styles/Navbar.css';

const Navbar = () => {

    const path = "http://localhost:3000/";
    const loggedInUser = localStorage.getItem("username");



//this is to display sign-in or sign-out button depending on if user is signed in but it might be a terrible way of doing so -ben
  if (!loggedInUser){
  return (
    <div className="NavbarItems">
      <a className="nav-landingpage" href={path}>ClassHub</a>
      <ul>
        <li><a className="nav-links" href={path+"dashboard"}>Dashboard</a></li>
        <li><a className="nav-links" href={path+"create"}>Create Class</a></li>
        <li><a className="nav-links" href={path+"search"}>Search</a></li>
      </ul>
      <h2 className = "welcome-user"></h2>
      <a className="nav-links-btn" href={path+"login"}>Sign-in</a>
    </div>
  );
  }
  return (
    <div className="NavbarItems">
      <a className="nav-landingpage" href={path}>ClassHub</a>
      <ul>
        <li><a className="nav-links" href={path+"dashboard"}>Dashboard</a></li>
        <li><a className="nav-links" href={path+"create"}>Create Class</a></li>
        <li><a className="nav-links" href={path+"search"}>Search</a></li>
      </ul>
      <h2 className = "welcome-user">Welcome {loggedInUser}!</h2>
      <a className="nav-links-btn" href={path+"logout"}>Sign-out</a>
    </div>
  );
}

export default Navbar;