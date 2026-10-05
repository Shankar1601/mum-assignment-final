import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import { 
  ArrowDown, ArrowUpRight, Menu, X, ChevronLeft, ChevronRight, 
  Search, Plus, Trash2, Edit3, Mail, Phone, Send, 
  Facebook, Linkedin, Instagram, Youtube
} from 'lucide-react';
import './styles.css';

// --- DATA ---
const projects = [
  { title: 'Lampertz Stone Designer', desc: 'We delivered an attractive presentation site to this natural stone specialist in Luxembourg.', img: 'https://www.mum.lu/thumbnails/98123-1000-650-Crop.jpg', video: 'https://www.mum.lu/videos/project-lampertz.mp4', poster: 'https://www.mum.lu/videos/project-lampertz.jpg', thumb: 'https://www.mum.lu/thumbnails/100060-400-225-Crop.png', logo: 'https://www.mum.lu/thumbnails/100059-500-0-Max.png' },
  { title: 'Restaurant le Jardin', desc: 'Sober, elegant, refined: these adjectives serve as a common thread for all the digital and graphic projects of the Le Jardin restaurant.', img: 'https://www.mum.lu/thumbnails/100077-800-500-Crop.jpg', thumb: 'https://www.mum.lu/thumbnails/100084-400-225-Crop.jpg', logo: 'https://www.mum.lu/thumbnails/100078-500-0-Max.png' },
  { title: 'AS Bau', desc: "A personalized presentation of the company and a targeted digital strategy for this growing construction company.", img: 'https://www.mum.lu/thumbnails/99778-800-500-Crop.jpg', thumb: 'https://www.mum.lu/thumbnails/99788-400-225-Crop.png', logo: 'https://www.mum.lu/thumbnails/99776-500-0-Max.png' },
  { title: 'Hotel Bütgenbacher Hof', desc: 'An intuitive site for the hotel and restaurant, supported by targeted advertising tools.', img: 'https://www.mum.lu/thumbnails/100056-800-500-Crop.jpg' },
  { title: 'Palm wood interior', desc: 'Our goal for this carpentry and interior design company? To convince through photos perfectly showcasing their achievements.', img: 'https://www.mum.lu/thumbnails/100066-800-500-Crop.jpg' }
];

const services = [
  ['Strategy', 'Marketing strategies that work effectively.', ['Marketing strategy', 'Web Analytics & Reporting'], 'https://www.mum.lu/thumbnails/98123-1000-650-Crop.jpg'],
  ['Creation', 'Designs, websites & content that make your brand shine.', ['Design & Graphic Identity', 'Website Creation', 'Content Creation & Storytelling'], 'https://www.mum.lu/thumbnails/122604-1000-650-Crop.jpg'],
  ['Marketing', 'Smart campaigns with tangible and measurable results.', ['360° Marketing', 'Search Engine Optimization (SEO/GEO)', 'Online Advertising (SEA/SMA)', 'Social Media Marketing (SMM)', 'Email Marketing'], 'https://www.mum.lu/thumbnails/120771-1000-650-Crop.jpg'],
  ['Applications', 'Digital tools that revolutionize your daily life and processes.', ['Web Applications', 'CMS - Content Management Systems', 'Cloud Services', 'AI Solutions'], 'https://www.mum.lu/thumbnails/122634-1000-650-Crop.jpg']
];

// --- HOOKS ---
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal, .reveal-el, .scroll-el');
    if (!els) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in', 'visible');
        io.unobserve(e.target);
      }
    }), { threshold: 0.08 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
  return ref;
}

