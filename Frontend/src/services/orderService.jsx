import axios from 'axios';

const API_URL = '/api/orders';

export const getOrders = () => {
    return axios.get(API_URL);
};

export const createOrder = (order) => {
    return axios.post(API_URL, order);
};

export const updateOrderStatus = (id, status) => {
    return axios.put(`${API_URL}/${id}`, { status });
};

export const deleteOrder = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
