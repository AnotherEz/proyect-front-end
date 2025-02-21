import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../../api/authService";
import Loader from "../../components/atoms/Loader";
import "../../assets/User Sheets/s-User.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login", { replace: true }); // Redirige inmediatamente si no hay token
        return;
      }

      try {
        const response = await getUser(token);

        if (response?.data) {
          setUser(response.data); // ✅ Cargar datos del usuario
        } else {
          console.warn("Sesión no válida. Redirigiendo...");
          localStorage.removeItem("authToken");
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        localStorage.removeItem("authToken");
        navigate("/login", { replace: true });
      } finally {
        setLoading(false); // Finalizar loader
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        await logout(token);
        localStorage.removeItem("authToken");
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
  };

  // 🕹️ Mostrar loader mientras se cargan los datos
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Mi Aplicación</h2>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/perfil">Perfil</a></li>
            <li><a href="/configuracion">Configuración</a></li>
          </ul>
        </nav>
      </aside>

      <main className={`dashboard-content ${sidebarOpen ? "with-sidebar" : ""}`}>
        <header>
          <div className="header-left">
            <button
              className="menu-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Abrir menú"
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>
            <h2>¡Bienvenido, {user?.first_name || "Usuario"}!</h2>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </header>

        <section className="user-info">
          <h3>Datos del Usuario</h3>
          <div className="user-details">
            <p><strong>Nombre:</strong> {user?.first_name} {user?.last_name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
