import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}


function Login({ setIsAuthenticated }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor'); // Default role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    if (role === 'doctor') {
      navigate('/');
    } else if (role === 'patient') {
      navigate('/patient-dashboard');
    } else if (role === 'medical') {
      navigate('/medical-dashboard');
    }
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform ">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Welcome Back!</h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          Please login to your account to continue.
        </p>
        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-100 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              aria-label="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none  focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              aria-label="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              aria-label="Select your role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
              <option value="medical">Medical Staff</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
