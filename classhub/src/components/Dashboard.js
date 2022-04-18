import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import '../styles/CoolBlue.css';

const Dashboard = () => {
    const [classList, setClassList] = useState([])
    const loggedInUser = localStorage.getItem("username");

    axios.get("http://localhost:5000/getOwnedClasses", { params: { owner: loggedInUser } })
    .then(res => {
        console.log(res.data);
        setClassList(res.data);
    })
    .catch(err => {
        if (err.response) {
            console.log(err.response);
        }
    })

    if (!loggedInUser) {
        return( 
        <div className="CoolBlue" 
        style={{ justifyContent: 'center', height: "100vh", paddingTop:'3rem'}}>
            <h1>
                Not logged in, please 
                <Link to="/login" style={{ color: 'blue' }}> log in </Link> 
                or 
                <Link to="/register" style={{ color: 'blue' }}> register </Link>
            </h1>
        </div>
        );
    }
    
    return (
        <div className="CoolBlue" 
        style={{ justifyContent: 'center', display:"block", height: "100vh", paddingTop:'3rem', paddingBottom:'2rem'}}>
            <h1>
                You're logged in, nice to see you <u>{loggedInUser}</u>
            </h1>
            <div style={{justifyContent: 'center'}}>
                {classList?.map((class1) => (
                    <div>
                        <li className="class-box" key={class1._id}>
                            <a href={"/class/"+class1._id} target = "_blank" rel="noreferrer"> 
                                <div style={{display:"flex"}}>
                                    Class: {class1.name}
                                </div>
                            </a>
                        </li>
                    </div> ))}
            </div>
        </div>
    )
}
export default Dashboard;