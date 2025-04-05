import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import BlackjackGame from './BlackjackGame';

export default function Practice() {
    

    const headerStyle = {
        textAlign: 'center',
        color: 'blue'
    };

    const buttonStyle = {
        margin: '10px 0',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        textAlign: 'center',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer'
    };

    const centerStyle = {
        textAlign: 'center'
    };

    const ulStyle = {
        type: "none",
        padding: 0,
        listStyleType: 'none',
        margin: 0,
        display: "block",
        paddingBottom: "30px",
    };

    const handleButtonClick = () => {
        window.location.href = '/blackjack';
    };

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div style={centerStyle}>
                <h1 style={headerStyle}>Practice Blackjack</h1>
                <p>Improve your skills by practicing with our online casino BlackJack game</p>
                <div>
                    <h3>Rules for the Game</h3>
                </div>
                <div style={centerStyle}>
                    <ul style={ulStyle}>
                        <li>Player begins game with $1000 in Player wallet</li>
                        <li>Choose the number of decks (1, 2, or 5)</li>
                        <li>Place your bet amount in $1, $5, $10, $20, $100, or $500 increments</li>
                        <li>Try to get as close to 21 as possible without going over</li>
                        <li>Good luck!</li>
                    </ul>
                </div>
                <button className='btn btn-primary' style={buttonStyle} onClick={handleButtonClick}
                >Start New Game</button>
            </div>
        </div>
    );
};