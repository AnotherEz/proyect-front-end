import api from "../apiConfig.js";

/**
 * Inicia sesión en Laravel, que maneja la sesión con cookies automáticamente.
 * @param {string} email - Correo del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<object>} - Datos del usuario autenticado
 */

export const login = async (email, password) => {
    try {
      await api.get("/sanctum/csrf-cookie"); // ✅ Laravel envía la cookie CSRF aquí
      const response = await api.post("/login", { email, password });
  
      if (response.status !== 200) {
        throw new Error(response.data.message || "Error al iniciar sesión");
      }
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  