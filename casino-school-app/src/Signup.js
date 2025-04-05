import React, { useState } from 'react';

const Signup = () => {
    const [newUsers, setNewUsers] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '', // Added phone number field
        address: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'password') {
            evaluatePasswordStrength(value);
        }
    };

    const evaluatePasswordStrength = (password) => {
        let strength = '';
        if (password.length >= 8) {
            if (/[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
                strength = 'Strong';
            } else if (/[0-9]/.test(password) || /[!@#$%^&*]/.test(password)) {
                strength = 'Medium';
            } else {
                strength = 'Weak';
            }
        } else {
            strength = 'Too Short';
        }
        setPasswordStrength(strength);
    };

    const handleSignup = (e) => {
        e.preventDefault();

        // Check for duplicate email
        const existingUser = newUsers.find((user) => user.email === formData.email);
        if (existingUser) {
            setErrorMessage('An account already exists with this email');
            return;
        }

        // Validate password
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (!passwordRegex.test(formData.password)) {
            setErrorMessage(
                'Password must be at least 8 characters long, include at least one number and one special character'
            );
            return;
        }

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        // Add new user
        const newUser = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth,
            email: formData.email,
            phoneNumber: formData.phoneNumber, // Store phone number
            address: formData.address,
        };
        setNewUsers([...newUsers, newUser]);
        setErrorMessage('');
        alert('Account created successfully!');
        setFormData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            email: '',
            phoneNumber: '', // Reset phone number
            address: '',
            password: '',
            confirmPassword: '',
        });
        setPasswordStrength('');
    };

    return (
        <div style={signupContainerStyle}>
            <h2 style={headerStyle}>Sign Up</h2>
            <p style={{ textAlign: 'center', color: '#555' }}>Create your account to start learning!</p>
            <p style={{ textAlign: 'center', color: '#555' }}>Already have an account? <a href="/login">Log In</a></p>
            {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
            <p style={{ textAlign: 'center', color: '#555' }}>Please fill out the form below:</p>
            <p style={{ textAlign: 'center', color: '#555' }}>All fields are required.</p>
        
            <form onSubmit={handleSignup} style={formStyle}>
                <div style={inputGroupStyle}>
                    <label htmlFor="firstName" style={labelStyle}>First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="lastName" style={labelStyle}>Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="dateOfBirth" style={labelStyle}>Date of Birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="phoneNumber" style={labelStyle}>Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="address" style={labelStyle}>Mailing Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="password" style={labelStyle}>Create New Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                    <div style={passwordStrengthStyle}>
                        Password Strength: <strong>{passwordStrength}</strong>
                    </div>
                    <p style={{ color: '#555' }}>
                        Password must be at least 8 characters long, include at least one number and one special character.
                    </p>
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>
                {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
                <button type="submit" style={buttonStyle}>Sign Up</button>
            </form>
        </div>
    );
};


// Styles
const signupContainerStyle = {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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

const errorStyle = {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
};

const passwordStrengthStyle = {
    marginTop: '5px',
    fontSize: '0.9rem',
    color: '#555',
};

export default Signup;