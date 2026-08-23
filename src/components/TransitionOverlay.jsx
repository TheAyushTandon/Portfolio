import { useRef, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';

const TransitionOverlay = forwardRef(({ onPageChange }, ref) => {
  const containerRef = useRef(null);
  const pillarsRef = useRef([]);

  useImperativeHandle(ref, () => ({
    playTransition: (targetPage) => {
      if (containerRef.current) {
        containerRef.current.style.pointerEvents = 'all';
      }
      
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = 'none';
          }
        }
      });
      
      // Animate pillars IN
      tl.to(pillarsRef.current, {
        y: "0vh",
        duration: 0.5,
        stagger: {
          amount: 0.4,
          from: "start"
        },
        ease: "power3.inOut"
      });

      // Change page state in the background while screen is black
      tl.call(() => {
        onPageChange(targetPage);
      });

      // Animate pillars OUT
      tl.to(pillarsRef.current, {
        y: (i) => i % 2 === 0 ? "-100vh" : "100vh",
        duration: 0.5,
        stagger: {
          amount: 0.4,
          from: "start"
        },
        ease: "power3.inOut"
      }, "+=0.1"); // slight pause when fully black
    }
  }));

  const numPillars = 10;
  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
        zIndex: 9990, pointerEvents: 'none', display: 'flex' 
      }}
    >
      {Array.from({ length: numPillars }).map((_, i) => {
        const isEven = i % 2 === 0;
        return (
          <div 
            key={i}
            ref={el => pillarsRef.current[i] = el}
            style={{
              flex: 1,
              height: '100vh',
              backgroundColor: 'var(--black)',
              transform: `translateY(${isEven ? '-100vh' : '100vh'})`,
              borderLeft: i > 0 ? '3px solid var(--red)' : 'none',
              borderRight: i < numPillars - 1 ? '3px solid var(--red)' : 'none',
            }}
          />
        )
      })}
    </div>
  );
});

export default TransitionOverlay;
