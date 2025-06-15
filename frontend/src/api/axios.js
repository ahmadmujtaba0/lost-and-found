import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Change if backend runs on a different port
  withCredentials: true, // If using cookies
});

export default API;
