import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaThereads } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío
    setTimeout(() => {
      console.log('Formulario enviado:', formData);
      setIsSubmitting(false);
      setSubmitMessage('¡Mensaje enviado con éxito!');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Contacto</h2>
        
        <div className="contact-grid">
          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="code-window">
              <div className="window-header">
                <div className="window-buttons">
                  <span className="red"></span>
                  <span className="yellow"></span>
                  <span className="green"></span>
                </div>
                <div className="window-title">contact_form.js</div>
              </div>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <span className="code-comment">// Tu nombre</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="code-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">
                    <span className="code-comment">// Tu email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="code-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">
                    <span className="code-comment">// Tu mensaje</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="code-textarea"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  <FaPaperPlane className="send-icon" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </motion.button>
                
                {submitMessage && (
                  <motion.div
                    className="submit-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {submitMessage}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
          
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="info-title">Conéctate conmigo</h3>
            <p className="info-text">
              Si tienes alguna pregunta o quieres discutir oportunidades de colaboración, no dudes en contactarme.
            </p>
            
            <div className="contact-methods">
              <div className="contact-item">
                <h4>Email</h4>
                <a href="mailto:rafaeljmz52@gmail.com">rafaeljmz52@gmail.com</a>
              </div>
              
              <div className="contact-item">
                <h4>Teléfono</h4>
                <a href="tel:+521234567890">+52 --- --- ----</a>
              </div>
              
              <div className="contact-item">
                <h4>Ubicación</h4>
                <p>Lerma, Estado de México, México</p>
              </div>
            </div>
            
            <div className="social-links">
              <a href="https://github.com/tu-perfil" target="_blank" rel="noopener noreferrer">
                <FaGithub className="social-icon" />
              </a>
              <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="social-icon" />
              </a>
              
              <a href="https://www.instagram.com/tu-perfil/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="social-icon" />
              </a>
              
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;