import axios from 'axios';
import store from '../store/configureStore';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
});

// Add an interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = store.getState().accountState.user?.token;

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;