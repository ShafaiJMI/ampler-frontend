// src/utils/auth.js
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import axiosInstance from "./axiosInstance";

export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
};

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

export const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const isAccessTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();  // Expiration check
};

export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
   
    const auth_url = `${process.env.REACT_APP_API_BASE_URL}auth/token/refresh/`;
    if (!refreshToken) return null;
    try {
        const response = await axios.post(auth_url, {
            refresh: refreshToken,
        });
        setTokens(response.data.access, response.data.refresh);
        return response.data.access;
    } catch (err) {
        clearTokens(); // Clear tokens if refresh fails
        return null;
    }
};

export const startTokenRefreshTimer = () => {
    const token = getAccessToken();
    if (!token || isAccessTokenExpired(token)) {
        return; // Don't start the timer if the token is invalid
    }
    const decoded = jwtDecode(token);
    const expirationTime = decoded.exp * 1000 - Date.now() - 5000; // Refresh 5 seconds before expiry
    if (expirationTime > 0) {
        setTimeout(async () => {
            const newToken = await refreshAccessToken();
            if (newToken) {
                startTokenRefreshTimer(); // Restart timer with new token
            } else {
                clearTokens();
                window.location.href = '/login'; // Redirect to login if refresh fails
            }
        }, expirationTime);
    } else {
        clearTokens();
        window.location.href = '/login'; // Redirect to login if token is already expired
    }
};