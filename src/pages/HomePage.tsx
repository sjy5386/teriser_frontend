import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div className="container">
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
            <Link to="/point-cards">Point cards</Link>
            <Link to="/add-project">Add project</Link>
        </div>
    );
};

export default HomePage;
