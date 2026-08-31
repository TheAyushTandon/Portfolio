import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Phone, Terminal, Code2 } from 'lucide-react';

const GithubIcon = ({ size = 28 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 640 640" fill="currentColor">
    <path d="M280.5 426.5C214.5 418.5 168 371 168 309.5C168 284.5 177 257.5 192 239.5C185.5 223 186.5 188 194 173.5C214 171 241 181.5 257 196C276 190 296 187 320.5 187C345 187 365 190 383 195.5C398.5 181.5 426 171 446 173.5C453 187 454 222 447.5 239C463.5 258 472 283.5 472 309.5C472 371 425.5 417.5 358.5 426C375.5 437 387 461 387 488.5L387 540.5C387 555.5 399.5 564 414.5 558C505 523.5 576 433 576 321C576 179.5 461 64 319.5 64C178 64 64 179.5 64 321C64 432 134.5 524 229.5 558.5C243 563.5 256 554.5 256 541L256 501C249 504 240 506 232 506C199 506 179.5 488 165.5 454.5C160 441 154 433 142.5 431.5C136.5 431 134.5 428.5 134.5 425.5C134.5 419.5 144.5 415 154.5 415C169 415 181.5 424 194.5 442.5C204.5 457 215 463.5 227.5 463.5C240 463.5 248 459 259.5 447.5C268 439 274.5 431.5 280.5 426.5z"/>
  </svg>
);

const LinkedinIcon = ({ size = 28 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 640 640" fill="currentColor">
    <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM165 266.2L231.5 266.2L231.5 480L165 480L165 266.2zM236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160C219.5 160 236.7 177.2 236.7 198.5zM413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480L413.9 480z"/>
  </svg>
);

const LeetcodeIcon = ({ size = 28 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 640 640" fill="currentColor">
    <path d="M331.4 73.3C342.5 61.5 361.1 60.8 373 71.9C384.9 83 385.5 101.7 374.4 113.5L331.4 159.5C352.9 162.8 373.5 171.3 390.5 185.1L465.1 245.4C477.7 255.6 479.7 274.2 469.5 286.8C459.3 299.4 440.8 301.4 428.1 291.2L353.5 230.9C327.3 209.8 281.6 212.7 259 236.8L177 325C155.5 348 157.9 385 182.6 409.2L273.8 498.6C298.7 522.6 339.4 522.6 363.9 498.2L415 447.2C426.5 435.7 445.1 435.7 456.6 447.3C468.1 458.9 468 477.5 456.5 489L405.4 540C358.3 587.1 281.4 587.7 233.5 541.6L141.5 451.4C94.6 405.3 90 331.9 134 284.7L331.4 73.3zM507.7 337.2C523.9 337.2 537.1 350.4 537.1 366.7C537.1 383 523.9 396.2 507.7 396.2L290.8 396.2C274.6 396.2 261.4 383 261.4 366.7C261.4 350.4 274.6 337.2 290.8 337.2L507.7 337.2z"/>
  </svg>
);

const CodechefIcon = ({ size = 28 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.007 0c-.787.031-1.515.37-2.222.685a12.27 12.27 0 01-1.864.703c-.635.176-1.3.354-1.814.788-.222.18-.356.439-.529.662-.309.486-.448 1.067-.457 1.638.036.61.216 1.2.376 1.786.368 1.262.807 2.503 1.197 3.759.366 1.161.703 2.344 1.294 3.416.197.394.35.808.535 1.206.027.067.052.158.142.149.136-.012.243-.115.368-.164.828-.414 1.74-.642 2.655-.749.708-.074 1.43-.078 2.131.054.72.163 1.417.426 2.092.724.36.172.719.348 1.088.498.048.04.135.058.16-.016.219-.327.469-.635.667-.976.495-1.061.522-2.279 1.038-3.331.358-.721.892-1.337 1.266-2.048.175-.266.431-.467.588-.747.437-.669.78-1.398 1.05-2.15.102-.293.172-.612.09-.919-.06-.299-.202-.57-.318-.848a2.481 2.481 0 00-.278-.66c-.407-.676-1.07-1.149-1.743-1.536-1.045-.59-2.196-.969-3.351-1.28A20.733 20.733 0 0011.426.01a5.005 5.005 0 00-.42-.01zm-.889.606c-.261.223-.363.569-.468.883-.168.568-.263 1.163-.207 1.756.064 1.062.197 2.12.33 3.175.18 1.352.387 2.7.677 4.034.026.165.064.347.05.51-.115-.175-.182-.383-.258-.58-.25-.765-.432-1.549-.604-2.334a26.008 26.008 0 01-.562-4.317c-.025-.843-.004-1.726.37-2.501.118-.226.259-.46.48-.597a.411.411 0 01.218-.049l-.026.02zM6.516 1.77c.128 0 .139.159.168.252.266.798.422 1.628.679 2.428.174.649.238 1.323.308 1.991.097 1.039.108 2.085.246 3.12.026.199.082.393.119.59.01.067-.059.049-.083.014-.148-.161-.183-.391-.246-.592-.16-.645-.242-1.305-.334-1.962-.174-1.316-.287-2.64-.529-3.945-.158-.612-.356-1.215-.46-1.838.006-.051.093-.048.132-.058zM4.589 3.607c.229.056.365.268.512.434.4.535.54 1.204.695 1.843.283 1.265.446 2.553.725 3.82.131.666.293 1.326.507 1.971.014.051.035.133.038.17-.233-.43-.393-.896-.565-1.353-.598-1.698-.823-3.496-1.3-5.228-.133-.478-.308-.95-.596-1.358-.047-.088-.08-.204-.037-.297.006-.004.014-.003.02-.002zm12.646 13.196c-.136.007-.31.11-.276.267.094.218.334.308.526.416.441.216.938.29 1.358.546.092.06.149.197.064.287-.18.266-.47.44-.723.634-.372.266-.777.51-1.057.879-.066.107-.041.267.082.32.109.079.243.018.338-.051.518-.294.995-.654 1.478-1.002.32-.239.644-.477.926-.76.085-.135-.03-.274-.118-.371-.273-.285-.62-.487-.965-.67a4.959 4.959 0 00-1.458-.495 1.251 1.251 0 00-.175 0zM5.96 16.83c-.527.134-.997.42-1.474.673-.425.243-.854.496-1.205.841a.699.699 0 00-.172.488c.065.108.2.14.301.206.852.442 1.735.822 2.63 1.168.132.042.265.113.406.107.158-.02.309-.204.213-.356-.146-.243-.42-.361-.65-.506-.547-.303-1.154-.512-1.636-.918-.046-.091.094-.128.142-.18.549-.395 1.229-.593 1.713-1.077.089-.09.164-.259.048-.358-.086-.073-.206-.087-.316-.088zm8.115.793c-.43.027-.835.431-.774.876.032.259.089.525.228.749.12.18.33.286.546.287.273.031.59-.059.726-.318.137-.237.212-.514.205-.787-.038-.46-.466-.845-.93-.807zm-4.49.01c-.464.028-.807.505-.77.953.011.444.315.902.765.994.352.06.71-.19.803-.53.125-.35.132-.761-.044-1.095-.157-.25-.478-.327-.754-.322zm.112.653c.241.064.294.47.045.558-.141.034-.239-.12-.234-.244-.008-.127.05-.287.189-.314zm4.437.143c.097 0 .226.071.19.187-.013.171-.215.333-.377.226-.132-.07-.172-.296-.02-.368a.418.418 0 01.207-.045zm-3.518 2.977c-.553.051-1.044.335-1.542.559-.304.156-.662.312-1.005.187-.377-.12-.707-.35-1.059-.52-.075-.013-.061.077-.047.122.081.53.129 1.102.454 1.55.338.437.902.618 1.433.667.797.072 1.642-.118 2.271-.629.309-.262.571-.631.585-1.049-.006-.324-.244-.596-.524-.734a1.085 1.085 0 00-.566-.153zm2.58.008c-.396.052-.815.262-.972.65-.129.358.034.748.272 1.02.426.509 1.07.793 1.718.884.577.078 1.186.014 1.714-.24.438-.225.767-.655.85-1.142.064-.291.081-.59.124-.884-.066-.078-.148.038-.218.052-.337.142-.647.367-1.01.435-.363.024-.687-.172-1.015-.293-.43-.178-.851-.403-1.315-.478a1.21 1.21 0 00-.147-.004zm-2.881-5.091c-.07 0-.143.014-.216.03a2.93 2.93 0 00-.454.152c-.15.061-.292.127-.407.18a4.07 4.07 0 01-.218.092.277.277 0 01-.182-.034c-.062-.037-.12-.101-.141-.255l-.27.038c.031.218.14.37.27.45.13.079.268.09.378.067.085-.018.16-.058.276-.111.116-.053.255-.118.397-.176.143-.058.288-.11.41-.138a.52.52 0 01.252-.009c.14.06.19.13.215.179.025.05.03.067.03.067l.263-.06s.002-.024-.05-.128a.678.678 0 00-.35-.307.482.482 0 00-.204-.037zm2.744 3.937a.136.136 0 00-.102.05s-.122.148-.286.295c-.165.148-.38.28-.493.283-.112.003-.314-.118-.47-.26-.155-.14-.267-.284-.267-.284a.136.136 0 10-.214.167s.124.16.299.319c.175.16.397.337.66.33.259-.008.484-.19.666-.352.182-.163.315-.325.315-.325a.136.136 0 00-.108-.223zM11.007.001c-.787.03-1.515.368-2.222.684a12.27 12.27 0 01-1.864.703c-.635.176-1.3.354-1.814.788-.222.18-.356.44-.529.663-.309.485-.448 1.066-.457 1.637.036.61.216 1.2.376 1.786.368 1.263.807 2.503 1.197 3.759.366 1.161.703 2.344 1.294 3.417.197.393.35.807.535 1.205.027.067.052.158.142.15.136-.013.243-.116.368-.165.828-.414 1.74-.641 2.655-.749.708-.074 1.43-.078 2.131.055.72.163 1.417.425 2.092.723.36.172.719.348 1.088.498.048.04.135.058.16-.016.219-.327.469-.635.667-.975.495-1.062.522-2.28 1.038-3.332.358-.721.892-1.336 1.266-2.047.175-.266.431-.468.588-.747.437-.67.78-1.4 1.05-2.151.102-.293.172-.612.09-.919-.06-.298-.202-.57-.318-.848a2.481 2.481 0 00-.278-.659c-.407-.676-1.07-1.15-1.743-1.536-1.045-.591-2.196-.97-3.351-1.281A20.733 20.733 0 0011.426.01a5.005 5.005 0 00-.42-.01zm-.889.606c-.261.222-.363.568-.468.883-.168.567-.263 1.163-.207 1.755.064 1.062.197 2.12.33 3.175.18 1.352.387 2.701.677 4.034.026.165.064.347.05.51-.115-.175-.182-.383-.258-.58-.25-.765-.432-1.549-.604-2.334a26.008 26.008 0 01-.562-4.316c-.025-.844-.004-1.727.37-2.502.118-.225.259-.46.48-.597a.411.411 0 01.218-.049l-.026.02zM6.516 1.77c.128 0 .139.16.168.252.266.798.422 1.628.679 2.429.174.648.238 1.322.308 1.99.097 1.04.108 2.086.246 3.12.026.199.082.394.119.59.01.068-.059.05-.083.014-.148-.16-.183-.39-.246-.592-.16-.645-.242-1.304-.334-1.962-.174-1.315-.287-2.64-.529-3.945-.158-.612-.356-1.215-.46-1.838.006-.051.093-.048.132-.058zM4.589 3.608c.229.055.365.267.512.433.4.535.54 1.204.695 1.843.283 1.265.446 2.554.725 3.82.131.666.293 1.327.507 1.971.014.051.035.133.038.17-.233-.43-.393-.896-.565-1.352-.598-1.7-.823-3.497-1.3-5.23-.133-.477-.308-.95-.596-1.357-.047-.087-.08-.204-.037-.296.006-.004.014-.003.02-.002zm12.646 13.195c-.136.007-.31.11-.276.268.094.217.334.307.526.416.441.215.938.289 1.358.545.092.06.149.197.064.287-.18.267-.47.44-.723.634-.372.266-.777.51-1.057.879-.066.107-.041.267.082.32.109.079.243.019.338-.05.518-.295.995-.655 1.478-1.002.32-.24.644-.478.926-.761.085-.135-.03-.274-.118-.37-.273-.286-.62-.488-.965-.672a4.959 4.959 0 00-1.458-.493 1.251 1.251 0 00-.175-.001zm-11.276.029c-.527.133-.997.42-1.474.672-.425.243-.854.497-1.205.842a.699.699 0 00-.172.487c.065.109.2.14.301.206.852.442 1.735.823 2.63 1.168.132.042.265.113.406.108.158-.02.309-.205.213-.357-.146-.243-.42-.361-.65-.506-.547-.303-1.154-.512-1.636-.918-.046-.09.094-.128.142-.18.549-.394 1.229-.592 1.713-1.077.089-.09.164-.258.048-.357-.086-.074-.206-.088-.316-.088zm8.115.792c-.43.028-.835.432-.774.876.032.26.089.526.228.75.12.179.33.285.546.287.273.03.59-.06.726-.319.137-.236.212-.514.205-.787-.038-.46-.466-.844-.93-.807zm-4.49.01c-.464.028-.807.505-.77.953.011.444.315.902.765.995.352.059.71-.19.803-.53.125-.35.132-.762-.044-1.096-.157-.249-.478-.327-.754-.322zm.112.654c.241.063.294.47.045.557-.141.034-.239-.12-.234-.244-.008-.127.05-.287.189-.313zm4.437.142c.097 0 .226.072.19.187-.013.172-.215.333-.377.227-.132-.071-.172-.297-.02-.369a.418.418 0 01.207-.045zm-3.518 2.977c-.553.052-1.044.336-1.542.56-.304.155-.662.311-1.005.186-.377-.119-.707-.35-1.059-.52-.075-.012-.061.078-.047.122.081.53.129 1.102.454 1.55.338.438.902.619 1.433.667.797.072 1.642-.118 2.271-.629.309-.262.571-.63.585-1.049-.006-.324-.244-.596-.524-.734a1.085 1.085 0 00-.566-.153zm2.58.008c-.396.052-.815.262-.972.65-.129.359.034.748.272 1.021.426.508 1.07.792 1.718.883.577.078 1.186.015 1.714-.24.438-.225.767-.655.85-1.142.064-.29.081-.59.124-.884-.066-.077-.148.039-.218.052-.337.143-.647.367-1.01.436-.363.024-.687-.172-1.015-.294-.43-.178-.851-.402-1.315-.477a1.21 1.21 0 00-.147-.004z"/>
  </svg>
);

const links = [
  { label: 'GITHUB', value: 'github.com/TheAyushTandon', url: 'https://github.com/TheAyushTandon', icon: <GithubIcon /> },
  { label: 'LINKEDIN', value: 'in/theayushtandon', url: 'https://www.linkedin.com/in/theayushtandon/', icon: <LinkedinIcon /> },
  { label: 'LEETCODE', value: 'leetcode.com/u/TheAyushTandon', url: 'https://leetcode.com/u/TheAyushTandon/', icon: <LeetcodeIcon /> },
  { label: 'CODECHEF', value: 'codechef.com/users/kizuya', url: 'https://www.codechef.com/users/kizuya', icon: <CodechefIcon /> },
  { label: 'EMAIL', value: 'TheAyushTandon@gmail.com', url: 'mailto:TheAyushTandon@gmail.com', icon: <Mail size={28} strokeWidth={2.5} /> },
  { label: 'PHONE', value: '+91 8439655313', url: 'tel:+918439655313', icon: <Phone size={28} strokeWidth={2.5} /> }
];

export default function Contact({ onNavigate }) {
  const linksRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(linksRef.current, 
      { x: 150, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.2)', delay: 0.2 }
    );
  }, []);

  return (
    <div className="absolute-fill bg-p5-white" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
       {/* Halftone background */}
       <div 
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundSize: '20px 20px',
          backgroundImage: 'radial-gradient(circle, var(--black) 2px, transparent 2.5px)',
          opacity: 0.15, zIndex: 0, pointerEvents: 'none'
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1, padding: '4rem 2rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <h1 className="font-p5 text-p5-red" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', transform: 'skewX(-10deg)', textShadow: '6px 6px 0px var(--black)', margin: 0, lineHeight: 1 }}>
            CONTACT ME
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
              <span className="hero-menu-icon" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>▶</span> BACK TO HOME
            </h2>
          </div>
        </div>

        {/* Content Stack Layout */}
        <div className="contact-stack">
          
          {/* 1. Target Dossier */}
          <div style={{ position: 'relative', width: '100%', padding: '2rem 0' }} className="contact-dossier-card">
            
            {/* Background layered polygons for chaos */}
            <div style={{ position: 'absolute', top: 0, left: '-2%', width: '104%', height: '105%', backgroundColor: 'var(--black)', clipPath: 'polygon(2% 0, 100% 5%, 98% 100%, 0 95%)', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', top: '2%', left: '1%', width: '98%', height: '96%', backgroundColor: 'var(--red)', clipPath: 'polygon(0 4%, 100% 0, 96% 100%, 4% 96%)', zIndex: 1 }}></div>
            
            <div style={{ position: 'relative', zIndex: 2, padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--white)', padding: '0.5rem 1.5rem', border: '4px solid var(--black)', transform: 'rotate(-3deg) skewX(-10deg)', boxShadow: '8px 8px 0px var(--black)' }}>
                <h2 className="font-p5 text-p5-red" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, lineHeight: 1 }}>
                  ABOUT ME
                </h2>
              </div>
              
              <div style={{ backgroundColor: 'var(--white)', color: 'var(--black)', padding: '2.5rem', border: '5px solid var(--black)', transform: 'rotate(1deg)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
                <p style={{ fontFamily: 'Roboto', fontSize: '1.4rem', lineHeight: 1.6, margin: 0, fontWeight: 'bold' }}>
                  I like to design and automate things, solving real-life problems. I also love to try new food and enjoy sports. 
                  <br/><br/>
                  <span style={{ color: 'var(--red)', fontWeight: '900', fontSize: '1.6rem', textTransform: 'uppercase', display: 'inline-block', transform: 'skewX(-10deg)' }}>CURRENT STATUS:</span> 
                  <span style={{ marginLeft: '10px' }}>3rd year of B.Tech CSE.</span>
                </p>
              </div>

            </div>
          </div>

          {/* 2. Links / Network */}
          <div className="contact-links-wrapper" style={{ width: '100%', maxWidth: '800px', margin: '2rem 0' }}>
            {links.map((link, i) => (
              <div 
                key={link.label}
                ref={el => linksRef.current[i] = el}
                className="menu-item-box contact-link-box"
                style={{
                  '--stagger-offset': `${(i - 2.5) * 15}px`, // Staggering around center
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem 2rem',
                  gap: '20px',
                  cursor: 'url(/cursor.svg) 11 6, pointer',
                  backgroundColor: 'var(--white)',
                  color: 'var(--black)'
                }}
                onClick={() => window.open(link.url, '_blank')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--red)';
                  e.currentTarget.style.color = 'var(--white)';
                  e.currentTarget.style.transform = 'skewX(-10deg) scale(1.02) translateX(-10px)';
                  e.currentTarget.style.boxShadow = '10px 10px 0px var(--black)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--white)';
                  e.currentTarget.style.color = 'var(--black)';
                  e.currentTarget.style.transform = 'skewX(-10deg)';
                  e.currentTarget.style.boxShadow = '6px 6px 0px var(--black)';
                }}
              >
                <div style={{ transform: 'skewX(10deg)' }}>{link.icon}</div>
                <div style={{ display: 'flex', flexDirection: 'column', transform: 'skewX(5deg)' }}>
                  <h3 className="font-p5" style={{ fontSize: '2.2rem', margin: 0, lineHeight: 1 }}>{link.label}</h3>
                  <span style={{ fontFamily: 'Roboto', fontSize: '1rem', fontWeight: 'bold' }}>{link.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Send Calling Card Form */}
          <div style={{ position: 'relative', width: '100%', padding: '2rem 0', marginTop: '2rem' }} className="contact-form-card">
            
            <div style={{ position: 'absolute', top: 0, left: '-2%', width: '104%', height: '105%', backgroundColor: 'var(--red)', clipPath: 'polygon(0 0, 98% 3%, 100% 97%, 2% 100%)', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', top: '2%', left: '1%', width: '98%', height: '96%', backgroundColor: 'var(--black)', clipPath: 'polygon(3% 2%, 100% 0, 97% 98%, 0 100%)', zIndex: 1 }}></div>
            
            <div style={{ position: 'relative', zIndex: 2, padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ alignSelf: 'center', backgroundColor: 'var(--red)', padding: '0.8rem 2.5rem', border: '4px solid var(--white)', transform: 'rotate(2deg) skewX(-15deg)', boxShadow: '8px 8px 0px var(--black)' }}>
                <h2 className="font-p5 text-p5-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, lineHeight: 1, textShadow: '4px 4px 0px var(--black)' }}>
                  SEND AN EMAIL
                </h2>
              </div>
              
              <div style={{ backgroundColor: 'var(--white)', padding: '2.5rem', border: '4px dashed var(--black)', transform: 'rotate(-1deg)' }}>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const msg = formData.get('message');
                    const name = formData.get('name');
                    window.location.href = `mailto:TheAyushTandon@gmail.com?subject=Message from ${name}&body=${encodeURIComponent(msg)}`;
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  <input 
                    name="name"
                    type="text" 
                    placeholder="YOUR NAME" 
                    required
                    style={{
                      border: '4px solid var(--black)', padding: '1rem', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '1.3rem', boxShadow: '6px 6px 0px var(--black)', outline: 'none', backgroundColor: '#f4f4f4', transform: 'skewX(-2deg)', transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => { e.currentTarget.style.backgroundColor = 'var(--white)'; e.currentTarget.style.transform = 'skewX(-2deg) scale(1.02)'; }}
                    onBlur={(e) => { e.currentTarget.style.backgroundColor = '#f4f4f4'; e.currentTarget.style.transform = 'skewX(-2deg)'; }}
                  />
                  <textarea 
                    name="message"
                    placeholder="YOUR MESSAGE" 
                    required
                    rows={4}
                    style={{
                      border: '4px solid var(--black)', padding: '1rem', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '1.3rem', boxShadow: '6px 6px 0px var(--black)', outline: 'none', resize: 'vertical', backgroundColor: '#f4f4f4', transform: 'skewX(1deg)', transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => { e.currentTarget.style.backgroundColor = 'var(--white)'; e.currentTarget.style.transform = 'skewX(1deg) scale(1.02)'; }}
                    onBlur={(e) => { e.currentTarget.style.backgroundColor = '#f4f4f4'; e.currentTarget.style.transform = 'skewX(1deg)'; }}
                  />
                  <button 
                    type="submit"
                    style={{
                      backgroundColor: 'var(--red)', color: 'var(--white)', border: '4px solid var(--black)', padding: '1rem 3rem', fontFamily: 'Anton', fontSize: '1.8rem', cursor: 'url(/cursor.svg) 11 6, pointer', boxShadow: '8px 8px 0px var(--black)', transition: 'all 0.1s ease', marginTop: '1rem', alignSelf: 'flex-end', transform: 'skewX(-10deg)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-2px, -2px) skewX(-10deg) scale(1.05)'; e.currentTarget.style.boxShadow = '10px 10px 0px var(--black)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'skewX(-10deg)'; e.currentTarget.style.boxShadow = '8px 8px 0px var(--black)'; }}
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
