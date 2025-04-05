import React from 'react';
import './Navbar.css'; // Assuming you will create a CSS file for styling
import { Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';


export default function Navbar() {
    
    const navbarStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
    };

    const buttonStyle = {
        margin: '0 5px',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        textDecoration: 'none',
    };

    const buttonStyle1 = {
        margin: '0 5px',
        color: 'black',
        padding: '10px 15px',
        
        border: 'none',
        borderRadius: '5px',
        backgroundColor: "#e6e6e6",
        color: 'white',
        cursor: 'pointer',
        textDecoration: 'none',
    };
    const buttonStyle2 = {
        margin: '0 35px 0 5px',
        color: 'black',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: "#e6e6e6",
        color: 'white',
        cursor: 'pointer',
        textDecoration: 'none',
    };

    const listStyle = {
        listStyleType: 'none',
        display: 'inline-flex',
    }

    const navbarLeftStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const navbarRightStyle = {
        display: 'flex',
        alignItems: 'center',
        float: 'right',
    };

    return (
        <nav style={navbarStyle} className="navbar">
            
                <div style={ navbarLeftStyle } className="navbar-left">
                    <Link to="/" className="nav-link m-1" style={buttonStyle1}>Home</Link>
                </div>
                <div style={navbarRightStyle} className="navbar-right">
                    <Link to='./Signup' style={buttonStyle} className="nav-link">Sign Up</Link>
                    <Link to='./Login' style={buttonStyle2} className="nav-link">Log In</Link>
                </div>
           
        </nav>
    );
};
