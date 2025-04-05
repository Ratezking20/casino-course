import React, { useState } from "react";
import bj6 from './bj6.jpg';
import R1 from './R1.png';
import P1 from './P1.jpg';

export default function CourseImage() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const imageStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        
    }      


    const imageContainerStyle = {
        position: 'relative',
        display: 'inline-block',
        margin: '10px',
        cursor: 'pointer',
        width: '300px',
        height: '375px',
    };

    const overlayStyle = (isHovered) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.62)', // Semi-transparent overlay
        borderRadius: '8px',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    });

    const overlayTextStyle = {
        color: 'white',
        fontSize: '30px',
        fontWeight: 'bold',
    };

    const images = [
        { src: bj6, alt: "Black Jack Course", to: "/practice" },
        { src: R1, alt: "Roulette Course Coming Soon", to: "#" },
        { src: P1, alt: "3 Card Poker Course Coming Soon", to: "#" },
    ];

    const centerStyle = {
        textAlign: 'center',
    }

    const handleImageClick = (to) => {
        if (to) {
            window.location.href = to;
        }
    };

    return (
        <div style={centerStyle}>
            {images.map((image, index) => (
                <div
                    key={index}
                    style={imageContainerStyle}
                    className="image-container"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleImageClick(image.to)} // Navigate on click
                >
                    <img src={image.src} alt={image.alt} style={imageStyle} />
                    <div style={overlayStyle(hoveredIndex === index)} className="overlay">
                        <div style={overlayTextStyle} className="overlay-text">{image.alt}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}