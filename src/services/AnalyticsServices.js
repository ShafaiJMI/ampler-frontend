import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

export function AnalyticsData() {
    const [data,setData] = useState([]);
    useEffect(() => {
        const response = axiosInstance.get('/analytics/')
        .then(response => {
            setData(response.data);
            console.log("Analytics Data: ", response.data);
        })
        .catch(error => {
            console.log(error);
        });
        
    }, [setData]);
    return data;
}
