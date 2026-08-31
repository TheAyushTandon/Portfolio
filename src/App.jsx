import { useState, useRef, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import TransitionOverlay from './components/TransitionOverlay';
import ClickSpark from './components/ClickSpark';

const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Experience = lazy(() => import('./components/Experience'));
const Certifications = lazy(() => import('./components/Certifications'));
const Heatmaps = lazy(() => import('./components/Heatmaps'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const transitionRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigate = (targetPage) => {
    if (transitionRef.current) {
      transitionRef.current.playTransition(targetPage);
    }
  };

  const onPageChange = (targetPage) => {
    if (targetPage === 'hero') {
      navigate('/');
    } else {
      navigate(`/${targetPage}`);
    }
  };

  return (
    <>
      <ClickSpark />
      <TransitionOverlay ref={transitionRef} onPageChange={onPageChange} />
      
      <Routes>
        <Route path="/" element={<Hero onNavigate={handleNavigate} />} />
        <Route path="/projects" element={<Suspense fallback={null}><Projects onNavigate={handleNavigate} /></Suspense>} />
        <Route path="/experience" element={<Suspense fallback={null}><Experience onNavigate={handleNavigate} /></Suspense>} />
        <Route path="/certifications" element={<Suspense fallback={null}><Certifications onNavigate={handleNavigate} /></Suspense>} />
        <Route path="/heatmaps" element={<Suspense fallback={null}><Heatmaps onNavigate={handleNavigate} /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={null}><Contact onNavigate={handleNavigate} /></Suspense>} />
      </Routes>
      
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
    </>
  );
}

export default App;
