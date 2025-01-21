// src/utils/auth.js
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

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
    if (!refreshToken) return null;

    try {
        const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
            refresh: refreshToken,
        });
        setTokens(response.data.access, refreshToken);
        return response.data.access;
    } catch (err) {
        clearTokens(); // Clear tokens if refresh fails
        return null;
    }
};

export const startTokenRefreshTimer = () => {
    const token = getAccessToken();
    if (!token) return;

    const decoded = jwtDecode(token);
    const expirationTime = decoded.exp * 1000 - Date.now() - 5000; // Refresh 5 seconds before expiry

    setTimeout(async () => {
        await refreshAccessToken();
        startTokenRefreshTimer(); // Restart timer
    }, expirationTime);
};