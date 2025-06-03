// frontend/src/components/users/UserManagement.jsx

import React, { useState, useEffect, useContext } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../context/AuthContext';

const UserManagement = () => {
  const { authState } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'SalesManager', password: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authState.user.role === 'Admin') {
      fetchUsers();
    }
  }, [authState.user]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, formData);
      } else {
        await api.post('/auth/register', formData); // reuse registration
      }
      setFormData({ name: '', email: '', role: 'SalesManager', password: '' });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const onEdit = (user) => {
    setEditingId(user._id);
    setFormData({ name: user.name, email: user.email, role: user.role, password: '' });
  };

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      <form onSubmit={onSubmit} className="mb-6 space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="SalesManager">SalesManager</option>
            <option value="Salesman">Salesman</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Password {editingId ? '(leave blank to keep unchanged)' : ''}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            {...(editingId ? {} : { required: true })}
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {editingId ? 'Update User' : 'Create User'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{u.name}</td>
                <td className="px-4 py-2 border">{u.email}</td>
                <td className="px-4 py-2 border">{u.role}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => onEdit(u)}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(u._id)}
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

export default UserManagement;
