import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Modal from 'react-modal';
import BetAmount from './BetAmount';
import Deck1 from './Deck1.png';
import Deck2 from './Deck2.png';
import Deck5 from './Deck5.png';

// Dynamically import card images
const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
};

const cardImages = importAll(require.context('./PNG-cards-1.3', false, /\.(png|jpe?g|svg)$/));

class Card {
    constructor(suit, value) {
        this.suit = suit.toLowerCase();
        this.value = value.toLowerCase();
        this.image = this.getImage();
    }

    getImage() {
        const valueMap = {
            'j': 'j',
            'q': 'q',
            'k': 'k',
            'a': 'a'
        };
        const value = valueMap[this.value] || this.value;
        const imageName = `${value}_of_${this.suit}.png`;
        const image = cardImages[imageName];
        if (!image) {
            console.error(`Image not found: ${imageName}`);
        }
        return image;
    }

    getValue() {
        if (this.value === 'a') {
            return 11;
        } else if (['k', 'q', 'j'].includes(this.value)) {
            return 10;
        } else {
            return parseInt(this.value);
        }
    }
}

class Deck {
    constructor(numDecks = 1) {
        this.cards = [];
        this.numDecks = numDecks;
        this.createDeck();
        this.shuffle();
    }

    createDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
        for (let i = 0; i < this.numDecks; i++) {
            for (let suit of suits) {
                for (let value of values) {
                    this.cards.push(new Card(suit, value));
                }
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal() {
        return this.cards.pop();
    }
}

class Hand {
    constructor(cards = []) {
        this.cards = cards;
    }

    addCard(card) {
        this.cards.push(card);
    }

    getValue() {
        let value = 0;
        let aceCount = 0;
        for (let card of this.cards) {
            value += card.getValue();
            if (card.value === 'a') {
                aceCount++;
            }
        }
        while (value > 21 && aceCount > 0) {
            value -= 10;
            aceCount--;
        }
        return value;
    }

    isBust() {
        return this.getValue() > 21;
    }
}

const BlackjackGame = () => {
    const [playerWallet, setPlayerWallet] = useState(1000);
    const [deck, setDeck] = useState(null);
    const [playerHand, setPlayerHand] = useState(new Hand());
    const [dealerHand, setDealerHand] = useState(new Hand());
    const [betAmount, setBetAmount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [numDecks, setNumDecks] = useState(1);
    const [isDealerFirstCardRevealed, setIsDealerFirstCardRevealed] = useState(false);
    const [canHit, setCanHit] = useState(true);
    const [canDouble, setCanDouble] = useState(true);
    const [showBustMessage, setShowBustMessage] = useState(false);
    const [isHandOver, setIsHandOver] = useState(false);
    const [isBetFormOpen, setIsBetFormOpen] = useState(false);
    const [showPushMessage, setShowPushMessage] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isBlackjack, setIsBlackjack] = useState(false);

    useEffect(() => {
        if (!isModalOpen) {
            startGame();
        }
    }, [isModalOpen]);

    const startGame = () => {
        const newDeck = new Deck(numDecks);
        setDeck(newDeck);
        setIsBetFormOpen(true);
    };

    const playRound = (deck, bet) => {
        setBetAmount(bet);
        const newPlayerHand = new Hand();
        const newDealerHand = new Hand();
        newPlayerHand.addCard(deck.deal());
        newPlayerHand.addCard(deck.deal());
        newDealerHand.addCard(deck.deal());
        newDealerHand.addCard(deck.deal());
        setPlayerHand(newPlayerHand);
        setDealerHand(newDealerHand);
        setCanHit(true);
        setCanDouble(true);
        setIsHandOver(false);
        setIsDealerFirstCardRevealed(false); // Reset the dealer's first card reveal state
    
        // Check for Blackjack
        if (newPlayerHand.getValue() === 21 && newPlayerHand.cards.length === 2) {
            setIsBlackjack(true); // Player hits Blackjack
            setCanHit(false); // Disable "Hit" button
            setCanDouble(false); // Disable "Double" button
            setIsHandOver(true); // End the hand
            setPlayerWallet(playerWallet + bet * 1.5); // Add 1.5x the bet to the player's wallet
        
             // Hide "BLACKJACK!" message after 2 seconds
        setTimeout(() => {
            setIsBlackjack(false);
        }, 2000);
        } else {
            setIsBlackjack(false); // Reset Blackjack state
        }
    };

    const handleBetSubmit = (bet) => {
        setIsBetFormOpen(false);
        playRound(deck, bet);
    };

    const handleNumDecksChange = (event) => {
        setNumDecks(parseInt(event.target.value));
    };

    const handleStartGame = (selectedNumDecks) => {
        setNumDecks(selectedNumDecks); // Set the selected number of decks
        setIsModalOpen(false); // Close the modal
    };

    const handleHit = () => {
        if (canHit) {
            const newCard = deck.deal();
            playerHand.addCard(newCard);
            setPlayerHand(new Hand([...playerHand.cards])); // Update state to trigger re-render
            if (playerHand.isBust()) {
                setCanHit(false);
                setCanDouble(false);
                setShowBustMessage(true); // Show the "Player Bust" message
                setIsDealerFirstCardRevealed(true); // Reveal the dealer's hidden card
                setTimeout(() => {
                    setShowBustMessage(false); // Hide the "Player Bust" message after 2 seconds
                    setIsHandOver(true);
                    setPlayerWallet(playerWallet - betAmount); // Subtract bet amount from player wallet
                    checkGameOver();
                }, 2000);
            }
            setCanDouble(false); // Player cannot double after hitting
        }
    };

    const handleDouble = () => {
        if (canDouble && playerWallet >= betAmount * 2) { // Ensure sufficient funds
            const doubledBet = betAmount * 2;
            setBetAmount(doubledBet);
            const newCard = deck.deal();
            playerHand.addCard(newCard);
            setPlayerHand(new Hand([...playerHand.cards])); // Update state to trigger re-render
            setCanHit(false); // Player cannot hit after doubling
            setCanDouble(false); // Player cannot double again
    
            if (playerHand.isBust()) {
                setShowBustMessage(true);
                setTimeout(() => {
                    setShowBustMessage(false);
                    setIsHandOver(true);
                    setPlayerWallet(playerWallet - doubledBet); // Subtract doubled bet amount from player wallet
                    checkGameOver();
                }, 2000);
            } else {
                // If the player wins after doubling, add the doubled bet amount to the wallet
                setTimeout(() => {
                    determineWinner(doubledBet);
                }, 2000);
            }
        }
    };

    const handleStand = () => {
        setIsDealerFirstCardRevealed(true); // Reveal the dealer's first card
        setCanHit(false); // Disable the "Hit" button
        setCanDouble(false); // Disable the "Double" button
        handleDealerTurn(); // Let the dealer take their turn
        setIsHandOver(true); // Mark the hand as over
        determineWinner(); // Determine the winner of the hand
    };
    const handleDealerTurn = () => {
        while (dealerHand.getValue() < 17) {
            dealerHand.addCard(deck.deal());
            setDealerHand(new Hand([...dealerHand.cards])); // Update state to trigger re-render
        }
    };

    const determineWinner = (currentBet = betAmount) => {
        const playerTotal = playerHand.getValue();
        const dealerTotal = dealerHand.getValue();
    
        if (dealerHand.isBust() || (playerTotal > dealerTotal && playerTotal <= 21)) {
            setPlayerWallet(playerWallet + currentBet); // Add the current bet amount to player wallet
        } else if (playerTotal < dealerTotal || playerTotal > 21) {
            setPlayerWallet(playerWallet - currentBet); // Subtract the current bet amount from player wallet
        } else {
            setShowPushMessage(true);
            setTimeout(() => {
                setShowPushMessage(false);
            }, 2000);
        }
        checkGameOver();
    };
    
    const handleDealCards = () => {
        setIsBetFormOpen(true);
    };

    const checkGameOver = () => {
        if (playerWallet <= 0) {
            setIsGameOver(true);
        }
    };

    const handlePlayAgain = () => {
        setPlayerWallet(1000);
        setIsGameOver(false);
        startGame();
    };

    const backgroundColor = {
        backgroundColor: '#081c15',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '100%',
        height: '100%',
    };

    const headerStyle = {
        textAlign: 'center',
        color: 'white',
        fontSize: '5rem',
        margin: '0px',
    };

    const blackjackMessageStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'gold',
        fontSize: '3rem',
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 1000,
    };

    const p1Style = {
        color: '#ffd60a',
        fontSize: '1.2rem',
        textAlign: 'left',
        display: 'inline-block',  
    };

    const p1Style2 = {
        color: '#fff',
        fontSize: '1.2rem',
        textAlign: 'left',
        display: 'inline-block',
        marginLeft: '10px',  
        
    };

    const pStyle = {
        color: 'white',
        fontSize: '1.2rem',
        textAlign: 'center',
    };

    const h2Style = {
        color: '#ffea00',
        fontSize: '1.5rem',
        textAlign: 'center',
    };

    const h2Style2 = {
        color: 'black',
        fontSize: '3rem',
        textAlign: 'center',
    };

    const cardContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    };

