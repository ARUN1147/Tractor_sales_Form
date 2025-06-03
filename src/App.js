// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NormalSaleForm from './components/NormalSaleForm';
import ExchangeSaleForm from './components/ExchangeSaleForm';

// Protect routes that require login
const PrivateLayout = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-4 space-y-6">
        <div className="text-xl font-bold mb-8">Tractor Sales</div>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="hover:underline block">Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/normal-sale" className="hover:underline block">Normal Sale Form</Link>
          </li>
          <li className="mb-4">
            <Link to="/exchange-sale" className="hover:underline block">Exchange Sale Form</Link>
          </li>
        </ul>

        <button
          onClick={logout}
          className="mt-auto bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route element={<PrivateLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="normal-sale" element={<NormalSaleForm />} />
          <Route path="exchange-sale" element={<ExchangeSaleForm />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
