import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Eye, Download, ExternalLink, X, FileText } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (cardRef.current && overlayRef.current) {
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      );
      gsap.fromTo(cardRef.current,
        { scale: 0.88, y: 40, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.3, ease: 'back.out(1.3)' }
      );
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pdfUrl = '/Ayush_Tandon_Full_Stack_AI_Resume.pdf';

  return (
    <div 
      ref={overlayRef}
      className="resume-modal-overlay"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Ayush Tandon Resume Preview"
    >
      <div ref={cardRef} className="resume-modal-card">
        {/* Modal Top Bar */}
        <div className="resume-modal-header">
          <div className="resume-modal-title-group">
            <span className="resume-modal-badge font-p5">CONFIDENTIAL // DOSSIER</span>
            <h2 className="resume-modal-title font-p5">
              <FileText size={22} style={{ display: 'inline', verticalAlign: '-3px', marginRight: '8px' }} />
              AYUSH TANDON — FULL-STACK AI RESUME
            </h2>
          </div>

          <div className="resume-modal-actions">
            <a 
              href={pdfUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="resume-btn resume-btn-view"
              title="Open full PDF in a new tab"
            >
              <Eye size={18} />
              <span>VIEW IN TAB</span>
              <ExternalLink size={14} />
            </a>

            <a 
              href={pdfUrl}
              download="Ayush_Tandon_Full_Stack_AI_Resume.pdf"
              className="resume-btn resume-btn-download"
              title="Download PDF file"
            >
              <Download size={18} />
              <span>DOWNLOAD PDF</span>
            </a>

            <button 
              type="button"
              onClick={onClose}
              className="resume-btn resume-btn-close"
              aria-label="Close resume preview"
              title="Close (Esc)"
            >
              <X size={20} />
              <span>CLOSE</span>
            </button>
          </div>
        </div>

        {/* Modal Body / PDF Preview */}
        <div className="resume-modal-body">
          <iframe 
            src={`${pdfUrl}#toolbar=1&view=FitH`} 
            title="Ayush Tandon Full-Stack AI Resume Preview"
            className="resume-pdf-frame"
          />

          {/* Helper Bottom Bar */}
          <div className="resume-modal-mobile-bar">
            <span>Viewing on mobile or need immediate file download?</span>
            <div className="resume-mobile-links">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="resume-mobile-link">
                <Eye size={14} /> Open Tab
              </a>
              <a href={pdfUrl} download="Ayush_Tandon_Full_Stack_AI_Resume.pdf" className="resume-mobile-link highlight">
                <Download size={14} /> Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

