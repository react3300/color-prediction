// src/About.js
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f7f7f7',
        padding: '20px',
    };

    const headingStyle = {
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '20px',
    };

    const descriptionStyle = {
        fontSize: '1.2rem',
        color: '#666',
        textAlign: 'center',
        marginBottom: '30px',
        maxWidth: '600px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '1rem',
        color: 'white',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#0056b3',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>About the Game</h1>
            <p style={descriptionStyle}>
                This is a simple color prediction game built with React. It challenges your color recognition skills in a fun and interactive way.
            </p>
            <Link to="/">
                <button style={buttonStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}>
                    Back to Home
                </button>
            </Link>
        </div>
    );
}

export default About;

