
import '../../assets/Informative Sheets/animations.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { WavyBackground } from '../../components/organisms/background';
// Componente principal: Home
function Home() {
  return (
    <>
    <div  className =" bg-black" >
        
      <WavyBackground className="mt-40 max-w-7xl mx-auto pb-40">
      <div className="text-center animate-fadeInUp px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 animate-color-change">
          Ascedity Technologies
        </h1>
        <p className="text-lg sm:text-xl text-white mb-6 sm:mb-8">
          Transformando ideas en soluciones tecnológicas innovadoras
        </p>
        <Link
          to="/servicios"

          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Descubre Nuestros Servicios
        </Link>
      </div>

      <div className=" py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Card
              title="Desarrollo de Software"
              description="Creamos soluciones personalizadas para impulsar tu negocio."
              delay="0.2s"
            />
            <Card
              title="Consultoría IT"
              description="Asesoramiento experto para optimizar tus procesos tecnológicos."
              delay="0.4s"
            />
            <Card
              title="Soporte Técnico"
              description="Asistencia continua para mantener tus sistemas funcionando sin problemas."
              delay="0.6s"
            />
          </div>
        </div>
      </div>

      </WavyBackground>

    </div>



      
    </>
  );
}

// Componente secundario: Card
function Card({ title, description, delay }) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 animate-fadeInUp"
      style={{ animationDelay: delay }}
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Validación de props
Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  delay: PropTypes.string,
};

// Valores por defecto
Card.defaultProps = {
  delay: '0s',
};

export default Home;


