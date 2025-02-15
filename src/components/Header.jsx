import '../CSS/animations.css';
import '../CSS/main.css';
import { Outlet , Link} from "react-router-dom";
function Header(){
    return(
        <>
        <div className="  bg-gray-100 font-sans leading-normal tracking-normal" >
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <div className="flex justify-between items-center">
              {/* Logo Section */}
              <div className="flex items-center space-x-7">
                <div>
                  <Link to="/" className="flex items-center py-4 px-2">
                    <span className="font-semibold text-head hover:text-blue-600 transition duration-200">
                    Ascedity Technologies
                    </span>
                  </Link>
                </div>
              </div>
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button id="menu-button" className="text-gray-500 focus:outline-none">
                  <i className="fas fa-bars fa-lg"></i>
                </button>
              </div>
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/home"
                  className="py-2 px-4 font-medium rounded transition duration-300 btn-primary hover:bg-blue-500 hover:text-white"
                >
                  Inicio
                </Link>
                <Link
                  to="/servicios"
                  className="py-2 px-4 font-medium rounded transition duration-300 btn-primary hover:bg-blue-500 hover:text-white"
                >
                  Servicios
                </Link>
                <Link
                  to="/sobre-nosotros"
                  className="py-2 px-4 font-medium rounded transition duration-300 btn-primary hover:bg-blue-500 hover:text-white"
                >
                  Sobre Nosotros
                </Link>
                <Link
                  to="/contacto"
                  className="py-2 px-4 font-medium rounded transition duration-300 btn-primary hover:bg-blue-500 hover:text-white"
                >
                  Contacto
                </Link>
                <Link
                  to="/login"
                  className="py-2 px-4 font-medium rounded transition duration-300 btn-primary hover:bg-blue-500 hover:text-white"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    <Outlet />
        </>

   


    )

    
}
export default Header;