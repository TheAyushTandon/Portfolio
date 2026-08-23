import { useState, useRef } from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import TransitionOverlay from './components/TransitionOverlay';

import ClickSpark from './components/ClickSpark';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('hero');
  const transitionRef = useRef(null);

  const navigate = (targetPage) => {
    if (transitionRef.current) {
      transitionRef.current.playTransition(targetPage);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'hero':
        return <Hero onNavigate={navigate} />;
      case 'projects':
        return <Projects onNavigate={navigate} />;
      case 'experience':
        return <Experience onNavigate={navigate} />;
      case 'certifications':
        return <Certifications onNavigate={navigate} />;
      case 'contact':
        return <Contact onNavigate={navigate} />;
      default:
        return <Hero onNavigate={navigate} />;
    }
  };

  return (
    <>
      <ClickSpark />
      <TransitionOverlay ref={transitionRef} onPageChange={setCurrentPage} />
      
      {renderPage()}
      
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
    </>
  );
}

export default App;
