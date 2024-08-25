// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-container">
            <div className="right-side">
                <div className="banner">
                    <h1>Welcome to the Color Prediction Game</h1>
                </div>
                <div className="buttons-container" style={{textAlign:"center"}}>
                    <Link to="/color-game" >
                        <button className="game-button" style={{marginRight:"20PX"}}>Play the Game</button>
                    </Link>
                    <Link to="/about">
                        <button className="about-button">About</button>
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default Home;

