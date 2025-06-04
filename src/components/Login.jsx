// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-cyan-500 to-blue-500">
      {/* Left side: Welcome text */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-10 text-white space-y-6">
        <h1 className="text-5xl font-bold">Welcome Back</h1>
        <p className="text-lg max-w-md text-center">
          Log in to access your dashboard and manage tractor sales easily.
        </p>
      </div>

      {/* Right side: Login form */}
      <div className="md:w-1/2 bg-white rounded-l-3xl shadow-lg flex flex-col justify-center items-center p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Log In</h2>
          {error && <div className="text-red-600 mb-4 font-medium text-center">{error}</div>}

          <label htmlFor="email" className="block text-gray-600 mb-2 font-medium">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mario@gmail.com"
            required
            className="w-full px-5 py-3 mb-6 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
          />

          <label htmlFor="password" className="block text-gray-600 mb-2 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            className="w-full px-5 py-3 mb-4 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
          />

          <div className="flex justify-end mb-6">
            <a href="#" className="text-cyan-600 font-medium hover:underline">
              Forgot?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-600 text-white rounded-full font-semibold text-lg hover:bg-cyan-700 transition"
          >
            Log in
          </button>

          <p className="mt-8 text-center text-gray-500">
            Or log in with
          </p>

          <div className="flex justify-center mt-4 space-x-4">
            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              {/* Facebook Icon */}
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.99 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.99 22 12z"/></svg>
            </button>
            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              {/* Google Icon */}
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M21.805 10.023h-9.666v3.964h5.534c-.238 1.441-1.352 4.234-5.534 4.234-3.337 0-6.063-2.76-6.063-6.163s2.726-6.163 6.063-6.163c1.896 0 3.165.81 3.9 1.5l2.658-2.556c-1.69-1.57-3.852-2.57-6.557-2.57-5.472 0-9.916 4.546-9.916 10.136s4.444 10.136 9.916 10.136c5.72 0 9.523-4.015 9.523-9.684 0-.655-.073-1.152-.152-1.412z"/></svg>
            </button>
            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              {/* Apple Icon */}
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c.873 1.034.738 2.605-.19 3.72-1.154 1.528-3.122 2.41-4.96 2.064-.1-1.46.94-2.94 2.128-3.78 1.06-.753 2.466-.985 3.022-.004zm-3.84 4.5c-3.053.222-5.434 3.1-5.2 6.606.284 4.34 3.64 7.535 6.73 7.346 3.053-.222 5.43-3.1 5.2-6.605-.286-4.345-3.635-7.536-6.73-7.347z"/></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
