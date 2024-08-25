// src/Square.js
import React from 'react';


function SquareDummy({ color, onClick, buttonStyle }) {
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

export default SquareDummy;
