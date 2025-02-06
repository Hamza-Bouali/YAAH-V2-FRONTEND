import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/models/AxiosInstance';
interface LoginForm {
  username: string;
  password: string;
}

function Login({setIsAuthenticated}: {setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean> | undefined | null>}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/api/login/', formData);
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200 disabled:bg-blue-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 font-medium hover:underline" onClick={() => navigate('/register')}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
