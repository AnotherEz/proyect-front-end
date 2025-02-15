import { WavyBackground } from "../../components/organisms/background";

function Servicios() {
  return (
    <WavyBackground className="mt-40 max-w-7xl mx-auto pb-40">
      <div className="text-center animate-fadeInUp px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 animate-color-change">
          Nuestros Servicios
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
          Soluciones diseñadas para llevar tu empresa al siguiente nivel
        </p>
      </div>
      <div className=" py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Desarrollo Web',
                description:
                  'Creación de sitios web dinámicos y responsivos para optimizar la presencia online de tu empresa.',
                delay: '0.2s',
              },
              {
                title: 'Aplicaciones Móviles',
                description:
                  'Desarrollo de aplicaciones móviles personalizadas para Android y iOS.',
                delay: '0.4s',
              },
              {
                title: 'Transformación Digital',
                description:
                  'Te ayudamos a digitalizar tus procesos y a adoptar nuevas tecnologías para hacer crecer tu negocio.',
                delay: '0.6s',
              },
              {
                title: 'Cloud Computing',
                description:
                  'Implementación de soluciones en la nube para mejorar la eficiencia y escalabilidad de tu negocio.',
                delay: '0.8s',
              },
              {
                title: 'Ciberseguridad',
                description:
                  'Protegemos tus datos con las mejores prácticas de seguridad informática.',
                delay: '1s',
              },
              {
                title: 'Consultoría IT',
                description:
                  'Te brindamos el soporte necesario para implementar soluciones tecnológicas de última generación.',
                delay: '1.2s',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 animate-fadeInUp"
                style={{ animationDelay: service.delay }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WavyBackground>
  );
}

export default Servicios;
