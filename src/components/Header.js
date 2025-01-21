import React from "react";
import { useEffect } from "react";
import { clearTokens } from "../utils/auth";
import { useNavigate } from "react-router-dom";


function Header() {
    const navigate = useNavigate();
    const handleLogout = () =>  {
        clearTokens();
        navigate("/login");
    return null;
    }
    
    return(
        <div className="flex fixed top-0 left-0">
            <div className="left-0"><img className src="" alt=""/></div>
            <div className="right-0">
                <button className="bg-indigo-600 text-white" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Header;