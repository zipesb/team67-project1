import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Dashboard = () => {
    const loggedInUser = localStorage.getItem("username");

    if (!loggedInUser) {
        return <div>Not logged in, please <Link to="/login" style={{ color: 'blue' }}>log in</Link> or <Link to="/register" style={{ color: 'blue' }}>register</Link> </div>;
    }
    
    return (
        <h1>Youre logged in, nice to see you [username: {loggedInUser}]</h1>
    )
}
export default Dashboard;