import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, googleLoginRedirect, getUser } from "../../api/authService"; // Usamos las funciones del authService
import { setAuthToken, getAuthToken } from "../../utils/token"; // Helpers para gestionar el token
import Loader from "../../components/atoms/Loader"; 
import "../../assets/Auth Sheets/s-Login.css"; // Agrega tus estilos aquí

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true); // Controla la carga de la sesión

  // 🔹 Verificar si el usuario ya está autenticado al cargar la página
  useEffect(() => {
    const checkSession = async () => {
      const token = getAuthToken(); // Obtener el token de localStorage

      if (token) {
        try {
          // Verificar que el token esté activo usando el getUser del authService
          await getUser(token);
          navigate("/dashboard"); // Si ya está autenticado, redirigir
        } catch (err) {
          console.error("Error al verificar la sesión:", err);
        }
      }
      setCheckingSession(false); // Solo muestra el formulario si no hay sesión activa
    };
    checkSession();
  }, [navigate]);

  // 🔹 Manejar el inicio de sesión con email y contraseña
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      setAuthToken(response.data.access_token); // Guardamos el token en el almacenamiento local
      navigate("/dashboard"); // Redirigimos a la página de dashboard
    } catch (err) {
      setError(err?.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Manejo del login con Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      // Obtener la URL de redirección de Google desde el backend
      const response = await googleLoginRedirect();

      if (response.data.url) {
        // Redirigir al usuario a Google para la autenticación
        window.location.href = response.data.url;
      } else {
        setError("No se pudo obtener la URL de Google para la autenticación.");
      }
    } catch (err) {
      console.error("Error al obtener la URL de Google:", err);
      setError("Hubo un error al intentar autenticar con Google.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar el loader mientras verificamos la sesión
  if (checkingSession) {
    return <Loader />;
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Iniciar Sesión</h2>

        {error && <p className="error-text">❌ {error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu-email@ejemplo.com"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-btn">
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="auth-link">
          <a href="/register">¿No tienes cuenta? Regístrate aquí</a>
        </div>

        {/* Botón de Google */}
        <div className="google-login">
          <button className="google-button" onClick={handleGoogleLogin}>
            <i className="fab fa-google"></i> Iniciar sesión con Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
