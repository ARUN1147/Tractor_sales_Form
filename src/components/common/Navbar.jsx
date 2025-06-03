import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 border-b">
      <h1 className="text-xl font-bold text-blue-600">TractorSales</h1>
      <div className="flex items-center space-x-4">
        {/* If user is logged in, show their name and a logout button */}
        {user && (
          <>
            <span className="text-gray-700">{user.name} ({user.role})</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
