import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

import '../styles/CoolBlue.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: "",
    };
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
e.preventDefault();
const newUser = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };
console.log(newUser);
axios.post('http://localhost:5000/api/users/register', newUser)
.then(response => {
  console.log(response);
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

return (
      <div style={{ justifyContent: 'center', height: "100vh" }} className="CoolBlue">
        <div>
          <div>
            <Link to="/">Back to home</Link>
            <div style={{ marginTop: "4rem", justifyContent: 'center', }}>
              <h1 style={{marginBottom: "0"}} id="registerBelow">
                Register below
              </h1>
              <p style={{marginTop: "0", marginBottom: "3rem"}}>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div style = {{marginBottom: "15px"}} >
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div style = {{marginBottom: "15px"}} >
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  id="username"
                  type="text"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div style = {{marginBottom: "15px"}} >
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div style = {{marginBottom: "15px"}} >
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div style = {{marginBottom: "3rem"}} >
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  id="password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
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
                  id="submitButton"
                >
                  Sign up
                </button>
                {(errors) ? <div id="errorMessages" className="error-message"><p>ERRORS:{errors}</p></div> : <div></div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;