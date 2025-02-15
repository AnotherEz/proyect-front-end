
import './assets/App.css';
import Header from './components/templates/Header';
import Default from './components/templates/Default';
import Footer from './components/templates/Footer';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Servicios from './pages/servicios';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/register';
function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={ <Default />} />
        <Route path="/" element={<> <Header /> <Home /> <Footer /> </>}  />
        <Route path="/servicios" element={<> <Header /> <Servicios /> <Footer /> </>}  />
        <Route path="/login" element={<> <Login /> </>}  />
        <Route path="/dashboard" element={<> <Dashboard /> </>}  />
        <Route path="/register" element={<> <Register /> </>}  />

          
       
       

      </Routes>
     
    </>
  );
}

export default App;
