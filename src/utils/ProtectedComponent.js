// src/components/ProtectedRoute.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const ProtectedComponent = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    
    if (!isAuthenticated) {
        // Redirect to login if the token is invalid or expired
        return null;
    }

    // Render the protected component
    return children;
    
};

export default ProtectedComponent;
