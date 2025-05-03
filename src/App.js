import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Documents from './components/Documents';
import Contact from './components/Contact'; // Asegúrate de importar el componente
import Footer from './components/Footer';
import './App.css';

function App() {
  const [activeDoc, setActiveDoc] = useState(null);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Documents setActiveDoc={setActiveDoc} />
      <Contact /> {/* Añade esta línea para mostrar el componente */}
      
      <AnimatePresence>
        {activeDoc && (
          <motion.div 
            className="document-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDoc(null)}
          >
            <motion.div 
              className="document-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setActiveDoc(null)}>
                &times;
              </button>
              <iframe 
                src={activeDoc.url} 
                title={activeDoc.name}
                className="document-iframe"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}

export default App;