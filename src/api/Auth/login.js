import api from "../apiConfig.js";

/**
 * Inicia sesión en Laravel, asegurando que las cookies sean enviadas y recibidas.
 * @param {string} email - Correo del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<object>} - Datos del usuario autenticado
 */
export const login = async (email, password) => {
    try {
        // 🔹 Laravel requiere primero esta petición para establecer la cookie CSRF
        await api.get("/sanctum/csrf-cookie");

        // 🔹 Ahora enviamos las credenciales de login
        const response = await api.post("/login", { email, password });

        if (response.status !== 200) {
            throw new Error(response.data.message || "Error al iniciar sesión");
        }

        console.log("Sesión iniciada correctamente:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
};
