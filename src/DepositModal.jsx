// src/DepositModal.js
import React, { useState } from 'react';
import { Modal, Button, Input, Radio } from 'antd';

const DepositModal = ({ visible, onDeposit, onClose }) => {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = () => {
        if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
            onDeposit(amount);
            setAmount('');
            onClose();
        } else {
            alert('Please enter a valid amount');
        }
    };

    return (
        <Modal
            title="Deposit Money"
            visible={visible}
            onOk={handleSubmit}
            onCancel={onClose}
            okText="Deposit"
        >
            <Input
                type="number"
                value={amount}
                onChange={handleChange}
                placeholder="Enter amount"
                style={{ marginBottom: '16px' }}
            />
            <Radio.Group onChange={handleMethodChange} value={paymentMethod}>
                <Radio value="creditCard">Credit Card</Radio>
                <Radio value="debitCard">Debit Card</Radio>
                <Radio value="netBanking">Net Banking</Radio>
                <Radio value="upi">UPI</Radio>
            </Radio.Group>
        </Modal>
    );
};

export default DepositModal;
