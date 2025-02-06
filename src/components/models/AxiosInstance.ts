import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Define the base URL for your Django backend
const BASE_URL = localStorage.getItem('VITE_API_URL') as string;
console.log('BASE_URL:', BASE_URL);
=// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Function to get the access token from localStorage




// Add a request interceptor to attach the access token to every request
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  response => response,
  error => {
      if (error.response?.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token'); // Even though not used
          window.location.href = '/login';  // Redirect to login page
      }
      return Promise.reject(error);
  }
);


export default axiosInstance;