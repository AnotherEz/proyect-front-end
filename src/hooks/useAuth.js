import { useState, useEffect } from 'react';
import { getAuthToken, setAuthToken, removeAuthToken } from '../utils/token';
import { getUser, login, googleLoginRedirect } from '../api/authService';
import { handleError } from '../utils/errorHandler';

export const useAuth = (navigate) => {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [authLoading, setAuthLoading] = useState(false); // Controla la carga del login
  const [error, setError] = useState('');

  useEffect(() => {
    const verifySession = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await getUser(token);
          setUser(response.data);
          navigate('/dashboard', { replace: true });
        } catch {
          removeAuthToken(); // Si el token es inválido, lo eliminamos
        }
      }
      setCheckingSession(false); // Finalizamos la verificación
    };

    verifySession();
  }, [navigate]);

  const handleLogin = async (credentials) => {
    setAuthLoading(true);
    setError('');
    try {
      const { data } = await login(credentials);
      setAuthToken(data.access_token);
      setUser((await getUser(data.access_token)).data);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(handleError(err));
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    try {
      const { data } = await googleLoginRedirect();
      window.location.href = data.url;
    } catch (err) {
      setError(handleError(err));
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    navigate('/login', { replace: true });
  };

  return {
    user,
    error,
    checkingSession,
    authLoading,
    handleLogin,
    handleGoogleLogin,
    logout,
  };
};
