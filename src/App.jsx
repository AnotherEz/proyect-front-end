
import './App.css';
import Header from './pages/Header';
import Default from './pages/Default';
import Footer from './pages/Footer';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Servicios from './pages/servicios';

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={ <Default />} />
        <Route path="/" element={<> <Header /> <Home /> <Footer /> </>}  />
        <Route path="/servicios" element={<> <Header /> <Servicios /> <Footer /> </>}  />
      
          
       
       

      </Routes>
     
    </>
  );
}

export default App;
