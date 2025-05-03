import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false);

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
    setIsError(false);
    setSubmitMessage('');

    // Configuración de EmailJS
    emailjs.send(
      'service_6y06bhr', // Service ID
      'template_u4uscad', // Template ID
      formData,
      'ye_xijHB98wMOCVMe' // Public Key
    )
    .then((response) => {
      console.log('Email enviado con éxito!', response.status, response.text);
      setSubmitMessage('¡Mensaje enviado con éxito!');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Error al enviar el email:', error);
      setSubmitMessage('Error al enviar el mensaje. Por favor intenta nuevamente.');
      setIsError(true);
    })
    .finally(() => {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    });
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
                    className={`submit-message ${isError ? 'error' : 'success'}`}
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
        </div>
      </div>
    </section>
  );
};

export default Contact;