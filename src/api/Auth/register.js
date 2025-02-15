import api from "../apiConfig.js";

// Función para registrar un usuario
export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);

    if (response.status !== 200) {
      throw new Error(response.data.message || "Error al registrarse");
    }

    // Guarda el token en localStorage
    localStorage.setItem("token", response.data.token);

    return response.data; // Devuelve los datos del usuario
  } catch (error) {
    throw error.response?.data || "Error en el registro";
  }
};


