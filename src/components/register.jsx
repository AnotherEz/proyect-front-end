import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🚀 Para redirigir después del registro
import "../Modulo Login/Z-Styles Login.css"; // ✅ Mantenemos los estilos

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
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "email") setEmailError("");

    if (e.target.name === "password" || e.target.name === "password_confirmation") {
      setPasswordError(
        e.target.name === "password_confirmation"
          ? formData.password !== e.target.value
          : formData.password_confirmation !== e.target.value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEmailError("");
    setPasswordError(false);

    if (formData.password !== formData.password_confirmation) {
      setPasswordError(true);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message?.includes("email has already been taken")) {
          setEmailError("El correo ya está registrado. Usa otro.");
        } else {
          throw new Error(data.message || "Error al registrarse");
        }
        return;
      }

      // ✅ **Guardar token en localStorage**
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // 🚀 **Verificar si el usuario realmente está autenticado antes de redirigir**
      const sessionCheck = await fetch("http://127.0.0.1:8000/api/user", {
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${data.token}`,
        },
      });

      const sessionData = await sessionCheck.json();

      if (sessionCheck.ok && sessionData.user) {
        navigate("/dashboard"); // ✅ Redirigir automáticamente
      } else {
        navigate("/login"); // ❌ Si algo falla, redirigir al login
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Registro</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit} className="register-form">
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
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={passwordError ? "input-error" : ""}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password_confirmation">Confirmar Contraseña</label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
              className={passwordError ? "input-error" : ""}
            />
          </div>

          <button type="submit" className="register-button">Registrarse</button>
        </form>

        <div className="login-link">
          <a href="/login">¿Ya tienes una cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
