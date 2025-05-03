import { motion } from 'framer-motion';
import { FaTerminal, FaLaptopCode, FaUniversity } from 'react-icons/fa';

const Timeline = () => {
  const timelineItems = [
    {
      id: 1,
      title: 'Desarrollador Web',
      company: 'Empresa Montacargas Gutierrez',
      date: 'Enero 2022',
      description: 'Desarrollo y mantenimiento de aplicaciones web. Colaboración en proyectos de software multiplataforma.',
      icon: <FaLaptopCode />,
      type: 'work'
    },
    {
      id: 2,
      title: 'Tecnologías de la Información',
      company: 'Universidad Tecnológica del Valle de Toluca',
      date: '2023 - Presente',
      description: 'Estudiante de Tecnologías de la Información, especializado en desarrollo de software multiplataforma.',
      icon: <FaUniversity />,
      type: 'education'
    },

    
    {
      id: 4,
      title: 'Técnico Programador',
      company: 'CECYTEM PLANTEL LERMA',
      date: '2019 - 2022',
      description: 'Estudiante de Programación, especializado en diseño web, movil y inventarios.',
      icon: <FaUniversity />,
      type: 'education'
    },


    {
      id: 3,
      title: 'Proyectos Personales',
      company: 'Freelance',
      date: '2021 - Presente',
      description: 'Desarrollo de aplicaciones web y móviles, participación en hackathones y contribuciones a código abierto.',
      icon: <FaTerminal />,
      type: 'project'
    }
  ];

  return (
    <section id="timeline" className="timeline-section">
      <div className="timeline-container">
        <h2 className="section-title">Mi Trayectoria</h2>
        
        <div className="timeline">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`timeline-item ${item.type}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="timeline-icon">
                {item.icon}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{item.title}</h3>
                  <span className="timeline-date">{item.date}</span>
                </div>
                <h4 className="timeline-company">{item.company}</h4>
                <p className="timeline-description">{item.description}</p>
                <div className="timeline-tech">
                  {item.type === 'work' && (
                    <>
                      <span className="tech-tag">HTML/CSS</span>
                      <span className="tech-tag">JavaScript</span>
                      <span className="tech-tag">React</span>
                    </>
                  )}
                  {item.type === 'education' && (
                    <>
                      <span className="tech-tag">Java</span>
                      <span className="tech-tag">Python</span>
                      <span className="tech-tag">SQL</span>
                    </>
                  )}
                  {item.type === 'project' && (
                    <>
                      <span className="tech-tag">Full Stack</span>
                      <span className="tech-tag">Git</span>
                      <span className="tech-tag">APIs</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;