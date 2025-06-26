import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';

export const getApi = async (url: string, params?: Record<string, any>) => {

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${BASE_URL}${url}${queryString ? `?${queryString}` : ''}`;
    try {
        const response = await axios.get(fullUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            },
        });
        if (!response.data) {
            throw new Error('Network response was not ok');
        }
        const data = await response.data;
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

export const sendData = async (url: string, method: string, data: any) => {
    const fullUrl = `${BASE_URL}${url}`;

    const api = axios.create({
        baseURL: fullUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
    });

    switch (method.toLowerCase()) {
        case 'post':
            return api.post('', data)
                .then(response => response.data)
                .catch(error => {
                    console.error("Error sending data:", error);
                    throw error;
                });
        case 'put':
            return api.put('', data)
                .then(response => response.data)
                .catch(error => {
                    console.error("Error updating data:", error);
                    throw error;
                });
        case 'delete':
            return api.delete('')
                .then(response => response.data)
                .catch(error => {
                    console.error("Error deleting data:", error);
                    throw error;
                });
        default:
            throw new Error(`Unsupported method: ${method}`);
    }

}