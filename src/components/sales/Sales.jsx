import React from 'react';
import { Link } from 'react-router-dom';

const Sales = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales</h1>
      <div className="space-y-3">
        <Link
          to="/sales/normal"
          className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Normal Sale Form
        </Link>
        <Link
          to="/sales/exchange"
          className="block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Exchange Sale Form
        </Link>
      </div>
    </div>
  );
};

export default Sales;
