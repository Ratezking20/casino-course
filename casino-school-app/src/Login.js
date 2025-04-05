import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Example validation logic
        if (username === 'admin' && password === 'password') {
            alert('Login successful!');
            setErrorMessage('');
        } else {
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '10%' }}>
            <h1 style={{ marginTop: '20px', color: '#333' }}>Welcome to the Casino School</h1>
            <p style={{ color: '#555' }}>Learn and practice your favorite casino games!</p>
            <p style={{ color: '#555' }}>Log in to access your account.</p>
            <div style={loginContainerStyle}>
                <h2 style={headerStyle}>Log In</h2>
                <form onSubmit={handleLogin} style={formStyle}>
                    <div style={inputGroupStyle}>
                        <label htmlFor="username" style={labelStyle}>Email:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            placeholder="Enter your email"
                            onChange={(e) => setUsername(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label htmlFor="password" style={labelStyle}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                    {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
                    <button type="submit" style={buttonStyle}>Log In</button>
                </form>
                <p style={{ marginTop: '15px' }}>
                    <Link to="/forgot" style={forgotLinkStyle}>Forgot Username/Password</Link>
                </p>
            </div>
        </div>
    );
};


// Styles
const loginContainerStyle = {
    maxWidth: '50%',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    textAlign: 'center',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const forgotLinkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '0.9rem',
    cursor: 'pointer',
};

forgotLinkStyle[':hover'] = {
    textDecoration: 'underline',
};

const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const inputGroupStyle = {
    marginBottom: '15px',
};

const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'left',
};

const inputStyle = {
    width: '87%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'border-color   1.5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     s',
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
};

const errorStyle = {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
};

export default Login;