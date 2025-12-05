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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Items de navegación según la vista
  const getNavItems = () => {
    if (currentView === 'all-certificates') {
      const items = [
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
      
      // En móvil, solo mostrar botón especial en certificados
      return isMobile ? [items[0], items[2]] : items;
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

  // Cerrar menú al hacer clic fuera (solo en móvil)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.navbar-menu') && !e.target.closest('.mobile-menu-icon')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

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

        {/* Menu Hamburguesa - Solo en móvil */}
        <motion.button 
          className="mobile-menu-icon"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>

        {/* Menu de Navegación */}
        <motion.ul 
          id="navbar-menu"
          className={`navbar-menu ${isOpen ? 'active' : ''}`}
          initial={false}
          animate={isOpen && isMobile ? { x: 0 } : { x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="menu"
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
              role="none"
            >
              <a 
                href={item.href} 
                className="navbar-link"
                onClick={(e) => handleLinkClick(item, e)}
                role="menuitem"
                aria-current={item.isActive ? 'page' : undefined}
              >
                <span className="link-icon" aria-hidden="true">{item.icon}</span>
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
                    aria-hidden="true"
                  />
                )}
              </a>
            </motion.li>
          ))}
        </motion.ul>

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
          --bg-tertiary: #1a1a1a;
          --text-primary: #ffffff;
          --text-secondary: #b0b0b0;
          --accent-primary: #00d4ff;
          --accent-secondary: #0099ff;
          --border-color: #333333;
          --hover-color: #222222;
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

        /* Menu Hamburguesa */
        .mobile-menu-icon {
          display: none;
          font-size: 1.5rem;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          background: var(--bg-tertiary);
          width: 44px;
          height: 44px;
          min-height: 44px;
          min-width: 44px;
          border-radius: 8px;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          border: 1px solid var(--border-color);
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }

        .mobile-menu-icon:hover,
        .mobile-menu-icon:focus {
          background: var(--hover-color);
          color: var(--accent-primary);
          outline: none;
        }

        /* Menu de Navegación */
        .navbar-menu {
          display: flex;
          list-style: none;
          gap: 0.5rem;
          align-items: center;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .navbar-item {
          position: relative;
          list-style: none;
        }

        .navbar-item.special .navbar-link {
          background: var(--gradient-accent);
          color: var(--bg-primary);
          border: none;
          padding: 0.8rem 1.5rem;
          font-weight: 600;
        }

        .navbar-item.special .navbar-link:hover {
          transform: translateX(-3px);
          box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
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
          border-radius: 8px;
          position: relative;
          font-size: 0.95rem;
          border: 1px solid transparent;
          min-height: 44px;
          min-width: 44px;
          box-sizing: border-box;
          white-space: nowrap;
        }

        .navbar-link:hover,
        .navbar-link:focus {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--border-color);
          outline: none;
        }

        .link-icon {
          font-size: 1rem;
          display: flex;
          align-items: center;
          flex-shrink: 0;
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
          font-family: 'Courier New', 'SF Mono', monospace;
          flex-shrink: 0;
        }

        .link-text {
          white-space: nowrap;
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

          .navbar-menu {
            gap: 0.3rem;
          }
          
          .navbar-link {
            padding: 0.7rem 1rem;
            font-size: 0.9rem;
            gap: 0.6rem;
          }

          .link-number {
            font-size: 0.85rem;
          }

          .view-indicator {
            right: 60px;
            font-size: 0.75rem;
            padding: 0.3rem 0.7rem;
          }

          .logo-subtitle {
            font-size: 0.65rem;
          }
        }

        /* Tablets en modo retrato (600px - 768px) */
        @media (max-width: 768px) {
          .navbar-menu {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            max-width: 300px;
            height: 100vh;
            height: 100dvh; /* Para móviles modernos */
            background: var(--bg-secondary);
            flex-direction: column;
            align-items: stretch;
            padding: 80px 1.5rem 2rem;
            margin: 0;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 999;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            border-left: 1px solid var(--border-color);
          }

          .navbar-menu.active {
            transform: translateX(0);
          }

          .mobile-menu-icon {
            display: flex;
          }

          .navbar-item {
            width: 100%;
            margin: 0.3rem 0;
          }

          .navbar-link {
            padding: 1rem 1.2rem;
            font-size: 1rem;
            border-radius: 8px;
            width: 100%;
            gap: 1rem;
          }

          .link-icon {
            font-size: 1.1rem;
            width: 20px;
          }

          .link-number {
            font-size: 0.95rem;
          }

          .link-text {
            font-size: 1rem;
          }

          .view-indicator {
            display: none;
          }

          .logo-subtitle {
            display: none;
          }

          .navbar-item.special {
            margin-bottom: 1rem;
            background: var(--gradient-accent);
            border-radius: 8px;
            overflow: hidden;
          }

          .navbar-item.special .navbar-link {
            background: transparent;
            justify-content: center;
            text-align: center;
          }

          .active-indicator {
            display: none;
          }

          /* Overlay para fondo cuando el menú está abierto */
          .navbar-menu.active::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: -1;
          }
        }

        /* Móviles pequeños (480px - 600px) */
        @media (max-width: 600px) {
          .navbar {
            padding: 0.8rem 1rem;
          }

          .navbar.scrolled {
            padding: 0.6rem 1rem;
          }

          .navbar-menu {
            max-width: 280px;
            padding: 70px 1rem 2rem;
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

          .mobile-menu-icon {
            width: 40px;
            height: 40px;
            font-size: 1.3rem;
          }
        }

        /* Móviles muy pequeños (menos de 480px) */
        @media (max-width: 480px) {
          .navbar {
            padding: 0.7rem 0.8rem;
          }

          .navbar-menu {
            max-width: 100%;
            padding: 60px 1rem 2rem;
          }

          .navbar-logo span:not(.cursor) {
            font-size: 1.1rem;
          }

          .code-icon {
            font-size: 1.3rem;
          }

          .navbar-link {
            padding: 0.9rem 1rem;
            font-size: 0.95rem;
          }

          .link-icon {
            font-size: 1rem;
          }

          .link-number {
            font-size: 0.9rem;
          }

          /* Mejorar área táctil en móviles */
          .navbar-link,
          .mobile-menu-icon,
          .navbar-logo {
            min-height: 48px;
            min-width: 48px;
          }
        }

        /* Laptops grandes y escritorio (más de 1024px) */
        @media (min-width: 1025px) {
          .navbar-menu {
            gap: 0.8rem;
          }
          
          .navbar-link {
            padding: 0.9rem 1.5rem;
          }
        }

        /* Pantallas muy grandes (más de 1400px) */
        @media (min-width: 1400px) {
          .navbar-container {
            max-width: 1400px;
          }
        }

        /* Mejoras de accesibilidad y compatibilidad */
        .navbar-link:focus-visible,
        .mobile-menu-icon:focus-visible,
        .navbar-logo:focus-visible {
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
        .navbar-menu,
        .navbar-link,
        .mobile-menu-icon {
          -webkit-tap-highlight-color: transparent;
        }

        /* Prevenir zoom en iOS al tocar inputs */
        @media screen and (max-width: 768px) {
          .navbar-link,
          .mobile-menu-icon {
            font-size: 16px; /* Previene zoom en iOS */
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;