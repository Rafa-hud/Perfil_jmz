import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaFilePdf, FaDownload, FaEye, FaTimes } from 'react-icons/fa';

const AllCertificates = ({ setActiveDoc, onBack }) => {
  const allCertificates = [
    { 
      id: 101, 
      name: 'Desarrollo de codigo de Software', 
      type: 'pdf', 
      url: 'cert-web.pdf',
      preview: 'cert-web.jpeg',
      category: 'Software',
      institution: 'Conocer',
      date: '2023',
      description: 'Certificado de Competencia Laboral en el Estándar de Competencia.',
      credentialId: 'D-0000064523',
      instructor: 'Redrigo A. Rojas Navarrete',
      duration: '8 horas',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MongoDB']
    },
    { 
      id: 102, 
      name: 'Domina la IA con Gemini', 
      type: 'pdf', 
      url: 'Domina_Gemini.pdf',
      preview: 'Domina la IA con Gemini.pdf',
      category: 'Google',
      institution: 'Open Academy, Google',
      date: '26/11/2025',
      description: '"Domina la IA con Gemini" es un curso práctico y orientado a resultados diseñado para que profesionales, emprendedores, estudiantes y cualquier persona interesada pase de ser un usuario básico a un usuario experto y estratégico de la inteligencia artificial de Google, Gemini.',
      credentialId: 'OA-2025-1126002015891',
      instructor: 'Open Academy',
      duration: '2 Horas I 2 Módulos',
      skills: ['Prompt Engineering Avanzado', 'Automatización de Flujos de Trabajo', 'Creatividad y Generación de Contenido','Pensamiento Crítico y Evaluación de Resultados']
    },
    { 
      id: 103, 
      name: 'Fundamentos de ChatGPT', 
      type: 'pdf', 
      url: 'Fundamentos de ChatGPT.pdf',
      preview: 'Fundamentos de ChatGPT.jpeg',
      category: 'IA',
      institution: 'Open Academy',
      date: '19/05/2025',
      description: 'El certificado "Fundamentos de ChatGPT" de Open Academy es un punto de partida esencial diseñado para cualquier persona que quiera comprender y comenzar a utilizar esta revolucionaria tecnología de inteligencia artificial desde cero, de manera práctica y segura.',
      credentialId: 'P-OA-2025-0519001137385',
      instructor: 'Open Academy',
      duration: '8 Horas I 2 Módulos',
      skills: ['Comunicación Efectiva con IA', 'Resolución Práctica de Tareas', 'Optimización de Búsquedas y Análisis', 'Adaptabilidad y Aprendizaje Continuo']
    },
     { 
      id: 104, 
      name: 'Gestión de Proyectos y Fundamentos', 
      type: 'pdf', 
      url: 'Gestión de Proyectos y Fundamentos.pdf',
      preview: 'Gestión de Proyectos y Fundamentos.jpeg',
      category: 'Desarrollo Profesional y Habilidades Empresariales',
      institution: 'Open Academy',
      date: '02/06/2025',
      description: 'El curso "Gestión de Proyectos y Fundamentos" es un programa integral diseñado para proporcionar las bases sólidas y las mejores prácticas globalmente reconocidas para gestionar proyectos con éxito, desde la idea inicial hasta el cierre formal.',
      credentialId: 'OA-2025-0602001187314',
      instructor: 'Open Academy',
      duration: '8 Horas I 2 Módulos',
      skills: ['Planificación Estratégica de Proyectos', 'Metodologías Ágiles y Predictivas', 'Control y Cierre de Proyectos']
    },
    { 
      id: 104, 
      name: 'Master AI with Gemini', 
      type: 'pdf', 
      url: 'Master AI with Gemini.pdf',
      preview: 'Master AI with Gemini.jpeg',
      category: 'Tecnología y Programación Avanzada.',
      institution: 'Open Academy, Google',
      date: '04/12/2025',
      description: '"Master AI with Gemini" es el programa avanzado y definitivo de Open Academy para profesionales, desarrolladores y líderes tecnológicos que buscan transicionar de usuarios competentes a expertos y arquitectos de soluciones con la inteligencia artificial de Google.',
      credentialId: 'OA-2025-1204002049304',
      instructor: 'Google',
      duration: '2 Horas I 2 Módulos',
      skills: ['Dominio del Ecosistema Gemini', 'Automatización y Integración con APIs', 'Desarrollo de Soluciones de Negocio con IA']
    },
    { 
      id: 105, 
      name: 'ChatGPT for Beginners: SciFi Writing with Dall-e', 
      type: 'pdf', 
      url: 'Coursera.pdf',
      preview: 'Coursera.jpeg',
      category: 'Creatividad y Arte Digital.',
      institution: 'Coursera',
      date: '01/12/2025',
      description: 'Este curso especializado de Coursera es una inmersión práctica y creativa en el uso de las herramientas de IA generativa (ChatGPT y DALL-E) con un objetivo concreto: crear historias de ciencia ficción ilustradas.',
      credentialId: 'FAX5V0ZA8RMQ',
      instructor: 'Danilo Oliveira Vaz',
      duration: '4 horas',
      skills: ['Escritura Creativa Asistida por IA', 'Prompting Narrativo Específico', 'Creación de Imágenes con IA para Narrativa', 'Flujo de Trabajo Multimodal Creativo']
    },
    { 
      id: 106, 
      name: 'Google Inteligencia Artificial y productividad', 
      type: 'pdf', 
      url: 'Google Inteligencia Artificial y productividad.pdf',
      preview: 'Google Inteligencia Artificial y productividad.jpeg',
      category: 'Productividad y Herramientas Digitales.',
      institution: 'Open Academy, Google',
      date: '22/05/2025',
      description: 'El curso "Google Inteligencia Artificial y Productividad" es un programa práctico y específico diseñado para profesionales, estudiantes y cualquier usuario de Google Workspace que quiera dar un salto cuántico en su eficiencia, aprovechando al máximo las capacidades de inteligencia artificial integradas directamente en las herramientas que usa a diario.',
      credentialId: 'OA-2025-0522001149192',
      instructor: 'Google',
      duration: '2 Horas I 2 Módulos',
      skills: ['Automatización Integral de Tareas', 'Gestión Inteligente de Información', 'Optimización de la Comunicación y Colaboració']
    },
    { 
      id: 107, 
      name: 'Prompting responsable maximiza la IA', 
      type: 'pdf', 
      url: 'Prompting responsable maximiza la IA.pdf',
      preview: 'Prompting responsable maximiza la IA.jpeg',
      category: 'Negocios y Estrategia.',
      institution: 'Open Academy',
      date: '19/05/2025',
      description: '"Prompting responsable: maximiza la IA en tu negocio" es un curso estratégico y de nivel intermedio-avanzado diseñado para emprendedores, líderes, gerentes y profesionales que ya conocen los fundamentos de la IA generativa y buscan escalar su uso de manera segura, ética y alineada con los objetivos del negocio.',
      credentialId: ' OA-2025-0519001137670',
      instructor: 'Microsoft Founderz',
      duration: '8 Horas I 2 Módulos',
      skills: ['Diseño de Flujos de Trabajo Empresariales con IA', 'Prompting Estratégico para Objetivos de Negocio', 'CI/arantía de Calidad y Consistencia']
    },
    { 
      id: 107, 
      name: 'Publicidad en redes sociales', 
      type: 'pdf', 
      url: 'Publicidad en redes sociales.pdf',
      preview: 'Publicidad en redes sociales.jpeg',
      category: 'Marketing Digital y Ventas.',
      institution: 'Open Academy',
      date: '11/06/2025',
      description: 'Curso práctico para aprender a crear, gestionar y optimizar campañas publicitarias efectivas en las principales redes sociales (Meta, Instagram, TikTok, LinkedIn).',
      credentialId: 'OA-2025-0611001221673',
      instructor: 'Open Academy',
      duration: '8 Horas I 2 Módulos',
      skills: ['Estrategia de Medios Sociales Pagados', 'Creación y Optimización de Campañas', 'Segmentación Avanzada de Audiencias', 'Diseño de Creatividades Efectivas']
    },
    { 
      id: 107, 
      name: 'Transformación Digital', 
      type: 'pdf', 
      url: 'Transformación Digital.pdf',
      preview: 'Python.jpeg',
      category: 'Negocios y Liderazgo.',
      institution: 'Open Academy',
      date: '11/06/2025',
      description: 'Este curso enfoca en la redefinición de modelos de negocio, operaciones y cultura impulsada por la tecnología.',
      credentialId: 'OA-2025-0611001221368',
      instructor: 'MIT Professional Education',
      duration: '8 Horas I 2 Módulos',
      skills: ['Ciberseguridad y Gobernanza de Tecnología', 'Liderazgo para el Cambio Digital', 'Diseño de Estrategia Digital']
    },
    { 
      id: 107, 
      name: 'Python', 
      type: 'pdf', 
      url: 'Python.pdf',
      preview: 'Python.jpeg',
      category: 'Tecnología y Programación.',
      institution: 'Open Academy',
      date: '22/05/2025',
      description: 'Este curso es una inmersión práctica en Python, el lenguaje de programación más versátil y demandado.',
      credentialId: 'OA-2025-0522001148920',
      instructor: 'Open Academy',
      duration: '8 Horas I 2 Módulos',
      skills: ['Fundamentos de Programación', 'Sintaxis y Estructuras de Datos en Python', 'Programación Orientada a Objetos (OOP)']
    },
    { 
      id: 108, 
      name: 'Internet de las Cosas', 
      type: 'pdf', 
      url: 'Internet de las Cosas.pdf',
      preview: 'Internet de las Cosas.jpeg',
      category: 'Tecnología y Programación.',
      institution: 'Open Academy',
      date: '20/05/2025',
      description: 'El curso "Internet de las Cosas (IoT)" es un programa técnico-práctico diseñado para ingenieros, tecnólogos, estudiantes de STEM, makers y profesionales curiosos que deseen comprender y construir soluciones conectadas que interactúan con el mundo físico.',
      credentialId: 'OA-2025-0520001138700',
      instructor: 'MIT Professional Education',
      duration: '8 Horas I 2 Módulos',
      skills: ['Arquitectura y Modelado de Sistemas IoT', 'Gestión de Conectividad y Protocolos', 'Seguridad y Consideraciones de Implementación']
    }
  ];

  const [activePreview, setActivePreview] = useState(null);

  const handlePreview = (cert) => {
    setActivePreview(cert);
  };

  const closePreview = () => {
    setActivePreview(null);
  };

  const handleDownload = (cert) => {
    window.open(cert.url, '_blank');
  };

  return (
    <section className="all-certificates-section">
      <div className="all-certificates-container">
        {/* Header */}
        <div className="certificates-header">
          <button 
            className="back-btn"
            onClick={onBack}
          >
            <FaArrowLeft /> Volver
          </button>
          <div className="header-content">
            <h1 className="main-title">Mis Certificados</h1>
            <p className="subtitle">
              Colección completa de certificaciones profesionales y cursos
            </p>
          </div>
        </div>

        {/* Grid de certificados */}
        <div className="certificates-grid-section">
          <div className="section-header">
            <h2 className="section-title">Todos los Certificados</h2>
            <div className="results-info">
              <span className="results-count">
                {allCertificates.length} certificados disponibles
              </span>
            </div>
          </div>
          
          <div className="certificates-grid">
            {allCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="certificate-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => handlePreview(cert)}
              >
                <div className="card-header">
                  <div className="certificate-badge">
                    <FaFilePdf className="badge-icon" />
                    <span className="badge-text">PDF</span>
                  </div>
                  <div className="certificate-meta">
                    <span className="cert-date">{cert.date}</span>
                    <span className="cert-institution">{cert.institution}</span>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3 className="cert-title">{cert.name}</h3>
                  <p className="cert-description">{cert.description}</p>
                  <div className="cert-skills">
                    {cert.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="skill-tag-more">+{cert.skills.length - 3}</span>
                    )}
                  </div>
                </div>
                
                <div className="card-footer">
                  <div className="cert-duration">
                    <span className="duration-icon">⏱️</span>
                    <span className="duration-text">{cert.duration}</span>
                  </div>
                  <button className="preview-btn">
                    <FaEye /> Vista Previa
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vista Previa Modal */}
        {activePreview && (
          <div className="preview-modal-overlay" onClick={closePreview}>
            <motion.div 
              className="preview-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-title-section">
                  <h2 className="modal-title">{activePreview.name}</h2>
                  <div className="modal-subtitle">
                    <span className="institution-badge">{activePreview.institution}</span>
                    <span className="date-badge">{activePreview.date}</span>
                  </div>
                </div>
                <button className="modal-close-btn" onClick={closePreview}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-content">
                <div className="certificate-preview">
                  <div className="preview-header">
                    <div className="preview-badge">
                      <FaFilePdf className="preview-badge-icon" />
                      <span>Certificado Oficial</span>
                    </div>
                    <div className="credential-id">
                      <strong>ID:</strong> {activePreview.credentialId}
                    </div>
                  </div>
                  
                  <div className="preview-body">
                    <div className="certificate-details">
                      <h3 className="preview-course-title">{activePreview.name}</h3>
                      <div className="instructor-info">
                        <span className="instructor-label">Instructor:</span>
                        <span className="instructor-name">{activePreview.instructor}</span>
                      </div>
                      <div className="duration-info">
                        <span className="duration-label">Duración:</span>
                        <span className="duration-value">{activePreview.duration}</span>
                      </div>
                      
                      <div className="skills-section">
                        <h4>Habilidades Desarrolladas:</h4>
                        <div className="skills-grid">
                          {activePreview.skills.map((skill, idx) => (
                            <span key={idx} className="skill-chip">{skill}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="description-section">
                        <h4>Descripción del Programa:</h4>
                        <p className="preview-description">{activePreview.description}</p>
                      </div>
                    </div>
                    
                    <div className="preview-actions">
                      <button 
                        className="download-full-btn"
                        onClick={() => handleDownload(activePreview)}
                      >
                        <FaDownload /> Descargar PDF Completo
                      </button>
                      <button className="close-preview-btn" onClick={closePreview}>
                        Cerrar Vista Previa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Footer */}
        <div className="certificates-footer">
          <p className="footer-text">
            📄 <strong>Nota:</strong> Todos los certificados son verificables y cuentan con ID único de validación
          </p>
        </div>
      </div>

      <style jsx>{`
        .all-certificates-section {
          padding: 2rem;
          background: #121212;
          min-height: 100vh;
          padding-top: 80px;
        }

        .all-certificates-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .certificates-header {
          margin-bottom: 3rem;
          position: relative;
        }

        .back-btn {
          position: absolute;
          top: 0;
          left: 0;
          background: #333;
          color: #fff;
          border: 1px solid #444;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .back-btn:hover {
          background: #444;
          border-color: #555;
        }

        .header-content {
          text-align: center;
          padding-top: 3rem;
        }

        .main-title {
          font-size: 3rem;
          color: #fff;
          margin: 0.5rem 0;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .subtitle {
          color: #aaa;
          font-size: 1.2rem;
          max-width: 600px;
          margin: 1rem auto;
          line-height: 1.6;
        }

        /* Grid Section */
        .certificates-grid-section {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 2.5rem;
          border: 1px solid #333;
          margin-bottom: 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .section-title {
          color: #fff;
          font-size: 1.8rem;
          margin: 0;
          font-weight: 600;
        }

        .results-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .results-count {
          color: #888;
          font-size: 1rem;
          background: #222;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 500;
          border: 1px solid #333;
        }

        /* Grid de certificados */
        .certificates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .certificate-card {
          background: #222;
          border-radius: 12px;
          border: 1px solid #333;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          cursor: pointer;
          position: relative;
        }

        .certificate-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #444;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .certificate-card:hover::before {
          transform: scaleX(1);
          background: #555;
        }

        .certificate-card:hover {
          transform: translateY(-5px);
          border-color: #555;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .card-header {
          padding: 1.5rem 1.5rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .certificate-badge {
          background: #333;
          padding: 0.4rem 1rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid #444;
        }

        .badge-icon {
          color: #888;
          font-size: 1rem;
        }

        .badge-text {
          color: #888;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .certificate-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.3rem;
        }

        .cert-date {
          color: #aaa;
          font-size: 0.9rem;
          font-weight: 600;
          background: #333;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }

        .cert-institution {
          color: #777;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .card-content {
          padding: 1rem 1.5rem;
          flex: 1;
        }

        .cert-title {
          color: #fff;
          font-size: 1.3rem;
          margin: 0 0 1rem 0;
          line-height: 1.4;
          font-weight: 600;
          min-height: 3.6rem;
        }

        .cert-description {
          color: #aaa;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          min-height: 4.5rem;
        }

        .cert-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }

        .skill-tag {
          background: #333;
          color: #aaa;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid #444;
        }

        .skill-tag-more {
          background: #2a2a2a;
          color: #777;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .card-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cert-duration {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #777;
          font-size: 0.9rem;
        }

        .duration-icon {
          font-size: 0.9rem;
        }

        .preview-btn {
          background: #333;
          color: #aaa;
          border: 1px solid #444;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .preview-btn:hover {
          background: #444;
          color: #fff;
        }

        /* Modal de Vista Previa */
        .preview-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .preview-modal {
          background: #1a1a1a;
          border-radius: 12px;
          border: 1px solid #333;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          padding: 2rem 2rem 1.5rem;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .modal-title-section {
          flex: 1;
        }

        .modal-title {
          color: #fff;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
          font-weight: 700;
        }

        .modal-subtitle {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .institution-badge {
          background: #333;
          color: #aaa;
          padding: 0.4rem 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid #444;
        }

        .date-badge {
          background: #2a2a2a;
          color: #888;
          padding: 0.4rem 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .modal-close-btn {
          background: #333;
          color: #aaa;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          margin-left: 1rem;
        }

        .modal-close-btn:hover {
          background: #444;
          color: #fff;
        }

        .modal-content {
          padding: 2rem;
        }

        .certificate-preview {
          background: #222;
          border-radius: 8px;
          border: 1px solid #333;
          overflow: hidden;
        }

        .preview-header {
          padding: 1.5rem;
          background: #2a2a2a;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .preview-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #aaa;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .preview-badge-icon {
          color: #888;
          font-size: 1.3rem;
        }

        .credential-id {
          color: #aaa;
          background: #333;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .preview-body {
          padding: 2rem;
        }

        .certificate-details {
          margin-bottom: 2.5rem;
        }

        .preview-course-title {
          color: #fff;
          font-size: 1.5rem;
          margin: 0 0 1.5rem 0;
          font-weight: 600;
        }

        .instructor-info, .duration-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #2a2a2a;
          border-radius: 8px;
          border: 1px solid #333;
        }

        .instructor-label, .duration-label {
          color: #888;
          font-weight: 600;
          font-size: 0.9rem;
          min-width: 100px;
        }

        .instructor-name, .duration-value {
          color: #fff;
          font-weight: 500;
          font-size: 1rem;
        }

        .skills-section {
          margin-bottom: 2rem;
        }

        .skills-section h4 {
          color: #fff;
          font-size: 1.2rem;
          margin: 0 0 1rem 0;
          font-weight: 600;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .skill-chip {
          background: #333;
          color: #aaa;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid #444;
        }

        .description-section {
          margin-top: 2rem;
        }

        .description-section h4 {
          color: #fff;
          font-size: 1.2rem;
          margin: 0 0 1rem 0;
          font-weight: 600;
        }

        .preview-description {
          color: #aaa;
          font-size: 1rem;
          line-height: 1.7;
          background: #2a2a2a;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #333;
        }

        .preview-actions {
          display: flex;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid #333;
        }

        .download-full-btn {
          flex: 1;
          background: #333;
          color: #fff;
          border: 1px solid #444;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          transition: all 0.3s ease;
        }

        .download-full-btn:hover {
          background: #444;
        }

        .close-preview-btn {
          flex: 1;
          background: #2a2a2a;
          color: #aaa;
          border: 1px solid #333;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-preview-btn:hover {
          background: #333;
          color: #fff;
        }

        /* Footer */
        .certificates-footer {
          text-align: center;
          padding: 2rem;
          background: #1a1a1a;
          border-radius: 12px;
          border: 1px solid #333;
          margin-top: 3rem;
        }

        .footer-text {
          color: #777;
          font-size: 1rem;
          margin: 0;
          line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .all-certificates-section {
            padding: 1rem;
            padding-top: 70px;
          }

          .main-title {
            font-size: 2.2rem;
          }

          .subtitle {
            font-size: 1.1rem;
          }

          .back-btn {
            position: relative;
            margin-bottom: 1rem;
            align-self: flex-start;
          }

          .header-content {
            padding-top: 1rem;
          }

          .certificates-grid {
            grid-template-columns: 1fr;
          }

          .certificate-card {
            min-height: auto;
          }

          .cert-title {
            font-size: 1.2rem;
            min-height: auto;
          }

          .cert-description {
            min-height: auto;
            font-size: 0.9rem;
          }

          .preview-modal {
            margin: 1rem;
          }

          .modal-header {
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 1.5rem;
          }

          .modal-content {
            padding: 1.5rem;
          }

          .preview-body {
            padding: 1.5rem;
          }

          .preview-actions {
            flex-direction: column;
          }

          .skills-grid {
            gap: 0.5rem;
          }

          .skill-chip {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .certificates-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1025px) {
          .certificates-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1400px) {
          .certificates-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default AllCertificates;