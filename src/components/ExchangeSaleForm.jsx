import React, { useState, useEffect } from 'react';
import api from '../api/api'; // Make sure this path is correct

const ExchangeSaleForm = () => {
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

    // Used vehicle details
    make: '',
    modelUsed: '',
    customerNameUsed: '',
    addressUsed: '',
    phoneNumberUsed: '',
    priceTaken: ''
  });

  const [newVehicles, setNewVehicles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchNewVehicles() {
      try {
        const res = await api.get('/vehicles/new');  // Adjust API endpoint as needed
        setNewVehicles(res.data);
      } catch (error) {
        console.error('Failed to fetch new vehicles', error);
      }
    }
    fetchNewVehicles();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sales/exchange', formData);
      setSuccess('Exchange sale recorded successfully.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Server error creating exchange sale');
      setSuccess('');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Exchange Sale Form</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{success}</div>}
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded shadow">

        {/* Location */}
        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block mb-1">Delivery Date</label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Salesman */}
        <div>
          <label className="block mb-1">Salesman</label>
          <input
            type="text"
            name="salesman"
            value={formData.salesman}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Customer Name */}
        <div>
          <label className="block mb-1">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1">Address (Flat No, Street, District, City, State)</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Vehicle Model (New) */}
        <div>
          <label className="block mb-1">Vehicle Model (New)</label>
          <select
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">-- Select Vehicle --</option>
            {newVehicles.map(vehicle => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.model} - ₹{vehicle.price}
              </option>
            ))}
          </select>
        </div>

        {/* C2C Price */}
        <div>
          <label className="block mb-1">C2C Price (₹)</label>
          <input
            type="number"
            name="c2cPrice"
            value={formData.c2cPrice}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block mb-1">Discount (₹)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Down Payment */}
        <div>
          <label className="block mb-1">Down Payment (₹)</label>
          <input
            type="number"
            name="downPayment"
            value={formData.downPayment}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Loan Form and MAS */}
        <div className="flex items-center space-x-6">
          <label>
            <input
              type="checkbox"
              name="loanForm"
              checked={formData.loanForm}
              onChange={onChange}
              className="mr-2"
            />
            Loan Form?
          </label>
          <label>
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

        {/* Finance Company */}
        {formData.loanForm && (
          <div>
            <label className="block mb-1">Finance Company</label>
            <input
              type="text"
              name="financeCompany"
              value={formData.financeCompany}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}

        {/* Loan Amount */}
        {formData.loanForm && (
          <div>
            <label className="block mb-1">Loan Amount (₹)</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}

        {/* Document Charge */}
        <div>
          <label className="block mb-1">Document Charge (₹)</label>
          <input
            type="number"
            name="docCharge"
            value={formData.docCharge}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Used Vehicle Details Section */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Used Vehicle Details</h2>

        <div>
          <label className="block mb-1">Make</label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Model</label>
          <input
            type="text"
            name="modelUsed"
            value={formData.modelUsed}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Customer Name</label>
          <input
            type="text"
            name="customerNameUsed"
            value={formData.customerNameUsed}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            name="addressUsed"
            value={formData.addressUsed}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumberUsed"
            value={formData.phoneNumberUsed}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Price Taken (₹)</label>
          <input
            type="number"
            name="priceTaken"
            value={formData.priceTaken}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Submit Exchange Sale
        </button>
      </form>
    </div>
  );
};

export default ExchangeSaleForm;
