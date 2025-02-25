import PropTypes from 'prop-types';

const LoginForm = ({
  email,
  password,
  showPassword,
  setEmail,
  setPassword,
  togglePassword,
  onSubmit,
  onGoogleLogin,
  error,
  isLoading,
}) => (
  <form onSubmit={onSubmit} className="auth-form">
    {error && <p className="error-text">❌ {error}</p>}

    <div className="input-group">
      <label htmlFor="email">Correo electrónico</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu-email@ejemplo.com"
        required
      />
    </div>

    <div className="input-group">
      <label htmlFor="password">Contraseña</label>
      <div className="password-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <span onClick={togglePassword} className="password-toggle-btn">
          <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
        </span>
      </div>
    </div>

    <button type="submit" className="auth-button" disabled={isLoading}>
      {isLoading ? "Cargando..." : "Iniciar Sesión"}
    </button>
    <div className="google-login flex justify-center mt-4">
      <button 
        type="button" 
        className="google-button rounded-2xl px-6 py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 w-full max-w-xs disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={onGoogleLogin} 
        disabled={isLoading} >
        <i className="fab fa-google text-xl"></i> Iniciar sesión con Google
      </button>
    </div>


    
  </form>
);

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  showPassword: PropTypes.bool.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  togglePassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onGoogleLogin: PropTypes.func.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

export default LoginForm;
