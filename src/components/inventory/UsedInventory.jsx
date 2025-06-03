// frontend/src/components/inventory/UsedInventory.jsx

import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const UsedInventory = () => {
  const [vehicles, setVehicles] = useState([]);
  const initialForm = {
    make: '',
    model: '',
    customerName: '',
    address: { flatNo: '', street: '', district: '', city: '', state: '' },
    phoneNumber: '',
    priceTaken: ''
  };
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const fetchVehicles = async () => {
    try {
      const res = await api.get('/inventory/used');
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (['flatNo', 'street', 'district', 'city', 'state'].includes(name)) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/inventory/used/${editingId}`, formData);
      } else {
        await api.post('/inventory/used', formData);
      }
      setFormData(initialForm);
      setEditingId(null);
      fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  const onEdit = (vehicle) => {
    setEditingId(vehicle._id);
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      customerName: vehicle.customerName,
      address: vehicle.address,
      phoneNumber: vehicle.phoneNumber,
      priceTaken: vehicle.priceTaken
    });
  };

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await api.delete(`/inventory/used/${id}`);
        fetchVehicles();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Used Vehicle Inventory</h2>
      <form onSubmit={onSubmit} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Make</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
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
        </div>
        <div>
          <label className="block mb-1">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Flat No</label>
            <input
              type="text"
              name="flatNo"
              value={formData.address.flatNo}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1">Street</label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">District</label>
            <input
              type="text"
              name="district"
              value={formData.address.district}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Price Taken</label>
          <input
            type="number"
            name="priceTaken"
            value={formData.priceTaken}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingId ? 'Update Record' : 'Add Record'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Make</th>
              <th className="px-4 py-2 border">Model</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Price Taken</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, idx) => (
              <tr key={v._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{v.make}</td>
                <td className="px-4 py-2 border">{v.model}</td>
                <td className="px-4 py-2 border">{v.customerName}</td>
                <td className="px-4 py-2 border">₹{v.priceTaken}</td>
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

export default UsedInventory;
