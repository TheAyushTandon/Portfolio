import { useState, useRef, Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import TransitionOverlay from './components/TransitionOverlay';
import ClickSpark from './components/ClickSpark';

const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error('Lazy loading failed (stale chunk), reloading page...', error);
      window.location.reload();
      return { default: () => null };
    }
  });

const Projects = lazyWithRetry(() => import('./components/Projects'));
const Contact = lazyWithRetry(() => import('./components/Contact'));
const Experience = lazyWithRetry(() => import('./components/Experience'));
const Certifications = lazyWithRetry(() => import('./components/Certifications'));
const Heatmaps = lazyWithRetry(() => import('./components/Heatmaps'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAccessible, setIsAccessible] = useState(false);
  const transitionRef = useRef(null);
  const navigate = useNavigate();

  // On mount, check if previously set to accessible mode
  useEffect(() => {
    if (localStorage.getItem('accessible-mode') === 'true') {
      setIsAccessible(true);
      document.body.classList.add('accessible-mode');
    }
  }, []);

  const toggleAccessibility = () => {
    const newState = !isAccessible;
    setIsAccessible(newState);
    if (newState) {
      document.body.classList.add('accessible-mode');
      localStorage.setItem('accessible-mode', 'true');
    } else {
      document.body.classList.remove('accessible-mode');
      localStorage.setItem('accessible-mode', 'false');
    }
  };

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
      
      {/* Floating Accessibility Toggle */}
      <button 
        onClick={toggleAccessibility}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 100000,
          backgroundColor: 'var(--white)',
          border: '2px solid var(--black)',
          boxShadow: '4px 4px 0px var(--black)',
          padding: '8px 12px',
          cursor: 'pointer',
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          color: 'var(--black)',
          textTransform: 'uppercase',
          fontSize: '0.8rem',
          transform: isAccessible ? 'none' : 'skewX(-10deg)',
        }}
      >
        {isAccessible ? '👁️ STANDARD MODE' : '👁️ ACCESSIBLE MODE'}
      </button>
    </>
  );
}

export default App;
