import React, { useState, useEffect } from 'react';
import Square from './Square';
import gameSound from './assets/images/mixkit-video-game-bomb-alert-2803.wav';

function ColorGame01() {
    const [colors, setColors] = useState([]);
    const [pickedColor, setPickedColor] = useState('');
    const [message, setMessage] = useState('');
    const [resetText, setResetText] = useState('Play Game');
    const [timer, setTimer] = useState(30);  // 30-second timer
    const [isPlaying, setIsPlaying] = useState(false);
    const [buttonColors, setButtonColors] = useState({
        red: 'red',
        green: 'green',
        yellow: 'yellow'
    });

    useEffect(() => {
        if (isPlaying && timer > 0) {
            const timerId = setTimeout(() => setTimer(timer - 1), 1000);
            changeColors();  // Change colors while the timer is running
            playSound();  // Play sound while the timer is active
            return () => clearTimeout(timerId);
        }
        if (timer === 0) {
            setIsPlaying(false);
            stopGame();  // Stop the game when the timer ends
        }
    }, [timer, isPlaying]);

    const resetGame = () => {
        const newColors = generateRandomColors(6);
        const newPickedColor = pickColor(newColors);
        setColors(newColors);
        setPickedColor(newPickedColor);
        setMessage('');
        setResetText('Play Game');
        setTimer(30);
        setIsPlaying(true);
    };

    const stopGame = () => {
        setResetText('Play Again?');
    };

    const handleSquareClick = (color) => {
        if (!isPlaying) return;  // Prevent clicks when the game is not active
        if (color === pickedColor) {
            setMessage('Correct!');  // Correct color chosen
            setIsPlaying(false);  // Stop the game if the correct color is chosen
            setColors(colors.map(() => color));  // Fill all squares with the picked color
        } else {
            setMessage('Try Again');  // Incorrect color chosen
        }
    };

    const handleButtonClick = (color) => {
        if (color === pickedColor) {
            setMessage('Winner!');  // Color matches the picked color
        } else {
            setMessage('Failed, Try Again!');  // Color does not match
        }
        setIsPlaying(false);  // Stop the game on button click
    };

    const changeColors = () => {
        setColors(generateRandomColors(6));  // Change colors every second
    };

    const playSound = () => {
        const audio = new Audio(gameSound); // Add your sound file here
        audio.play();
    };

    const buttonStyle = {
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '5px',
        color: 'white',
        textAlign: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        display: 'inline-block'
    };

    return (
        <div>
            <h1>Color Prediction Game</h1>
            <div id="colorDisplay">{pickedColor}</div>
            <div id="message" style={{ color: "#000" }}>{message}</div>
            <div>
                <div
                    id="red"
                    style={{ ...buttonStyle, backgroundColor: buttonColors.red }}
                    onClick={() => handleButtonClick(buttonColors.red)}
                >
                    Red
                </div>
                <div
                    id="green"
                    style={{ ...buttonStyle, backgroundColor: buttonColors.green }}
                    onClick={() => handleButtonClick(buttonColors.green)}
                >
                    Green
                </div>
                <div
                    id="yellow"
                    style={{ ...buttonStyle, backgroundColor: buttonColors.yellow, color: 'black' }}
                    onClick={() => handleButtonClick(buttonColors.yellow)}
                >
                    Yellow
                </div>
            </div>
            <div id="container">
                {colors.map((color, index) => (
                    <Square
                        key={index}
                        color={color}
                        onClick={() => handleSquareClick(color)}
                    />
                ))}
            </div>
            <button style={{ marginTop: "10px" }} id="reset" onClick={resetGame}>
                {resetText} ({timer}s)
            </button>
            {isPlaying && playSound()}
        </div>
    );
}

const pickColor = (colors) => {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

const generateRandomColors = (num) => {
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
};

const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

export default ColorGame01;
