import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, getUser } from "../../api/authService"; // ✅ Servicio de autenticación
import "../../assets/Auth Sheets/s-Login.css"; // ✅ CSS unificado para Login y Registro


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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Limpiar error de email si está escribiendo
    if (name === "email") setEmailError("");

    // Validación de coincidencia de contraseñas
    if (name === "password" || name === "password_confirmation") {
      setPasswordMatch(
        formData.password !== "" &&
        formData.password_confirmation !== "" &&
        formData.password === value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEmailError("");

    if (formData.password !== formData.password_confirmation) {
      setPasswordMatch(false);
      return;
    }

    try {
      
      await register(formData); // ✅ Llama al servicio de autenticación

      // 🚀 Verifica si el usuario realmente está autenticado antes de redirigir
      const sessionData = await getUser();
      if (sessionData) {
        navigate("/dashboard"); // ✅ Redirigir automáticamente
      } else {
        navigate("/login"); // ❌ Si algo falla, redirigir al login
      }
    } catch (err) {
      if (err.message?.includes("email has already been taken")) {
        setEmailError("El correo ya está registrado. Usa otro.");
      } else {
        setError(err.message || "Error al registrarse");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Registro</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="nombres">Nombres</label>
            <input type="text" id="nombres" name="nombres" required value={formData.nombres} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="apellido_paterno">Apellido Paterno</label>
            <input type="text" id="apellido_paterno" name="apellido_paterno" required value={formData.apellido_paterno} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="apellido_materno">Apellido Materno</label>
            <input type="text" id="apellido_materno" name="apellido_materno" required value={formData.apellido_materno} onChange={handleChange} />
          </div>

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
            />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`password-input ${
                  passwordMatch === false ? "password-mismatch" : passwordMatch ? "password-match" : ""
                }`}
              />
              <span onClick={() => togglePassword("password")} className="password-toggle-btn">
                <i id="passwordToggleIcon" className="fas fa-eye"></i>
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password_confirmation">Confirmar Contraseña</label>
            <div className="password-wrapper">
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                required
                value={formData.password_confirmation}
                onChange={handleChange}
                className={`password-input ${
                  passwordMatch === false ? "password-mismatch" : passwordMatch ? "password-match" : ""
                }`}
              />
              <span onClick={() => togglePassword("password_confirmation")} className="password-toggle-btn">
                <i id="passwordConfirmationToggleIcon" className="fas fa-eye"></i>
              </span>
            </div>
          </div>

          <button type="submit" className="auth-button">Registrarse</button>
        </form>

        <div className="auth-link">
          <a href="/login">¿Ya tienes una cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

// ✅ Función para mostrar/ocultar contraseña
function togglePassword(field) {
  const passwordInput = document.getElementById(field);
  const passwordToggleIcon = document.getElementById(`${field}ToggleIcon`);

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordToggleIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passwordInput.type = "password";
    passwordToggleIcon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

export default Register;
