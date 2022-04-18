import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";

import '../styles/CoolBlue.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: "",
    };
  };
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = async e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
console.log(userData);
await axios.post('http://localhost:5000/api/users/login', userData)
.then( response => {
  console.log(response);
  const { token } = response.data;
  localStorage.setItem("jwtToken", token);
  const decoded = jwt_decode(token);
  localStorage.setItem("username", decoded.name);
  console.log('token: ' + token + '\ndecoded: ' + decoded);
  window.location.reload(false);
})
.catch(err => {
  if (err.response) {
    console.log(err.response.data);
    this.setState({ errors: JSON.stringify(err.response.data)});
    // Request made and server responded
    console.log(this.state.errors);
    //console.log(err.response.status);
    //console.log(err.response.headers);
  }
})
};
  
render() {
  const errors = this.state.errors;
    if (localStorage.getItem("username")) {
      return <Navigate to="/dashboard"></Navigate>
    }

    console.log(errors)
return (
      <div style={{ justifyContent: 'center', height: "100vh" }} className="CoolBlue">
        <div style={{ marginTop: "4rem", justifyContent: 'center', }}>
          <h1 style={{marginBottom: "0"}}>
            Login below
          </h1>
          <p style={{marginTop: "0", marginBottom: "3rem"}}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <form noValidate onSubmit={this.onSubmit}>
            <div style = {{marginBottom: "15px"}} >
              <label htmlFor="email">Email </label>
              <input
                onChange={this.onChange}
                value={this.state.email}
                id="email"
                type="email"
              />
            </div>
            <div style={{marginBottom:'3rem'}}>
              <label htmlFor="password">Password </label>
              <input
                onChange={this.onChange}
                value={this.state.password}
                id="password"
                type="password"
              />
            </div>
            <div>
              <button
                style={{
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  width: "150px",
                  letterSpacing: "1.5px",
                  margin: '0 auto',
                }}
                className="login-btn"
                type="submit"
              >
                Login
              </button>
              {(errors) ? <div className="error-message"><p>ERRORS:{errors}</p></div> : <div></div>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;