import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="about-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="about-container"
      >
        <h2 className="section-title">Sobre Mí</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              Hola, mi nombre es Rafael Jiménez Martínez. Estudiante de Tecnologías de la Información, 
              especializado en el desarrollo de software multiplataforma. Apasionado por la tecnología, 
              la música y el atletismo. Siempre en busca de nuevos retos y oportunidades para crecer profesionalmente.
            </p>
          </div>
          
          <div className="about-details">
            <div className="personal-info">
              <h3>Datos Personales</h3>
              <ul>
                <li><strong>Cumpleaños:</strong> 28-10-2004</li>
                <li><strong>Teléfono:</strong> +52 ---</li>
                <li><strong>Email:</strong> rafaeljmz52@gmail.com</li>
                <li><strong>Ubicación:</strong> Lerma, México</li>
              </ul>
            </div>
            
            <div className="interests">
              <h3>Intereses</h3>
              <div className="interests-grid">
                {['Programación', 'Música', 'Atletismo', 'Videojuegos'].map((interest, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="interest-item"
                  >
                    {interest}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;