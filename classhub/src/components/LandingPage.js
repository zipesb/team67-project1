import React, { Component } from "react";
import { Link } from "react-router-dom";

import '../styles/CoolBlue.css';

class Landing extends Component {
    
    render() {
        /*if (localStorage.getItem("username")) {
            return <Navigate to="/dashboard"></Navigate>
        }*/

        return (
        <div style={{ height: "100vh" }} className="CoolBlue">
            <div
            id="landingpageText" 
            style = {{
            paddingLeft: "400px",
            width: "1000px",
            }}>
                <h1 style={{
                    textAlign: 'left',
                    fontSize: 50,
                    color: 'white',
                    marginTop: "150px",
                }}>
                    ClassHub
                </h1>
                <h2 style={{
                    textAlign: 'left',
                    color: 'white',
                }}>
                    Join the learning revolution today
                </h2>
            </div>
            <div style={{
            width: "600px",
            padding: "1%",
            marginLeft: "auto", 
            marginRight: "0",
            }}>
                <Link
                    to="/register"
                    style={{
                    color: 'white',
                    fontSize: 32,
                    margin: "20px",
                    marginTop: "100px",
                    }}
                    className="coolblue-btn"
                    id="registerButton"
                >
                    Sign up!
                </Link>
                <Link
                    to="/login"
                    style={{
                    color: 'white',
                    fontSize: 32,
                    margin: "20px",
                    }}
                    className="coolblue-btn"
                    id="loginButton"
                >
                    Log In
                </Link>
            </div>
        </div>
      );
    }
  }
  export default Landing;