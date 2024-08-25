// src/Square.js
import React from 'react';


function Square({ color, onClick, buttonStyle }) {
    return (
        <div
            className="square"
            style={{ backgroundColor: color }}
            onClick={onClick}
        >
            <div className="circle-text"> {color}</div>
        </div>
    );
}

export default Square;
