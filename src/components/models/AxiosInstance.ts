import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Define the base URL for your Django backend
const BASE_URL = import.meta.env.VITE_API_URL as string;
console.log('BASE_URL:', BASE_URL);
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
export const getAccessToken = (): string | null => {
  return import.meta.env.VITE_ACCESS_TOKEN as string || localStorage.getItem('access_token');
};

// Function to get the refresh token from localStorage


// Function to refresh the access token


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
      const newAccessToken = await getAccessToken();
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
      const newAccessToken = await getAccessToken();
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