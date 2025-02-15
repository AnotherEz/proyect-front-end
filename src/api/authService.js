
export { login } from "./Auth/Login.js";
export { register } from "./Auth/register.js";
export { logout } from "./Auth/logout.js";
export { getUser } from "./Auth/getUser.js";
export {getDashboardStats} from "./Auth/getDashboardStats.js"
/**
 * Inicia sesión y Laravel maneja el token en cookies seguras.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} Datos del usuario autenticado
 */