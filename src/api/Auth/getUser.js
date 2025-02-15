
import api from "../apiConfig.js";

/**
 * Obtiene los datos del usuario autenticado.
 * @returns {Promise<object>} Datos del usuario autenticado o `false` si no está autenticado
 */
export const getUser = async () => {
    try {
        const response = await api.get("/user"); // ✅ Debe enviar la cookie
        return response.data;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);

        // Si Laravel responde con 401, significa que la sesión es inválida
        if (error.response && error.response.status === 401) {
            return false; // No forzar la redirección aquí, manejarlo en Dashboard
        }

        return null;
    }
};