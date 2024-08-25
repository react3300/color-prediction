// src/WithdrawModal.js
import React, { useState } from 'react';
import { Modal, Button, Input, Radio, Form, Row, Col, InputNumber } from 'antd';
import { CreditCardOutlined, BankOutlined, MailOutlined } from '@ant-design/icons';

const WithdrawModal = ({ visible, onWithdraw, onClose }) => {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [form] = Form.useForm();

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
                onWithdraw(amount);
                setAmount('');
                onClose();
            } else {
                alert('Please enter a valid amount');
            }
        }).catch(info => {
            console.log('Validation Failed:', info);
        });
    };

    return (
        <Modal
            title="Withdraw Money"
            open={visible}
            onOk={handleSubmit}
            onCancel={onClose}
            okText="Withdraw"
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ paymentMethod: 'creditCard' }}
            >
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: 'Please enter an amount' }]}
                >
                    <InputNumber
                        value={amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Payment Method"
                    name="paymentMethod"
                    rules={[{ required: true, message: 'Please select a payment method' }]}
                >
                    <Radio.Group onChange={handleMethodChange} value={paymentMethod}>
                        <Radio value="creditCard">
                            <CreditCardOutlined /> Credit Card
                        </Radio>
                        <Radio value="debitCard">
                            Debit Card
                        </Radio>
                        <Radio value="netBanking">
                            <BankOutlined /> Net Banking
                        </Radio>
                        <Radio value="upi">
                            <MailOutlined /> UPI
                        </Radio>
                    </Radio.Group>
                </Form.Item>

                {paymentMethod === 'creditCard' || paymentMethod === 'debitCard' ? (
                    <>
                        <Form.Item
                            label="Card Number"
                            name="cardNumber"
                            rules={[{ required: true, message: 'Please enter your card number' }]}
                        >
                            <Input
                                placeholder="Enter card number"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Expiry Date"
                                    name="expiryDate"
                                    rules={[{ required: true, message: 'Please enter the expiry date' }]}
                                >
                                    <Input
                                        placeholder="MM/YY"
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="CVV"
                                    name="cvv"
                                    rules={[{ required: true, message: 'Please enter your CVV' }]}
                                >
                                    <Input
                                        placeholder="CVV"
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                ) : paymentMethod === 'netBanking' ? (
                    <Form.Item
                        label="Bank Account Number"
                        name="bankAccount"
                        rules={[{ required: true, message: 'Please enter your bank account number' }]}
                    >
                        <Input
                            placeholder="Enter bank account number"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                ) : paymentMethod === 'upi' ? (
                    <Form.Item
                        label="UPI ID"
                        name="upiId"
                        rules={[{ required: true, message: 'Please enter your UPI ID' }]}
                    >
                        <Input
                            placeholder="Enter UPI ID"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                ) : null}
            </Form>
        </Modal>
    );
};

export default WithdrawModal;
