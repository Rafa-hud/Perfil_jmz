import { motion } from 'framer-motion';

const Skills = () => {
  const technicalSkills = [
    { name: 'HTML & CSS', level: 95 },
    { name: 'JavaScript', level: 75 },
    { name: 'Python', level: 75 },
    { name: 'Base de Datos', level: 90 },
  ];

  const professionalSkills = [
    { name: 'Comunicación', level: 90 },
    { name: 'Trabajo en Equipo', level: 95 },
    { name: 'Creatividad', level: 90 },
    { name: 'Resolución de Problemas', level: 85 }
  ];

  return (
    <section id="skills" className="skills-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="skills-container"
      >
        <h2 className="section-title">Habilidades</h2>
        
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Habilidades Técnicas</h3>
            <div className="skills-list">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={`tech-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="skill-item"
                >
                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      className="skill-progress"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="skill-category">
            <h3>Habilidades Profesionales</h3>
            <div className="skills-list">
              {professionalSkills.map((skill, index) => (
                <motion.div
                  key={`prof-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="skill-item"
                >
                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      className="skill-progress"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;