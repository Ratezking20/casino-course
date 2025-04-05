import React, { useState } from 'react';
import Navbar from './Navbar';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(true); // Toggle between password and username recovery

    // Simulated user data for demonstration purposes
    const users = [
        { email: 'user1@example.com', phoneNumber: '1234567890', username: 'user1' },
        { email: 'user2@example.com', phoneNumber: '0987654321', username: 'user2' },
    ];

    const handleForgotPassword = (e) => {
        e.preventDefault();

        // Simulate sending an email with the password
        const user = users.find((user) => user.email === email);
        if (user) {
            setMessage(`An email has been sent to ${email} with your password.`);
        } else {
            setMessage('No account found with this email.');
        }
    };

    const handleForgotUsername = (e) => {
        e.preventDefault();

        // Simulate verifying the phone number and retrieving the username
        const user = users.find((user) => user.phoneNumber === phoneNumber);
        if (user) {
            setMessage(`A message has been sent to ${phoneNumber} with your username: ${user.username}.`);
        } else {
            setMessage('No account found with this phone number.');
        }
    };

    return (
<div>
    <div>
        <Navbar />
    </div>

        <div style={forgotContainerStyle}>
            <h2 style={headerStyle}>Forgot {isForgotPassword ? 'Password' : 'Username'}</h2>
            <form
                onSubmit={isForgotPassword ? handleForgotPassword : handleForgotUsername}
                style={formStyle}
            >
                {isForgotPassword ? (
                    <div style={inputGroupStyle}>
                        <label htmlFor="email" style={labelStyle}>Enter your email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                ) : (
                    <div style={inputGroupStyle}>
                        <label htmlFor="phoneNumber" style={labelStyle}>Enter your phone number:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                )}
                <button type="submit" style={buttonStyle}>
                    {isForgotPassword ? 'Recover Password' : 'Recover Username'}
                </button>
            </form>
            {message && <p style={messageStyle}>{message}</p>}
            <p style={{ marginTop: '15px' }}>
                <a
                    href="#"
                    onClick={() => setIsForgotPassword(!isForgotPassword)}
                    style={toggleLinkStyle}
                >
                    {isForgotPassword
                        ? 'Forgot Username'
                        : 'Forgot Password'}
                </a>
            </p>
        </div>
        </div>
    );
};

// Styles
const forgotContainerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
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
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
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

const messageStyle = {
    color: 'green',
    marginTop: '10px',
    fontSize: '0.9rem',
};

const toggleLinkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '0.9rem',
    cursor: 'pointer',
};

export default Forgot;