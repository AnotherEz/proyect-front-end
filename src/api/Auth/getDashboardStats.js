import api from "../apiConfig.js";

/**
 * Obtiene las estadísticas del dashboard.
 * @returns {Promise<object>} Datos de estadísticas
 */
export const getDashboardStats = async () => {
    try {
        const response = await api.get("/dashboard", { withCredentials: true }); // ✅ Laravel maneja sesiones ahora

        console.log("📊 Estadísticas del dashboard:", response.data.stats);
        return response.data.stats || {};
    } catch (error) {
        console.error("❌ Error al obtener estadísticas:", error);
        return {};
    }
};