// --- COMPONENTS ---
function Cursor() {
  const cursorRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const target = { x: -100, y: -100 }, position = { x: -100, y: -100 };
    let frame = 0;
    const move = e => { target.x = e.clientX; target.y = e.clientY };
    const over = e => setHover(!!e.target.closest('a, button'));
    const press = () => setDown(true);
    const release = () => setDown(false);
    
    const animate = () => {
      position.x += (target.x - position.x) * 0.1;
      position.y += (target.y - position.y) * 0.1;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${position.x}px`;
        cursorRef.current.style.top = `${position.y}px`;
      }
      frame = requestAnimationFrame(animate);
    };
    
    frame = requestAnimationFrame(animate);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, []);

  return <div ref={cursorRef} className={`cursor ${hover ? 'is-hover' : ''} ${down ? 'is-down' : ''}`} aria-hidden="true" />
}

function Logo() {
  return (
    <div className="logo" aria-hidden="true">
      <svg viewBox="0 0 254.79 254.79" className="logo-svg" width="64" height="64">
        <g>
          <path className="circle inner" fill="currentColor" opacity="0.4" d="M127.4,14.59c-62.2,0-112.81,50.61-112.81,112.81s50.61,112.81,112.81,112.81,112.81-50.61,112.81-112.81S189.6,14.59,127.4,14.59ZM127.4,230.66c-56.94,0-103.26-46.32-103.26-103.26S70.46,24.14,127.4,24.14s103.26,46.32,103.26,103.26-46.32,103.26-103.26,103.26Z"/>
          <path className="circle outside" fill="currentColor" d="M127.4,0C57.15,0,0,57.15,0,127.4s57.15,127.4,127.4,127.4,127.4-57.15,127.4-127.4S197.64,0,127.4,0ZM14.59,127.4c0-62.2,50.61-112.81,112.81-112.81s112.81,50.61,112.81,112.81-50.61,112.81-112.81,112.81S14.59,189.6,14.59,127.4Z"/>
          <path className="icon" fill="currentColor" d="M95.12,82.53h-12.71c-3.17,0-5.75,2.58-5.75,5.75v78.24c0,3.17,2.58,5.75,5.75,5.75h9.07c3.17,0,5.75-2.58,5.75-5.75v-47.82c0-1.25.72-2.33,1.88-2.81,1.16-.48,2.43-.23,3.31.66l20.84,20.84c2.24,2.24,5.89,2.24,8.13,0l10.48-10.48-42.69-42.7c-1.08-1.08-2.53-1.68-4.06-1.68Z"/>
          <path className="icon" fill="currentColor" d="M172.38,82.53h-12.71c-1.54,0-2.98.6-4.06,1.68l-25.02,25.03,14.55,14.55,7.24-7.24c.59-.59,1.35-.9,2.13-.9.4,0,.8.08,1.18.24,1.16.48,1.88,1.56,1.88,2.81v47.82c0,3.17,2.58,5.75,5.75,5.75h9.07c3.17,0,5.75-2.58,5.75-5.75v-78.24c0-3.17-2.58-5.75-5.75-5.75Z"/>
        </g>
      </svg>
    </div>
  );
}

function Header({ open, isOpen }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const marker = window.scrollY + 59;
      const isLight = [...document.querySelectorAll('.bg-white')].some(el => {
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        return marker >= top && marker < top + el.offsetHeight;
      });
      setLight(isLight);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    checkScroll();
    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <header className={`${light ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <a href="/" className="brand" aria-label="MUM digital agency home">
        <b>MUM</b> digital agency
      </a>
      
      <div className="header-nav">
        <a className="home-logo" href="/" aria-label="MUM digital agency home">
          <div className="logo-circle"><Logo /></div>
        </a>
        <button className="menu" onClick={open} aria-label={isOpen ? 'Close navigation' : 'Open navigation'}>
          <span className="menu-lines"><i></i><i></i></span>
        </button>
      </div>
    </header>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const consent = localStorage.getItem('mum_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem('mum_cookie_consent', 'true');
    setVisible(false);
  };

  return (
    <div className="cookie-banner">
      <p>We use cookies to ensure you get the best experience on our website. <a href="#privacy">Privacy Policy</a></p>
      <div className="cookie-actions">
        <button className="btn-outline dark" style={{ padding: '10px 20px', fontSize: '15px' }} onClick={() => setVisible(false)}>Decline</button>
        <button className="submit" style={{ margin: 0, padding: '10px 20px', fontSize: '15px' }} onClick={accept}>Allow cookies</button>
      </div>
    </div>
  );
}

function Drawer({ onClose }) {
  return (
    <div className="drawer">
      <div className="drawer-lang">
        <span className="active">EN</span> <span className="sep">|</span> <span>FR</span>
      </div>
      <button onClick={onClose} className="close" aria-label="Close Menu"><X /></button>
      <div className="drawer-links">
        <a href="#agency" onClick={onClose}>Agency</a>
        <a href="#services" onClick={onClose}>Services</a>
        <a href="#projects" onClick={onClose}>Projects</a>
        <a href="#clients" onClick={onClose}>Clients</a>
        <a href="#insights" onClick={onClose}>Insights</a>
      </div>
      <div className="drawer-cta">
        <a href="#contact" onClick={onClose}>Start your project <ArrowUpRight size={28} /></a>
        <div className="drawer-social" style={{ display: 'flex', gap: '15px' }}>
          <a href="#" aria-label="Facebook"><Facebook /></a>
          <a href="#" aria-label="LinkedIn"><Linkedin /></a>
          <a href="#" aria-label="Instagram"><Instagram /></a>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const words = ['innovative', 'attractive', 'effective', 'simple', 'understandable', 'authentic', 'AI-ready', 'measurable', 'sustainable', 'lasting'];
  const [word, setWord] = useState(0);
  const reelRef = useRef(null), visualRef = useRef(null), discoverRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const ratio = reelRef.current, visual = visualRef.current;
      if (!ratio || !visual) return;
      if (window.innerWidth <= 992) {
        visual.style.transform = ''; visual.style.width = ''; visual.style.height = ''; 
        if(discoverRef.current) discoverRef.current.style.opacity = 1;
        return;
      }
      const height = ratio.offsetHeight;
      const progress = Math.min(Math.max(window.scrollY / height, 0), 1);
      visual.style.transform = `translateY(${-400 + 400 * progress}px)`;
      visual.style.width = `${600 + (ratio.offsetWidth - 600) * progress}px`;
      visual.style.height = `${337 + (height - 337) * progress}px`;
      
      if (discoverRef.current) {
        discoverRef.current.style.opacity = Math.max(0, 1 - progress * 2.5);
      }
    };
    let frame = 0;
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(() => { update(); frame = 0 }) };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let timer, resetTimer;
    const advance = () => {
      setWord(v => {
        if (v === words.length) {
          resetTimer = setTimeout(() => setWord(0), 800);
          return v;
        }
        return v + 1;
      });
      timer = setTimeout(advance, 1600);
    };
    timer = setTimeout(advance, 800);
    return () => { clearTimeout(timer); clearTimeout(resetTimer) };
  }, [words.length]);

  return (
    <section className="heroreel">
      <div className="hero">
        <div className="hero-copy container-big">
          <h1>
            <span className="reveal-el"><span>Agency of</span></span>
            <span className="reveal-el"><span><strong>digital marketing</strong></span></span>
          </h1>
        </div>
        <div className="tagline">
          <span className="fixed-text">We return</span>
          <span className="fixed-text">your marketing</span>
          <span className="tagline-window">
            <span className="tagline-words" style={{ transform: `translate3d(0,${-word * (window.innerWidth <= 991 ? 35 : 43)}px,0)` }}>
              {[...words, 'innovative'].map((value, index) => <b key={`${value}-${index}`}>{value}</b>)}
            </span>
          </span>
        </div>
      </div>
      <div className="reel">
        <div className="reel-ratio" ref={reelRef}>
          <div className="hero-media" id="visual" ref={visualRef}>
            <div className="discover" ref={discoverRef}>
              <span>Discover</span>
              <ArrowDown size={20} />
            </div>
            <video autoPlay muted loop playsInline poster="https://www.mum.lu/videos/mum-intro-25.jpg">
              <source src="https://www.mum.lu/videos/mum-intro-25.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    ['Visibility', 'More visibility', "Strong brand image, enhanced awareness & a head start over your competitors."],
    ['Growth', 'Client acquisition', 'The right prospects, new high-value clients, sustainable growth.'],
    ['Recruiting', 'Successful recruiting', 'An attractive employer brand and campaigns that attract the best talents.'],
    ['Efficiency', 'Digital agility', 'More efficiency thanks to smart and AI tools that accelerate your daily workflows.']
  ];
  const scrollRef = useRef(null);

  useEffect(() => {
    const root = scrollRef.current, track = root?.querySelector('.benefit-track'), pin = root?.querySelector('.benefit-grid');
    if (!root || !track || !pin) return;
    let frame = 0, travel = 0, start = 0, active = true;
    
    const update = () => {
      if (window.innerWidth <= 992) { track.style.transform = ''; return }
      const progress = travel ? Math.min(1, Math.max(0, (window.scrollY - start) / travel)) : 0;
      track.style.transform = `translate3d(${-travel * progress}px,0,0)`;
    };
    
    const measure = () => {
      if (!active) return;
      if (window.innerWidth <= 992) {
        root.style.height = '';
        track.style.transform = '';
        pin.style.removeProperty('--pin-offset');
        return;
      }
      travel = Math.min(Math.max(0, track.scrollWidth + parseFloat(getComputedStyle(pin).paddingLeft) * 2 - root.clientWidth), root.clientWidth + 4);
      const offset = (window.innerHeight - pin.offsetHeight) / 2;
      start = root.getBoundingClientRect().top + window.scrollY + 80 - offset;
      pin.style.setProperty('--pin-offset', `${offset}px`);
      root.style.height = `${pin.offsetHeight + travel + 80}px`;
      update();
    };
    
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(() => { update(); frame = 0 }) };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    measure();
    document.fonts.ready.then(() => { if (active) measure() });
    
    return () => {
      active = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="benefits bg-white" id="agency">
      <div className="container-small">
        <div className="intro-center scroll-el">
          <p>Hand in hand with our clients, our <strong>agency</strong> delivers powerful <strong>marketing projects</strong> and implements high-performing <strong>advertising strategies</strong>. All this thanks to a dynamic team with over 25+ years of experience.</p>
        </div>
        <div className="sectionlead">
          <span className="scroll-el h2">
            <span className="reveal-el"><span>Your goals, </span></span>
            <span className="reveal-el"><span>our mission!</span></span>
          </span>
          <div className="sectionlead-text scroll-el">
            <p>We understand your challenges and provide comprehensive, intelligent, digital, and proven solutions.</p>
            <h2>Why our digital marketing?</h2>
          </div>
        </div>
      </div>
      <div className="horizontal-scroll" ref={scrollRef}>
        <div className="benefit-grid">
          <div className="benefit-track">
            {items.map(([tag, title, description]) => (
              <article className="benefit reveal" key={tag}>
                <span className="hash">{tag}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services" id="services">
      <div className="container-small">
        <div className="sectionlead">
          <span className="scroll-el h2">
            <span className="reveal-el"><span>A la carte or </span></span>
            <span className="reveal-el"><span>full-service</span></span>
          </span>
          <div className="sectionlead-text scroll-el">
            <h2 className="toptitle scroll-el">Agency services</h2>
            <p>Our in-house team masters the entire spectrum of <strong>digital marketing</strong>. From <strong>strategy </strong> and <strong>creation </strong> to sophisticated <strong>campaigns</strong>.</p>
          </div>
        </div>
      </div>
      <div className="container-big">
        <div className="servicecards">
          {services.map(([name, description, list, image]) => (
            <article className="servicecards-item servicecard" key={name}>
              <div className="servicecard-text">
                <div className="text-wrap">
                  <span className="servicecard-service">{name}</span>
                  <h3 className="servicecard-slogan">{description}</h3>
                </div>
                <ul className="catlist">
                  {list.map(item => <li key={item}><a href="#services">{item}</a></li>)}
                </ul>
              </div>
              <div className="servicecard-visual">
                <img src={image} alt={name} width="1000" height="650" loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [idx, setIdx] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);
  const dragOffsetRef = useRef(0);
  const project = projects[idx];

  const previous = () => setIdx(value => Math.max(0, value - 1));
  const next = () => setIdx(value => Math.min(projects.length - 1, value + 1));

  const onPointerDown = event => {
    if (!event.isPrimary || event.button !== 0 || event.target.closest('a, button')) return;
    dragStart.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  
  const onPointerMove = event => {
    if (dragStart.current === null) return;
    const offset = event.clientX - dragStart.current;
    const nextOffset = Math.abs(offset) > 5 ? offset : 0;
    dragOffsetRef.current = nextOffset;
    setDragOffset(nextOffset);
  };
  
  const onPointerUp = () => {
    if (dragStart.current === null) return;
    const offset = dragOffsetRef.current;
    dragStart.current = null;
    dragOffsetRef.current = 0;
    setIsDragging(false);
    setDragOffset(0);
    if (offset < -80) next();
    else if (offset > 80) previous();
  };

  return (
    <section className="projects bg-white" id="projects">
      <div className="container-big">
        <div className="projects-heading">
          <div className="left">
            <span className="scroll-el h2">
              <span className="reveal-el"><span>Fresh creations</span></span>
              <span className="reveal-el"><span>from the team</span></span>
            </span>
            <h2 className="toptitle scroll-el">Recent agency projects</h2>
          </div>
          <a className="pagelink scroll-el" href="#projects">Discover all projects <ArrowUpRight /></a>
        </div>
        <div className="projectslider scroll-el">
          <article
            className={`projectslider-item${isDragging ? ' is-dragging' : ''}`}
            key={project.title}
            aria-label={`Project ${idx + 1} of ${projects.length}: ${project.title}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={isDragging ? { transform: `translateX(${dragOffset}px)` } : undefined}
          >
            <div className="flex-ctr">
              <div className="projectslider-bigthumb">
                <div className="video-wrap">
                  {project.video && idx === 0 ? (
                    <video autoPlay muted loop playsInline poster={project.poster}>
                      <source src={project.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={project.img} alt={project.title} />
                  )}
                </div>
              </div>
              <div className="projectslider-infos">
                <h3>{project.title}</h3>
                <div className="subtitle">{project.desc}</div>
                <a className="btn-outline" href="#projects">View project</a>
                <div className="projectslider-smallthumbs">
                  <div className="smallthumbs-item">
                    <img src={project.thumb || project.img} alt={`${project.title} project image`} />
                  </div>
                  <div className="smallthumbs-item">
                    <div className="img-wrap">
                      <img src={project.logo || project.img} alt={`${project.title} logo`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="project-arrows">
              <button type="button" aria-label="Previous project" disabled={idx === 0} onClick={previous}><ChevronLeft /></button>
              <button type="button" aria-label="Next project" disabled={idx === projects.length - 1} onClick={next}><ChevronRight /></button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="testimonials bg-white" id="clients">
      <div className="container-big">
        <div className="section-inset">
          <h2 className="toptitle">What our agency clients say</h2>
          <div className="testimonials-item">
            <div className="testimonials-text">
              For years, the MUM team has been professional, competent, and up to date with the latest know-how and expertise.
            </div>
            <div className="testimonials-infos">
              <div className="client">
                <div className="client-logo">
                  <img src="https://www.mum.lu/thumbnails/104154-200-0-Max.png" alt="Johny Blom - TransSport" loading="lazy" />
                </div>
                <div className="client-text">
                  <span className="client-name">Johny Blom</span>
                  <span className="client-company">TransSport</span>
                </div>
              </div>
              <div className="pagelink"><a href="#clients">Clients</a></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section className="blog bg-white" id="insights">
      <div className="container-big">
        <div className="blog-heading">
          <div className="left">
            <span className="h2 scroll-el">Good to know</span>
          </div>
          <a className="pagelink scroll-el" href="#insights">All articles</a>
        </div>
        <div className="section-inset">
          <div className="blog-inner">
            <div className="bloglist grid-row scroll-el">
              <h2 className="toptitle">
                <span className="reveal-el"><span>Latest marketing </span></span>
                <span className="reveal-el"><span>trends</span></span>
              </h2>
              <article className="bloglist-item">
                <a href="#insights">
                  <div className="text">
                    <div className="category">Subsidies</div>
                    <h3>SME Package Digital: 70% subsidy for your website and marketing</h3>
                    <p className="summary">Luxembourg SMEs benefit from a 70% subsidy on the costs of modernizing their website or digital marketing campaigns.</p>
                    <span className="lnk">Read more</span>
                  </div>
                </a>
              </article>
              <article className="bloglist-item">
                <a href="#insights">
                  <div className="text">
                    <div className="category">Web Marketing</div>
                    <h3>SEO on Google</h3>
                    <p className="summary">How to optimize your website for Google? Opt for local SEO in your region to maximize reach.</p>
                    <span className="lnk">Read more</span>
                  </div>
                </a>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const values = [
    ['thinkahead', 'We think ahead for you!', 'With a visionary outlook, proactive planning, and a solutions-oriented mindset.'],
    ['made-to-measure', 'We create tailor-made solutions!', 'Solutions tailored to your needs, whether for unique projects or as a full-service partner for your marketing.'],
    ['team-of-experts', 'We work hand in hand!', 'Flawless support from 10 talents who effectively combine their expertise for your projects.'],
    ['just-in-time', 'We always keep our promises!', 'With great responsiveness, reliable organization, and results aimed at excellence.']
  ];
  
  return (
    <section className="about bg-white">
      <div className="container-big">
        <div className="about-inner grid-row">
          <div className="about-visual scroll-el">
            <h2 className="toptitle">About our agency</h2>
            <img src="https://www.mum.lu/thumbnails/120772-600-500-Crop.jpg" alt="MUM Team" width="600" height="500" loading="lazy" />
            <a className="pagelink" href="#agency">Let's get to know each other</a>
          </div>
          <div className="about-text">
            <div className="about-intro page-bq scroll-el">
              <p>For 25+ years, our loyal clients have appreciated our team for its professional expertise, high reliability, and strong work mentality.</p>
            </div>
            <ul className="about-usp hashlist list-unstyled">
              {values.map(([tag, title, description]) => (
                <li key={tag} className="scroll-el">
                  <span className="hash">{tag}</span>
                  <div className="usp-text">
                    <span className="h4">{title}</span>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  
  const submit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.message.trim()) {
      setStatus('Please enter a valid name, email and message.');
      return;
    }
    setStatus('Sending…');
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const r = await fetch(`${base}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!r.ok) throw new Error('API');
      setStatus('Thanks — your enquiry has been sent.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      const saved = JSON.parse(localStorage.getItem('mum_demo_submissions') || '[]');
      saved.unshift({ ...form, id: Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem('mum_demo_submissions', JSON.stringify(saved));
      setStatus('Saved locally for demo — connect the backend to persist it in PostgreSQL.');
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-intro">
        <span className="eyebrow">An idea, a project?</span>
        <h2>Let's start today!</h2>
        <p>Tell us about your goals. We listen, understand, and develop a solution that drives your idea forward.</p>
        <div className="contact-meta">
          <span><Mail /> hello@mum.lu</span>
          <span><Phone /> +352 27 80 73 16</span>
        </div>
      </div>
      <form onSubmit={submit}>
        <label>Name
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
        </label>
        <label>Email
          <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
        </label>
        <label>Phone
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+352 ..." />
        </label>
        <label>Message
          <textarea required rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project" />
        </label>
        <button className="submit">Send your request <Send size={18} /></button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-cols">
        <div className="footer-col">
          <p>
            MUM digital agency<br/>
            Om Knupp 3<br/>
            9991 Weiswampach<br/>
            Luxembourg
          </p>
        </div>
        <div className="footer-col footer-links">
          <a href="#contact">Contact</a>
          <a href="#agency">Career</a>
          <a href="#services">Support</a>
          <a href="#contact" className="footer-btn">Your Project <ArrowUpRight size={18} /></a>
        </div>
        <div className="footer-col footer-social">
          <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
          <a href="#" aria-label="Youtube"><Youtube size={18} /></a>
          <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
        </div>
      </div>
      <div className="copy">
        © 2015-2026 MUM digital agency. Legal notice - Privacy policy - Terms and conditions
      </div>
    </footer>
  );
}

function Admin() {
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const empty = { name: '', email: '', phone: '', message: '' };
  
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('newest');
  const [filter, setFilter] = useState('all');
  const [edit, setEdit] = useState(null);
  const [view, setView] = useState(null);
  const [newEntry, setNew] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const r = await fetch(`${API}/submissions${q ? `?q=${encodeURIComponent(q)}` : ''}`);
      if (!r.ok) throw new Error('load');
      setItems(await r.json());
    } catch {
      setError('API unavailable — showing local demo data.');
      try {
        setItems(JSON.parse(localStorage.getItem('mum_demo_submissions') || '[]'));
      } catch {
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(load, 180);
    return () => clearTimeout(t);
  }, [q]);

  const persistLocal = (next) => {
    localStorage.setItem('mum_demo_submissions', JSON.stringify(next));
    setItems(next);
  };

  const save = async () => {
    if (!newEntry.name.trim() || !/^\S+@\S+\.\S+$/.test(newEntry.email) || !newEntry.message.trim()) {
      return setError('Name, valid email and message are required.');
    }
    try {
      const r = await fetch(`${API}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });
      if (!r.ok) throw new Error();
      await load();
    } catch {
      persistLocal([{ ...newEntry, id: Date.now(), created_at: new Date().toISOString() }, ...items]);
    }
    setNew(empty);
  };

  const remove = async (id) => {
    try {
      const r = await fetch(`${API}/submissions/${id}`, { method: 'DELETE' });
      if (!r.ok) throw new Error();
      await load();
    } catch {
      persistLocal(items.filter(x => String(x.id) !== String(id)));
    }
  };

  const update = async () => {
    if (!edit) return;
    try {
      const r = await fetch(`${API}/submissions/${edit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(edit)
      });
      if (!r.ok) throw new Error();
      await load();
    } catch {
      persistLocal(items.map(x => String(x.id) === String(edit.id) ? edit : x));
    }
    setEdit(null);
  };

  const processedItems = items
    .filter(x => {
      if (filter === 'withPhone') return !!x.phone;
      if (filter === 'withoutPhone') return !x.phone;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'oldest') return new Date(a.created_at || a.createdAt) - new Date(b.created_at || b.createdAt);
      if (sort === 'name') return (a.name || '').localeCompare(b.name || '');
      return new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt);
    });

  return (
    <div className="admin">
      <div className="admin-top">
        <a href="/">← Back to site</a>
        <h1>Submission dashboard</h1>
        <span>{processedItems.length} entries</span>
      </div>
      {error && <div className="admin-alert">{error}</div>}
      <div className="admin-panel">
        <div className="admin-create">
          <h2>Add entry</h2>
          {['name', 'email', 'phone'].map(k => (
            <input key={k} placeholder={k} value={newEntry[k]} onChange={e => setNew({ ...newEntry, [k]: e.target.value })} />
          ))}
          <textarea placeholder="message" value={newEntry.message} onChange={e => setNew({ ...newEntry, message: e.target.value })} />
          <button onClick={save}><Plus size={16} /> Add</button>
        </div>
        <div className="admin-list">
          <div className="admin-filters">
            <div className="search">
              <Search size={20} />
              <input placeholder="Search submissions..." value={q} onChange={e => setQ(e.target.value)} />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Sort by Name</option>
            </select>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="all">All Submissions</option>
              <option value="withPhone">With Phone</option>
              <option value="withoutPhone">Without Phone</option>
            </select>
          </div>
          {loading ? (
            <div className="empty">Loading…</div>
          ) : processedItems.length === 0 ? (
            <div className="empty">No submissions found.</div>
          ) : (
            processedItems.map(x => (
              <article key={x.id} className="entry">
                <div>
                  <b>{x.name}</b>
                  <span>{x.email} · {x.phone || 'No phone'}</span>
                  <p>{x.message}</p>
                </div>
                <div className="entry-actions">
                  <button aria-label="View" onClick={() => setView(x)}>View</button>
                  <button aria-label="Edit" onClick={() => setEdit(x)}><Edit3 size={16} /></button>
                  <button aria-label="Delete" onClick={() => remove(x.id)}><Trash2 size={16} /></button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
      
      {/* Modals */}
      {(edit || view) && (
        <div className="modal">
          <div>
            {edit ? (
              <>
                <button className="close" onClick={() => setEdit(null)}><X /></button>
                <h2>Edit submission</h2>
                <input value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} />
                <input type="email" value={edit.email} onChange={e => setEdit({ ...edit, email: e.target.value })} />
                <input value={edit.phone || ''} onChange={e => setEdit({ ...edit, phone: e.target.value })} />
                <textarea value={edit.message} onChange={e => setEdit({ ...edit, message: e.target.value })} />
                <button onClick={update}>Save changes</button>
              </>
            ) : (
              <>
                <button className="close" onClick={() => setView(null)}><X /></button>
                <h2>{view.name}</h2>
                <p><b>Email:</b> {view.email}</p>
                <p><b>Phone:</b> {view.phone || '—'}</p>
                <p><b>Message:</b> {view.message}</p>
                <p><b>Created:</b> {view.created_at || view.createdAt}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1.2, autoRaf: false });
    let frame;
    const raf = time => { lenis.raf(time); frame = requestAnimationFrame(raf) };
    frame = requestAnimationFrame(raf);
    document.documentElement.classList.add('lenis', 'lenis-smooth');
    return () => { cancelAnimationFrame(frame); lenis.destroy(); document.documentElement.classList.remove('lenis', 'lenis-smooth') };
  }, []);
  return null;
}

function App() {
  if (window.location.pathname.startsWith('/admin')) return <Admin />;
  
  const [menu, setMenu] = useState(false);
  const ref = useReveal();
  
  return (
    <>
      <SmoothScroll />
      <Cursor />
      {menu && <Drawer onClose={() => setMenu(false)} />}
      <Header isOpen={menu} open={() => setMenu(v => !v)} />
      <main ref={ref}>
        <Hero />
        <Benefits />
        <Services />
        <Projects />
        <Testimonial />
        <Insights />
        <About />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
} 

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}