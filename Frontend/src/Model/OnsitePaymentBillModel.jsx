import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const OnsitePaymentBillModal = ({ isOpen, onClose, orderId }) => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchOrderDetails(); 
        }
    }, [isOpen, orderId]);

    const fetchOrderDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3229/api/onsitepayment/${orderId}`);
            setOrderDetails(response.data);
        } catch (error) {
            setError('Error fetching order details');
            console.error('Error fetching order details:', error.response || error.message);
        } finally {
            setLoading(false);
        }

    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-3/4 max-w-lg shadow-lg">
                <button className="float-right text-xl font-bold" onClick={onClose}>X</button>
                <h2 className="text-2xl font-bold mb-4 text-center">Parcel Payment Bill</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : orderDetails ? (
                    <div className='text-lg'>
                        <div className="mb-4">
                            <p className="font-bold">Name: <span className="font-normal">{orderDetails.customerName}</span></p>
                            <p className="font-bold">Time: <span className="font-normal">{orderDetails.time}</span></p>
                            <p className="font-bold">Customer: <span className="font-normal">{orderDetails.customerPhone}</span></p>
                            <p className="font-bold">Payment: <span className="font-normal">{orderDetails.paymentType}</span></p>
                            <p className="font-bold">Bill No: <span className="font-normal">{orderDetails.billNo}</span></p>
                            <p className="font-bold">Date: <span className="font-normal">{orderDetails.date}</span></p>
                        </div>
                        <table className="w-full mb-4">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left">Item Names</th>
                                    <th className="text-right">Qty</th>
                                    <th className="text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.items.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td>{item.name}</td>
                                        <td className="text-right">{item.quantity}</td>
                                        <td className="text-right">{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mb-2">
                            <p className="font-bold">SGST 2.5%: <span className="font-normal">{orderDetails.sgst}</span></p>
                            <p className="font-bold">CGST 2.5%: <span className="font-normal">{orderDetails.cgst}</span></p>
                        </div>
                        <div className="font-bold text-right">
                            <p>Total Amount: {orderDetails.totalAmount}</p>
                            <p>Grand Total Amount: {orderDetails.grandTotalAmount}</p>
                        </div>
                    </div>
                ) : (
                    <p>No order details found.</p>
                )}
            </div>
        </div>
    );
};



OnsitePaymentBillModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    orderId: PropTypes.string
};

export default OnsitePaymentBillModal;
