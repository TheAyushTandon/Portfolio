import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero({ onNavigate }) {
  const containerRef = useRef(null);
  const heroImgRef = useRef(null);
  const menuRef = useRef(null);

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

  const menuItems = ["PROJECTS", "EXPERIENCE", "CERTIFICATIONS", "HEATMAPS", "CONTACT"];

  return (
    <div ref={containerRef} className="absolute-fill" style={{ overflow: 'hidden' }}>
      {/* Static Background */}
      <div 
        className="absolute-fill"
        style={{
          backgroundImage: "url('/bg.webp')",
          backgroundSize: '100% 100%', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}
      />

      {/* Hero Character Image */}
      <div 
        className="absolute-fill"
        style={{ zIndex: 2, pointerEvents: 'none' }}
      >
        <img 
          ref={heroImgRef}
          src="/hero.webp" 
          alt="Ayush Tandon - Full-Stack Software Developer and AI Builder"
          className="hero-img"
          fetchPriority="high"
        />
      </div>

      {/* Menu Options */}
      <div className="hero-menu">
        <div ref={menuRef} className="hero-menu-list">
          {menuItems.map((item, i) => (
            <div 
              key={i} 
              className="menu-item-box"
              onClick={(e) => {
                // Button turns red on click
                e.currentTarget.style.backgroundColor = 'var(--red)';
                e.currentTarget.style.boxShadow = '10px 10px 0px var(--black)';
                
                const textEl = e.currentTarget.querySelector('h2');
                if (textEl) textEl.style.color = 'var(--white)';
                
                const iconEl = e.currentTarget.querySelector('span');
                if (iconEl) iconEl.style.color = 'var(--black)';

                // Trigger navigation transition
                setTimeout(() => {
                  onNavigate(item.toLowerCase());
                }, 150);
              }}
            >
              <h2 className="font-p5 hero-menu-text">
                <span className="hero-menu-icon">▶</span> {item}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
