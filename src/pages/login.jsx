import  { useState } from "react";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error] = useState(""); // Para manejar mensajes de error

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de envío del formulario, como hacer una petición POST al backend.
    // Si ocurre un error, puedes usar `setError` para mostrar el mensaje.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-opacity-75 bg-gray-100">
      {/* Contenedor principal */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md animate-fadeIn bg-opacity-90">
        <h2 className="text-4xl font-bold text-center text-black mb-6 animate-slideIn glitch-effect">
          Iniciar Sesión
        </h2>

        {/* Mostrar mensaje de error si existe */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de correo electrónico */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Campo de contraseña con toggle para mostrar/ocultar */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 pr-10"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <i
                className={`fas ${
                  passwordVisible ? "fa-eye-slash" : "fa-eye"
                } text-gray-500`}
              ></i>
            </button>
          </div>

          {/* Link de contraseña olvidada */}
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="/forgot-password" // Ajusta esta ruta según tu backend
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          {/* Botón de Iniciar Sesión */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Botón de Registro */}
        <div className="mt-4">
          <a
            href="/register" // Ajusta esta ruta según tu backend
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
