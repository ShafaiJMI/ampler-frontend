// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { setTokens, startTokenRefreshTimer } from '../utils/auth';
import { AuthContext } from '../context/AuthContext';
import PopMessage from '../components/PopMessage';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [error, setError] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('auth/token/', {
                username,
                password,
            });
            setTokens(response.data.access, response.data.refresh);
            startTokenRefreshTimer();
            setIsAuthenticated(true);
            setError('');
            navigate(from, { replace: true });
        } catch (err) {
            setError('Invalid credentials :' + err);
        }
    };
    return (
        <div className='flex items-center justify-center min-h-screen max-w-md mx-4 md:mx-auto overflow-hidden'>
            <div className='bg-white shadow-md p-8 rounded-md '>
                <h4 className='text-center my-2 text-md font-semiold'>Login To Dashoard</h4>
            <form className='grid gap-4 grid-cols-1' onSubmit={handleLogin}>
                
                <input
                    type="text"
                    className='rounded-md w-full'
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className='rounded-md w-full'
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='py-2 bg-indigo-600 rounded-md text-white' type="submit">Login</button>
                <p>Need help? <a href='#'>Click Here</a></p>
            </form>

            {error && <PopMessage
          message={error}
          type="error" // Change to 'error' for error messages
          duration={5000} // Optional: Adjust the duration (default is 3000ms)
        /> }
            </div>

        </div>

    );
};

export default Login;