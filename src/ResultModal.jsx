import React from 'react';
import { Modal, Button } from 'antd';

const ResultModal = ({ isVisible, isWinner, onClose, setShowModal, pickedColor }) => {
    return (
        <Modal
            // title={isWinner ? "Congratulations!" : "Game Over!"}
            open={isVisible}
            onCancel={() => setShowModal(false)}
            footer={false}
            centered
            width={400}

        >
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold' }}>{isWinner ? "Congratulations!" : "Game Over!"}</h2>
                <div class="winner-container">
                    <p class="winner-name">{pickedColor.name}</p>
                </div>
                <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
                    {isWinner ? "You Win!" : "Try Again!"}
                </div>
                <Button key="ok" type="primary" onClick={() => setShowModal(false)} style={{ marginTop: "10px" }}>
                    {/* {isWinner ? "Play Again" : "Try Again"} */}
                    Close
                </Button>,
            </div>
        </Modal >
    );
};

export default ResultModal;
