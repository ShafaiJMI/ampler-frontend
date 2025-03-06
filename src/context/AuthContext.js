import React, { createContext, useState, useEffect } from 'react';
import { getAccessToken, isAccessTokenExpired, startTokenRefreshTimer, refreshAccessToken, clearTokens } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Handle loading state for async operations

  const checkAuthentication = async () => {
    const token = getAccessToken();
    if (token && !isAccessTokenExpired(token)) {
      setIsAuthenticated(true);
      startTokenRefreshTimer();
      setLoading(false);
    } else if (token && isAccessTokenExpired(token)) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        setIsAuthenticated(true);
        startTokenRefreshTimer();
      } else {
        setIsAuthenticated(false);
        clearTokens();
      }
      setLoading(false);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
