
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export const register = (userData) => axios.post('/register', userData);
export const login = (credentials) => axios.post('/login', credentials);
export const getUser = (token) => axios.get('/user', { headers: { Authorization: `Bearer ${token}` } });
export const logout = (token) => axios.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });

