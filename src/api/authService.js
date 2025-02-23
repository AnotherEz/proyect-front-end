import api from './apiConfig'; // Importa la configuración de la base URL

// Registrar un nuevo usuario
export const register = (userData) => api.post('/register', userData);

// Hacer login con email y contraseña
export const login = (credentials) => api.post('/login', credentials);

// Obtener datos del usuario autenticado
export const getUser = (token) => api.get('/user', { headers: { Authorization: `Bearer ${token}` } });

// Cerrar sesión
export const logout = (token) => api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
