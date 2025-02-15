import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🚀 Redirección mejorada
import { login } from "../../api/authService";  // ✅ export { login } from "./Auth/Login.js";
import "../../assets/Auth Sheets/s-Login.css"; // ✅ Importa los estilos globales de auth.css

function Login() {
  const navigate = useNavigate(); // 🚀 Hook para redirigir después del login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);// ✅ Llama al servicio de autenticación
      navigate("/dashboard"); // 🚀 Redirigir usando navigate()
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="auth-container"> {/* ✅ Usa el contenedor general del CSS */}
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

          <button type="submit" className="auth-button">
            Iniciar Sesión
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
