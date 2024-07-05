// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1', // replace with your backend URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request config:', config); // Log the request configuration
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        
        // Use a separate axios instance to avoid interceptors loop
        const response = await axios.get('/api/v1/auth/refreshToken');
        
        const { accessToken } = response.data;
        console.log('New access token received:', accessToken);
        
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Token refresh error:', err);
        localStorage.removeItem('accessToken');
        
        // Redirect to login or handle unauthenticated state
      }
    }

    console.error('Response error:', error);
    console.log('Original request:', originalRequest); // Log the original request
    return Promise.reject(error);
  }
);

export default axiosInstance;
