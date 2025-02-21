import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUser } from "../../api/authService";
import Loader from "../../components/atoms/Loader";
import "../../assets/Auth Sheets/s-Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loader durante inicio de sesión
  const [checkingSession, setCheckingSession] = useState(true); // Loader durante verificación de sesión

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          await getUser(token); // Verificar token
          navigate("/dashboard", { replace: true }); // Redirigir sin renderizar Login
          return; // Salir antes de setear estados para evitar render innecesario
        } catch (err) {
          console.error("Error al verificar sesión:", err);
        }
      }

      setCheckingSession(false); // Solo se muestra el formulario si no hay sesión
    };

    checkSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Mostrar loader mientras inicia sesión

    try {
      const response = await login({ email, password });
      const token = response.data.access_token;
      localStorage.setItem("authToken", token); // Guardar token
      navigate("/dashboard", { replace: true }); // Redirigir al dashboard
    } catch (err) {
      setError(err?.response?.data?.message || "Credenciales incorrectas");
    } finally {
      setIsLoading(false); // Ocultar loader al finalizar
    }
  };

  // 🌀 Si se está verificando la sesión, mostrar solo el loader y nada más
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
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="password-toggle-btn"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
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
