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

// Reusable Heatmap Grid with original wave animation logic
const HeatmapGrid = ({ weeks, type, direction = "ltr", onHover, onLeave }) => {
  let colors, activeColor;
  if (type === "github") {
    colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
    activeColor = "#216e39";
  } else if (type === "leetcode") {
    colors = ["#ebedf0", "#ffe1b3", "#ffc373", "#ffa633", "#ff8800"];
    activeColor = "#ff8800";
  } else {
    colors = ["#ebedf0", "#ffb3b3", "#ff6666", "#cc0000", "#990000"];
    activeColor = "var(--red)";
  }
  const ENTER_STEP_S = 0.014;

  // Get months header
  const monthLabels = Array(weeks.length).fill("");
  let lastMonth = "";
  let lastPushedIndex = -10;
  
  weeks.forEach((week, colIdx) => {
    const validDay = week.find((day) => day.date !== "");
    if (validDay) {
      const dateObj = new Date(validDay.date);
      const monthName = dateObj.toLocaleString("default", { month: "short" });
      if (monthName !== lastMonth) {
        if (colIdx - lastPushedIndex > 3) {
          monthLabels[colIdx] = monthName;
          lastPushedIndex = colIdx;
        }
        lastMonth = monthName;
      }
    }
  });

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ overflowX: 'auto', paddingBottom: '1rem', overflowY: 'hidden' }}>
        
        <div style={{ display: 'flex', minWidth: 'max-content' }}>
          {/* Days Y-axis */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginRight: '8px', marginTop: '22px', fontSize: '0.75rem', fontFamily: 'Roboto', fontWeight: 'bold', color: 'var(--black)', textAlign: 'right' }}>
            <span style={{ height: '14px' }}></span>
            <span style={{ height: '14px', lineHeight: '14px' }}>Mon</span>
            <span style={{ height: '14px' }}></span>
            <span style={{ height: '14px', lineHeight: '14px' }}>Wed</span>
            <span style={{ height: '14px' }}></span>
            <span style={{ height: '14px', lineHeight: '14px' }}>Fri</span>
            <span style={{ height: '14px' }}></span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            {weeks.map((week, colIdx) => {
              const totalCols = weeks.length;
              const waveCol = direction === "rtl" ? (totalCols - 1 - colIdx) : colIdx;
              const delay = waveCol * ENTER_STEP_S;

              return (
                <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {/* Month Label */}
                  <div style={{ height: '14px', marginBottom: '4px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, fontSize: '0.8rem', fontFamily: 'Roboto', fontWeight: 'bold', color: 'var(--black)', whiteSpace: 'nowrap', zIndex: 5 }}>
                      {monthLabels[colIdx]}
                    </span>
                  </div>
                  {week.map((day, rowIdx) => {
                    const cellColor = colors[day.level] || colors[0];
                    const dateLabel = day.date
                      ? new Date(day.date).toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })
                      : "";
                    const hoverText = `${day.count} ${type === "github" ? "contributions" : "submissions"} on ${dateLabel}`;

                    return (
                      <div 
                        key={rowIdx} 
                        className="heatmap-cell"
                        style={{
                          width: '14px',
                          height: '14px',
                          backgroundColor: cellColor,
                          border: day.level === 0 ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(0,0,0,0.15)',
                          borderRadius: '3px',
                          transform: day.level > 0 ? 'skewX(-5deg)' : 'none',
                          transition: 'transform 0.2s ease, background-color 0.2s ease',
                          animation: `waveEnter 0.4s ease forwards`,
                          animationDelay: `${delay}s`,
                          opacity: 0,
                          transformOrigin: 'bottom left'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.5) skewX(-5deg)';
                          e.currentTarget.style.zIndex = 10;
                          const rect = e.currentTarget.getBoundingClientRect();
                          onHover(hoverText, activeColor, rect.left + rect.width / 2, rect.top);
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = day.level > 0 ? 'skewX(-5deg)' : 'none';
                          e.currentTarget.style.zIndex = 1;
                          onLeave();
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
        <span style={{ fontFamily: 'Roboto', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--black)' }}>LESS</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {colors.map((color, idx) => (
            <div 
              key={idx}
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: color,
                border: idx === 0 ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(0,0,0,0.15)',
                borderRadius: '3px',
                transform: idx > 0 ? 'skewX(-5deg)' : 'none'
              }}
            />
          ))}
        </div>
        <span style={{ fontFamily: 'Roboto', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--black)' }}>MORE</span>
      </div>

      <style>{`
        @keyframes waveEnter {
          from { opacity: 0; transform: scale(0.5) translateY(10px) skewX(-5deg); }
          to { opacity: 1; transform: scale(1) translateY(0) skewX(-5deg); }
        }
        .heatmap-cell {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default function Heatmaps({ onNavigate }) {
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState({ content: "", x: 0, y: 0, visible: false, color: "" });
  
  // Hardcoded to TheAyushTandon as requested
  const username = "TheAyushTandon";
  
  const [loading, setLoading] = useState(true);
  
  const [githubWeeks, setGithubWeeks] = useState(generateEmptyCalendarForYear(null));
  const [githubStats, setGithubStats] = useState({ total: 0, activeDays: 0, streak: 0, maxDaily: 0 });
  
  const [leetcodeWeeks, setLeetcodeWeeks] = useState(generateEmptyCalendarForYear(null));
  const [leetcodeStats, setLeetcodeStats] = useState({ total: 0, activeDays: 0, streak: 0, maxDaily: 0 });

  const apiHost = import.meta.env.VITE_API_URL || "https://stepcode-heatmaps.onrender.com";

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.heatmap-card', 
        { y: 100, opacity: 0, rotation: 2 },
        { y: 0, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: '.heatmap-card', start: "top 85%" } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const processGithubData = (data) => {
    const levelMap = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
    const weeks = data.weeks.map(week => week.contributionDays.map(day => ({
      date: day.date, count: day.count, level: levelMap[day.level] ?? 0
    })));
    let activeDays = 0, currentStreak = 0, maxStreak = 0, maxDaily = 0;
    weeks.forEach(w => w.forEach(d => {
      if (d.count > 0) { 
        activeDays++; currentStreak++; 
        if (currentStreak > maxStreak) maxStreak = currentStreak; 
        if (d.count > maxDaily) maxDaily = d.count;
      }
      else currentStreak = 0;
    }));
    setGithubWeeks(weeks);
    setGithubStats({ total: data.totalContributions, activeDays, streak: maxStreak, maxDaily });
  };

  const processLeetcodeData = (data) => {
    const map = data.submission_calendar || {};
    let totalSubmissions = 0;
    Object.values(map).forEach(v => totalSubmissions += Number(v));
    const entries = Object.entries(map);
    const activeDays = entries.filter(([_, count]) => count > 0).length;
    
    const dateMap = {};
    entries.forEach(([ts, count]) => {
      const dStr = new Date(Number(ts) * 1000).toISOString().split("T")[0];
      dateMap[dStr] = Number(count);
    });

    let calendarStart; let totalDays;
    const today = new Date();
    const oneYearAgo = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() - 364));
    const startDayOfWeek = oneYearAgo.getUTCDay();
    calendarStart = new Date(oneYearAgo);
    calendarStart.setUTCDate(oneYearAgo.getUTCDate() - startDayOfWeek);
    totalDays = 371;

    const weeks = [];
    let currentWeek = [];
    let currentStreak = 0, maxStreak = 0, maxDaily = 0;
    const loopDate = new Date(calendarStart);
    for (let i = 0; i < totalDays; i++) {
      const dStr = loopDate.toISOString().split("T")[0];
      const count = dateMap[dStr] || 0;
      let lvl = 0;
      if (count > 0) { if (count <= 2) lvl = 1; else if (count <= 4) lvl = 2; else if (count <= 7) lvl = 3; else lvl = 4; }
      currentWeek.push({ date: dStr, count, level: lvl });
      if (count > 0) { 
        currentStreak++; 
        if (currentStreak > maxStreak) maxStreak = currentStreak; 
        if (count > maxDaily) maxDaily = count;
      } else currentStreak = 0;
      if (currentWeek.length === 7) { weeks.push([...currentWeek]); currentWeek = []; }
      loopDate.setDate(loopDate.getDate() + 1);
    }
    setLeetcodeWeeks(weeks);
    setLeetcodeStats({ total: totalSubmissions, activeDays, streak: maxStreak, maxDaily });
  };

  const loadData = async () => {
    setLoading(true);

    try {
      // Parallel fetch for speed
      const [ghRes, lcRes] = await Promise.all([
        fetch(`${apiHost}/api/github/heatmap/${username}`),
        fetch(`${apiHost}/api/leetcode/heatmap/${username}`)
      ]);

      if (ghRes.ok) {
        const ghData = await ghRes.json();
        processGithubData(ghData);
      }
      
      if (lcRes.ok) {
        const lcData = await lcRes.json();
        if (lcData && lcData.submission_calendar && Object.keys(lcData.submission_calendar).length > 0) {
          processLeetcodeData(lcData);
        }
      }
    } catch (e) {
      console.error("Failed to fetch heatmaps", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div ref={containerRef} className="absolute-fill bg-p5-black" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
      
      {/* Global Floating Tooltip for fixed positioning outside transformed parents */}
      {tooltip.visible && (
        <div style={{
          position: 'fixed',
          top: tooltip.y - 45,
          left: tooltip.x,
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--black)',
          color: 'var(--white)',
          padding: '0.4rem 0.8rem',
          fontFamily: 'Roboto',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          border: `2px solid ${tooltip.color}`,
          boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          whiteSpace: 'nowrap'
        }}>
          {tooltip.content}
        </div>
      )}

      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 14 L21.5 18.5 L26 20 L21.5 21.5 L20 26 L18.5 21.5 L14 20 L18.5 18.5 Z' fill='%23e60012' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
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
              <span className="hero-menu-icon">▶</span> BACK TO HQ
            </h2>
          </div>
        </div>

        {/* GitHub Card */}
        <div className="heatmap-card" style={{
          backgroundColor: 'var(--white)',
          border: '6px solid var(--black)',
          boxShadow: '15px 15px 0px var(--red)',
          padding: '2rem',
          position: 'relative',
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="font-p5" style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', color: 'var(--black)' }}>GITHUB TARGET</h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '0.5rem 1rem', fontFamily: 'Roboto', fontWeight: 'bold', transform: 'skewX(-10deg)' }}>
                  TOTAL: {githubStats.total}
                </div>
                <div style={{ backgroundColor: 'var(--red)', color: 'var(--white)', padding: '0.5rem 1rem', fontFamily: 'Roboto', fontWeight: 'bold', transform: 'skewX(-10deg)' }}>
                  STREAK: {githubStats.streak} DAYS
                </div>
                <div style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '0.5rem 1rem', fontFamily: 'Roboto', fontWeight: 'bold', transform: 'skewX(-10deg)' }}>
                  ACTIVE DAYS: {githubStats.activeDays}
                </div>
                <div style={{ backgroundColor: 'var(--red)', color: 'var(--white)', padding: '0.5rem 1rem', fontFamily: 'Roboto', fontWeight: 'bold', transform: 'skewX(-10deg)' }}>
                  MAX DAILY: {githubStats.maxDaily}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontFamily: 'Anton', fontSize: '1.2rem', color: 'var(--black)' }}>@{username}</span>
              <span style={{ fontFamily: 'Roboto', fontSize: '0.9rem', color: 'gray' }}>{loading ? 'FETCHING INTEL...' : 'SYNC COMPLETE'}</span>
            </div>
          </div>

          <HeatmapGrid 
            weeks={githubWeeks} 
            type="github" 
            direction="ltr" 
            onHover={(content, color, x, y) => setTooltip({ content, color, x, y, visible: true })}
            onLeave={() => setTooltip(prev => ({ ...prev, visible: false }))}
          />

        </div>

        {/* LeetCode Card */}
        <div className="heatmap-card" style={{
          backgroundColor: 'var(--white)',
          border: '6px solid var(--black)',
          boxShadow: '15px 15px 0px var(--red)',
          padding: '2rem',
          position: 'relative',
          maxWidth: '1100px',
          margin: '3rem auto 0 auto',
          width: '100%'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="font-p5" style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', color: 'var(--black)' }}>LEETCODE TARGET</h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '0.5rem 1rem', fontFamily: 'Roboto', fontWeight: 'bold', transform: 'skewX(-10deg)' }}>
                  TOTAL: {leetcodeStats.total}
                </div>
                <div style={{ backgroundColor: 'var(--red)', color: 'var(--white)', padding: '0.5rem 1rem', fontFamily: 'Roboto', fontWeight: 'bold', transform: 'skewX(-10deg)' }}>
                  STREAK: {leetcodeStats.streak} DAYS
                </div>
                <div style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '0.5rem 1rem', fontFamily: 'Roboto', fontWeight: 'bold', transform: 'skewX(-10deg)' }}>
                  ACTIVE DAYS: {leetcodeStats.activeDays}
                </div>
                <div style={{ backgroundColor: 'var(--red)', color: 'var(--white)', padding: '0.5rem 1rem', fontFamily: 'Roboto', fontWeight: 'bold', transform: 'skewX(-10deg)' }}>
                  MAX DAILY: {leetcodeStats.maxDaily}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontFamily: 'Anton', fontSize: '1.2rem', color: 'var(--black)' }}>@{username}</span>
              <span style={{ fontFamily: 'Roboto', fontSize: '0.9rem', color: 'gray' }}>{loading ? 'FETCHING INTEL...' : 'SYNC COMPLETE'}</span>
            </div>
          </div>

          <HeatmapGrid 
            weeks={leetcodeWeeks} 
            type="leetcode" 
            direction="rtl" 
            onHover={(content, color, x, y) => setTooltip({ content, color, x, y, visible: true })}
            onLeave={() => setTooltip(prev => ({ ...prev, visible: false }))}
          />

        </div>

      </div>
    </div>
  );
}
