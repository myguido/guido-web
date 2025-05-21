// src/lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.guidocare.com', // replace with your real backend URL
  withCredentials: true,
});

export default instance;
