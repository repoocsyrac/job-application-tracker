import axios from 'axios';
import { auth } from '../firebase';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // TO_DO: use env variable
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;