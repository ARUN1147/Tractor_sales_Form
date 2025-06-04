// src/components/NormalSaleForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/api'; // Adjust the path accordingly

const NormalSaleForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    deliveryDate: '',
    salesman: '',
    customerName: '',
    phoneNumber: '',
    address: '',
    vehicleModel: '',
    c2cPrice: '',
    discount: '',
    downPayment: '',
    loanForm: false,
    financeCompany: '',
    mas: false,
    loanAmount: '',
    docCharge: '',
  });

  const [vehicleModels, setVehicleModels] = useState([]);
  const [newVehicle, setNewVehicle] = useState({ model: '', price: '' });

  // Fetch vehicle models on load
  useEffect(() => {
    async function fetchVehicleModels() {
      try {
        const res = await api.get('/vehicles/models'); // Adjust API endpoint if necessary
        setVehicleModels(res.data);
      } catch (error) {
        console.error('Failed to fetch vehicle models', error);
      }
    }

    fetchVehicleModels();
  }, []);

  // Handle input changes
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const onVehicleChange = (e) => {
    setNewVehicle({
      ...newVehicle,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    if (newVehicle.model && newVehicle.price) {
      try {
        const response = await api.post('/vehicles/models', newVehicle);
        setVehicleModels([...vehicleModels, response.data.vehicle]);
        setNewVehicle({ model: '', price: '' });
        alert('Vehicle model added successfully');
      } catch (error) {
        alert('Failed to add vehicle model');
      }
    } else {
      alert('Please fill all fields');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sales/normal', formData);
      alert('Normal Sale recorded successfully');
    } catch (error) {
      alert('Error recording sale');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#3ab7bf] to-[#1e90ff] flex items-center justify-center px-4 py-8">
      <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Normal Sale Form</h2>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
            placeholder="Location"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            name="salesman"
            value={formData.salesman}
            onChange={onChange}
            placeholder="Salesman"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={onChange}
            placeholder="Customer Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
            placeholder="Phone Number"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Address"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Vehicle Model</option>
            {vehicleModels.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.model} - ₹{vehicle.price}
              </option>
            ))}
          </select>
        </div>

        {/* Add New Vehicle Model */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Add New Vehicle Model</h3>
          <input
            type="text"
            name="model"
            value={newVehicle.model}
            onChange={onVehicleChange}
            placeholder="Model Name"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="number"
            name="price"
            value={newVehicle.price}
            onChange={onVehicleChange}
            placeholder="Price"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="button"
            onClick={handleAddVehicle}
            className="w-full bg-teal-600 text-white py-2 mt-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400"
          >
            Add Vehicle Model
          </button>
        </div>

        {/* Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="number"
            name="c2cPrice"
            value={formData.c2cPrice}
            onChange={onChange}
            placeholder="C2C Price"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={onChange}
            placeholder="Discount"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="number"
            name="downPayment"
            value={formData.downPayment}
            onChange={onChange}
            placeholder="Down Payment"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Loan Info */}
        <div className="grid grid-cols-1 gap-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="loanForm"
              checked={formData.loanForm}
              onChange={onChange}
              className="text-teal-500"
            />
            <span className="text-gray-700">Loan Form</span>
          </label>

          {formData.loanForm && (
            <>
              <input
                type="text"
                name="financeCompany"
                value={formData.financeCompany}
                onChange={onChange}
                placeholder="Finance Company"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={onChange}
                placeholder="Loan Amount"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </>
          )}

          <input
            type="number"
            name="docCharge"
            value={formData.docCharge}
            onChange={onChange}
            placeholder="Document Charge"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-400"
        >
          Submit Normal Sale
        </button>
      </form>
    </div>
  );
};

export default NormalSaleForm;
