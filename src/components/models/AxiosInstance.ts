import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Define the base URL for your Django backend
const BASE_URL = 'https://yaah-v2-backend.onrender.com/';
const REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes (adjust based on token expiry time)
// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Function to get the access token from localStorage
const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// Function to get the refresh token from localStorage
const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh_token');
};

// Function to refresh the access token
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${BASE_URL}/token/refresh/`, { refresh: refreshToken });
    const { access } = response.data;
    localStorage.setItem('access_token', access); // Store the new access token
    return access;
  } catch (error) {
    console.error('Failed to refresh token:', error);

    // Handle specific error cases
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error('Refresh token is invalid or expired');
      } else if (error.code === 'ECONNABORTED') {
        console.error('Request timed out');
      } else {
        console.error('Network error:', error.message);
      }
    }

    // Clear tokens and redirect to login
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login'; // Redirect to login page
    return null;
  }
};

// Add a request interceptor to attach the access token to every request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Check if the error is due to an expired token (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      // Refresh the access token
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Update the Authorization header with the new access token
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      }
    }

    // If the error is not due to token expiration, reject the promise
    return Promise.reject(error);
  }
);

export const startTokenRefresh = () => {
  setInterval(async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken && refreshToken) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        console.log('Access token refreshed');
      }
    }
  }, REFRESH_INTERVAL);
};

// Function to check if the user is authorized
export const isAuthorized = (): boolean => {
  return !!getAccessToken();
};

// Function to logout the user
export const logout = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login'; // Redirect to login page
};

export default axiosInstance;