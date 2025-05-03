import { motion } from 'framer-motion';
import { FaCode, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="red"></span>
            <span className="yellow"></span>
            <span className="green"></span>
          </div>
          <div className="terminal-title">bash</div>
        </div>
        
        <div className="terminal-body">
          <div className="terminal-line">
            <span className="prompt">$</span> npm run build-portfolio
          </div>
          <div className="terminal-line">
            <span className="output"> Portafolio construido con éxito!</span>
          </div>
          <div className="terminal-line">
            <span className="prompt">$</span> cat message.txt
          </div>
          <div className="terminal-line">
            <span className="output">
              Hecho con <FaHeart className="heart-icon" /> y mucho <FaCode className="code-icon" /> por Rafael Jiménez © {currentYear}
            </span>
          </div>
          <div className="terminal-line">
            <span className="prompt blink">_</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;