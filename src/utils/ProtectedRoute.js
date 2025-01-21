// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, isAccessTokenExpired } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
    const token = getAccessToken();

    if (!token || isAccessTokenExpired(token)) {
        // Redirect to login if the token is invalid or expired
        return <Navigate to="/login" />;
    }

    // Render the protected component
    return children;
};

export default ProtectedRoute;
