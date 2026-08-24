import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "Bennett University Hatchery",
    date: "Jul 2026 - Present · 2 mos",
    location: "Greater Noida Omicron, India · On-site",
    type: "INTERNSHIP",
    skills: ["Software Design", "Web Development", "+1 skill"],
    details: [
      "Developed and deployed the official web platform for Bennett University's Hatchery.",
      "Built the platform using Laravel (PHP), Next.js, Node.js, GSAP, and modern frontend technologies.",
      "Designed and developed a custom CRM platform for startup management.",
      "Implemented features for startup lifecycle management, including progress monitoring.",
      "Collaborated with stakeholders to understand operational requirements."
    ]
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "StepCode",
    date: "Jun 2026 - Present · 3 mos",
    location: "Greater Noida · On-site",
    type: "FULL TIME",
    skills: [],
    details: []
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "SkewX",
    date: "Mar 2026 - Present · 6 mos",
    location: "Dadri, Uttar Pradesh, India · Remote",
    type: "FREELANCE",
    skills: ["Front-End Development", "Web Services API"],
    details: [
      "Designed and developed multiple micro frontends, contributing to a scalable architecture.",
      "Built API factories and integrated real-time APIs for perpetual DEXs.",
      "Applied modern UI/UX principles to create intuitive, high-performance dashboard experiences.",
      "Identified and resolved architectural and implementation issues early."
    ],
    link: "https://SkewX.fun"
  },
  {
    id: 4,
    role: "Training and Prep Team",
    company: "Dean Career Cloud, Bennett University",
    date: "Feb 2026 - May 2026 · 4 mos",
    location: "Uttar Pradesh, India · On-site",
    type: "FULL-TIME",
    skills: ["Web Development"],
    details: [
      "Organizing skill-based workshops and training sessions (SDE, Data, Core CS, etc.).",
      "Designing structured preparation plans for placements and internships.",
      "Coordinating domain-wise training programs based on current industry needs.",
      "Helping students strengthen problem-solving, technical concepts, and interview readiness."
    ]
  },
  {
    id: 5,
    role: "Vice President",
    company: "AI Society Bennett Univ.",
    date: "Sep 2025 - May 2026 · 9 mos",
    location: "Noida, Uttar Pradesh, India · On-site",
    type: "FULL-TIME",
    skills: ["Web Development", "Artificial Intelligence (AI)"],
    details: [
      "Planning and overseeing AI/ML workshops, seminars, and hands-on sessions.",
      "Guiding students in practical applications of AI, including ML projects and hackathons.",
      "Collaborating with faculty, industry professionals, and student teams.",
      "Supporting the President in strategic decision-making, event execution, and team coordination.",
      "Encouraging a culture of experimentation, problem-solving, and ethical AI awareness."
    ]
  },
  {
    id: 6,
    role: "Project Intern",
    company: "CorpVenue",
    date: "Aug 2025 - Nov 2025 · 4 mos",
    location: "Mumbai, Maharashtra, India · Remote",
    type: "INTERNSHIP",
    skills: ["Web Development", "Machine Learning", "+1 skill"],
    details: []
  }
];

const education = [
  {
    id: 7,
    role: "B.Tech Computer Science",
    company: "Bennett University",
    date: "Aug 2024 - Aug 2028",
    location: "Greater Noida",
    type: "ACADEMIA"
  },
  {
    id: 8,
    role: "Student",
    company: "Allen Career Institute Kota",
    date: "Jun 2022 - Jul 2024 · 2 yrs 2 mos",
    location: "Kota, Rajasthan, India · On-site",
    type: "ACADEMIA"
  },
  {
    id: 9,
    role: "Intermediate",
    company: "S. R. Public School",
    date: "Apr 2022 - Mar 2024",
    location: "Kota",
    type: "ACADEMIA"
  },
  {
    id: 10,
    role: "Matriculation (IT)",
    company: "St. Mary's Sr. Sec. School",
    date: "Apr 2021 - Apr 2022",
    location: "Haridwar",
    type: "ACADEMIA"
  }
];

