import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaCertificate, FaArrowLeft } from 'react-icons/fa';

const Navbar = ({ currentView, onGoHome }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''} ${currentView !== 'main' ? 'in-certificates' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <a 
          href="#home" 
          className="navbar-logo"
          onClick={(e) => {
            if (currentView !== 'main') {
              e.preventDefault();
              onGoHome();
            }
          }}
          aria-label="Ir al inicio"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            aria-hidden="true"
          >
            <FaCode className="code-icon" />
          </motion.div>
          <div className="logo-text">
            <span className="logo-name">JMZ_RF</span>
            {currentView === 'all-certificates' && (
              <span className="logo-subtitle">Certificados</span>
            )}
          </div>
          <span className="cursor blink" aria-hidden="true">_</span>
        </a>

        {/* Botón de Volver - Solo en vista de certificados */}
        {currentView === 'all-certificates' && (
          <motion.button
            className="back-button"
            onClick={onGoHome}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Volver al portafolio"
          >
            <FaArrowLeft className="back-icon" />
            <span className="back-text">
              {isMobile ? 'Volver' : 'Volver al Portafolio'}
            </span>
          </motion.button>
        )}

        {/* Indicador de vista actual - Solo en escritorio */}
        {currentView === 'all-certificates' && !isMobile && (
          <motion.div 
            className="view-indicator"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            aria-label="Vista de Certificados activa"
          >
            <FaCertificate className="indicator-icon" />
            <span>Vista de Certificados</span>
          </motion.div>
        )}
      </div>

      {/* Estilos CSS-in-JS */}
      <style jsx>{`
        /* Variables CSS para compatibilidad */
        :global(:root) {
          --bg-primary: #0a0a0a;
          --bg-secondary: #121212;
          --text-primary: #ffffff;
          --accent-primary: #00d4ff;
          --border-color: #333333;
          --gradient-accent: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          padding: 1rem 2rem;
          background: transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          border-bottom: 1px solid transparent;
          box-sizing: border-box;
        }

        .navbar.scrolled {
          background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
          padding: 0.8rem 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .navbar.in-certificates {
          background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }

        /* Logo */
        .navbar-logo {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: none;
          letter-spacing: -0.5px;
          gap: 0.8rem;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          min-height: 44px;
          min-width: 44px;
          box-sizing: border-box;
        }

        .navbar-logo:hover {
          background: rgba(0, 212, 255, 0.1);
          outline: none;
        }

        .navbar-logo:focus {
          outline: 2px solid var(--accent-primary);
          outline-offset: 2px;
        }

        .code-icon {
          font-size: 1.8rem;
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .logo-name {
          font-family: 'Courier New', 'SF Mono', 'Monaco', 'Inconsolata', monospace;
          font-weight: 700;
          white-space: nowrap;
        }

        .logo-subtitle {
          font-size: 0.7rem;
          color: var(--accent-primary);
          font-weight: 600;
          letter-spacing: 1px;
          opacity: 0.8;
          white-space: nowrap;
        }

        .cursor {
          color: var(--accent-primary);
          font-weight: bold;
          margin-left: 2px;
        }

        .blink {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Botón de Volver */
        .back-button {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: var(--gradient-accent);
          color: var(--bg-primary);
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          min-height: 44px;
          min-width: 44px;
          box-sizing: border-box;
        }

        .back-button:hover,
        .back-button:focus {
          transform: translateX(-3px);
          box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
          outline: none;
        }

        .back-icon {
          font-size: 1rem;
        }

        .back-text {
          white-space: nowrap;
        }

        /* Indicador de vista */
        .view-indicator {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 212, 255, 0.1);
          color: var(--accent-primary);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid rgba(0, 212, 255, 0.3);
          white-space: nowrap;
        }

        .indicator-icon {
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        /* ========== RESPONSIVE ========== */

        /* Tablets y laptops pequeñas (768px - 1024px) */
        @media (max-width: 1024px) {
          .navbar {
            padding: 1rem;
          }

          .navbar.scrolled {
            padding: 0.7rem 1rem;
          }

          .view-indicator {
            font-size: 0.75rem;
            padding: 0.3rem 0.7rem;
          }

          .logo-subtitle {
            font-size: 0.65rem;
          }

          .back-button {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
          }
        }

        /* Tablets en modo retrato (600px - 768px) */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.8rem 1rem;
          }

          .navbar.scrolled {
            padding: 0.6rem 1rem;
          }

          .navbar-logo {
            font-size: 1.3rem;
            gap: 0.6rem;
          }

          .code-icon {
            font-size: 1.5rem;
          }

          .logo-name {
            font-size: 1.2rem;
          }

          .logo-subtitle {
            display: none;
          }

          .view-indicator {
            display: none;
          }

          .back-button {
            padding: 0.6rem 1rem;
            font-size: 0.85rem;
            gap: 0.5rem;
          }
        }

        /* Móviles pequeños (480px - 600px) */
        @media (max-width: 600px) {
          .navbar {
            padding: 0.7rem 0.8rem;
          }

          .navbar.scrolled {
            padding: 0.5rem 0.8rem;
          }

          .navbar-logo {
            font-size: 1.1rem;
            gap: 0.5rem;
          }

          .code-icon {
            font-size: 1.3rem;
          }

          .logo-name {
            font-size: 1rem;
          }

          .back-button {
            padding: 0.5rem 0.8rem;
            font-size: 0.8rem;
            gap: 0.4rem;
          }

          .back-icon {
            font-size: 0.9rem;
          }
        }

        /* Móviles muy pequeños (menos de 480px) */
        @media (max-width: 480px) {
          .navbar {
            padding: 0.6rem 0.6rem;
          }

          .navbar-logo {
            font-size: 1rem;
            gap: 0.4rem;
            padding: 0.4rem;
          }

          .code-icon {
            font-size: 1.2rem;
          }

          .logo-name {
            font-size: 0.9rem;
          }

          .cursor {
            font-size: 0.9rem;
          }

          .back-button {
            padding: 0.5rem 0.7rem;
            font-size: 0.75rem;
            min-height: 40px;
            min-width: 40px;
          }

          /* Mejorar área táctil en móviles */
          .navbar-logo,
          .back-button {
            min-height: 48px;
            min-width: 48px;
          }
        }

        /* Laptops grandes y escritorio (más de 1024px) */
        @media (min-width: 1025px) {
          .navbar-logo {
            font-size: 1.6rem;
          }

          .code-icon {
            font-size: 2rem;
          }

          .logo-name {
            font-size: 1.6rem;
          }

          .logo-subtitle {
            font-size: 0.75rem;
          }

          .back-button {
            padding: 0.9rem 1.8rem;
            font-size: 1rem;
          }
        }

        /* Pantallas muy grandes (más de 1400px) */
        @media (min-width: 1400px) {
          .navbar-container {
            max-width: 1400px;
          }
        }

        /* Mejoras de accesibilidad y compatibilidad */
        .navbar-logo:focus-visible,
        .back-button:focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: 2px;
        }

        /* Fallback para navegadores antiguos sin backdrop-filter */
        @supports not (backdrop-filter: blur(10px)) {
          .navbar.scrolled,
          .navbar.in-certificates {
            background: rgba(10, 10, 10, 0.98);
          }
        }

        /* Mejorar rendimiento en móviles */
        .navbar-logo,
        .back-button {
          -webkit-tap-highlight-color: transparent;
        }

        /* Prevenir zoom en iOS al tocar inputs */
        @media screen and (max-width: 768px) {
          .back-button {
            font-size: 16px; /* Previene zoom en iOS */
          }
        }

        /* Asegurar que el botón de volver no se superponga en móviles */
        @media (max-width: 320px) {
          .navbar-logo .logo-name {
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .back-button .back-text {
            display: none;
          }
          
          .back-button {
            padding: 0.5rem;
            width: 40px;
            height: 40px;
            justify-content: center;
          }
          
          .back-icon {
            margin: 0;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;