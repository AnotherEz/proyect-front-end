const TOKEN_KEY = 'authToken';

// Almacenar el token en localStorage
export const setAuthToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  
  // Recuperar el token del localStorage
  export const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };
  //Remover el token del localStorage
  export const removeAuthToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };