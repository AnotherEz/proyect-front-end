import { useState, useEffect } from 'react';
import { getAuthToken, setAuthToken, removeAuthToken } from '../utils/token';
import { getUser, login, googleLoginRedirect } from '../api/authService';
import { handleError } from '../utils/errorHandler';

export const useAuth = (navigate) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Verificar si hay sesión activa al montar el hook
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      getUser(token)
        .then((res) => setUser(res.data))
        .catch(() => removeAuthToken())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const { data } = await login(credentials);
      setAuthToken(data.access_token);
      setUser(await getUser(data.access_token));
      navigate('/dashboard');
    } catch (err) {
      setError(handleError(err));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { data } = await googleLoginRedirect();
      window.location.href = data.url; // Redirige a Google
    } catch (err) {
      setError(handleError(err));
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    navigate('/login');
  };

  return {
    user,
    error,
    loading,
    handleLogin,
    handleGoogleLogin,
    logout,
  };
};
