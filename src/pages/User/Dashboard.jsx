import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // ✅ Obtener el token de localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No hay token, redirigiendo al login");
        }

        // ✅ Obtener datos del usuario autenticado
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // ✅ Enviar token
          },
        });

        if (!response.ok) {
          throw new Error("No autorizado");
        }

        const data = await response.json();
        if (!data.user) {
          throw new Error("Sesión inválida");
        }

        setUser(data.user);

        // ✅ Obtener datos del dashboard
        const statsResponse = await fetch("http://127.0.0.1:8000/api/dashboard", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // ✅ También enviar el token aquí
          },
        });

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData.stats);
        }

      } catch (error) {
        console.error("Error en Dashboard:", error);
        localStorage.removeItem("token"); // ✅ Eliminar el token si hay un problema
        navigate("/login"); // ✅ Redirigir solo si la sesión es inválida
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // ✅ Manejo de logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ Enviar el token para cerrar sesión
        },
      });

      localStorage.removeItem("token"); // ✅ Eliminar el token
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Mi Aplicación</h2>
        <nav>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Perfil</a></li>
            <li><a href="#">Configuración</a></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <header>
          <h2>¡Bienvenido, {user?.first_name}!</h2>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </header>

        <section className="stats">
          <div className="stat-card">
            <h3>Estadísticas</h3>
            <p>Progreso de proyectos: {stats.progreso_proyectos || 0}%</p>
          </div>
          <div className="stat-card">
            <h3>Tareas</h3>
            <p>Tareas pendientes: {stats.tareas_pendientes || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Mensajes</h3>
            <p>Mensajes no leídos: {stats.mensajes_no_leidos || 0}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
