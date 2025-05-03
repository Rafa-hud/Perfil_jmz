import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '#home' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Experiencia', href: '#timeline' },
    { name: 'Documentos', href: '#documents' },
    { name: 'Contacto', href: '#contact' }
  ];

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <a href="#home" className="navbar-logo">
          <FaCode className="code-icon" />
          <span>JMZ_RF</span>
          <span className="cursor">_</span>
        </a>

        <div className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              className="navbar-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href={item.href} 
                className="navbar-link"
                onClick={() => setIsOpen(false)}
              >
                <span className="link-number">0{index + 1}.</span> {item.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;