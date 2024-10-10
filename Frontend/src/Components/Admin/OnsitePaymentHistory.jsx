import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Shared/Layout';
import eye from '../../assets/icons/eye.svg';

import OnsitePaymentBillModal from './../../Model/OnsitePaymentBillModel';

const ONsitePaymentHistory = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('Onsite Order');
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:3229/api/onsitepayment`);
            setAllOrders(response.data);
        } catch (error) {
            console.error('Error fetching parcel orders:', error.message);
        }
    };

    const normalizePaymentType = (paymentType) => {
        return paymentType ? paymentType.trim().toLowerCase() : 'unknown';
    };

    const openModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrderId(null);
    };

    const renderOrdersTable = () => (
        <table className="min-w-full mb-8 border-separate border-spacing-y-2 bg-secondary">
            <thead>
                <tr className="bg-secondary text-center">
                    <th className="py-2 border-b px-4 text-white">Customer Name</th>
                    <th className="py-2 border-b px-4 text-white">Customer Phone</th>
                    <th className="py-2 px-4 border-b text-white">Items Name</th>
                    <th className="py-2 px-4 border-b text-white">Quantity</th>
                    <th className="py-2 border-b px-4 text-green-400 rounded-xl bg-accent text-center font-semibold text-xl">Total Bill</th>
                    <th className="py-2 border-b px-4 text-white">Payment Type</th>
                    <th className="py-2 border-b px-4 text-white">Action</th>
                </tr>
            </thead>
            <tbody>
                {allOrders.map(order => (
                    <tr key={order._id} className="hover:bg-accent rounded-lg items-center text-center transition-all duration-200">
                        <td className="py-2 border-b px-4 text-white">{order.customerName}</td>
                        <td className="py-2 border-b px-4 text-white">{order.customerPhone}</td>
                        <td className="py-2 px-4 border-b text-white">{order.items.map(item => item.name).join(', ')}</td>
                        <td className="py-2 px-4 border-b text-white">{order.items.reduce((total, item) => total + item.quantity, 0)} G.M</td>
                        <td className="py-2 border-b px-4 text-green-400 rounded-xl bg-accent text-center font-semibold text-xl">{order.totalBill}</td>
                        <td className="py-2 border-b px-4 text-white">
                            {normalizePaymentType(order.PaymentType) === 'cash' ? 'Cash' :
                             normalizePaymentType(order.PaymentType) === 'card' ? 'Card' :
                             normalizePaymentType(order.PaymentType) === 'online' ? 'Online' : 'Unknown'}
                        </td>
                        <td className="py-2 border-b px-4 text-white flex justify-center">
                            <button
                                className="shadow-lg rounded-md bg-accent w-8 h-8 flex items-center justify-center"
                                onClick={() => openModal(order._id)}
                                title="View Order Details"
                            >
                                <img src={eye} alt="View" className="w-7 h-7 bg-zinc-200 rounded-lg hover:bg-[#FFB238]" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <Layout>
            <div className="container mx-auto p-4 bg-secondary">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-white bg-secondary bg-gradient-to-r from-yellow-500 to-blue-500 p-4 rounded-lg shadow-lg flex items-center space-x-4 justify-between w-full">
                        <p className="font-semibold text-2xl">Payment Details</p>
                        <div className="flex space-x-4">
                            <p className="text-center text-xl">Total Customers: <span className="text-green-500 text-2xl font-bold">{allOrders.length}</span></p>
                            <p className="text-center text-xl">Total Bill: <span className="text-green-500 text-2xl font-bold">{allOrders.reduce((total, order) => total + order.totalBill, 0)}</span></p>
                        </div>
                    </div>
                    <div className="text-white bg-secondary p-4 rounded-lg shadow-lg pt-8">
                        <select className="text-white p-2 rounded-md bg-accent text-center text-lg">
                            <option value="month">Month</option>
                            <option value="week">Week</option>
                            <option value="day">Day</option>
                            <option value="custom">Custom Date</option>
                        </select>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-[#FFB238]">{activeTab}</h2>
                {renderOrdersTable()}
                <OnsitePaymentBillModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    orderId={selectedOrderId}
                />
            </div>
        </Layout>
    );
};

export default ONsitePaymentHistory;
