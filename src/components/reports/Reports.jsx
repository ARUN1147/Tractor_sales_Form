import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const Reports = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await api.get('/sales');
        setSales(res.data);
      } catch (err) {
        setError('Failed to load sales data');
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{sale.customerName}</td>
              <td className="px-4 py-2">{sale.type}</td>
              <td className="px-4 py-2">
                {new Date(sale.saleDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">₹ {sale.totalAmount}</td>
            </tr>
          ))}
          {sales.length === 0 && (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                No sales found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
