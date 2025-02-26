import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/src/hooks/useAuth";
import LoginForm from "/src/components/molecules/LoginForm";
import Loader from "/src/components/atoms/Loader";
import "/src/assets/Auth Sheets/s-Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, handleGoogleLogin, error, checkingSession, authLoading } = useAuth(navigate);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  if (checkingSession) return <Loader />; // Verificando sesión...

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Iniciar Sesión</h2>

        <LoginForm
          email={email}
          password={password}
          showPassword={showPassword}
          setEmail={setEmail}
          setPassword={setPassword}
          togglePassword={togglePassword}
          onSubmit={handleSubmit}
          onGoogleLogin={handleGoogleLogin}
          error={error}
          isLoading={authLoading}
        />

        <div className="auth-link">
          <a href="/register">¿No tienes cuenta? Regístrate aquí</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
