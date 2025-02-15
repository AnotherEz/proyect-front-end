import api from "../apiConfig.js";
// Función para cerrar sesión
export const logout = async () => {
    try {
        await api.post("/logout");
        window.location.href = "/login"; // Redirige al login tras cerrar sesión
    } catch (error) {
        console.error("Error al cerrar sesión", error);
    }
};