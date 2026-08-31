import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    title: "AWS Certified AI Practitioner",
    org: "Amazon Web Services (AWS)",
    date: "Issued Apr 2026",
    link: "https://www.credly.com/badges/deb962c7-267c-4164-97be-ba73f1a15e2e/linked_in_profile",
    skills: ["Artificial Intelligence (AI)"]
  },
  {
    id: 2,
    title: "Build AI Agents Using MCP",
    org: "Coursera",
    date: "Issued Mar 2026",
    link: "https://www.credly.com/badges/6ae7a4b5-5577-4f6f-a276-c517cd295f4c/linked_in_profile",
    skills: ["Artificial Intelligence (AI)"]
  },
  {
    id: 3,
    title: "Agentic AI with LangChain and LangGraph",
    org: "IBM",
    date: "Issued Mar 2026",
    link: "https://www.coursera.org/account/accomplishments/verify/Y6EFWGAVVICV",
    skills: ["Artificial Intelligence (AI)"]
  },
  {
    id: 4,
    title: "Fundamentals of Building AI Agents",
    org: "Coursera",
    date: "Issued Mar 2026",
    link: "https://www.credly.com/badges/b3cc7ea7-11b3-4165-9821-8f745f141e50/linked_in_profile",
    skills: ["Artificial Intelligence (AI)"]
  },
  {
    id: 5,
    title: "Build Multimodal Generative AI Applications",
    org: "IBM",
    date: "Issued Mar 2026",
    link: "https://linkedin.com/in/theayushtandon/details/certifications/",
    skills: ["Artificial Intelligence (AI)"]
  },
  {
    id: 6,
    title: "Advanced RAG with Vector Databases and Retrievers",
    org: "IBM",
    date: "Issued Mar 2026",
    link: "https://linkedin.com/in/theayushtandon/details/certifications/",
    skills: ["Artificial Intelligence (AI)"]
  },
  {
    id: 7,
    title: "The Bits and Bytes of Computer Networking",
    org: "Google",
    date: "Issued Mar 2026",
    link: "https://www.coursera.org/account/accomplishments/verify/LSN48C1E98WO",
    skills: ["Computer Networking"]
  },
  {
    id: 8,
    title: "Networking Basics and TCP/IP Fundamentals",
    org: "Packt",
    date: "Issued Mar 2026",
    link: "https://www.coursera.org/account/accomplishments/verify/SEG33DMDBONO",
    skills: ["Computer Networking"]
  },
  {
    id: 9,
    title: "Build RAG Applications",
    org: "Coursera",
    date: "Issued Mar 2026",
    link: "https://www.credly.com/badges/7eb89517-500e-4ac7-aa81-8bf6dcbc0bfd/linked_in_profile",
    skills: ["Retrieval-Augmented Generation (RAG)"]
  },
  {
    id: 10,
    title: "Develop Generative AI Applications",
    org: "Coursera",
    date: "Issued Mar 2026",
    link: "https://www.credly.com/badges/3d0e83b3-11c6-4f9c-b60e-65a890e2e8da/linked_in_profile",
    skills: ["Artificial Intelligence (AI)"]
  },
  {
    id: 11,
    title: "Agentic AI with LangGraph, CrewAI, AutoGen & BeeAI",
    org: "IBM",
    date: "Issued Mar 2026",
    link: "https://www.coursera.org/account/accomplishments/verify/QH5OHJH3Q9ZI",
    skills: ["Artificial Intelligence (AI)"]
  },
  {
    id: 12,
    title: "Operating Systems and You: Becoming a Power User",
    org: "Google",
    date: "Issued Mar 2026",
    link: "https://www.coursera.org/account/accomplishments/verify/T4EHHEFFV3OR",
    skills: ["Operating Systems"]
  },
  {
    id: 13,
    title: "Python Basics",
    org: "United Latino Students Association",
    date: "Issued Jan 2026",
    link: "https://www.coursera.org/account/accomplishments/verify/F3E4T5NQ6TRD",
    skills: ["Artificial Intelligence (AI)", "Python"]
  },
  {
    id: 14,
    title: "Entrepreneurship Strategy: From Ideation to Exit",
    org: "HEC Paris",
    date: "Issued Dec 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/VK9SYEDOE8X8",
    skills: ["Entrepreneurship"]
  }
];

