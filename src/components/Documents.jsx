import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload } from 'react-icons/fa';

const Documents = ({ setActiveDoc }) => {
  const [expandedDoc, setExpandedDoc] = useState(null);

  const documents = [
    { 
      id: 1, 
      name: 'Certificación en Desarrollo de Codigo de Software', 
      type: 'pdf', 
      url: 'cert-web.pdf',
      preview: 'cert-web.jpeg'
    },
    { 
      id: 2, 
      name: 'Currículum Vitae', 
      type: 'pdf', 
      url: 'cv.pdf',
      preview: 'cv.jpeg'
    },
    { 
      id: 3, 
      name: 'Reconocimiento', 
      type: 'image', 
      url: 'reconocimiento.jpeg',
      preview: 'reconocimiento.jpeg'
    },
    { 
        id: 4, 
        name: 'Titulo de Tecnico en Programación',
        type: 'image', 
        url: 'titulo.jpeg',
        preview: 'titulo.jpeg'
      },
      { 
        id: 5,
        name: 'Cédula de Evaluación',
        type: 'image', 
        url: 'cedula.jpeg',
        preview: 'cedula.jpeg'
      }

  ];

  const toggleExpand = (id) => {
    setExpandedDoc(expandedDoc === id ? null : id);
  };

  return (
    <section id="documents" className="documents-section">
      <div className="documents-container">
        <h2 className="section-title">Documentos</h2>
        
        <div className="documents-grid">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`document-card ${expandedDoc === doc.id ? 'expanded' : ''}`}
              onClick={() => toggleExpand(doc.id)}
            >
              <div className="document-header">
                <FaFilePdf className="document-icon" />
                <h3>{doc.name}</h3>
              </div>
              
              {expandedDoc === doc.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="document-preview"
                >
                  <img 
                    src={doc.preview} 
                    alt={`Vista previa de ${doc.name}`} 
                    className="preview-image"
                  />
                  <div className="document-actions">
                    <button 
                      className="view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDoc(doc);
                      }}
                    >
                      Ver completo
                    </button>
                    <a 
                      href={doc.url} 
                      download 
                      className="download-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaDownload /> Descargar
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Documents;