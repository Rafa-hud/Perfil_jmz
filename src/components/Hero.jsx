import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-content"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="profile-image-container"
        >
          <img 
            src="rf_jmz.jpeg" 
            alt="Rafael Jiménez" 
            className="profile-image"
          />
        </motion.div>
        
        <h1 className="hero-title">RAFAEL JIMÉNEZ MARTÍNEZ</h1>
        <h2 className="hero-subtitle">Técnico en Programación</h2>
        
        <div className="social-icons">
          <a href="https://github.com/tu-perfil" target="_blank" rel="noreferrer">
            <FaGithub className="social-icon" />
          </a>
          <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noreferrer">
            <FaLinkedin className="social-icon" />
          </a>
          <a href="https://twitter.com/tu-perfil" target="_blank" rel="noreferrer">
            <FaTwitter className="social-icon" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;