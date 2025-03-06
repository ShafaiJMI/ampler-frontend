// src/utils/axiosInstance.js
import React, {useContext} from 'react';
import axios from 'axios';
import { getAccessToken, clearTokens, isAccessTokenExpired, startTokenRefreshTimer, refreshAccessToken } from './auth';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const axiosInstance = axios.create({
    baseURL: `${apiBaseUrl}`,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        let token = getAccessToken();
        if (token && isAccessTokenExpired(token)) {
            token = await refreshAccessToken();
            startTokenRefreshTimer();
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

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        clearTokens();
        window.location.href = '/login'; // Redirect to login if unauthorized
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;
