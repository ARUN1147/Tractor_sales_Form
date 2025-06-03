// frontend/src/components/notifications/NotificationBell.jsx

import React, { useContext, useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/outline';
import api from '../../api/api';
import { AuthContext } from '../../context/AuthContext';

const NotificationBell = () => {
  const { authState } = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchAdminAlerts = async () => {
    if (authState.user.role === 'Admin') {
      try {
        const res = await api.get('/notifications/admin');
        setAlerts(res.data);
      } catch (err) {
        console.error('Error fetching admin alerts', err);
      }
    }
  };

  useEffect(() => {
    fetchAdminAlerts();
    // Poll every minute for new alerts
    const interval = setInterval(fetchAdminAlerts, 60 * 1000);
    return () => clearInterval(interval);
  }, [authState.user]);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-1 rounded-full hover:bg-gray-200 transition"
      >
        <BellIcon className="h-6 w-6 text-gray-600" />
        {alerts.length > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
        )}
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-10">
          <div className="p-2 font-semibold border-b">Notifications</div>
          {alerts.length === 0 && (
            <div className="px-4 py-2 text-gray-500">No notifications</div>
          )}
          {alerts.map((alert) => (
            <div key={alert.id} className="px-4 py-2 hover:bg-gray-100">
              <div className="text-sm font-medium">{alert.title || 'Payment Due'}</div>
              <div className="text-xs text-gray-600">{alert.body || alert.message}</div>
              <div className="text-xs text-gray-400">{new Date(alert.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
