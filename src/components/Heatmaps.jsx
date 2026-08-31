import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const generateEmptyCalendarForYear = (year) => {
  let calendarStart;
  let totalDays = 371;

  if (year) {
    calendarStart = new Date(Date.UTC(year, 0, 1));
    const startDayOfWeek = calendarStart.getUTCDay();
    calendarStart.setUTCDate(calendarStart.getUTCDate() - startDayOfWeek);
    const calendarEnd = new Date(Date.UTC(year, 11, 31));
    const endDayOfWeek = calendarEnd.getUTCDay();
    calendarEnd.setUTCDate(calendarEnd.getUTCDate() + (6 - endDayOfWeek));
    const diffTime = Math.abs(calendarEnd.getTime() - calendarStart.getTime());
    totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  } else {
    const today = new Date();
    const oneYearAgo = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 364));
    const startDayOfWeek = oneYearAgo.getUTCDay();
    calendarStart = new Date(oneYearAgo);
    calendarStart.setUTCDate(oneYearAgo.getUTCDate() - startDayOfWeek);
  }

  const weeks = [];
  let currentWeek = [];
  const loopDate = new Date(calendarStart);

  for (let i = 0; i < totalDays; i++) {
    currentWeek.push({
      date: loopDate.toISOString().split("T")[0],
      count: 0,
      level: 0,
    });
    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    if (year) loopDate.setUTCDate(loopDate.getUTCDate() + 1);
    else loopDate.setDate(loopDate.getDate() + 1);
  }
  return weeks;
};

export default function Heatmaps({ onNavigate }) {
  const containerRef = useRef(null);
  const [githubUser, setGithubUser] = useState("TheAyushTandon");
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, activeDays: 0, streak: 0 });

  const colors = ["var(--black)", "#4a0000", "#8a0000", "#cc0000", "var(--red)"];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.heatmap-card', 
        { y: 100, opacity: 0, rotation: 2 },
        { y: 0, opacity: 1, rotation: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: '.heatmap-card', start: "top 80%" } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const loadData = async () => {
    setLoading(true);
    // Simulate API call for now until backend is connected
    // In production, this would hit: fetch(`${import.meta.env.VITE_API_URL}/api/github/heatmap/${githubUser}`)
    setTimeout(() => {
      // Mock data processing for demo purposes, since we don't have the backend up
      const mockWeeks = generateEmptyCalendarForYear(null);
      let total = 0;
      let active = 0;
      let streak = 0;
      let currentStreak = 0;

      const populatedWeeks = mockWeeks.map(week => 
        week.map(day => {
          // Randomly generate some contributions
          const hasCount = Math.random() > 0.7;
          const count = hasCount ? Math.floor(Math.random() * 10) + 1 : 0;
          let level = 0;
          if (count > 0) {
            if (count <= 2) level = 1;
            else if (count <= 5) level = 2;
            else if (count <= 9) level = 3;
            else level = 4;
            active++;
            total += count;
            currentStreak++;
            if(currentStreak > streak) streak = currentStreak;
          } else {
            currentStreak = 0;
          }
          return { ...day, count, level };
        })
      );
      
      setWeeks(populatedWeeks);
      setStats({ total, activeDays: active, streak });
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div ref={containerRef} className="absolute-fill bg-p5-black" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
      
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'radial-gradient(circle, var(--red) 2px, transparent 2px)',
          backgroundSize: '30px 30px',
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1, padding: '4rem 2rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
          <h1 className="font-p5 text-p5-white" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', transform: 'skewX(-5deg)', textShadow: '6px 6px 0px var(--red)', margin: 0, lineHeight: 1 }}>
            HEATMAPS
          </h1>
          
          <div 
            className="menu-item-box"
            onClick={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--white)';
              e.currentTarget.style.boxShadow = '10px 10px 0px var(--red)';
              const textEl = e.currentTarget.querySelector('h2');
              if (textEl) textEl.style.color = 'var(--red)';
              setTimeout(() => onNavigate('hero'), 150);
            }}
            style={{ backgroundColor: 'var(--red)', color: 'var(--white)', border: '4px solid var(--white)', boxShadow: '8px 8px 0px var(--white)' }}
          >
            <h2 className="font-p5 hero-menu-text" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'inherit' }}>
              ▶ BACK TO HQ
            </h2>
          </div>
        </div>

        <div className="heatmap-card" style={{
          backgroundColor: 'var(--white)',
          border: '6px solid var(--black)',
          boxShadow: '15px 15px 0px var(--red)',
          padding: '2rem',
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="font-p5" style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', color: 'var(--black)' }}>GITHUB ACTIVITY</h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '0.5rem 1rem', fontFamily: 'Roboto', fontWeight: 'bold', transform: 'skewX(-10deg)' }}>
                  TOTAL: {stats.total}
                </div>
                <div style={{ backgroundColor: 'var(--red)', color: 'var(--white)', padding: '0.5rem 1rem', fontFamily: 'Roboto', fontWeight: 'bold', transform: 'skewX(-10deg)' }}>
                  STREAK: {stats.streak} DAYS
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value)}
                style={{
                  border: '3px solid var(--black)',
                  padding: '0.5rem 1rem',
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  outline: 'none',
                  boxShadow: '4px 4px 0px var(--black)'
                }}
              />
              <button 
                onClick={loadData}
                style={{
                  backgroundColor: 'var(--black)',
                  color: 'var(--white)',
                  border: '3px solid var(--black)',
                  padding: '0.5rem 1.5rem',
                  fontFamily: 'Anton',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0px var(--red)',
                  transition: 'all 0.1s ease'
                }}
              >
                {loading ? 'LOADING...' : 'GENERATE'}
              </button>
            </div>
          </div>

          {/* Grid */}
          <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '4px', minWidth: 'max-content' }}>
              {weeks.map((week, wIdx) => (
                <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {week.map((day, dIdx) => (
                    <div 
                      key={dIdx} 
                      title={`${day.count} contributions on ${day.date}`}
                      style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: colors[day.level],
                        border: day.level === 0 ? '1px solid rgba(0,0,0,0.1)' : '1px solid var(--black)',
                        transform: day.level > 0 ? 'skewX(-5deg)' : 'none',
                        transition: 'transform 0.2s ease, background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.5) skewX(-5deg)';
                        e.currentTarget.style.zIndex = 10;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = day.level > 0 ? 'skewX(-5deg)' : 'none';
                        e.currentTarget.style.zIndex = 1;
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
