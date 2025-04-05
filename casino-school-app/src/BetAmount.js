import React, { useState } from 'react';
import Modal from 'react-modal';
import MyChip5 from './MyChip5.png';
import MyChip25 from './MyChip25.png';
import MyChip100 from './MyChip100.png';
import MyChip500 from './MyChip500.png';

const BetAmount = ({ isOpen, onRequestClose, onSubmit, previousBet, playerWallet }) => {
    const [bet, setBet] = useState(previousBet);
    const [errorMessage, setErrorMessage] = useState('');

    const handleBetClick = (amount) => {
        if (bet + amount > playerWallet) {
            setErrorMessage('Player has insufficient funds');
        } else {
            setBet(bet + amount);
            setErrorMessage('');
        }
    };

    const handleReset = () => {
        setBet(0);
        setErrorMessage('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (bet <= playerWallet) {
            onSubmit(bet);
        } else {
            setErrorMessage('Player has insufficient funds');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Enter Bet Amount"
            ariaHideApp={false}
            style={modalStyle}
        >
            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>Choose Bet Amount</label>
                <div style={imageContainerStyle}>
                    <div style={imageWrapperStyle}>
                        <img
                            src={MyChip5}
                            alt="Bet 5"
                            style={imageStyle}
                            onClick={() => handleBetClick(5)}
                        />
                        <p style={imageTextStyle}>$5</p>
                    </div>
                    <div style={imageWrapperStyle}>
                        <img
                            src={MyChip25}
                            alt="Bet 25"
                            style={imageStyle}
                            onClick={() => handleBetClick(25)}
                        />
                        <p style={imageTextStyle}>$25</p>
                    </div>
                    <div style={imageWrapperStyle}>
                        <img
                            src={MyChip100}
                            alt="Bet 100"
                            style={imageStyle}
                            onClick={() => handleBetClick(100)}
                        />
                        <p style={imageTextStyle}>$100</p>
                    </div>
                    <div style={imageWrapperStyle}>
                        <img
                            src={MyChip500}
                            alt="Bet 500"
                            style={imageStyle}
                            onClick={() => handleBetClick(500)}
                        />
                        <p style={imageTextStyle}>$500</p>
                    </div>
                </div>
                <p style={betAmountStyle}><b>Current Bet:</b> ${bet}</p>
                {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
                <div style={buttonContainerStyle}>
                    <button type="button" onClick={handleReset} style={resetButtonStyle}>Reset</button>
                    <button type="submit" style={buttonStyle}>Place Bet</button>
                </div>
            </form>
        </Modal>
    );
};

const modalStyle = {
    content: {
        width: '600px',
        height: '400px',
        position: 'absolute',
        top: '50%',
        backgroundColor: '#eaf4f4',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
        borderRadius: '8px',
    },
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eaf4f4',
    borderWidth: '3px',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const labelStyle = {
    marginBottom: '10px',
    fontSize: '2.7rem',
    fontFamily: 'Fantasy',
};

const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
    height: '150px',
};

const imageWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 10px',
};

const imageStyle = {
    width: '120px',
    height: '120px',
    cursor: 'pointer',
};

const imageTextStyle = {
    marginTop: '5px',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    fontFamily: 'serif',
};

const betAmountStyle = {
    marginBottom: '10px',
    fontSize: '1.2rem',
};

const errorStyle = {
    color: 'red',
    marginBottom: '10px',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
};

const buttonStyle = {
    padding: '10px 10px',
    fontSize: '3rem',
    fontFamily: 'serif, sans-serif',
    backgroundColor: '#38b000',
    color: '#fff',
    border: 'solid',
    borderWidth: '3px',
    borderColor: '#ffffff',
    borderRadius: '25px',
    cursor: 'pointer',
};

const resetButtonStyle = {
    padding: '10px 10px',
    fontSize: '3rem',
    fontFamily: 'serif, sans-serif',
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'solid',
    borderWidth: '3px',
    borderColor: '#ffffff',
    borderRadius: '25px',
    cursor: 'pointer',
};

export default BetAmount;