import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Header from './components/Header';
import NavBar from './components/NavBar';

function Layout(){
    return(
        <>
        <Header />
        <Outlet />
        <NavBar />
        </>
    );
}


export default Layout;