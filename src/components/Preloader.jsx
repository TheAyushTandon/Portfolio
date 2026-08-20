import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const quotes = [
  "CODE & LOGIC",
  "IT JUST WORKS",
  "READ THE DOCS",
  "NULL POINTER EXCEPTION",
  "WORKS ON MY MACHINE",
  "COMMIT PUSH PRAY",
  "NOT A BUG",
  "IT IS A FEATURE",
  "DID YOU REBOOT?",
  "CHECK THE LOGS",
  "CLEAR THE CACHE",
  "KEEP IT SIMPLE",
  "AUTOMATE ALL THINGS",
  "SHIP IT FAST",
  "BREAK THINGS FAST",
  "BACK UP DAILY",
  "TAKE YOUR TIME"
];

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const textContainerRef = useRef(null);

  // Pick a random quote on mount
  const [targetQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [displayText, setDisplayText] = useState(() => Array(targetQuote.length).fill(""));

  useEffect(() => {
    // 1. Faster Text Scramble Effect
    const chars = "!<>-_\\/[]{}—=+*^?#_";
    let iterations = 0;
    const maxIterations = 15; // 15 * 40ms = 0.6 seconds of scramble
    
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        prev.map((_, i) => {
          if (targetQuote[i] === " ") return " ";
          
          if (Math.random() < (iterations / maxIterations)) {
            return targetQuote[i];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
      );
      
      iterations++;
      if (iterations > maxIterations) {
        clearInterval(interval);
        setDisplayText(targetQuote.split(""));
      }
    }, 40);

    // 2. Split Background Animation
    const tl = gsap.timeline({
      delay: 2.0, // Wait for scramble (0.6s) + longer pause to read (1.4s)
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    // Pop out text
    tl.to(textContainerRef.current, {
      opacity: 0,
      scale: 1.3,
      duration: 0.2,
      ease: "power2.in"
    });

    // Smooth one-go split
    tl.to(topHalfRef.current, {
      x: "-100vw",
      y: "-100vh",
      duration: 1.4,
      ease: "power3.inOut"
    }, "split");

    tl.to(bottomHalfRef.current, {
      x: "100vw",
      y: "100vh",
      duration: 1.4,
      ease: "power3.inOut"
    }, "split");

    return () => clearInterval(interval);
  }, [onComplete, targetQuote]);

  const words = targetQuote.split(" ");
  let globalCharIndex = 0;

  return (
    <div ref={containerRef} className="absolute-fill" style={{ zIndex: 9999, overflow: 'hidden' }}>
      {/* Top Left Half */}
      <div 
        ref={topHalfRef}
        className="absolute-fill bg-p5-red" 
        style={{ clipPath: 'polygon(0 0, 150% 0, 0 150%)' }} 
      ></div>

      {/* Bottom Right Half */}
      <div 
        ref={bottomHalfRef}
        className="absolute-fill bg-p5-red" 
        style={{ clipPath: 'polygon(100% -50%, 100% 100%, -50% 100%)' }} 
      ></div>

      {/* Loading Text Container */}
      <div 
        ref={textContainerRef}
        className="absolute-fill flex-center" 
        style={{ pointerEvents: 'none' }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {words.map((word, wordIndex) => {
            const wordChars = word.split("");
            const startIndex = globalCharIndex;
            globalCharIndex += word.length + 1; // +1 for the space character

            // Aggressive Diagonal Spread (Top-Left to Bottom-Right)
            const middleIndex = (words.length - 1) / 2;
            const maxSpreadX = 22; // vw from center (total 44vw spread, leaves safe room for long words)
            const maxSpreadY = 25; // vh from center (total 50vh spread)
            
            const xStep = words.length > 1 ? (maxSpreadX * 2) / (words.length - 1) : 0;
            const yStep = words.length > 1 ? (maxSpreadY * 2) / (words.length - 1) : 0;

            let xOffset = (wordIndex - middleIndex) * xStep;
            const yOffset = (wordIndex - middleIndex) * yStep;

            // Shift tiny words (like "A" or "&") left to prevent them from crashing into long following words
            if (word === "A" || word === "&" || word === "UP") {
              xOffset -= 5;
            }

            // Tilting and Design
            const rotation = wordIndex % 2 === 0 ? -5 : 6;
            const isAlt = wordIndex % 2 !== 0;
            const isRed = wordIndex === 1 || (words.length > 3 && wordIndex === 3);

            let bgColor = isAlt ? 'var(--black)' : 'var(--white)';
            let textColor = isAlt ? 'var(--white)' : 'var(--black)';
            if (isRed) {
              bgColor = 'var(--red)';
              textColor = 'var(--white)';
            }

            return (
              <div
                key={wordIndex}
                style={{
                  position: 'absolute',
                  transform: `translate(${xOffset}vw, ${yOffset}vh) rotate(${rotation}deg) skewX(-12deg)`,
                  backgroundColor: bgColor,
                  color: textColor,
                  border: '6px solid var(--black)',
                  padding: '0.2rem 2rem',
                  boxShadow: `12px 12px 0px ${isAlt ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)'}`,
                  display: 'flex',
                  zIndex: words.length - wordIndex, // Ensure top words overlap bottom ones
                }}
              >
                {wordChars.map((_, charIndex) => {
                  const char = displayText[startIndex + charIndex] || "";
                  return (
                    <span 
                      key={charIndex} 
                      className="font-p5" 
                      style={{ 
                        fontSize: 'clamp(3rem, 7vw, 7rem)', 
                        lineHeight: 1.1,
                        display: 'inline-block'
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
