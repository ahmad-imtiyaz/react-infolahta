import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-800 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Sistem Informasi Aset Kodam IV/Diponegoro
        </h1>
        <div className="flex items-center space-x-4">
          <span>Selamat datang, {user?.name}</span>
          <span className="bg-blue-600 px-3 py-1 rounded text-sm">
            {user?.role}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
