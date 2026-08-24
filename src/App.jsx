import { useState, useRef, Suspense, lazy } from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import TransitionOverlay from './components/TransitionOverlay';
import ClickSpark from './components/ClickSpark';

const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Experience = lazy(() => import('./components/Experience'));
const Certifications = lazy(() => import('./components/Certifications'));

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
        return <Suspense fallback={null}><Projects onNavigate={navigate} /></Suspense>;
      case 'experience':
        return <Suspense fallback={null}><Experience onNavigate={navigate} /></Suspense>;
      case 'certifications':
        return <Suspense fallback={null}><Certifications onNavigate={navigate} /></Suspense>;
      case 'contact':
        return <Suspense fallback={null}><Contact onNavigate={navigate} /></Suspense>;
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
