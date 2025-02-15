import { useState } from "react";
import "../Modulo Login/Z-Styles Login.css"; // ✅ Se mantiene tu CSS personalizado

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        credentials: "include", // ✅ Mantener sesión
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }
  
      // Guardar token y redirigir al dashboard
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>

        {/* Mensajes de error */}
        {error && <p className="error-text">❌ {error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu-email@ejemplo.com"
            />
          </div>

          {/* Contraseña */}
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              {/* Botón de mostrar/ocultar contraseña */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          {/* Olvidé mi contraseña */}
          <div className="login-actions">
            <a href="/forgot-password" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón de Login */}
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        {/* Botón de Registro */}
        <div className="register-link">
          <a href="/register">¿No tienes cuenta? Regístrate aquí</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
