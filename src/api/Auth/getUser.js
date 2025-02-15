import api from "../apiConfig.js";
// Función para verificar si el usuario está autenticado
export const getUser = async () => {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (error) {
      throw error.response?.data || "No se pudo obtener la información del usuario";
    }
  };

  