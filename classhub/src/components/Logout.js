import React from 'react';
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const loggedInUser = localStorage.getItem("username");

    const handleLogout = () => {
      localStorage.clear();
      window.location.reload(false);
    };

    if (!loggedInUser) {
        return (<Navigate to="/"></Navigate>) //cant log out if not logged in
    }
    
    return (
        <div>
            {handleLogout()}
            <Navigate to="/landingpage"></Navigate>
        </div>
    );
}
export default Dashboard;