    const bustMessageStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'red',
        fontSize: '3rem',
        textAlign: 'center',
        zIndex: 1000,
    };

    const pushMessageStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'yellow',
        fontSize: '3rem',
        textAlign: 'center',
        zIndex: 1000,
    };

    const gameOverStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '5rem',
        textAlign: 'center',
        zIndex: 1000,
    };

    const playAgainButtonStyle = {
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, 70%)',
        fontSize: '2rem',
        padding: '10px 20px',
        zIndex: 1000,
    };

    const buttonStyle = {
        fontSize: '1.2rem',
        padding: '10px 20px',
        margin: '5px',
    };

    const redStyle = {
        color: 'red',
        display: 'block',
    }

    const deckImageStyle = {
        width: '120px',
        height: '120px',
    };

    const modalStyle = {
        maxWidth: '100%',
        backgroundColor: '#e0fbfc',
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div style={backgroundColor}>
            {showBustMessage && (
    <p style={bustMessageStyle}>Player Bust</p>
)}
            <Modal
            style={modalStyle}
    isOpen={isModalOpen}
    onRequestClose={() => setIsModalOpen(false)}
    contentLabel="Choose Number of Decks"
    ariaHideApp={false}
>
    <h2 style={ h2Style2}>Choose number of decks</h2>
    <div style={{ maxWidth: '100%', backgroundColor: '#d9d9d9', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {/* Image for 1 deck */}
        <div style={{ width: '80%' ,maxwidth: '30%', textAlign: 'center', cursor: 'pointer' }} onClick={() => handleStartGame(1)}>
            <img
                src={Deck1}
                alt="1 Deck"
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')} // Scale up on hover
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')} // Reset scale on hover out
                style={{ transition: 'transform 0.3s ease', width: '100%', height: '100%' , objectFit: 'cover',
                    overflow: 'hidden', objectPosition: 'left',  paddingLeft: '20%'}}
            />
            <p style={{marginLeft: '50px', paddingLeft: '20%' , marginTop: '5px', fontWeight: 'bold', fontSize: '1.2rem', paddingTop: '50px', }}>1 Deck</p>
        </div>

        {/* Image for 2 decks */}
        <div style={{ width: '80%' ,maxwidth: '30%', textAlign: 'center', cursor: 'pointer' }} onClick={() => handleStartGame(2)}>
            <img
                src={Deck2}
                alt="2 Decks"
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')} // Scale up on hover
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')} // Reset scale on hover out
                style={{ transition: 'transform 0.3s ease', width: '100%', height: '100%',  objectFit: 'cover', 
                    overflow: 'hidden', objectPosition: 'left', marginTop: '50px' }}
            />
            <p style={{paddingLeft: '15%', marginTop: '5px', fontWeight: 'bold', fontSize: '1.2rem' }}>2 Decks</p>
        </div>

        {/* Image for 5 decks */}
        <div style={{ width: '80%' ,maxwidth: '30%', textAlign: 'center', cursor: 'pointer' }} onClick={() => handleStartGame(5)}>
            <img
                src={Deck5}
                alt="5 Decks"
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')} // Scale up on hover
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')} // Reset scale on hover out
                style={{ marginRight: '50px', paddingRight: '20%' , width: '100%', height: '100%',  objectFit: 'cover',
                    overflow: 'hidden', objectPosition: 'left', marginTop: '50px', transition: 'transform 0.3s ease', }}
            />
            <p style={{ marginTop: '5px', fontWeight: 'bold', fontSize: '1.2rem' }}>5 Decks</p>
        </div>
    </div>
</Modal>
                <div>
                    <h1 style={headerStyle}>Black Jack</h1>
                    <div>
                        <p style={p1Style}>Player Wallet:</p>
                        <p style={p1Style2}> ${playerWallet}</p>
                    </div>
                    <div>
                        <p style={p1Style}>Bet Amount:</p>
                        <p style={p1Style2}> ${betAmount}</p>
                    </div>
                </div>
                <div>
                    <div style={{textAlign: 'center'}}>
                        <h2 style={h2Style}>Dealer Hand</h2>
                        <div style={cardContainerStyle}>
    {dealerHand.cards.map((card, index) => (
        <div key={index} style={{ paddingRight: '10px', height: '150px', padding: '0 10px', textAlign: 'center' }}>
            {index === 0 && !isDealerFirstCardRevealed ? (
                <img src={cardImages['backcard.png']} alt="Back of card" style={{ width: '100px' }} />
            ) : (
                <img src={card.image} alt={`${card.value} of ${card.suit}`} style={{ width: '100px' }} />
            )}
        </div>
    ))}
</div>
                        <p style={pStyle}>Total: {isDealerFirstCardRevealed ? dealerHand.getValue() : '??'}</p>
                    </div>
                    <div>
                        <h2 style={h2Style}>Player Hand</h2>
                        <div style={cardContainerStyle}>
                            {playerHand.cards.map((card, index) => (
                                <div key={index} style={{ paddingRight: '10px', height: '150px', padding: '0 10px', }}>
                                    <img src={card.image} alt={`${card.value} of ${card.suit}`} style={{ width: '100px' }} />
                                </div>
                            ))}
                        </div>
                        <p style={pStyle}>Total: {playerHand.getValue()}</p>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                {isBlackjack && (
    <p style={blackjackMessageStyle}>BLACKJACK!</p>
    
)}

    <button
        style={{ width: '100px', height: '50px' }}
        onClick={handleHit}
        disabled={!canHit} // Disable "Hit" button if `canHit` is false
    >
        Hit
    </button>
    <button
        style={{ width: '100px', height: '50px' }}
        onClick={handleDouble}
        disabled={!canDouble} // Disable "Double" button if `canDouble` is false
    >
        Double
    </button>
    <button
        style={{ width: '100px', height: '50px' }}
        onClick={handleStand}
        disabled={isHandOver} // Disable "Stand" button if the hand is over
    >
        Stand
    </button>
    {isHandOver && (
        <button
            style={{ width: '100px', height: '50px' }}
            onClick={handleDealCards}
        >
            Deal Cards
        </button>
    )}
</div>
                {isGameOver && (
                    <div style={gameOverStyle}>
                        <h1 style={redStyle}>Game Over</h1>
                        <button style={playAgainButtonStyle} onClick={handlePlayAgain}>Play Again</button>
                    </div>
                )}
                {playerWallet === 0 && (
                    <div style={gameOverStyle}>
                        <h1 style={redStyle}>Game Over</h1>
                        <button style={playAgainButtonStyle} onClick={handlePlayAgain}>Play Again</button>
                    </div>
                )}
                {!isGameOver && playerWallet > 0 && (
                    <BetAmount
                        isOpen={isBetFormOpen}
                        onRequestClose={() => setIsBetFormOpen(false)}
                        onSubmit={handleBetSubmit}
                        previousBet={betAmount}
                        playerWallet={playerWallet}
                    />
                )}
            </div>
        </div>
    );
};

export default BlackjackGame;