import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Phone, FileText, Download, Eye, Send, ExternalLink, Quote, Star } from 'lucide-react';
import CircularText from './CircularText';
import CircularCarousel from './CircularCarousel';

const GithubIcon = ({ size = 26 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 640 640" fill="currentColor">
    <path d="M280.5 426.5C214.5 418.5 168 371 168 309.5C168 284.5 177 257.5 192 239.5C185.5 223 186.5 188 194 173.5C214 171 241 181.5 257 196C276 190 296 187 320.5 187C345 187 365 190 383 195.5C398.5 181.5 426 171 446 173.5C453 187 454 222 447.5 239C463.5 258 472 283.5 472 309.5C472 371 425.5 417.5 358.5 426C375.5 437 387 461 387 488.5L387 540.5C387 555.5 399.5 564 414.5 558C505 523.5 576 433 576 321C576 179.5 461 64 319.5 64C178 64 64 179.5 64 321C64 432 134.5 524 229.5 558.5C243 563.5 256 554.5 256 541L256 501C249 504 240 506 232 506C199 506 179.5 488 165.5 454.5C160 441 154 433 142.5 431.5C136.5 431 134.5 428.5 134.5 425.5C134.5 419.5 144.5 415 154.5 415C169 415 181.5 424 194.5 442.5C204.5 457 215 463.5 227.5 463.5C240 463.5 248 459 259.5 447.5C268 439 274.5 431.5 280.5 426.5z" />
  </svg>
);

const LinkedinIcon = ({ size = 26 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 640 640" fill="currentColor">
    <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM165 266.2L231.5 266.2L231.5 480L165 480L165 266.2zM236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160C219.5 160 236.7 177.2 236.7 198.5zM413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480L413.9 480z" />
  </svg>
);

const LeetcodeIcon = ({ size = 26 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 640 640" fill="currentColor">
    <path d="M331.4 73.3C342.5 61.5 361.1 60.8 373 71.9C384.9 83 385.5 101.7 374.4 113.5L331.4 159.5C352.9 162.8 373.5 171.3 390.5 185.1L465.1 245.4C477.7 255.6 479.7 274.2 469.5 286.8C459.3 299.4 440.8 301.4 428.1 291.2L353.5 230.9C327.3 209.8 281.6 212.7 259 236.8L177 325C155.5 348 157.9 385 182.6 409.2L273.8 498.6C298.7 522.6 339.4 522.6 363.9 498.2L415 447.2C426.5 435.7 445.1 435.7 456.6 447.3C468.1 458.9 468 477.5 456.5 489L405.4 540C358.3 587.1 281.4 587.7 233.5 541.6L141.5 451.4C94.6 405.3 90 331.9 134 284.7L331.4 73.3zM507.7 337.2C523.9 337.2 537.1 350.4 537.1 366.7C537.1 383 523.9 396.2 507.7 396.2L290.8 396.2C274.6 396.2 261.4 383 261.4 366.7C261.4 350.4 274.6 337.2 290.8 337.2L507.7 337.2z" />
  </svg>
);

const CodechefIcon = ({ size = 26 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.007 0c-.787.031-1.515.37-2.222.685a12.27 12.27 0 01-1.864.703c-.635.176-1.3.354-1.814.788-.222.18-.356.439-.529.662-.309.486-.448 1.067-.457 1.638.036.61.216 1.2.376 1.786.368 1.262.807 2.503 1.197 3.759.366 1.161.703 2.344 1.294 3.416.197.394.35.808.535 1.206.027.067.052.158.142.149.136-.012.243-.115.368-.164.828-.414 1.74-.642 2.655-.749.708-.074 1.43-.078 2.131.054.72.163 1.417.426 2.092.724.36.172.719.348 1.088.498.048.04.135.058.16-.016.219-.327.469-.635.667-.976.495-1.061.522-2.279 1.038-3.331.358-.721.892-1.337 1.266-2.048.175-.266.431-.467.588-.747.437-.669.78-1.398 1.05-2.15.102-.293.172-.612.09-.919-.06-.299-.202-.57-.318-.848a2.481 2.481 0 00-.278-.66c-.407-.676-1.07-1.149-1.743-1.536-1.045-.59-2.196-.969-3.351-1.28A20.733 20.733 0 0011.426.01a5.005 5.005 0 00-.42-.01zm-.889.606c-.261.223-.363.569-.468.883-.168.568-.263 1.163-.207 1.756.064 1.062.197 2.12.33 3.175.18 1.352.387 2.7.677 4.034.026.165.064.347.05.51-.115-.175-.182-.383-.258-.58-.25-.765-.432-1.549-.604-2.334a26.008 26.008 0 01-.562-4.317c-.025-.843-.004-1.726.37-2.501.118-.226.259-.46.48-.597a.411.411 0 01.218-.049l-.026.02zM6.516 1.77c.128 0 .139.159.168.252.266.798.422 1.628.679 2.428.174.649.238 1.323.308 1.991.097 1.039.108 2.085.246 3.12.026.199.082.393.119.59.01.067-.059.049-.083.014-.148-.161-.183-.391-.246-.592-.16-.645-.242-1.305-.334-1.962-.174-1.316-.287-2.64-.529-3.945-.158-.612-.356-1.215-.46-1.838.006-.051.093-.048.132-.058zM4.589 3.607c.229.056.365.268.512.434.4.535.54 1.204.695 1.843.283 1.265.446 2.553.725 3.82.131.666.293 1.326.507 1.971.014.051.035.133.038.17-.233-.43-.393-.896-.565-1.353-.598-1.698-.823-3.496-1.3-5.228-.133-.478-.308-.95-.596-1.358-.047-.088-.08-.204-.037-.297.006-.004.014-.003.02-.002zm12.646 13.196c-.136.007-.31.11-.276.267.094.218.334.308.526.416.441.216.938.29 1.358.546.092.06.149.197.064.287-.18.266-.47.44-.723.634-.372.266-.777.51-1.057.879-.066.107-.041.267.082.32.109.079.243.018.338-.051.518-.294.995-.654 1.478-1.002.32-.239.644-.477.926-.76.085-.135-.03-.274-.118-.371-.273-.285-.62-.487-.965-.67a4.959 4.959 0 00-1.458-.495 1.251 1.251 0 00-.175 0zM5.96 16.83c-.527.134-.997.42-1.474.673-.425.243-.854.496-1.205.841a.699.699 0 00-.172.488c.065.108.2.14.301.206.852.442 1.735.822 2.63 1.168.132.042.265.113.406.107.158-.02.309-.204.213-.356-.146-.243-.42-.361-.65-.506-.547-.303-1.154-.512-1.636-.918-.046-.091.094-.128.142-.18.549-.395 1.229-.593 1.713-1.077.089-.09.164-.259.048-.358-.086-.073-.206-.087-.316-.088zm8.115.793c-.43.027-.835.431-.774.876.032.259.089.525.228.749.12.18.33.286.546.287.273.031.59-.059.726-.318.137-.237.212-.514.205-.787-.038-.46-.466-.845-.93-.807zm-4.49.01c-.464.028-.807.505-.77.953.011.444.315.902.765.994.352.06.71-.19.803-.53.125-.35.132-.761-.044-1.095-.157-.25-.478-.327-.754-.322zm.112.653c.241.064.294.47.045.558-.141.034-.239-.12-.234-.244-.008-.127.05-.287.189-.314zm4.437.143c.097 0 .226.071.19.187-.013.171-.215.333-.377.226-.132-.07-.172-.296-.02-.368a.418.418 0 01.207-.045zm-3.518 2.977c-.553.051-1.044.335-1.542.559-.304.156-.662.312-1.005.187-.377-.12-.707-.35-1.059-.52-.075-.013-.061.077-.047.122.081.53.129 1.102.454 1.55.338.437.902.618 1.433.667.797.072 1.642-.118 2.271-.629.309-.262.571-.631.585-1.049-.006-.324-.244-.596-.524-.734a1.085 1.085 0 00-.566-.153zm2.58.008c-.396.052-.815.262-.972.65-.129.358.034.748.272 1.02.426.509 1.07.793 1.718.884.577.078 1.186.014 1.714-.24.438-.225.767-.655.85-1.142.064-.291.081-.59.124-.884-.066-.078-.148.038-.218.052-.337.142-.647.367-1.01.435-.363.024-.687-.172-1.015-.293-.43-.178-.851-.403-1.315-.478a1.21 1.21 0 00-.147-.004zm-2.881-5.091c-.07 0-.143.014-.216.03a2.93 2.93 0 00-.454.152c-.15.061-.292.127-.407.18a4.07 4.07 0 01-.218.092.277.277 0 01-.182-.034c-.062-.037-.12-.101-.141-.255l-.27.038c.031.218.14.37.27.45.13.079.268.09.378.067.085-.018.16-.058.276-.111.116-.053.255-.118.397-.176.143-.058.288-.11.41-.138a.52.52 0 01.252-.009c.14.06.19.13.215.179.025.05.03.067.03.067l.263-.06s.002-.024-.05-.128a.678.678 0 00-.35-.307.482.482 0 00-.204-.037zm2.744 3.937a.136.136 0 00-.102.05s-.122.148-.286.295c-.165.148-.38.28-.493.283-.112.003-.314-.118-.47-.26-.155-.14-.267-.284-.267-.284a.136.136 0 10-.214.167s.124.16.299.319c.175.16.397.337.66.33.259-.008.484-.19.666-.352.182-.163.315-.325.315-.325a.136.136 0 00-.108-.223z" />
  </svg>
);

const bentoLinks = [
  {
    id: 'github',
    label: 'GITHUB',
    category: 'CODE VAULT',
    value: '@TheAyushTandon',
    url: 'https://github.com/TheAyushTandon',
    renderIcon: (size = 30) => <GithubIcon size={size} />,
    desc: 'Repos, AI systems & commits',
    circularText: '• GITHUB • VAULT '
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    category: 'PROFESSIONAL',
    value: 'in/theayushtandon',
    url: 'https://www.linkedin.com/in/theayushtandon/',
    renderIcon: (size = 30) => <LinkedinIcon size={size} />,
    desc: 'Career, endorsements & network',
    circularText: '• LINKEDIN • NETWORK '
  },
  {
    id: 'leetcode',
    label: 'LEETCODE',
    category: 'ALGORITHMS',
    value: 'TheAyushTandon',
    url: 'https://leetcode.com/u/TheAyushTandon/',
    renderIcon: (size = 30) => <LeetcodeIcon size={size} />,
    desc: '200+ Solved • Data Structures',
    circularText: '• LEETCODE • SOLVE '
  },
  {
    id: 'codechef',
    label: 'CODECHEF',
    category: 'COMPETITIVE',
    value: 'kizuya',
    url: 'https://www.codechef.com/users/kizuya',
    renderIcon: (size = 30) => <CodechefIcon size={size} />,
    desc: '3-Star Rated • 500+ Solved',
    circularText: '• CODECHEF • STARS '
  },
  {
    id: 'email',
    label: 'EMAIL',
    category: 'DIRECT LINE',
    value: 'TheAyushTandon@gmail.com',
    url: 'mailto:TheAyushTandon@gmail.com',
    renderIcon: (size = 30) => <Mail size={size} strokeWidth={2.5} />,
    desc: 'Fastest direct outreach',
    circularText: '• EMAIL • DIRECT '
  },
  {
    id: 'phone',
    label: 'PHONE',
    category: 'VOICE / WHATSAPP',
    value: '+91 8439655313',
    url: 'tel:+918439655313',
    renderIcon: (size = 30) => <Phone size={size} strokeWidth={2.5} />,
    desc: 'India Standard Time (IST)',
    circularText: '• PHONE • CALL '
  }
];

const endorsements = [
  {
    src: '/images/endorsements/manish-mathur.jpg',
    alt: 'Manish Mathur',
    title: 'Manish Mathur',
    subtitle: 'Head Incubation',
    org: 'CIE, Bennett University Hatchery',
    quote: 'Ayush spearheaded the development of our incubation management CRM and official CIE web platform, delivering high reliability and rapid startup tracking for over 100s of campus ventures.',
    tag: 'HEAD OF INCUBATION'
  },
  {
    src: '/images/endorsements/shubham-awasthi.jpg',
    alt: 'Shubham Awasthi',
    title: 'Shubham Awasthi',
    subtitle: 'Assistant Manager',
    org: 'CIE, Bennett University Hatchery',
    quote: 'Outstanding engineering velocity and attention to operational detail. Ayush designed and built our custom CRM system from the ground up, seamlessly digitizing startup lifecycle monitoring.',
    tag: 'ASSISTANT MANAGER'
  },
  {
    src: '/images/endorsements/harshit-agarwal.jpg',
    alt: 'Harshit Agarwal',
    title: 'Harshit Agarwal',
    subtitle: 'Incubation Manager',
    org: 'CIE, Bennett University Hatchery',
    quote: 'Ayush demonstrated exceptional problem-solving and full-stack ownership across both the official CIE website and internal incubator tools, always executing ahead of schedule.',
    tag: 'INCUBATION MANAGER'
  },
  {
    src: '/images/endorsements/yash-yadav.png',
    alt: 'Yash Yadav',
    title: 'Yash Yadav',
    subtitle: 'Investor Product, Mudrex',
    org: 'Mudrex // Freelance Lead for SkewX',
    quote: 'Ayush delivered top-tier frontend engineering for our SkewX web platform, crafting responsive real-time DEX microfrontends and high-speed API factories with extreme precision.',
    tag: 'INVESTOR PRODUCT / WEB3'
  },
  {
    src: '/images/endorsements/stepcode.jpg',
    alt: 'StepCode Technologies',
    title: 'StepCode Technologies',
    subtitle: 'Software Engineer / Frontend Lead',
    org: 'StepCode Technologies Pvt Ltd',
    quote: 'Ayush engineered the complete frontend for StepCode\'s primary landing experience, bringing modern animations, clean modular architecture, and high performance to our brand.',
    tag: 'PRODUCTION FRONTEND'
  },
  {
    src: '/images/endorsements/corpvenue.jpg',
    alt: 'CorpVenue Hospitality Solutions LLP',
    title: 'Gagan Sharma',
    subtitle: 'Director, CorpVenue Hospitality Solutions',
    org: 'CorpVenue Hospitality Solutions LLP (Mumbai)',
    quote: 'Ayush was selected as Project Intern for real-time website development work, demonstrating disciplined technical learning, strong problem-solving, and valuable contributions to ongoing web projects.',
    tag: 'DIRECTOR / HOSPITALITY TECH'
  },
  {
    src: '/images/endorsements/ais.png',
    alt: 'Artificial Intelligence Society',
    title: 'Artificial Intelligence Society',
    subtitle: 'Vice Chairperson (2025 - 2026)',
    org: 'Bennett University Premier Tech Club',
    quote: 'As Vice Chairperson, Ayush led our AI community across technical workshops, hackathons, and agentic AI bootcamps, driving innovation and mentoring hundreds of student developers.',
    tag: 'EXECUTIVE LEADERSHIP',
    fit: 'contain'
  },
  {
    src: '/images/endorsements/dean-career-cloud.png',
    alt: 'Dean Career Cloud',
    title: 'Dean Career Cloud',
    subtitle: 'Associate Lead — Training & Preparation',
    org: 'Bennett University Placement Readiness Org',
    quote: 'Ayush served as Associate Lead of Training & Preparation, organizing university-wide coding events and engineering intuitive preparation platforms that elevated student placement readiness.',
    tag: 'CAREER PREP LEAD'
  }
];

export default function Contact({ onNavigate }) {
  const containerRef = useRef(null);
  const [dialSize, setDialSize] = useState(205);
  const [fontSize, setFontSize] = useState(19);
  const [activeEndorsement, setActiveEndorsement] = useState(0);
  const [carouselCardWidth, setCarouselCardWidth] = useState(310);
  const [carouselSpread, setCarouselSpread] = useState(1.85);
  const [carouselGap, setCarouselGap] = useState(36);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 400) {
        setDialSize(130);
        setFontSize(11);
        setCarouselCardWidth(145);
        setCarouselSpread(1.2);
        setCarouselGap(12);
      } else if (w < 640) {
        setDialSize(145);
        setFontSize(13);
        setCarouselCardWidth(180);
        setCarouselSpread(1.38);
        setCarouselGap(18);
      } else if (w < 1024) {
        setDialSize(175);
        setFontSize(16);
        setCarouselCardWidth(240);
        setCarouselSpread(1.6);
        setCarouselGap(26);
      } else {
        setDialSize(205);
        setFontSize(19);
        setCarouselCardWidth(310);
        setCarouselSpread(1.85);
        setCarouselGap(36);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.bento-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.45, ease: 'back.out(1.4)', delay: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const resumePdfUrl = '/Ayush_Tandon_Full_Stack_AI_Resume.pdf';

  return (
    <div ref={containerRef} className="absolute-fill bg-p5-white" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
      {/* Halftone subtle background */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundSize: '20px 20px',
          backgroundImage: 'radial-gradient(circle, var(--black) 2px, transparent 2.5px)',
          opacity: 0.12, zIndex: 0, pointerEvents: 'none'
        }}
      />

      <div className="contact-page-content" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* Header Bar */}
        <div className="contact-header-bar">
          <div>
            <h1 className="font-p5 text-p5-red contact-main-title">
              CONTACT ME
            </h1>
          </div>

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
            <h2 className="font-p5 hero-menu-text" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 2rem)' }}>
              <span className="hero-menu-icon">▶</span> BACK
            </h2>
          </div>
        </div>

        {/* =========================================================================
            PERSONA 5 BENTO GRID ARCHITECTURE
            ========================================================================= */}
        <div className="contact-bento-grid">

          {/* 1. BIO (Spans 2 cols on desktop) */}
          <div className="bento-card bento-span-2 bento-card-bio">
            <div style={{ marginBottom: '1.2rem' }}>
              <h2 className="font-p5 bento-card-heading">
                ABOUT ME
              </h2>
              <p className="bento-bio-text">
                I like to design and automate things, solving real-life problems. I also love to try new food and enjoy sports.
              </p>
            </div>

            <div className="bento-tags-row">
              <div className="bento-tag-item red-tag font-p5">
                STATUS: 3RD YEAR B.TECH CSE
              </div>
              <div className="bento-tag-item black-tag font-p5">
                FULL-STACK & AI
              </div>
              <div className="bento-tag-item white-tag font-p5">
                GREATER NOIDA, IN
              </div>
            </div>
          </div>

          {/* 2. RESUME FEATURE TILE (Spans 2 cols on desktop - Red Persona 5 Card) */}
          <div className="bento-card bento-span-2 bento-card-resume">
            <div className="bento-resume-center">
              <div className="bento-resume-icon-wrap">
                <FileText size={38} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="font-p5 bento-resume-title">
                  AYUSH TANDON RESUME
                </h2>
                <p className="bento-resume-filename">
                  Ayush_Tandon_Full_Stack_AI_Resume.pdf
                </p>
              </div>
            </div>

            <div className="bento-resume-actions">
              <a
                href={resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-action-btn bento-btn-view font-p5"
                title="View Resume in new browser tab"
              >
                <Eye size={18} />
                <span>VIEW IN TAB</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={resumePdfUrl}
                download="Ayush_Tandon_Full_Stack_AI_Resume.pdf"
                className="bento-action-btn bento-btn-download font-p5"
                title="Download Resume PDF file"
              >
                <Download size={18} />
                <span>DOWNLOAD PDF</span>
              </a>
            </div>
          </div>

          {/* 3. COMMS TERMINALS MATRIX - THE SIX CIRCULAR DIALS (Spans 4 cols on desktop) */}
          <div className="bento-card bento-span-4 bento-channels-panel">
            <div className="bento-dials-grid">
              {bentoLinks.map((item) => (
                <div
                  key={item.id}
                  className="bento-dial-card"
                  onClick={() => window.open(item.url, item.url.startsWith('http') ? '_blank' : '_self')}
                  title={`Open ${item.label}`}
                >
                  <div className="bento-dial-tag font-p5">
                    [{item.category}]
                  </div>

                  <div
                    className="bento-dial-circle-wrap"
                    style={{ '--core-size': `${Math.round(dialSize * 0.44)}px` }}
                  >
                    <CircularText
                      text={item.circularText}
                      spinDuration={13}
                      onHover="goBonkers"
                      hoverTilt={30}
                      fontSize={fontSize}
                      letterSpacing={0.02}
                      size={dialSize}
                      repeat={3}
                      startAngle={-180}
                      fill={false}
                      ring={true}
                      ringColor="#ff0008"
                      color="#000000"
                    >
                      <div className="bento-dial-core">
                        {item.renderIcon ? item.renderIcon(dialSize < 160 ? 22 : 30) : item.icon}
                      </div>
                    </CircularText>
                  </div>

                  <div className="bento-dial-meta">
                    <h3 className="font-p5 bento-dial-title">
                      {item.label}
                    </h3>
                    <span className="bento-dial-value">
                      {item.value}
                    </span>
                    <span className="bento-dial-desc">
                      {item.desc}
                    </span>
                    <div className="bento-dial-btn font-p5">
                      <span>CONNECT</span>
                      <span className="bento-dial-arrow">▶</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. VERIFIED ENDORSEMENTS // 3D CIRCULAR CAROUSEL (Spans 4 cols on desktop) */}
          <div className="bento-card bento-span-4 bento-endorsements-panel">
            <div className="bento-endorsements-header">
              <div>
                <h2 className="font-p5 bento-card-heading" style={{ color: 'var(--white)' }}>
                  PEER & LEADERSHIP COMMENDATIONS
                </h2>
                <p className="bento-endorsements-subtext">
                  Direct commendations from internship leadership (CIE Bennett, CorpVenue), freelance leads, tech society executives & client partners.
                </p>
              </div>
              <div className="bento-endorsements-live-chip font-p5">
                <span>#{activeEndorsement + 1} / {endorsements.length}</span>
              </div>
            </div>

            {/* 3D Circular Carousel Stage */}
            <div className="bento-carousel-wrapper">
              <CircularCarousel
                items={endorsements}
                preset="cylinder"
                curve={0}
                intro="rise"
                cardWidth={carouselCardWidth}
                spread={carouselSpread}
                gap={carouselGap}
                aspectRatio={1.16}
                speed={12}
                draggable={true}
                snap={true}
                pauseOnHover={true}
                focusOnClick={true}
                captions={true}
                fadeColor="#000000"
                depthFade={0.4}
                onChange={(idx) => setActiveEndorsement(idx)}
                onItemClick={(_, idx) => setActiveEndorsement(idx)}
              />
            </div>

            {/* Active Endorsement Dynamic Spotlight Card */}
            {(() => {
              const activeItem = endorsements[activeEndorsement] || endorsements[0];
              return (
                <div className="bento-endorsement-active-quote">
                  <div className="bento-endorsement-topline">
                    <span className="bento-endorsement-tag font-p5">
                      [{activeItem.tag}]
                    </span>
                    <div className="bento-endorsement-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                  </div>

                  <div className="bento-endorsement-quote-row">
                    <Quote size={28} className="bento-endorsement-quote-icon" />
                    <p className="bento-endorsement-quote-text">
                      "{activeItem.quote}"
                    </p>
                  </div>

                  <div className="bento-endorsement-author-row">
                    <div>
                      <h3 className="font-p5 bento-endorsement-name">
                        {activeItem.title}
                      </h3>
                      <div className="bento-endorsement-role">
                        {activeItem.subtitle}
                      </div>
                      <div className="bento-endorsement-org">
                        {activeItem.org}
                      </div>
                    </div>

                    {/* Quick Select Dots */}
                    <div className="bento-endorsement-dots">
                      {endorsements.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveEndorsement(i)}
                          className={`bento-endorsement-dot ${i === activeEndorsement ? 'active' : ''}`}
                          title={`Jump to ${endorsements[i].title}`}
                          aria-label={`Jump to endorsement ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 5. SEND CALLING CARD / EMAIL FORM (Full Width / Spans 4 cols on desktop) */}
          <div className="bento-card bento-span-4 bento-card-form">
            <div className="bento-form-layout">
              <div className="bento-form-intro">
                <h2 className="font-p5 bento-form-heading">
                  SEND AN EMAIL
                </h2>
                <p className="bento-form-subtext">
                  Have a question, opportunity, or engineering project? Send me a message directly.
                </p>
                <div className="bento-direct-email-chip">
                  <Mail size={16} />
                  <span>TheAyushTandon@gmail.com</span>
                </div>
              </div>

              <form
                className="bento-form-fields"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const msg = formData.get('message');
                  const name = formData.get('name');
                  window.location.href = `mailto:TheAyushTandon@gmail.com?subject=Message from ${name}&body=${encodeURIComponent(msg)}`;
                }}
              >
                <input
                  name="name"
                  type="text"
                  placeholder="YOUR NAME"
                  required
                  className="bento-input"
                />
                <textarea
                  name="message"
                  placeholder="YOUR MESSAGE"
                  required
                  rows={3}
                  className="bento-input bento-textarea"
                />
                <button
                  type="submit"
                  className="bento-submit-btn font-p5"
                >
                  <Send size={18} />
                  <span>SEND MESSAGE ▶</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
