import axios from 'axios';
const API_BASE_URL = 'https://assessverse.onrender.com';
// This automatically checks if you're running locally or on a hosted server
                // Your local URL

const API = axios.create({
  baseURL: API_BASE_URL,
});

// OPTIONAL: Add an "Interceptor" to attach the token automatically
// This saves you from writing { headers: { Authorization: ... } } in every file!
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;