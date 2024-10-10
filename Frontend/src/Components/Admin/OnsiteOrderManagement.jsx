import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Shared/Layout'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import eye from '../../assets/icons/eye.svg'; 
import OnsitePaymentBillModal from '../../Model/OnsitePaymentBillModel';

const OnsiteOrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('Request For Payment');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:3229/api/onsiteorder`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching onsite orders:', error.message);
            console.log("onsiteOrdererror")
        }
    };

    const updateOrderStatus = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:3229/api/onsiteorder/${id}`, { status });
            const updatedOrder = response.data;
            setOrders(orders.map(order => order._id === id ? updatedOrder : order));
        } catch (error) {
            console.error('Error updating order status:', error.message);
        }
    };

    const handleConfirmAction = (order) => {
        const newStatus = activeTab === 'Request For Payment' ? 'In Progress' : 'Delivered';
        const confirmed = window.confirm(`Are you sure you want to mark this order as ${newStatus}?`);
        if (confirmed) {
            updateOrderStatus(order._id, newStatus);
        }
    };

    const renderOrdersTable = (status) => (
        <table className="min-w-full mb-8 border-separate border-spacing-y-2 bg-secondary">
            <thead>
                <tr className="bg-secondary text-center">
                    <th className="py-2 border-b px-4    bg-gradient-to-r from-yellow-500 to-blue-500 shadow-lg rounded-md text-black">Customer Name</th>
                    <th className="py-2 border-b px-4    bg-gradient-to-r from-yellow-500 to-blue-500 shadow-lg rounded-md text-black">Items Name</th>
                    <th className="py-2 border-b px-4    bg-gradient-to-r from-yellow-500 to-blue-500 shadow-lg rounded-md text-black">Date</th>
                    <th className="py-2 border-b px-4    bg-gradient-to-r from-yellow-500 to-blue-500 shadow-lg rounded-md text-black">Time</th>
                    <th className="py-2 border-b px-4    bg-gradient-to-r from-yellow-500 to-blue-500 shadow-lg rounded-md text-black">Customer Phone</th>
                    <th className="py-2 border-b px-4    bg-gradient-to-r from-yellow-500 to-blue-500 shadow-lg rounded-md text-black">Total Bill</th>
                    {status !== 'Delivered' && <th className="py-2 border-b px-4    bg-gradient-to-r from-yellow-500 to-blue-500 shadow-lg rounded-md text-black">Action</th>}
                </tr>
            </thead>
            <tbody>
                {orders.filter(order => order.status === status).map(order => (
                    <tr key={order._id} className="hover:bg-accent rounded-lg items-center text-center">
                        <td className="py-2 border-b px-4 text-white">{order.customerName}</td>
                        <td className="py-2 px-4 border-b text-white">{order.items.map(item => item.name).join(', ')}</td>
                        <td className="py-2 border-b px-4 text-white">{order.date}</td>
                        <td className="py-2 border-b px-4 text-white">{order.time}</td>
                        <td className="py-2 border-b px-4 text-white">{order.customerPhone}</td>
                        <td className="py-2 border-b px-4 text-green-400 rounded-xl bg-accent text-center font-semibold text-xl">{order.totalBill}</td>
                        {status === 'Request For Payment' && (
                            <td className="p-2 border-b flex items-center justify-center">
                                <button
                                    className="text-green-500  mr-2 shadow-lg rounded-md bg-accent w-8 h-8 flex items-center justify-center"
                                    onClick={() => handleConfirmAction(order)}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700 shadow-lg rounded-md bg-accent w-8 h-8 flex items-center justify-center"
                                    onClick={() => console.log('Action to delete or reject order')}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </td>
                        )}
                        {status === 'In Progress' && (
                            <td className="p-2 border-b flex justify-center">
                                <button
                                    className="text-blue-500 hover:text-blue-700 mr-2 shadow-lg rounded-md bg-accent w-8 h-8 flex items-center justify-center"
                                    onClick={() => console.log('View order details')}
                                >
                                    <img src={eye} alt="View" className="w-5 h-5 bg-zinc-200 rounded-lg hover:bg-[#FFB238]" />
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <Layout>
            <div className="container mx-auto p-4 bg-secondary">
                <div className="flex space-x-4 mb-4">
                    {['Request For Payment', 'In Progress', 'Delivered'].map(tab => (
                        <button
                            key={tab}
                            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-[#FFB238] font-semibold text-black text-xl' : 'bg-accent text-white'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-[#FFB238]">{activeTab}</h2>
                {renderOrdersTable(activeTab)}
            </div>
        </Layout>
    );
};

export default OnsiteOrderManagement;
