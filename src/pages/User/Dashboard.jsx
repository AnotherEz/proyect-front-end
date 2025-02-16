import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout, getDashboardStats } from "../../api/authService";
import "../../assets/User Sheets/s-User.css";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true); // ✅ Asegurar que la carga no termine antes de recibir datos

            try {
                const userData = await getUser();
                console.log("User data obtenida en Dashboard:", userData); // 🔥 DEPURACIÓN

                if (userData === false) { 
                    console.warn("Sesión no válida, redirigiendo...");
                    navigate("/login");
                    return;
                }

                if (!userData) {
                    console.error("Error desconocido al obtener usuario");
                    return;
                }

                setUser(userData);

                // ✅ Obtener estadísticas del dashboard
                const statsData = await getDashboardStats();
                setStats(statsData);
            } catch (error) {
                console.error("Error en Dashboard:", error);
            } finally {
                setLoading(false); // ✅ Liberar la carga después de recibir la respuesta
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleLogout = async () => {
        await logout();
        navigate("/login"); // ✅ Asegura la redirección tras cerrar sesión
    };

    if (loading) {
        return <p className="loading-message">Cargando...</p>;
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

                <section className="stats">
                    <div className="stat-card">
                        <h3>Estadísticas</h3>
                        <p>Progreso de proyectos: {stats.progreso_proyectos ?? 0}%</p>
                    </div>
                    <div className="stat-card">
                        <h3>Tareas</h3>
                        <p>Tareas pendientes: {stats.tareas_pendientes ?? 0}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Mensajes</h3>
                        <p>Mensajes no leídos: {stats.mensajes_no_leidos ?? 0}</p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
