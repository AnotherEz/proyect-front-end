import { Route, Routes } from "react-router-dom";
import Header from "../components/templates/Header";
import Default from "../components/templates/Default";
import Footer from "../components/templates/Footer";
import Home from "../pages/Informative/Home";
import Servicios from "../pages/Informative/servicios";
import Login from "../pages/Auth/login";
import Dashboard from "../pages/User/Dashboard";
import Register from "../pages/Auth/register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Default />} />
      <Route path="/" element={<><Header /><Home /><Footer /></>} />
      <Route path="/servicios" element={<><Header /><Servicios /><Footer /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
