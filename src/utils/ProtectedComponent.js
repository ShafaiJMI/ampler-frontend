// src/components/ProtectedRoute.js
import React from 'react';
import { getAccessToken, isAccessTokenExpired } from '../utils/auth';

const ProtectedComponent = ({ children }) => {
    const token = getAccessToken();

    if (!token || isAccessTokenExpired(token)) {
        // Redirect to login if the token is invalid or expired
        return <></>;
    }

    // Render the protected component
    return children;
};

export default ProtectedComponent;
