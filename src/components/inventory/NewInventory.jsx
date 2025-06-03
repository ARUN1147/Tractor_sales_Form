// frontend/src/components/inventory/NewInventory.jsx

import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const NewInventory = () => {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({ model: '', price: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchVehicles = async () => {
    try {
      const res = await api.get('/inventory/new');
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/inventory/new/${editingId}`, formData);
      } else {
        await api.post('/inventory/new', formData);
      }
      setFormData({ model: '', price: '' });
      setEditingId(null);
      fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  const onEdit = (vehicle) => {
    setEditingId(vehicle._id);
    setFormData({ model: vehicle.model, price: vehicle.price });
  };

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await api.delete(`/inventory/new/${id}`);
        fetchVehicles();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">New Vehicle Inventory</h2>
      <form onSubmit={onSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block mb-1">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingId ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Model</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, idx) => (
              <tr key={v._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{v.model}</td>
                <td className="px-4 py-2 border">₹{v.price}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => onEdit(v)}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(v._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewInventory;
