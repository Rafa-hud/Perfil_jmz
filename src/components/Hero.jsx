import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [visitCount, setVisitCount] = useState(0);
  const [socialText, setSocialText] = useState('');
  const socialPhrase = "Coonéctate conmigo → ";
  const [showSocials, setShowSocials] = useState(false);

  // Contador de visitas
  useEffect(() => {
    const incrementVisitCount = async () => {
      try {
        const response = await fetch('https://api.countapi.xyz/hit/rafaeljmz.vercel.app/visits');
        const data = await response.json();
        setVisitCount(data.value);
      } catch (error) {
        console.error('Error al actualizar el contador de visitas:', error);
        // Fallback a localStorage si la API falla
        const localVisits = localStorage.getItem('visitCount') || 0;
        setVisitCount(Number(localVisits) + 1);
        localStorage.setItem('visitCount', Number(localVisits) + 1);
      }
    };

    incrementVisitCount();
  }, []);

  // Efecto de escritura para las redes sociales
  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < socialPhrase.length) {
        setSocialText(prev => prev + socialPhrase.charAt(i));
        i++;
      } else {
        clearInterval(typingEffect);
        setShowSocials(true);
      }
    }, 100);

    return () => clearInterval(typingEffect);
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* Contenedor unificado para elementos superiores */}
      <motion.div 
        className="top-elements-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >

       <div className="visit-counter">
          <motion.div
            whileHover={{ scale: 1.05 }}
          >
          </motion.div>
        </div>
        <div className="update-badge">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="badge-content"
          >
            🔄 Perfil actualizado: {new Date().toLocaleDateString('es-ES')}
          </motion.div>
        </div>

       
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
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
        
        <div className="social-intro">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {socialText}
            <span className="cursor">|</span>
          </motion.p>
        </div>

        <motion.div 
          className="social-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSocials ? 1 : 0 }}
          transition={{ duration: 0.5, delay: showSocials ? 0.5 : 0 }}
        >
          <motion.a 
            href="https://github.com/rafa-hud" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            aria-label="GitHub"
          >
            <FaGithub className="social-icon" />
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/rafael-jim%C3%A9nez-109507363/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            aria-label="LinkedIn"
          >
            <FaLinkedin className="social-icon" />
          </motion.a>
          <motion.a 
            href="https://www.instagram.com/jmz.rafa.20" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            aria-label="Instagram"
          >
            <FaInstagram className="social-icon" />
          </motion.a>
          <motion.a 
            href="https://www.facebook.com/share/1AWFupGo4e/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            aria-label="Facebook"
          >
            <FaFacebook className="social-icon" />
          </motion.a>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .hero-section {
          position: relative;
        }

        .top-elements-container {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 100;
          align-items: flex-end;
          margin-right: 50px; /* Espacio para el menú */
        }

        .update-badge, .visit-counter {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 20px;
          font-size: 0.6rem;
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .update-badge {
          background: rgba(40, 102, 191, 0.8);
        }

        .visit-counter {
          background: #2c3e50;
        }
        
        .social-intro {
          margin: 20px 0;
          font-size: 1.2rem;
          color: #ffffff;
          min-height: 30px;
          text-align: center;
        }
        
        .cursor {
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 25px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        
        .social-icon {
          font-size: 2rem;
          color: white;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .top-elements-container {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-end;
            margin-right: 60px;
          }
          
          .update-badge, .visit-counter {
            font-size: 0.7rem;
            padding: 6px 10px;
          }
          
          .social-links {
            gap: 15px;
          }
          
          .social-icon {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;