import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { login } from "../../api/authService";
import api from "../../api/apiConfig"; // Verifica si la sesión está activa
import axios from "axios";  // Importar Axios
import "../../assets/Auth Sheets/s-Login.css";
import Loader from "../../components/atoms/Loader"; // Importar Loader

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true); // Añadido para controlar la carga de la sesión

  // 🔹 Verificar si el usuario ya está autenticado al cargar la página
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          // Verificar que el token esté activo
          const response = await api.get("/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response?.data) {
            navigate("/dashboard"); // 🚀 Si ya está autenticado, redirigir al dashboard
            return; // Salir para evitar renderizar el formulario
          }
        } catch (err) {
          console.error("Error al verificar la sesión:", err);
        }
      }
      setCheckingSession(false); // Solo muestra el formulario si no hay sesión activa
    };
    checkSession();
  }, [navigate]);

   // 🔹 Manejar el inicio de sesión
   const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    setIsLoading(true);
  
    try {
      // Hacer la solicitud al backend con email y password
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
  
      // Al obtener el token, redirigir al dashboard
      const { access_token } = response.data;
      localStorage.setItem("authToken", access_token);
      navigate("/dashboard"); // Redirigir tras inicio de sesión exitoso
    } catch (err) {
      // Si hay un error, manejarlo
      setError(err?.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };
  

  // 🔹 Manejo del login con Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      // Obtener la URL de redirección de Google desde el backend usando Axios
      const response = await axios.get("http://127.0.0.1:8000/api/google-auth/redirect");

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

  // Mostrar solo el loader mientras se verifica la sesión
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
                className="password-input"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
              >
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
