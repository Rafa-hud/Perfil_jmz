import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Documents from './components/Documents';
import AllCertificates from './components/AllCertificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import './App.css';

function App() {
  const [activeDoc, setActiveDoc] = useState(null);
  const [currentView, setCurrentView] = useState('main'); // 'main', 'all-certificates'
  const [showModal, setShowModal] = useState(false);

  // Función para manejar la visualización de documentos
  const handleViewDocument = (doc) => {
    setActiveDoc(doc);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setActiveDoc(null), 300);
  };

  // Función para ir a la vista principal
  const handleGoHome = () => {
    setCurrentView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para ir a los certificados
  const handleViewCertificates = () => {
    setCurrentView('all-certificates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Renderizar contenido basado en la vista actual
  const renderContent = () => {
    switch (currentView) {
      case 'all-certificates':
        return (
          <div className="certificates-view">
            <AllCertificates 
              setActiveDoc={handleViewDocument}
              onBack={handleGoHome}
            />
          </div>
        );
      
      default:
        return (
          <>
            <Hero />
            <About />
            <Skills />
            <Timeline />
            <Documents 
              setActiveDoc={handleViewDocument}
              onViewCertificates={handleViewCertificates} // CORREGIDO: pasa la función
            />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="app">
      <Navbar 
        currentView={currentView}
        onGoHome={handleGoHome}
      />
      
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Modal para documentos */}
      <AnimatePresence>
        {showModal && activeDoc && (
          <motion.div 
            className="document-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className="document-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-title">
                  <h3>{activeDoc.name}</h3>
                  {activeDoc.institution && (
                    <span className="modal-institution">{activeDoc.institution}</span>
                  )}
                </div>
                <button 
                  className="modal-close-btn"
                  onClick={handleCloseModal}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="modal-body">
                {activeDoc.type === 'pdf' ? (
                  <iframe 
                    src={activeDoc.url} 
                    title={activeDoc.name}
                    className="document-iframe"
                    loading="lazy"
                  />
                ) : (
                  <img 
                    src={activeDoc.url} 
                    alt={activeDoc.name}
                    className="document-image"
                  />
                )}
                <div className="modal-actions">
                  <a 
                    href={activeDoc.url} 
                    download 
                    className="modal-download-btn"
                  >
                    Descargar documento
                  </a>
                  <button 
                    className="modal-close-action"
                    onClick={handleCloseModal}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer currentView={currentView} />
      
      {/* Botón flotante para volver al inicio */}
      {currentView === 'all-certificates' && (
        <motion.button
          className="floating-home-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleGoHome}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowLeft />
          <span className="btn-tooltip">Volver al portafolio</span>
        </motion.button>
      )}

      <style jsx>{`
        .app {
          position: relative;
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .main-content {
          position: relative;
          z-index: 1;
        }

        .certificates-view {
          padding-top: 80px;
        }

        .document-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 1rem;
        }

        .document-content {
          background: var(--bg-card);
          width: 95%;
          max-width: 1200px;
          max-height: 90vh;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          background: var(--bg-tertiary);
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-title {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .modal-title h3 {
          color: var(--text-primary);
          margin: 0;
          font-size: 1.3rem;
          line-height: 1.4;
        }

        .modal-institution {
          background: var(--gradient-accent);
          color: var(--bg-primary);
          padding: 0.3rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          align-self: flex-start;
        }

        .modal-close-btn {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.2rem;
          margin-left: 1rem;
        }

        .modal-close-btn:hover {
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-color: var(--accent-primary);
          transform: rotate(90deg);
        }

        .modal-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .document-iframe {
          flex: 1;
          width: 100%;
          border: none;
          background: var(--bg-primary);
        }

        .document-image {
          flex: 1;
          width: 100%;
          object-fit: contain;
          background: var(--bg-primary);
          padding: 2rem;
        }

        .modal-actions {
          padding: 1.5rem 2rem;
          background: var(--bg-tertiary);
          border-top: 1px solid var(--border-color);
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .modal-download-btn, .modal-close-action {
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          text-decoration: none;
        }

        .modal-download-btn {
          background: var(--gradient-accent);
          color: var(--bg-primary);
          border: none;
        }

        .modal-download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
        }

        .modal-close-action {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }

        .modal-close-action:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border-color: var(--accent-primary);
        }

        .floating-home-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 99;
          background: var(--gradient-accent);
          color: var(--bg-primary);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
          position: relative;
        }

        .btn-tooltip {
          position: absolute;
          right: 70px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--bg-card);
          color: var(--text-primary);
          padding: 0.6rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          border: 1px solid var(--border-color);
        }

        .floating-home-btn:hover .btn-tooltip {
          opacity: 1;
          right: 80px;
        }

        @media (max-width: 768px) {
          .document-content {
            width: 100%;
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
          }

          .modal-header {
            padding: 1rem;
          }

          .modal-title h3 {
            font-size: 1.1rem;
          }

          .modal-actions {
            padding: 1rem;
            flex-direction: column;
          }

          .floating-home-btn {
            bottom: 1rem;
            right: 1rem;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }

          .floating-home-btn:hover .btn-tooltip {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default App;