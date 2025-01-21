// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { setTokens, startTokenRefreshTimer } from '../utils/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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
            setError('');
            navigate('/');
        } catch (err) {
            setError('Invalid credentials :' + err);
        }
    };
    return (
        <div className='flex items-center justify-center h-screen max-w-7xl mx-4 md:mx-auto'>
            <form className='grid gap-4 grid-cols-1' onSubmit={handleLogin}>
                
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='py-2 bg-indigo-600 text-white' type="submit">Login</button>
            </form>
            {error && <p className="text-gray-700 mb-4">{error}</p>}

        </div>

    );
};

export default Login;