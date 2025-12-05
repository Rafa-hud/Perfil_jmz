import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaCertificate,
  FaUser,
  FaCogs,
  FaBriefcase,
  FaFileAlt,
  FaEnvelope,
  FaArrowLeft
} from 'react-icons/fa';

const Navbar = ({ currentView, onGoHome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detectar sección activa solo en vista principal
      if (currentView === 'main') {
        const sections = ['home', 'about', 'skills', 'timeline', 'documents', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        if (current) setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Items de navegación según la vista
  const getNavItems = () => {
    if (currentView === 'all-certificates') {
      return [
        { 
          name: 'Volver al Portafolio', 
          href: '#', 
          onClick: onGoHome,
          icon: <FaArrowLeft />,
          isSpecial: true
        },
        { 
          name: 'Inicio', 
          href: '#home', 
          onClick: onGoHome,
          icon: <FaHome />
        },
        { 
          name: 'Certificados', 
          href: '#', 
          onClick: () => {},
          icon: <FaCertificate />,
          isActive: true
        }
      ];
    }

    // Vista principal
    return [
      { 
        name: 'Inicio', 
        href: '#home', 
        icon: <FaHome />,
        isActive: activeSection === 'home'
      },
      { 
        name: 'Sobre mí', 
        href: '#about', 
        icon: <FaUser />,
        isActive: activeSection === 'about'
      },
      { 
        name: 'Habilidades', 
        href: '#skills', 
        icon: <FaCogs />,
        isActive: activeSection === 'skills'
      },
      { 
        name: 'Experiencia', 
        href: '#timeline', 
        icon: <FaBriefcase />,
        isActive: activeSection === 'timeline'
      },
      { 
        name: 'Documentos', 
        href: '#documents', 
        icon: <FaFileAlt />,
        isActive: activeSection === 'documents'
      },
      { 
        name: 'Contacto', 
        href: '#contact', 
        icon: <FaEnvelope />,
        isActive: activeSection === 'contact'
      }
    ];
  };

  const navItems = getNavItems();

  // Manejar clic en enlace
  const handleLinkClick = (item, e) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
    setIsOpen(false);
  };

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
            setIsOpen(false);
          }}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaCode className="code-icon" />
          </motion.div>
          <div className="logo-text">
            <span className="logo-name">JMZ_RF</span>
            {currentView === 'all-certificates' && (
              <span className="logo-subtitle">Certificados</span>
            )}
          </div>
          <span className="cursor">_</span>
        </a>

        {/* Menu Hamburguesa */}
        <motion.div 
          className="mobile-menu-icon"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.div>

        {/* Menu de Navegación */}
        <motion.ul 
          className={`navbar-menu ${isOpen ? 'active' : ''}`}
          initial={false}
          animate={isOpen ? { x: 0 } : { x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              className={`navbar-item ${item.isActive ? 'active' : ''} ${item.isSpecial ? 'special' : ''}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href={item.href} 
                className="navbar-link"
                onClick={(e) => handleLinkClick(item, e)}
              >
                <span className="link-icon">{item.icon}</span>
                <span className="link-content">
                  {item.isSpecial ? (
                    <>
                      <span className="special-text">{item.name}</span>
                    </>
                  ) : (
                    <>
                      <span className="link-number">0{index + 1}.</span>
                      <span className="link-text">{item.name}</span>
                    </>
                  )}
                </span>
                {item.isActive && (
                  <motion.span 
                    className="active-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Indicador de vista actual */}
        {currentView === 'all-certificates' && (
          <motion.div 
            className="view-indicator"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FaCertificate className="indicator-icon" />
            <span>Vista de Certificados</span>
          </motion.div>
        )}
      </div>

      {/* Estilos CSS-in-JS */}
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 1.2rem 2rem;
          background: transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid transparent;
        }

        .navbar.scrolled {
          background: rgba(17, 17, 17, 0.95);
          border-bottom: 1px solid var(--border-color);
          padding: 0.8rem 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .navbar.in-certificates {
          background: rgba(10, 10, 10, 0.98);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
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
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .navbar-logo:hover {
          background: rgba(0, 212, 255, 0.1);
        }

        .code-icon {
          font-size: 1.8rem;
          color: var(--accent-primary);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .logo-name {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
        }

        .logo-subtitle {
          font-size: 0.7rem;
          color: var(--accent-primary);
          font-weight: 600;
          letter-spacing: 1px;
          opacity: 0.8;
        }

        .cursor {
          animation: blink 1s infinite;
          color: var(--accent-primary);
          font-weight: bold;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Menu Hamburguesa */
        .mobile-menu-icon {
          display: none;
          font-size: 1.5rem;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          background: var(--bg-tertiary);
          width: 45px;
          height: 45px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
        }

        .mobile-menu-icon:hover {
          background: var(--hover-color);
          color: var(--accent-primary);
        }

        /* Menu de Navegación */
        .navbar-menu {
          display: flex;
          list-style: none;
          gap: 0.5rem;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .navbar-item {
          position: relative;
        }

        .navbar-item.special .navbar-link {
          background: var(--gradient-accent);
          color: var(--bg-primary);
          border: none;
          padding: 0.8rem 1.5rem;
        }

        .navbar-item.special .navbar-link:hover {
          transform: translateX(-3px);
          box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
        }

        .navbar-item.active .navbar-link {
          color: var(--accent-primary);
          background: rgba(0, 212, 255, 0.1);
        }

        .navbar-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1.2rem;
          border-radius: 10px;
          position: relative;
          font-size: 0.95rem;
          border: 1px solid transparent;
        }

        .navbar-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--border-color);
        }

        .link-icon {
          font-size: 1rem;
          display: flex;
          align-items: center;
        }

        .link-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .link-number {
          color: var(--accent-primary);
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }

        .special-text {
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .active-indicator {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background: var(--gradient-accent);
          border-radius: 2px;
        }

        /* Indicador de vista */
        .view-indicator {
          position: absolute;
          right: 70px;
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
        }

        .indicator-icon {
          font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .navbar-menu {
            gap: 0.3rem;
          }
          
          .navbar-link {
            padding: 0.7rem 1rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 1rem;
          }

          .navbar.scrolled {
            padding: 0.7rem 1rem;
          }

          .navbar-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100vh;
            background: var(--bg-secondary);
            flex-direction: column;
            align-items: flex-start;
            padding: 5rem 2rem 2rem;
            transition: all 0.5s ease;
            backdrop-filter: blur(20px);
            border-left: 1px solid var(--border-color);
            max-width: 400px;
          }

          .navbar-menu.active {
            right: 0;
          }

          .mobile-menu-icon {
            display: flex;
          }

          .navbar-item {
            width: 100%;
          }

          .navbar-link {
            padding: 1.2rem 1.5rem;
            font-size: 1.1rem;
            border-radius: 12px;
            width: 100%;
          }

          .link-icon {
            font-size: 1.2rem;
          }

          .link-number {
            font-size: 1rem;
          }

          .view-indicator {
            display: none;
          }

          .logo-subtitle {
            display: none;
          }

          .navbar-item.special {
            order: -1;
            margin-bottom: 2rem;
            background: var(--gradient-accent);
            border-radius: 12px;
            overflow: hidden;
          }

          .navbar-item.special .navbar-link {
            background: transparent;
          }
        }

        @media (max-width: 480px) {
          .navbar-logo span:not(.cursor) {
            font-size: 1.2rem;
          }

          .code-icon {
            font-size: 1.5rem;
          }

          .navbar-menu {
            padding: 4rem 1.5rem 2rem;
          }

          .navbar-link {
            padding: 1rem 1.2rem;
          }
        }

        /* Transiciones suaves */
        * {
          scroll-behavior: smooth;
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;