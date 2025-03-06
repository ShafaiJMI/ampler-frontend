import React, { useContext } from "react";
import ProtectedComponent from '../utils/ProtectedComponent';
import { AuthContext } from '../context/AuthContext';
import logo from '../asset/images/ampler-logo.png';


function Header() {
    const { logout } = useContext(AuthContext);

    return(
        <div className="fixed flex flex-row block top-0 justify-between items-center w-full px-4 backdrop-blur-md bg-white/30 shadow-sm border border-gray-200 z-20">
  {/* Logo Section */}
  <div className="flex items-center">
  <img className="hidden ml-2 h-12 w-12 mx-2 my-2" src={logo} alt="Ampler Mettle Logo" />
    <span className="font-semibold text-l text-gray-800">AMPLER METTLE</span>
    
  </div>

  {/* Button Section */}
  <div>
    <button
      className="bg-indigo-600 text-white px-4 py-2 my-2 rounded hover:bg-indigo-700"
      onClick={logout}
    >
      Logout
    </button>
  </div>
</div>

    );
}

export default Header;