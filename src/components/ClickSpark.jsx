import { useEffect } from 'react';
import gsap from 'gsap';

export default function ClickSpark() {
  useEffect(() => {
    const createSpark = (x, y) => {
      // Main Jagged Star
      const spark = document.createElement('div');
      spark.className = 'click-spark';
      
      const sparkSize = 40; 
      spark.style.left = `${x - sparkSize / 2}px`;
      spark.style.top = `${y - sparkSize / 2}px`;
      
      document.body.appendChild(spark);

      gsap.fromTo(spark, 
        { 
          scale: 0, 
          rotation: Math.random() * 90 - 45,
          opacity: 1 
        },
        {
          scale: Math.random() * 1.5 + 1.2,
          rotation: Math.random() * 180 - 90,
          opacity: 0,
          duration: 0.5,
          ease: "power4.out",
          onComplete: () => {
            if (spark.parentNode) {
              spark.parentNode.removeChild(spark);
            }
          }
        }
      );
      
      // Secondary slashing line
      const slice = document.createElement('div');
      slice.className = 'click-slice';
      
      const sliceWidth = 100;
      slice.style.left = `${x - sliceWidth / 2}px`;
      slice.style.top = `${y - 4}px`; // 8px height, so center is 4
      document.body.appendChild(slice);
      
      gsap.fromTo(slice,
        { scaleX: 0, scaleY: 1, opacity: 1, rotation: Math.random() * 360 },
        {
          scaleX: Math.random() * 1 + 1.5, 
          scaleY: 0, 
          opacity: 0,
          duration: 0.4, 
          ease: "expo.out",
          onComplete: () => {
            if (slice.parentNode) {
              slice.parentNode.removeChild(slice);
            }
          }
        }
      );
    };

    const handleClick = (e) => {
      createSpark(e.clientX, e.clientY);
    };

    const handleTouch = (e) => {
      // We only care about the first touch point
      if (e.touches && e.touches.length > 0) {
        createSpark(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Use capture phase (true) so it fires even if components use e.stopPropagation()
    window.addEventListener('click', handleClick, true);
    
    return () => {
      window.removeEventListener('click', handleClick, true);
    };
  }, []);

  return null;
}
