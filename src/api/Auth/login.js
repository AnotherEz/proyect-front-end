// authService.js
import axios from './apiConfig';

export const loginWithGoogle = (token) => {
  return axios.post('/auth/google', { token });
};
