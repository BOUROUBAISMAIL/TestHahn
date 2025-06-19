import axios from 'axios';

export const createApiClient = (baseURL = 'http://localhost:8081') => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor to include token
  client.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor to handle errors
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      }
      return Promise.reject(error);
    }
  );

  const post = async (endpoint, data) => {
    try {
      const response = await client.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const get = async (endpoint) => {
    try {
      const response = await client.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  return {
    post,
    get
  };
}; 