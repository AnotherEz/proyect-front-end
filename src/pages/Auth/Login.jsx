import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authService";
import api from "../../api/apiConfig"; // ✅ Verifica si la sesión está activa
import "../../assets/Auth Sheets/s-Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Verificar si el usuario ya está autenticado al cargar la página
  useEffect(() => {
    const checkSession = async () => {
      try {
        await api.get("/user"); // ✅ Laravel devuelve el usuario si está autenticado
        navigate("/dashboard"); // 🚀 Si ya está autenticado, redirigir
      } catch {
        // No está autenticado, se mantiene en la página de login
      }
    };
    checkSession();
  }, [navigate]);

  // 🔹 Manejar el inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard"); // ✅ Redirigir tras inicio de sesión
    } catch (err) {
      setError(err?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

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

          <div className="auth-link">
            <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="auth-link">
          <a href="/register">¿No tienes cuenta? Regístrate aquí</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
