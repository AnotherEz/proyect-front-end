import api from "../apiConfig.js";

/**
 * Obtiene los datos del usuario autenticado desde Laravel.
 * @returns {Promise<object|boolean>} - Datos del usuario o `false` si no está autenticado.
 */
export const getUser = async () => {
    try {
        const response = await api.get("/user", { withCredentials: true }); // ✅ Asegurar envío de cookies

        console.log("Usuario autenticado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);

        // 🔹 Si Laravel responde con 401, significa que la sesión es inválida
        if (error.response && error.response.status === 401) {
            console.warn("⚠️ Sesión no válida, redirigiendo...");
            return false; // ✅ El frontend manejará la redirección en `Dashboard.jsx`
        }

        return null;
    }
};