export default function Certifications({ onNavigate }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.cert-card');
      
      cards.forEach((card, i) => {
        gsap.fromTo(card, 
          { 
            y: 150, 
            opacity: 0, 
            rotation: i % 2 === 0 ? -15 : 15,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            rotation: i % 2 === 0 ? -2 : 2,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              scroller: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getLogoUrl = (org) => {
    switch(org) {
      case "Amazon Web Services (AWS)": return "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg";
      case "Coursera": return "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg";
      case "IBM": return "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg";
      case "Google": return "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
      case "Packt": return "https://upload.wikimedia.org/wikipedia/commons/d/d7/Packt-Logo.png";
      case "HEC Paris": return "https://upload.wikimedia.org/wikipedia/en/5/5f/HEC_Paris_logo.svg";
      case "United Latino Students Association": return "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg";
      default: return "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg";
    }
  };

  return (
    <div id="cert-container" ref={containerRef} className="absolute-fill bg-p5-red" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
      
      {/* Background Pattern */}
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1)), linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0.1))',
          backgroundPosition: '0 0, 20px 20px',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1, padding: '4rem 2rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <h1 className="font-p5 text-p5-black" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', transform: 'skewX(-5deg)', textShadow: '6px 6px 0px var(--white)', margin: 0, lineHeight: 1 }}>
            SKILL CARDS
          </h1>
          
          <div 
            className="menu-item-box"
            onClick={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--white)';
              e.currentTarget.style.boxShadow = '10px 10px 0px var(--black)';
              const textEl = e.currentTarget.querySelector('h2');
              if (textEl) textEl.style.color = 'var(--red)';
              const iconEl = e.currentTarget.querySelector('span');
              if (iconEl) iconEl.style.color = 'var(--black)';

              setTimeout(() => onNavigate('hero'), 150);
            }}
            style={{ backgroundColor: 'var(--black)', color: 'var(--white)', border: '4px solid var(--white)', boxShadow: '8px 8px 0px var(--white)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--white)';
              e.currentTarget.style.color = 'var(--black)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--black)';
              e.currentTarget.style.color = 'var(--white)';
            }}
          >
            <h2 className="font-p5 hero-menu-text" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'inherit' }}>
              <span className="hero-menu-icon" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: 'inherit' }}>▶</span> BACK TO HQ
            </h2>
          </div>
        </div>

        {/* Grid Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '3rem',
          paddingBottom: '5rem'
        }}>
          {certifications.map((cert) => (
            <div 
              key={cert.id} 
              className="cert-card"
              style={{
                backgroundColor: 'var(--white)',
                border: '4px solid var(--black)',
                boxShadow: '10px 10px 0px var(--black)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'url(/cursor.svg) 11 6, auto'
              }}
            >
              {/* Top Pin/Tape Effect */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%) skewX(-15deg)',
                backgroundColor: 'var(--black)',
                color: 'var(--white)',
                padding: '0.3rem 1.5rem',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                fontSize: '1rem',
                zIndex: 10,
                boxShadow: '3px 3px 0px var(--white)'
              }}>
                {cert.date}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
                <img 
                  src={getLogoUrl(cert.org)} 
                  alt={`${cert.org} Logo`}
                  style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'drop-shadow(2px 2px 0px var(--black))', borderRadius: '4px' }}
                />
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ 
                    backgroundColor: 'var(--red)', 
                    color: 'var(--white)', 
                    padding: '0.5rem', 
                    border: '2px solid var(--black)', 
                    boxShadow: '3px 3px 0px var(--black)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.1s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--black)';
                    e.currentTarget.style.boxShadow = '3px 3px 0px var(--red)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--red)';
                    e.currentTarget.style.boxShadow = '3px 3px 0px var(--black)';
                  }}
                >
                  <ExternalLink size={24} strokeWidth={2.5} />
                </a>
              </div>

              <h2 className="font-p5" style={{ fontSize: '1.8rem', margin: '0 0 1rem 0', color: 'var(--black)', lineHeight: 1.1 }}>
                {cert.title.toUpperCase()}
              </h2>
              <h3 style={{ fontFamily: 'Roboto', fontSize: '1.1rem', margin: '0 0 1.5rem 0', color: 'var(--black)', fontWeight: 800 }}>
                ISSUED BY: <span style={{ color: 'var(--red)' }}>{cert.org.toUpperCase()}</span>
              </h3>

              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cert.skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="font-p5" 
                    style={{ 
                      backgroundColor: 'var(--black)', 
                      color: 'var(--white)', 
                      padding: '0.3rem 0.6rem', 
                      fontSize: '0.9rem',
                    }}
                  >
                    {skill.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
