// src/Wallet.js
import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import { useNavigate } from 'react-router-dom';


const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [isDepositModalVisible, setDepositModalVisible] = useState(false);
    const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);

    const handleDeposit = (amount) => {
        setBalance((prevBalance) => prevBalance + parseFloat(amount));
    };

    const handleWithdraw = (amount) => {
        setBalance((prevBalance) => prevBalance - parseFloat(amount));
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
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
    };
    const textStyle = {
        margin: 0,
        fontSize: '24px',
        color: '#333',
    };
    return (
        <div className="wallet-container">
            <div style={containerStyle}>
                <button onClick={handleBackClick} style={buttonStyle1}>
                    &larr; Back
                </button>
                <h1 style={textStyle}>Color Prediction Game</h1>
            </div> <h1>Wallet</h1>
            <div className="balance-container">
                <h2 className="balance">Balance: ${balance.toFixed(2)}</h2>
            </div>
            <div className="button-group">
                <Button
                    type="primary"
                    size="large"
                    className="wallet-button"
                    onClick={() => setDepositModalVisible(true)}
                >
                    Deposit
                </Button>
                <Button
                    type="danger"
                    size="large"
                    className="wallet-button"
                    onClick={() => setWithdrawModalVisible(true)}
                >
                    Withdraw
                </Button>
            </div>

            <DepositModal
                visible={isDepositModalVisible}
                onDeposit={handleDeposit}
                onClose={() => setDepositModalVisible(false)}
            />

            <WithdrawModal
                visible={isWithdrawModalVisible}
                onWithdraw={handleWithdraw}
                onClose={() => setWithdrawModalVisible(false)}
            />
        </div>
    );
};

export default Wallet;
