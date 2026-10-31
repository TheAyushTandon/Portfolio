import { useRef } from 'react';
import { Eye, Download } from 'lucide-react';

export default function Resume({ onNavigate }) {
  const containerRef = useRef(null);
  const pdfUrl = '/Ayush_Tandon_Full_Stack_AI_Resume.pdf';

  return (
    <div ref={containerRef} className="absolute-fill bg-p5-black" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
      {/* Halftone / dot pattern background */}
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundSize: '24px 24px',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2px)',
          zIndex: 0, pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, padding: '3rem 2rem', display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 className="font-p5 text-p5-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', transform: 'skewX(-10deg)', textShadow: '4px 4px 0px var(--red)', margin: 0, lineHeight: 1 }}>
              AYUSH TANDON RESUME
            </h1>
          </div>

          <div 
            className="menu-item-box"
            onClick={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--red)';
              e.currentTarget.style.boxShadow = '10px 10px 0px var(--white)';
              const textEl = e.currentTarget.querySelector('h2');
              if (textEl) textEl.style.color = 'var(--white)';
              const iconEl = e.currentTarget.querySelector('span');
              if (iconEl) iconEl.style.color = 'var(--black)';
              
              setTimeout(() => onNavigate('hero'), 150);
            }}
          >
            <h2 className="font-p5 hero-menu-text" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}>
              <span className="hero-menu-icon" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.3rem)' }}>▶</span> BACK
            </h2>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
          <a 
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="menu-item-box"
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px', 
              textDecoration: 'none', backgroundColor: 'var(--white)', color: 'var(--black)',
              padding: '0.6rem 1.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--red)';
              e.currentTarget.style.color = 'var(--white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--white)';
              e.currentTarget.style.color = 'var(--black)';
            }}
          >
            <Eye size={20} />
            <span className="font-p5" style={{ fontSize: '1.3rem', transform: 'skewX(10deg)' }}>VIEW IN FULL TAB</span>
          </a>

          <a 
            href={pdfUrl}
            download="Ayush_Tandon_Full_Stack_AI_Resume.pdf"
            className="menu-item-box"
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px', 
              textDecoration: 'none', backgroundColor: 'var(--red)', color: 'var(--white)',
              padding: '0.6rem 1.5rem', border: '4px solid var(--white)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--white)';
              e.currentTarget.style.color = 'var(--black)';
              e.currentTarget.style.borderColor = 'var(--black)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--red)';
              e.currentTarget.style.color = 'var(--white)';
              e.currentTarget.style.borderColor = 'var(--white)';
            }}
          >
            <Download size={20} />
            <span className="font-p5" style={{ fontSize: '1.3rem', transform: 'skewX(10deg)' }}>DOWNLOAD PDF FILE</span>
          </a>
        </div>

        {/* PDF Embedded View Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '75vh',
          minHeight: '550px',
          backgroundColor: 'var(--white)',
          border: '5px solid var(--black)',
          boxShadow: '10px 10px 0px var(--red), 14px 14px 0px var(--white)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <iframe 
            src={`${pdfUrl}#toolbar=1&view=FitH`} 
            title="Ayush Tandon Full-Stack AI Resume Preview"
            style={{ width: '100%', height: '100%', border: 'none', background: '#333' }}
          />

          {/* Fallback Banner */}
          <div style={{
            backgroundColor: 'var(--black)',
            color: 'var(--white)',
            padding: '0.6rem 1rem',
            borderTop: '3px solid var(--red)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: '0.85rem'
          }}>
            <span>Can't view PDF in your mobile browser?</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--white)' }}>
                Open in Browser Tab
              </a>
              <span style={{ color: 'var(--red)' }}>•</span>
              <a href={pdfUrl} download="Ayush_Tandon_Full_Stack_AI_Resume.pdf" style={{ color: 'var(--red)' }}>
                Download PDF
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
