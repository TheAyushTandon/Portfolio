import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import PixelSwap from './PixelSwap';

const ResumeModal = lazy(() => import('./ResumeModal'));

export default function Hero({ onNavigate }) {
  const containerRef = useRef(null);
  const heroImgRef = useRef(null);
  const menuRef = useRef(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return;

      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20; 
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(heroImgRef.current, {
        x: xPos * 2,
        y: yPos * 2,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(menuRef.current, {
        x: -xPos * 1.5,
        y: -yPos * 1.5,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const menuItems = ["PROJECTS", "EXPERIENCE", "CERTIFICATIONS", "HEATMAPS", "CONTACT", "RESUME"];

  return (
    <div ref={containerRef} className="absolute-fill" style={{ overflow: 'hidden' }}>
      {/* Static Background */}
      <div className="absolute-fill hero-bg" />

      {/* Hero Character Image */}
      <div 
        className="absolute-fill"
        style={{ zIndex: 2, pointerEvents: 'none' }}
      >
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-mobile.webp" type="image/webp" />
          <img 
            ref={heroImgRef}
            src="/hero.webp" 
            alt="Ayush Tandon - Full-Stack Software Developer and AI Builder"
            className="hero-img"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      {/* Menu Options */}
      <div className="hero-menu">
        <div ref={menuRef} className="hero-menu-list">
          {menuItems.map((item, i) => (
            <div 
              key={i} 
              className="menu-item-box menu-item-pixel-swap"
              onClick={(e) => {
                const target = e.currentTarget;
                target.style.boxShadow = '10px 10px 0px var(--black)';

                // Trigger navigation transition or modal
                setTimeout(() => {
                  if (item === 'RESUME') {
                    setIsResumeOpen(true);
                    target.style.removeProperty('box-shadow');
                  } else {
                    onNavigate(item.toLowerCase());
                  }
                }, 150);
              }}
            >
              <PixelSwap
                pattern="pointer"
                pixelSize={20}
                pixelRadius={0}
                duration={360}
                pixelDuration={280}
                randomness={0.25}
                bounce={0.25}
                trigger="hover"
                intro={false}
                firstContent={
                  <div className="hero-pixel-content hero-pixel-default">
                    <h2 className="font-p5 hero-menu-text">
                      <span className="hero-menu-icon">▶</span> {item}
                    </h2>
                  </div>
                }
                secondContent={
                  <div className="hero-pixel-content hero-pixel-hovered">
                    <h2 className="font-p5 hero-menu-text hero-menu-text-white">
                      <span className="hero-menu-icon hero-menu-icon-black">▶</span> {item}
                    </h2>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Persona 5 Resume Modal */}
      {isResumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
