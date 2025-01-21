// src/utils/axiosInstance.js
import axios from 'axios';
import { getAccessToken, isAccessTokenExpired, refreshAccessToken } from './auth';

const getBaseURL = () => {
    const { protocol, hostname } = window.location;
    const port = hostname === 'localhost' ? ':8000' : ''; // Use port only in development
    return `${protocol}//${hostname}${port}/api/`;
};

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.2:8000/api/', //use in production
    //baseURL: getBaseURL(), //use in development
});

axiosInstance.interceptors.request.use(
    async (config) => {
        let token = getAccessToken();

        if (token && isAccessTokenExpired(token)) {
            token = await refreshAccessToken();
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
