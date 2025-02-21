import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 ">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Información de la empresa */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Ascedity Technologies S.A.C.</h3>
          <p className="text-sm">Transformando ideas en soluciones innovadoras.</p>
          <p className="text-sm mt-2">2025 &copy; Todos los derechos reservados.</p>
        </div>

        {/* Navegación rápida */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
            <li><a href="/servicios" className="hover:text-white transition-colors">Servicios</a></li>
            <li><a href="/contacto" className="hover:text-white transition-colors">Contacto</a></li>
            <li><a href="/nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-transform transform hover:scale-110">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-blue-400 hover:bg-blue-500 p-2 rounded-full transition-transform transform hover:scale-110">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 p-2 rounded-full transition-transform transform hover:scale-110">
              <FaLinkedinIn size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-pink-500 hover:bg-pink-600 p-2 rounded-full transition-transform transform hover:scale-110">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>Hecho con ❤️ por Ascedity Technologies.</p>
      </div>
    </footer>
  );
}

export default Footer;