import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

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
        
        <div className="social-links">
                      <a href="https://github.com/rafa-hud?fbclid=IwZXh0bgNhZW0CMTEAYnJpZBEwYkdWVnhPYk1LOUZDSGlDcwEeaD6Fs0VV6617ULd80BlomvQfBBFzVFVJebYZZeNG7fKdd6x_v9al4PxMCZI_aem_V4kh1yeQLlxiWMMiw_A66w" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="social-icon" />
                      </a>
                      <a href="https://www.linkedin.com/in/rafael-jim%C3%A9nez-109507363/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="social-icon" />
                      </a>
                      <a href="https://www.instagram.com/jmz.rafa.20?igsh=eDdvcGh0M2YwN3hm" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="social-icon" />
                      </a>
                      <a href="https://www.facebook.com/share/1AWFupGo4e/" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="social-icon" />
                      </a>
                    </div>
      </motion.div>
    </section>
  );
};

export default Hero;