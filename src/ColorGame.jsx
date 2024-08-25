import React, { useState, useEffect } from 'react';
import Square from './Square';
import gameSound from './assets/images/mixkit-video-game-bomb-alert-2803.wav';
import { Button } from 'antd';
import ResultModal from './ResultModal';
import JSConfetti from 'js-confetti';
import { Link, useNavigate } from 'react-router-dom';
import SquareDummy from './SquareDummy';

const colorOptions = [
    { name: 'Red', rgb: 'rgb(255, 0, 0)' },
    { name: 'Green', rgb: 'rgb(0, 255, 0)' },
    { name: 'Yellow', rgb: 'rgb(255, 255, 0)' },
    { name: 'Blue', rgb: 'rgb(0, 0, 255)' },
    { name: 'Magenta', rgb: 'rgb(255, 0, 255)' },
    { name: 'Cyan', rgb: 'rgb(0, 255, 255)' },
    { name: 'Maroon', rgb: 'rgb(128, 0, 0)' },
    { name: 'Olive', rgb: 'rgb(128, 128, 0)' },
    { name: 'Dark Green', rgb: 'rgb(0, 128, 0)' },
    { name: 'Purple', rgb: 'rgb(128, 0, 128)' }
];

function ColorGame() {
    const [colors, setColors] = useState([]);
    const [pickedColor, setPickedColor] = useState({});
    const [message, setMessage] = useState('');
    const [resetText, setResetText] = useState('Play Game');
    const [timer, setTimer] = useState(30);  // 30-second timer
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(new Audio(gameSound));
    const [isWinner, setIsWinner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const jsConfetti = new JSConfetti();

    useEffect(() => {
        if (isPlaying && timer > 0) {
            const timerId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
                changeColors();  // Update colors every second
                playSound();  // Play sound while the timer is active
            }, 1000);
            return () => clearInterval(timerId);
        }
        if (timer === 0) {
            setIsPlaying(false);
            checkWinner();  // Check the winner when the timer ends
            stopGame();  // Stop the game when the timer ends
        }
    }, [timer, isPlaying]);

    const resetGame = () => {
        const newColors = generateRandomColors(6);
        const newPickedColor = pickColor(colorOptions);
        setColors(newColors);
        setPickedColor(newPickedColor);
        setMessage('');
        setResetText('Play Game');
        setTimer(30);
        setIsPlaying(true);
        setShowModal(false);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        resetGame();
    };
    const stopGame = () => {
        setResetText('Play Again?');
        setShowModal(true);
        audio.pause();
    };

    const changeColors = () => {
        setColors(generateRandomColors(6));  // Update colors every second
    };

    const checkWinner = () => {
        const colorMatchDivs = document.querySelectorAll('.color-match div');
        const winner = Array.from(colorMatchDivs).some(div => div.innerText === pickedColor.name);
        if (winner) {
            jsConfetti.addConfetti({
                emojis: ['💵'],
                emojiSize: 100,
                confettiNumber: 100,
                duration: 5000
            });
        }
        setIsWinner(winner);

    };

    const playSound = () => {
        audio.play();
    };

    const buttonStyle = {
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '5px',
        color: 'white',
        textAlign: 'center',
        cursor: 'default',
        fontSize: '16px',
        fontWeight: 'bold',
        display: 'inline-block'
    };

    const timerStyle = {
        fontSize: '60px',
        fontWeight: 'bold',
        color: '#00ff00',
        textAlign: 'center',
        margin: '20px 0',
        backgroundColor: '#1a1a1a',
        padding: '15px 20px',
        borderRadius: '15px',
        width: '250px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0px 0px 20px 5px rgba(0,255,0,0.7)',
        textShadow: '0px 0px 10px rgba(0,255,0,0.8)',
        border: '2px solid #00ff00'
    };
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
    };

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '10px',
        backgroundColor: '#f0f0f0', // Optional: Background color for better visibility
    };

    const buttonStyle1 = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const textStyle = {
        margin: 0,
        fontSize: '24px',
        color: '#333',
    };
    
    return (
        <div className='Prediction'>
            <div style={containerStyle}>
                <button onClick={handleBackClick} style={buttonStyle1}>
                    &larr; Back
                </button>
                <h1 style={textStyle}>Color Prediction Game</h1>
            </div>
            <Link to="/wallet">Add Money</Link>
            {/* <div id="colorDisplay">{pickedColor.name}</div> */}
            {/* <div id="message" style={{ color: '#000' }}>{message}</div> */}
            <div style={timerStyle}>{timer}s</div>  {/* Countdown Timer Display */}
            <div className='color-match'>
                {colorOptions.slice(0, 3).map((color, index) => (
                    <div key={index} style={{ ...buttonStyle, backgroundColor: color.rgb }}>
                        {color.name}
                    </div>
                ))}
            </div>
           
            <div id="container">
                {isPlaying ? (
                    colors.map((color, index) => (
                        <Square
                            key={index}
                            color={color.name} // Use the RGB value for the background
                            onClick={() => handleSquareClick(color.rgb)} // Pass RGB value on click
                        />
                    ))
                ) : (
                    colorOptions.slice(0, 6).map((color, index) => (
                        <SquareDummy
                            key={index}
                            color={color.name} // Use the RGB value for the background
                            onClick={() => handleSquareClick(color.rgb)} // Pass RGB value on click
                        />
                    ))
                )}
            </div>

            <button style={{ margin: "20px 0" }} id="reset" onClick={resetGame}>
                {resetText}
            </button>


            <ResultModal
                isVisible={showModal}
                isWinner={isWinner}
                onClose={handleCloseModal}
                setShowModal={setShowModal}
                pickedColor={pickedColor}
            />
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
        arr.push(pickColor(colorOptions));  // Pick from predefined colors
    }
    return arr;
};

export default ColorGame;
