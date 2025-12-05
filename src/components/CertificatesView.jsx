import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload, FaArrowLeft } from 'react-icons/fa';

const CertificatesView = ({ setView }) => {
  const certificates = [
    { 
      id: 101, 
      name: 'Certificado Open Academy 1', 
      type: 'pdf', 
      url: 'cert-open-1.pdf',
      preview: 'cert-open-1.jpeg',
      title: "Fundamentos de Desarrollo Web"
    },
    { 
      id: 102, 
      name: 'Certificado Open Academy 2', 
      type: 'pdf', 
      url: 'cert-open-2.pdf',
      preview: 'cert-open-2.jpeg',
      title: "Introducción a React"
    }
  ];

  return (
    <section id="certificates" className="documents-section">
      <div className="documents-container">
        <div className="documents-header">
          <button 
            className="back-btn"
            onClick={() => setView('documents')}
          >
            <FaArrowLeft /> Volver a Documentos
          </button>
          <h2 className="section-title">Certificados Open Academy</h2>
        </div>
        
        <div className="documents-grid">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="document-card expanded"
            >
              <div className="document-header">
                <FaFilePdf className="document-icon" />
                <h3>{cert.name}</h3>
                <p className="certificate-title">{cert.title}</p>
              </div>
              
              <motion.div
                className="document-preview"
              >
                <img 
                  src={cert.preview} 
                  alt={`Vista previa de ${cert.name}`} 
                  className="preview-image"
                />
                <div className="document-actions">
                  <a 
                    href={cert.url} 
                    download 
                    className="download-btn"
                  >
                    <FaDownload /> Descargar
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesView;