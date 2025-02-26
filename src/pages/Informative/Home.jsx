import '../../assets/informative-sheets/animations.css';
import '../../assets/main.css';
import { Link } from 'react-router-dom';
import { WavyBackground } from '../../components/organisms/background';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import softwareImage from '../../assets/im02.jpg';
import htmlImage from '../../assets/im01.png';

function Home() {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen text-white">
      <WavyBackground className="mt-40 max-w-7xl mx-auto pb-40">
        <motion.div 
          className="text-center px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 animate-color-change">
            Ascedity Technologies
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 animate-fadeInUp">
            Transformando ideas en soluciones tecnológicas innovadoras con pasión y dedicación.
          </p>
          <Link
            to="/servicios"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Descubre Nuestros Servicios
          </Link>
        </motion.div>

        <section className="py-16">
          <motion.div 
            className="container mx-auto px-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              <Card
                title="Desarrollo de Software"
                description="Creamos soluciones personalizadas para impulsar tu negocio con tecnologías de vanguardia."
                image={softwareImage}
                delay="0.2s"
              />
              <Card
                title="Consultoría IT"
                description="Asesoramiento experto para optimizar tus procesos tecnológicos y alcanzar tus objetivos."
                image={htmlImage}
                delay="0.4s"
              />
              <Card
                title="Soporte Técnico"
                description="Asistencia continua para garantizar el funcionamiento óptimo de tus sistemas."
                image={softwareImage}
                delay="0.6s"
              />
              <Card
                title="Diseño UI/UX"
                description="Creamos experiencias digitales intuitivas y atractivas para tus usuarios."
                image={htmlImage}
                delay="0.8s"
              />
              <Card
                title="Marketing Digital"
                description="Impulsa tu presencia online y llega a tu público objetivo de manera efectiva."
                image={softwareImage}
                delay="1s"
              />
              <Card
                title="Ciberseguridad"
                description="Protegemos tu información y sistemas con soluciones de seguridad avanzadas."
                image={htmlImage}
                delay="1.2s"
              />
            </div>
          </motion.div>
        </section>
      </WavyBackground>
    </div>
  );
}

function Card({ title, description, image, delay }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-2xl p-6 text-gray-800 hover:shadow-3xl transform hover:scale-105 transition duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: parseFloat(delay), duration: 0.6 }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <h3 className="text-xl sm:text-2xl font-semibold mb-3 border-b-2 pb-2 border-blue-500">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  delay: PropTypes.string,
};

Card.defaultProps = {
  delay: '0s',
};

export default Home;
