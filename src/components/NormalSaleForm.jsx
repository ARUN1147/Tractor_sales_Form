// frontend/src/components/sales/NormalSaleForm.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/api';

const NormalSaleForm = () => {
  // 1) formData holds all the fields (strings or booleans)
  const [formData, setFormData] = useState({
    location: '',
    deliveryDate: '',
    salesman: '',
    customerName: '',
    phoneNumber: '',
    address: '',
    vehicleModel: '',  // will be set to a valid ObjectId string
    c2cPrice: '',
    discount: '',
    downPayment: '',
    loanForm: false,
    financeCompany: '',
    mas: false,
    loanAmount: '',
    docCharge: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newVehicles, setNewVehicles] = useState([]); // list of { _id, model, price }

  // 2) On mount, fetch the list of New Vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get('/inventory/new'); // <-- adjust if your route is different
        setNewVehicles(res.data);
      } catch (err) {
        console.error('Error fetching new vehicles:', err);
        setError('Unable to load vehicle list. Refresh the page.');
      }
    };
    fetchVehicles();
  }, []);

  // 3) Handle input changes (text, number, checkbox)
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 4) When the user submits, convert numeric fields to numbers
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 5) Basic client‐side validation
    if (!formData.vehicleModel) {
      setError('Please select a Vehicle Model from the dropdown.');
      return;
    }

    // 6) Build the payload, converting strings→numbers appropriately
    const payload = {
      location: formData.location,
      deliveryDate: formData.deliveryDate,
      salesman: formData.salesman,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      vehicleModel: formData.vehicleModel,                   // ObjectId string
      c2cPrice: Number(formData.c2cPrice),
      discount: Number(formData.discount),
      downPayment: Number(formData.downPayment),
      loanForm: formData.loanForm,
      financeCompany: formData.loanForm ? formData.financeCompany : '',
      mas: formData.mas,
      loanAmount: formData.loanForm ? Number(formData.loanAmount) : 0,
      docCharge: Number(formData.docCharge)
    };

    try {
      await api.post('/sales/normal', payload);
      setSuccess('Normal sale recorded successfully.');
      setError('');
      // Optionally clear form
      setFormData({
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
        docCharge: ''
      });
    } catch (err) {
      console.error('Error submitting normal sale:', err);
      setError(err.response?.data?.message || 'Sale failed');
      setSuccess('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Normal Sale Form</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{success}</div>
      )}

      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block mb-1 font-medium">Delivery Date</label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Salesman */}
        <div>
          <label className="block mb-1 font-medium">Salesman</label>
          <input
            type="text"
            name="salesman"
            value={formData.salesman}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Customer Name */}
        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
            required
            pattern="\d*"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Vehicle Model Selection (dropdown) */}
        <div>
          <label className="block mb-1 font-medium">Vehicle Model (New)</label>
          <select
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">— Select a Vehicle —</option>
            {newVehicles.map((veh) => (
              <option key={veh._id} value={veh._id}>
                {veh.model} (₹{veh.price.toLocaleString()})
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            If you don’t see any options, make sure you have created at least one NewVehicle in the database.
          </p>
        </div>

        {/* C2C Price */}
        <div>
          <label className="block mb-1 font-medium">C2C Price (₹)</label>
          <input
            type="number"
            name="c2cPrice"
            value={formData.c2cPrice}
            onChange={onChange}
            required
            min="0"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block mb-1 font-medium">Discount (₹)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={onChange}
            required
            min="0"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Down Payment */}
        <div>
          <label className="block mb-1 font-medium">Down Payment (₹)</label>
          <input
            type="number"
            name="downPayment"
            value={formData.downPayment}
            onChange={onChange}
            required
            min="0"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Loan Form?  &  MAS? */}
        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="loanForm"
              checked={formData.loanForm}
              onChange={onChange}
              className="mr-2"
            />
            Loan Form?
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="mas"
              checked={formData.mas}
              onChange={onChange}
              className="mr-2"
            />
            MAS?
          </label>
        </div>

        {/* If loanForm is checked, show Finance Company & Loan Amount */}
        {formData.loanForm && (
          <>
            <div>
              <label className="block mb-1 font-medium">Finance Company</label>
              <input
                type="text"
                name="financeCompany"
                value={formData.financeCompany}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Loan Amount (₹)</label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={onChange}
                required
                min="0"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </>
        )}

        {/* Doc Charge */}
        <div>
          <label className="block mb-1 font-medium">Doc Charge (₹)</label>
          <input
            type="number"
            name="docCharge"
            value={formData.docCharge}
            onChange={onChange}
            required
            min="0"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Normal Sale
        </button>
      </form>
    </div>
  );
};

export default NormalSaleForm;
