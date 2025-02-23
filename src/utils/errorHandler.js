//Se encargará del manejo global de errores
export const handleError = (err) => {
    if (err.response && err.response.data && err.response.data.message) {
      return err.response.data.message;
    }
    return 'Error desconocido. Intenta nuevamente.';
  };