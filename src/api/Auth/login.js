import api from "../apiConfig.js";
// Función para iniciar sesión
export const login = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
  
      if (response.status !== 200) {
        throw new Error(response.data.message || "Error al iniciar sesión");
      }
  
      // Guarda el token en localStorage
      localStorage.setItem("token", response.data.token);
  
      return response.data; // Devuelve los datos del usuario
    } catch (error) {
      throw error.response?.data || "Error en la autenticación";
    }
  };