function TimelineCard({ item, isLeft }) {
  const cardRef = useRef(null);
  const tagRef = useRef(null);
  const contentRef = useRef(null);
  const detailsRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)"
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;
        
        // On mobile, force right-side animation behavior for consistency
        const effectiveLeft = isDesktop ? isLeft : false;

        // Setup initial punchy states
        gsap.set(tagRef.current, { scale: 0, opacity: 0, rotation: effectiveLeft ? 15 : -15 });
        gsap.set(contentRef.current, { x: effectiveLeft ? -150 : 150, opacity: 0, skewX: effectiveLeft ? -10 : 10 });
        if (detailsRef.current) gsap.set(detailsRef.current.children, { y: 20, opacity: 0 });
        if (skillsRef.current) gsap.set(skillsRef.current.children, { scale: 0, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardRef.current,
            scroller: "#experience-container",
            start: isMobile ? "top 95%" : "top 85%", // Mobile triggers slightly earlier
            toggleActions: "play none none reverse" 
          }
        });
        
        tl.to(contentRef.current, {
          x: 0,
          opacity: 1,
          skewX: effectiveLeft ? -2 : 2,
          duration: 0.5,
          ease: "back.out(1.2)"
        })
        .to(tagRef.current, {
          scale: 1,
          opacity: 1,
          rotation: effectiveLeft ? -5 : 5,
          duration: 0.4,
          ease: "back.out(3)" 
        }, "-=0.3")

        if (detailsRef.current && detailsRef.current.children.length > 0) {
          tl.to(detailsRef.current.children, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.4,
            ease: "power2.out"
          }, "-=0.2");
        }
        
        if (skillsRef.current && skillsRef.current.children.length > 0) {
          tl.to(skillsRef.current.children, {
            scale: 1,
            opacity: 1,
            stagger: 0.05,
            duration: 0.3,
            ease: "back.out(2)"
          }, "-=0.2");
        }
      });
    });

    return () => ctx.revert();
  }, [isLeft]);

  return (
    <div 
      ref={cardRef} 
      className={`timeline-row ${isLeft ? 'left' : 'right'}`}
      style={{ zIndex: 2, paddingBottom: '2rem' }}
    >
      <div 
        className="timeline-content-wrapper"
      >
        {/* Date Tag */}
        <div 
          ref={tagRef}
          className="font-p5 timeline-tag"
        >
          {item.date}
        </div>

        {/* Main Content Box */}
        <div 
          ref={contentRef}
          style={{
            backgroundColor: 'var(--white)',
            border: '4px solid var(--black)',
            boxShadow: '8px 8px 0px var(--red)',
            padding: '2rem',
            zIndex: 5,
            width: '100%'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span 
              className="font-p5 text-p5-red" 
              style={{ fontSize: '1rem', letterSpacing: '2px', background: 'var(--black)', padding: '0.2rem 0.5rem', color: 'white' }}
            >
              {item.type}
            </span>
            {item.link && (
              <a 
                href={item.link} 
                target="_blank" 
                rel="noreferrer"
                style={{ color: 'var(--black)', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', fontWeight: 'bold' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--red)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--black)' }}
              >
                <span className="font-p5">VIEW</span> <ExternalLink size={20} strokeWidth={3} />
              </a>
            )}
          </div>

          <h2 className="font-p5" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', margin: '0 0 0.5rem 0', color: 'var(--black)', lineHeight: 1 }}>
            {item.role.toUpperCase()}
          </h2>
          <h3 style={{ fontFamily: 'Roboto', fontSize: '1.2rem', margin: '0 0 1rem 0', color: 'var(--red)', fontWeight: 800 }}>
            {item.company} // {item.location}
          </h3>

          {item.details && item.details.length > 0 && (
            <ul ref={detailsRef} style={{ margin: 0, paddingLeft: '1.5rem', fontFamily: 'Roboto', fontSize: '1.05rem', color: 'var(--black)', lineHeight: 1.5 }}>
              {item.details.map((detail, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {detail}
                </li>
              ))}
            </ul>
          )}

          {item.skills && item.skills.length > 0 && (
            <div ref={skillsRef} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {item.skills.map((skill, idx) => (
                <span key={idx} className="font-p5" style={{ 
                  backgroundColor: 'var(--red)', 
                  color: 'var(--white)', 
                  padding: '0.4rem 0.8rem', 
                  fontSize: '0.9rem',
                  border: '2px solid var(--black)',
                  boxShadow: '3px 3px 0px var(--black)'
                }}>
                  {skill.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Experience({ onNavigate }) {
  const lineRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (lineRef.current && timelineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          { 
            scaleY: 1, 
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              scroller: "#experience-container",
              start: "top 70%", // Start drawing when timeline top hits 70% of viewport
              end: "bottom 70%", // Finish when timeline bottom hits 70% of viewport
              scrub: 1
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="experience-container" className="absolute-fill bg-p5-white" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundSize: '30px 30px',
          backgroundImage: 'radial-gradient(circle, var(--black) 2px, transparent 2.5px)',
          opacity: 0.1,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1, padding: '4rem 2rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
          <h1 className="font-p5 text-p5-red" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', transform: 'skewX(-8deg)', textShadow: '6px 6px 0px var(--black)', margin: 0, lineHeight: 1 }}>
            DOSSIER: EXPERIENCE
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

        {/* Timeline Container */}
        <div ref={timelineRef} style={{ position: 'relative', paddingBottom: '5rem' }}>
          {/* Central Jagged Line */}
          <div ref={lineRef} className="timeline-center-line" />

          {experiences.map((exp, i) => (
            <TimelineCard key={exp.id} item={exp} isLeft={i % 2 === 0} />
          ))}

          <h2 className="font-p5 text-p5-black" style={{ 
            fontSize: 'clamp(3rem, 6vw, 6rem)', 
            transform: 'skewX(5deg)', 
            textShadow: '4px 4px 0px var(--white), 8px 8px 0px var(--red)', 
            margin: '8rem 0 2rem 0', 
            textAlign: 'center', 
            position: 'relative', 
            zIndex: 2,
            lineHeight: 1
          }}>
            ACADEMIC ARCHIVES
          </h2>

          {education.map((edu, i) => (
            <TimelineCard key={edu.id} item={edu} isLeft={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
