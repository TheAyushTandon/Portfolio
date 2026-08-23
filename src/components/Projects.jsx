import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ExternalLink, Code } from 'lucide-react';

const GithubIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const mockProjects = [
  {
    id: 1,
    title: "PHANTOM THIEVES DB",
    overview: "A massive, encrypted database for tracking all known targets, shadows, and metaverse distortions in real time.",
    github: "https://github.com",
    site: "https://example.com",
    stack: ["React", "Node.js", "MongoDB", "GSAP"]
  },
  {
    id: 2,
    title: "MEMENTOS NAVIGATOR",
    overview: "Real-time mapping application to procedurally navigate the collective depths of human cognition.",
    github: "https://github.com",
    site: "https://example.com",
    stack: ["Three.js", "Python", "PostgreSQL", "WebSockets"]
  },
  {
    id: 3,
    title: "CALLING CARD GENERATOR",
    overview: "Secure, untraceable message delivery system to boldly declare intentions to high-profile targets.",
    github: "https://github.com",
    site: "https://example.com",
    stack: ["Vue", "Express", "Redis", "Cryptography"]
  }
];

function ProjectCard({ project, index, onOpenStack }) {
  const isLeft = index % 2 === 0;
  
  const cardRef = useRef(null);
  const detailsRef = useRef(null);
  const armsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add({
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)"
      }, (context) => {
        let { isDesktop } = context.conditions;
        const effectiveLeft = isDesktop ? isLeft : true; 
        
        // Initial setup
        gsap.set(detailsRef.current, { y: -30, opacity: 0 });
        gsap.set(armsRef.current, { x: effectiveLeft ? -50 : 50, opacity: 0, pointerEvents: 'none' });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            scroller: "#projects-container",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
        
        tl.to(detailsRef.current, { 
             y: 0, 
             opacity: 1, 
             duration: 0.3, 
             ease: 'power3.out' 
        })
        .to(armsRef.current, { 
             x: 0, 
             opacity: 1, 
             stagger: 0.1, 
             duration: 0.4, 
             ease: 'back.out(1.5)',
             pointerEvents: 'auto'
        }, "-=0.15");
      });
    });
    return () => ctx.revert();
  }, [isLeft]);

  const arms = [
    { label: 'GITHUB', icon: <GithubIcon size={20} strokeWidth={2.5} />, action: () => window.open(project.github, '_blank') },
    { label: 'LIVE SITE', icon: <ExternalLink size={20} strokeWidth={2.5} />, action: () => window.open(project.site, '_blank') },
    { label: 'TECH STACK', icon: <Code size={20} strokeWidth={2.5} />, action: () => onOpenStack(project.stack) }
  ];

  const effectiveLeft = window.innerWidth <= 768 ? true : isLeft;

  return (
    <div 
      ref={cardRef}
      className={`project-row ${isLeft ? 'left' : 'right'}`}
      style={{ zIndex: mockProjects.length - index }}
    >
      <div 
        className="project-content-wrapper"
      >
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%' }}>
          
          <div 
            className="menu-item-box force-active" 
            style={{ 
              position: 'relative', 
              zIndex: 3, 
              cursor: 'url(/cursor.svg) 11 6, default'
            }}
          >
             <h2 className="font-p5" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', margin: 0, color: 'var(--black)' }}>
               {project.title}
             </h2>
          </div>
          
          <div 
            ref={detailsRef}
            style={{
              position: 'relative',
              marginTop: '-15px', 
              marginLeft: effectiveLeft ? '5%' : '0',
              marginRight: !effectiveLeft ? '5%' : '0',
              backgroundColor: 'var(--black)',
              color: 'var(--white)',
              padding: '2.5rem 1.5rem 1rem 1.5rem', 
              border: '4px solid var(--black)',
              boxShadow: '6px 6px 0px rgba(0,0,0,0.5)',
              width: '90%',
              zIndex: 2,
              transform: 'translateY(-30px) skewX(-5deg)',
              opacity: 0,
              pointerEvents: 'none'
            }}
          >
            <p style={{ fontFamily: 'Roboto', fontSize: '1.2rem', lineHeight: 1.4, margin: 0 }}>
              {project.overview}
            </p>
          </div>
        </div>

        <div className="project-arms-container">
          {arms.map((arm, i) => {
            const effectiveLeft = window.innerWidth <= 768 ? true : isLeft;
            return (
              <div 
                 key={arm.label}
                 ref={el => armsRef.current[i] = el}
                 className="menu-item-box"
                 style={{
                   padding: '0.8rem 2rem',
                   minWidth: '180px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: effectiveLeft ? 'flex-start' : 'flex-end',
                   gap: '15px',
                   transform: `translateX(${effectiveLeft ? '-50px' : '50px'}) skewX(-10deg)`,
                   opacity: 0,
                   pointerEvents: 'none',
                   marginLeft: effectiveLeft ? `${(i) * 30}px` : '0', 
                   marginRight: !effectiveLeft ? `${(i) * 30}px` : '0',
                   backgroundColor: 'var(--red)',
                   color: 'var(--white)',
                   borderWidth: '3px',
                   boxShadow: '4px 4px 0px var(--black)',
                   cursor: 'url(/cursor.svg) 11 6, pointer',
                 }}
               onClick={(e) => {
                 e.stopPropagation();
                 arm.action();
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.backgroundColor = 'var(--white)';
                 e.currentTarget.style.color = 'var(--black)';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.backgroundColor = 'var(--red)';
                 e.currentTarget.style.color = 'var(--white)';
               }}
            >
              {effectiveLeft && arm.icon}
              <h3 className="font-p5" style={{ fontSize: '1.4rem', margin: 0, marginTop: '2px' }}>{arm.label}</h3>
              {!effectiveLeft && arm.icon}
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ onNavigate }) {
  const [activeStack, setActiveStack] = useState(null);

  return (
    <div id="projects-container" className="absolute-fill bg-p5-white" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundSize: '20px 20px',
          backgroundImage: 'radial-gradient(circle, var(--black) 2px, transparent 2.5px)',
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1, padding: '4rem 2rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5rem', flexWrap: 'wrap', gap: '2rem' }}>
          <h1 className="font-p5 text-p5-red" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', transform: 'skewX(-10deg)', textShadow: '6px 6px 0px var(--black)', margin: 0, lineHeight: 1 }}>
            PROJECTS PALACE
          </h1>
          
          <div 
            className="menu-item-box"
            onClick={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--red)';
              e.currentTarget.style.boxShadow = '10px 10px 0px var(--black)';
              const textEl = e.currentTarget.querySelector('h2');
              if (textEl) textEl.style.color = 'var(--white)';
              const iconEl = e.currentTarget.querySelector('span');
              if (iconEl) iconEl.style.color = 'var(--black)';

              setTimeout(() => onNavigate('hero'), 150);
            }}
          >
            <h2 className="font-p5 hero-menu-text" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <span className="hero-menu-icon" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>▶</span> BACK TO HQ
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '10rem' }}>
          {mockProjects.map((project, i) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={i} 
              onOpenStack={setActiveStack} 
            />
          ))}
        </div>
      </div>

      {activeStack && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div 
            className="menu-item-box" 
            style={{ 
              padding: '3rem', 
              position: 'relative', 
              maxWidth: '90vw',
              width: '600px', 
              transform: 'skewX(-5deg)',
              backgroundColor: 'var(--white)',
              cursor: 'auto'
            }}
          >
            <button 
              onClick={() => setActiveStack(null)}
              className="font-p5"
              style={{ 
                position: 'absolute', 
                top: '-20px', 
                right: '-20px', 
                background: 'var(--red)', 
                color: 'white', 
                padding: '1rem 1.5rem', 
                border: '4px solid black', 
                cursor: 'url(/cursor.svg) 11 6, pointer',
                fontSize: '2rem',
                lineHeight: 1,
                boxShadow: '4px 4px 0px var(--black)'
              }}
            >
              X
            </button>
            <h2 className="font-p5 text-p5-black" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1 }}>TECH STACK</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
               {activeStack.map(tech => (
                 <span 
                   key={tech} 
                   className="font-p5" 
                   style={{ 
                     background: 'var(--black)', 
                     color: 'var(--white)', 
                     padding: '0.8rem 1.5rem', 
                     fontSize: '1.5rem',
                     transform: 'skewX(5deg)'
                   }}
                 >
                   {tech}
                 </span>
               ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
