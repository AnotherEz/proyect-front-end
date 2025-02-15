import api from "../apiConfig.js";
// Función para cerrar sesión
export const logout = async () => {
    try {
      const response = await api.post("/logout");
      localStorage.removeItem("token"); // Elimina el token
      return response.data;
    } catch (error) {
      throw error.response?.data || "Error al cerrar sesión";
    }
  };