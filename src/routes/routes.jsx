import { Route, Routes } from "react-router-dom";
import Header from "/src/components/templates/Header";
import Default from "/src/components/templates/Default";
import Footer from "/src/components/templates/Footer";
import Home from "/src/pages/Informative/Home";
import Servicios from "/src/pages/Informative/servicios";

import Login from "../../pages/auth/login";
import Register from "/src/pages/auth/register";
import Dashboard from "/src/pages/User/Dashboard";



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
