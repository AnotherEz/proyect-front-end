import api from "../apiConfig.js";

/**
 * Registra un usuario en el sistema.
 * @param {object} userData Datos del usuario { first_name, last_name, email, password, password_confirmation }
 * @returns {Promise<object>} Datos del usuario registrado
 */
export const register = async (userData) => {
    try {
        const response = await api.post("/register", userData);

        if (response.status !== 201) {
            throw new Error(response.data.message || "Error al registrarse");
        }

        return response.data; // Laravel ya almacena el token en cookies automáticamente
    } catch (error) {
        throw error.response?.data || "Error en el registro";
    }
};