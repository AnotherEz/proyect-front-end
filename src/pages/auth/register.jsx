import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register, login, getUser } from "/src/api/authService";
import "/src/assets/auth-sheets/s-Login.css";
import Loader from "/src/components/atoms/Loader"; 

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [showPassword, setShowPassword] = useState({
    password: false,
    password_confirmation: false,
  });
  const [isLoading, setIsLoading] = useState(false); // Loader para el formulario
  const [checkingSession, setCheckingSession] = useState(true); // Loader para la sesión

  // ✅ Verificar sesión activa al cargar el componente
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          await getUser(token); // Verificar token
          navigate("/dashboard", { replace: true }); // Redirigir sin renderizar Register
          return; // Salir antes de setear estados para evitar render innecesario
        } catch (err) {
          console.error("Error al verificar sesión:", err);
        }
      }

      setCheckingSession(false); // Solo muestra el formulario si no hay sesión activa
    };

    checkSession();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") setEmailError("");

    if (name === "password" || name === "password_confirmation") {
      setPasswordMatch(
        name === "password"
          ? value === formData.password_confirmation
          : formData.password === value
      );
    }
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEmailError("");
    setIsLoading(true); // 🔄 Mostrar loader durante el registro

    if (formData.password !== formData.password_confirmation) {
      setPasswordMatch(false);
      setIsLoading(false);
      return;
    }

    try {
      await register(formData); // Registrar usuario

      const loginResponse = await login({
        email: formData.email,
        password: formData.password,
      });

      const token = loginResponse.data.access_token;
      localStorage.setItem("authToken", token); // Guardar token

      const sessionData = await getUser(token); // Verificar sesión

      navigate(sessionData ? "/dashboard" : "/login", { replace: true }); // Redirigir
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error al registrarse";
      if (errorMsg.includes("email has already been taken")) {
        setEmailError("El correo ya está registrado. Usa otro.");
      } else {
        setError(errorMsg);
      }
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
        <h2 className="auth-title">Registro</h2>

        {error && <p className="error-text">❌ {error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          {["nombres", "apellido_paterno", "apellido_materno"].map((field) => (
            <div className="input-group" key={field}>
              <label htmlFor={field}>{field.replace("_", " ").toUpperCase()}</label>
              <input
                type="text"
                id={field}
                name={field}
                required
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Ingresa tu ${field.replace("_", " ")}`}
              />
            </div>
          ))}

          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={emailError ? "input-error" : ""}
              placeholder="tu-email@ejemplo.com"
            />
            {emailError && <p className="error-text">⚠️ {emailError}</p>}
          </div>

          {["password", "password_confirmation"].map((field) => (
            <div className="input-group" key={field}>
              <label htmlFor={field}>
                {field === "password" ? "Contraseña" : "Confirmar Contraseña"}
              </label>
              <div className="password-wrapper">
                <input
                  type={showPassword[field] ? "text" : "password"}
                  id={field}
                  name={field}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  className={`password-input ${
                    passwordMatch === false && field === "password_confirmation"
                      ? "password-mismatch"
                      : passwordMatch
                      ? "password-match"
                      : ""
                  }`}
                  placeholder={field === "password" ? "••••••••" : "Repite la contraseña"}
                />
                <button
                  type="button"
                  onClick={() => togglePassword(field)}
                  className="password-toggle-btn"
                  aria-label={showPassword[field] ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <i className={showPassword[field] ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                </button>
              </div>
            </div>
          ))}

          {passwordMatch === false && (
            <p className="error-text">⚠️ Las contraseñas no coinciden.</p>
          )}

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <div className="auth-link">
          <a href="/login">¿Ya tienes una cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
