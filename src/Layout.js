import React from 'react';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import NavBar from './components/NavBar';
import ProtectedComponent from './utils/ProtectedComponent';

function Layout(){
    return(
        <>
         <ProtectedComponent><Header /></ProtectedComponent>
        <div className='my-20'>
        <Outlet />
        </div>
        <ProtectedComponent><NavBar /></ProtectedComponent>
        
        </>
    );
}


export default Layout;