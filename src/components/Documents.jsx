import { motion } from 'framer-motion';
import { FaFolderOpen, FaArrowRight } from 'react-icons/fa';

const Documents = ({ onViewCertificates }) => {
  const handleViewAllCertificates = () => {
    onViewCertificates();
  };

  return (
    <section id="documents" className="documents-section">
      <div className="documents-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Documentos</h2>
          
          <div className="documents-header">
            <p className="documents-description">
              Aquí encontrarás todos mis documentos importantes, certificaciones y reconocimientos profesionales.
            </p>
          </div>
          
          <div className="documents-actions">
            <motion.button 
              className="certificates-btn"
              onClick={handleViewAllCertificates}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFolderOpen className="btn-icon" />
              <span className="btn-text">
                Explorar Certificados
                <span className="badge">8+</span>
              </span>
              <FaArrowRight className="arrow-icon" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .documents-section {
          padding: 4rem 2rem;
          background: #121212;
          min-height: 50vh;
          display: flex;
          align-items: center;
        }

        .documents-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .section-title {
          color: #fff;
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
          font-weight: 700;
        }

        .documents-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .documents-description {
          color: #aaa;
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .documents-actions {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .certificates-btn {
          background: #222;
          color: #fff;
          border: 2px solid #333;
          padding: 1.2rem 2.5rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .certificates-btn:hover {
          background: #333;
          border-color: #444;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .btn-icon {
          font-size: 1.3rem;
          color: #888;
        }

        .btn-text {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .badge {
          background: #333;
          color: #aaa;
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid #444;
        }

        .arrow-icon {
          font-size: 1rem;
          color: #888;
          transition: transform 0.3s ease;
        }

        .certificates-btn:hover .arrow-icon {
          transform: translateX(5px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .documents-section {
            padding: 3rem 1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .documents-description {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .certificates-btn {
            padding: 1rem 2rem;
            font-size: 1rem;
          }

          .documents-actions {
            padding: 0 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Documents;