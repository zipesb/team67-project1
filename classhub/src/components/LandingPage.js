import React, { Component } from "react";
import { Link } from "react-router-dom";

import '../styles/CoolBlue.css';

class Landing extends Component {
    render() {
      return (
        <div style={{ height: "100vh" }} className="CoolBlue">
            <div>
                <h4>
                Filler
                </h4>
            </div>
            <div style={{
            background: "#999",
            padding: "1%",
            }}>
                <div style={{
                background: "#900",
                padding: "5%",
                }}>
                    <Link
                        to="/register"
                        style={{
                        color: 'white',
                        fontSize: 32,
                        }}
                        className="coolblue-btn"
                    >
                        Sign up!
                    </Link>
                </div>
                <div style={{
                background: "#100",
                }}>
                    <Link
                        to="/login"
                        style={{
                        color: 'white',
                        fontSize: 32,
                        }}
                        className="coolblue-btn"
                    >
                        Log In
                    </Link>
                </div>
            </div>
        </div>
      );
    }
  }
  export default Landing;