import { useEffect, useRef, useState } from 'react';
import ScrollytellingEngine from './components/ScrollytellingEngine';
import HeroSection from './components/HeroSection';
import InfographicsCarousel from './components/InfographicsCarousel';
import TestimonialsSection from './components/TestimonialsSection';
import ConsultationModal from './components/ConsultationModal';
import RiskCalculator from './components/RiskCalculator';
import ScrollToTopButton from './components/ScrollToTopButton';
import SectionNavDots from './components/SectionNavDots';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  Flame, 
  Activity, 
  Wind, 
  Zap, 
  Layers, 
  Users, 
  MapPin, 
  Award, 
  Mail, 
  Droplets, 
  Infinity, 
  CheckCircle2, 
  Globe,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQ_DATA = [
  {
    q: "1. Why shouldn't I rebuild the same way after a wildfire?",
    a: "Rebuilding is a chance to come home stronger. Instead of recreating the same vulnerabilities, SCIP construction gives your family a more resilient, fire-resistant path forward from the start."
  },
  {
    q: "2. What makes an Everlasting Home different?",
    a: "An Everlasting Home is built with more than beauty in mind. Behind the custom design is SCIP technology, created to support strength, comfort, energy efficiency, and long-term peace of mind."
  },
  {
    q: "3. Will it still look and feel like a luxury home?",
    a: "Yes. Your home can still feel elegant, personal, and beautifully designed. SCIP strengthens the structure behind the walls while allowing room for modern architecture, custom layouts, elevated finishes, and indoor-outdoor living."
  },
  {
    q: "4. Is this only for wildfire rebuilds?",
    a: "Not at all. Everlasting Homes is also for families building new custom homes, especially in areas where fire, earthquakes, wind, moisture, pests, or rising energy costs are part of the bigger picture."
  },
  {
    q: "5. Can I use my own architect or contractor?",
    a: "Yes. If you already have a trusted team, Everlasting Homes can work alongside them to build the SCIP shell — including the walls, floors, and roof system — while helping strengthen the home’s core structure."
  },
  {
    q: "6. Can Everlasting Homes manage the full build?",
    a: "Yes. For homeowners who want more guidance, the turnkey option can support the full journey — from planning and permits to demolition, construction, interior design, and final delivery."
  },
  {
    q: "7. Is SCIP construction worth the investment?",
    a: "For families thinking long-term, it can be. SCIP construction is designed to help protect against fire, energy waste, moisture, pests, maintenance concerns, and structural wear over time."
  },
  {
    q: "8. How much does it cost to build an Everlasting Home?",
    a: "Every home is different. Pricing depends on your property, design, square footage, finish level, site conditions, and whether you need a turnkey build or a SCIP shell. A consultation is the best place to start."
  },
  {
    q: "9. Are these homes energy efficient?",
    a: "Yes. SCIP homes are designed with insulation and concrete working together to support steady indoor comfort, better efficiency, and reduced energy waste."
  },
  {
    q: "10. How does this help protect my family?",
    a: "It creates a stronger building envelope around the life you are building inside. Everlasting Homes are designed to help protect against fire, earthquakes, wind, moisture, mold, termites, and long-term wear."
  },
  {
    q: "11. When should I contact Everlasting Homes?",
    a: "The earlier, the better. Reaching out before plans, permits, or builder decisions are finalized gives you more options and helps avoid costly changes later."
  },
  {
    q: "12. Do I need a turnkey build or just the SCIP shell?",
    a: "If you want full support from start to finish, turnkey may be the best fit. If you already have a team and want to strengthen the structure, the SCIP shell may be the right path."
  },
  {
    q: "13. What is the next step?",
    a: "Start with a consultation. The Everlasting Homes team can review your property, goals, timeline, plans, and help you understand the strongest path forward."
  }
];

const AWARD_SEALS = [
  { src: '/award-seals/doe-seal.png',           alt: 'Department of Energy Recognition' },
  { src: '/award-seals/resnet-seal.png',         alt: 'RESNET HERS Performance' },
  { src: '/award-seals/green-builder-seal.png',  alt: 'Green Builder Recognition' },
  { src: '/award-seals/build-mag-seal.png',      alt: 'BUILD Magazine Recognition' },
];

const CERT_LOGOS = [
  { src: '/Certs/ghba.png',        alt: 'GHBA' },
  { src: '/Certs/resnet.jpg',       alt: 'RESNET' },
  { src: '/Certs/energy-star.png',  alt: 'Energy Star' },
  { src: '/Certs/nahb.webp',        alt: 'NAHB' },
  { src: '/Certs/rsg.png',          alt: 'RSG' },
  { src: '/Certs/zero-home.jpg',    alt: 'Zero Energy Home' },
];

function App() {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const lenisRaf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      const isHero = section.id === 'hero';
      const reveals = section.querySelectorAll('.reveal');

      gsap.fromTo(reveals, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: isHero ? "top 20%" : "top 60%", 
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });

    return () => {
      gsap.ticker.remove(lenisRaf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    
    // Read the Formspree Form ID from environment variables or fallback to mailto
    const formId = import.meta.env.VITE_FORMSPREE_ID;
    
    if (!formId || formId === 'YOUR_FORMSPREE_ID') {
      // Fallback: If no Formspree ID is set, use the mailto fallback to prevent breaking forms
      const { name, email, phone } = formData;
      const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}`;
      window.location.href = `mailto:hello@everlasting.build?subject=Consultation Request — ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setFormStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided'
        })
      });

      if (response.ok) {
        setFormStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', phone: '' });
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.errors 
          ? errorData.errors.map(err => err.message).join(', ') 
          : 'Submission failed. Please check your form configurations.';
        setFormStatus({ submitting: false, success: false, error: errorMessage });
      }
    } catch (err) {
      setFormStatus({ 
        submitting: false, 
        success: false, 
        error: 'A connection error occurred. Please check your internet connection and try again.' 
      });
    }
  };

  return (
    <div id="scroll-container" ref={containerRef} style={{ height: '1600vh' }}>
      <nav>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('go-home'));
            lenisRef.current?.scrollTo(0, { immediate: true });
          }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img src="/Logos/ehbg-logo.png" alt="Everlasting Homes Building Group" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
        </a>
        <div className="menu-links" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <a href="#scip-core" className="nav-text-link" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Technology</a>
          <a href="#fire-protection" className="nav-text-link" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Protection</a>
          <a href="#house-wireframe" className="nav-text-link" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>About</a>
          <a href="#portfolio" className="nav-text-link" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Projects</a>
          <a href="/media" className="nav-text-link" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Media</a>

          {/* Social Media Icons */}
          <a href="https://www.facebook.com/youreverlastinghome" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--text)', display: 'flex', alignItems: 'center' }}>
            <Facebook size={12} />
          </a>
          <a href="https://www.instagram.com/everlastinghomesgroup" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--text)', display: 'flex', alignItems: 'center' }}>
            <Instagram size={12} />
          </a>
          <a href="https://www.youtube.com/channel/UClo9NRUNTukJqDvXSHrS5tg" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--text)', display: 'flex', alignItems: 'center' }}>
            <Youtube size={12} />
          </a>
          
          <button onClick={() => setShowCalculator(true)} className="cta-btn" style={{ padding: '0.6rem 1.1rem', fontSize: '0.75rem', background: 'transparent', color: 'var(--gold)' }}>Calculate Your Risk</button>
        </div>
      </nav>

      <ScrollytellingEngine />

      {/* SECTION 01 — Hero */}
      <HeroSection onOpenCalculator={() => setShowCalculator(true)} />

      {/* SECTION 02 — SCIP Intro */}
      <section id="scip-core">
        <div className="content-wrapper">
          <div className="glow-content reveal" style={{ maxWidth: '680px' }}>
            <span className="section-subtitle">A Stronger Way to Build</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '0.58rem' }}>Luxury Custom Homes Built With SCIP Technology</h2>
            <h3 style={{ fontSize: '1.7rem', color: 'var(--gold)', marginBottom: '1.1rem', fontWeight: 600 }}>Innovation Meets Resilience</h3>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.45, color: 'rgba(255,255,255,0.8)', marginBottom: '1.25rem' }}>
              Everlasting Homes uses Structural Concrete Insulated Panel technology to create high-performance homes designed for resilience, energy efficiency, and lasting comfort. The result is a home that feels refined, lives beautifully, and performs far beyond conventional construction.
            </p>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.6rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Activity size={14} color="var(--gold)" />
                <span><strong>Concrete Strength</strong> — Engineered panel systems designed for durability and protection.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Layers size={14} color="var(--gold)" />
                <span><strong>Insulated Performance</strong> — Built for energy efficiency and indoor comfort.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Shield size={14} color="var(--gold)" />
                <span><strong>Luxury Finish</strong> — Strength behind the walls, beauty in every visible detail.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 03 — SCIP Technology */}
      <section id="scip-technology">
        <div className="content-wrapper">
          <div className="glow-content reveal" style={{ maxWidth: '680px' }}>

            {/* Section header — centered */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span className="section-subtitle">Engineering Excellence</span>
              <h2 style={{ fontSize: '2.94rem', marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--gold)' }}>SCIP</span> Construction
              </h2>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Structural Concrete Insulated Panel
              </h3>
            </div>

            {/* Two-column body: cards left, graphic right — shared tinted backdrop */}
            <div style={{
              display:      'flex',
              gap:          '1.25rem',
              alignItems:   'center',
              borderRadius: '8px',
              background:   'rgba(0,0,0,0.16)',
              boxShadow:    'inset 0 0 24px rgba(0,0,0,0.25)',
              padding:      '1rem',
            }}>

              {/* Left — vertically stacked cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: '0 0 auto', width: '200px' }}>
                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <Layers size={16} color="var(--gold)" />
                    <h3 style={{ fontSize: '1rem', color: 'var(--text)' }}>The Core</h3>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text)', textTransform: 'none', letterSpacing: '0', lineHeight: 1.4, display: 'block' }}>
                    High-density EPS for R-45 thermal efficiency.
                  </span>
                </div>

                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <Shield size={16} color="var(--gold)" />
                    <h3 style={{ fontSize: '1rem', color: 'var(--text)' }}>The Steel</h3>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text)', textTransform: 'none', letterSpacing: '0', lineHeight: 1.4, display: 'block' }}>
                    Continuous mesh cage for 250MPH wind resistance.
                  </span>
                </div>

                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <Zap size={16} color="var(--gold)" />
                    <h3 style={{ fontSize: '1rem', color: 'var(--text)' }}>The Shell</h3>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text)', textTransform: 'none', letterSpacing: '0', lineHeight: 1.4, display: 'block' }}>
                    High-PSI shotcrete with a 4-hour fire rating.
                  </span>
                </div>
              </div>

              {/* Right — graphic */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <img
                  src="/Infographics/SCIP_graphic.png"
                  alt="SCIP Technology Diagram"
                  style={{
                    width:     '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    display:   'block',
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — Process */}
      <section id="process">
        <div className="content-wrapper">
          <div className="glow-content reveal" style={{ maxWidth: '680px' }}>
            <span className="section-subtitle">SCIP Process</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '1.25rem' }}>How We Build Everlasting Homes</h2>
            
            <img 
              src="/Infographics/process_graphic.png" 
              alt="SCIP Building Process" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '8px', 
                border: '1px solid var(--border)', 
                marginBottom: '1.25rem',
                background: 'rgba(0,0,0,0.3)',
                padding: '0.58rem',
                display: 'block'
              }} 
            />

            <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginTop: '1.25rem' }}>
              <div className="stat-item" style={{ borderRight: '1px solid var(--border)', paddingRight: '0.58rem' }}>
                <h4 style={{ color: 'var(--gold)', marginBottom: '0.2rem', fontSize: '0.9rem' }}>01</h4>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text)' }}>Vision</h3>
                <span style={{ fontSize: '0.68rem', textTransform: 'none', marginTop: '0.2rem', color: 'var(--text)' }}>Site analysis and risk assessment.</span>
              </div>
              <div className="stat-item" style={{ borderRight: '1px solid var(--border)', paddingRight: '0.58rem' }}>
                <h4 style={{ color: 'var(--gold)', marginBottom: '0.2rem', fontSize: '0.9rem' }}>02</h4>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text)' }}>Shell</h3>
                <span style={{ fontSize: '0.68rem', textTransform: 'none', marginTop: '0.2rem', color: 'var(--text)' }}>Engineering and SCIP erection.</span>
              </div>
              <div className="stat-item" style={{ borderRight: '1px solid var(--border)', paddingRight: '0.58rem' }}>
                <h4 style={{ color: 'var(--gold)', marginBottom: '0.2rem', fontSize: '0.9rem' }}>03</h4>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text)' }}>Armor</h3>
                <span style={{ fontSize: '0.68rem', textTransform: 'none', marginTop: '0.2rem', color: 'var(--text)' }}>High-PSI shotcrete application.</span>
              </div>
              <div className="stat-item">
                <h4 style={{ color: 'var(--gold)', marginBottom: '0.2rem', fontSize: '0.9rem' }}>04</h4>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text)' }}>Finish</h3>
                <span style={{ fontSize: '0.68rem', textTransform: 'none', marginTop: '0.2rem', color: 'var(--text)' }}>Bespoke luxury interior completion.</span>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <a href="#cta" className="cta-btn" style={{ padding: '0.6rem 1.1rem', fontSize: '0.75rem' }}>Process</a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05 — Solution */}
      <section id="solution">
        <div className="content-wrapper" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className="glow-content reveal" style={{ maxWidth: '600px', textAlign: 'right' }}>
            <span className="section-subtitle">The SCIP Solution</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '0.58rem' }}>The New <span style={{ color: 'var(--gold)' }}>Industry</span> Standard</h2>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '0.6rem' }}>Safe & Sustainable, For Generations to Come</h3>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.45, color: 'rgba(255,255,255,0.8)' }}>
              We use the innovative RSG 3-D light-weight, structural concrete insulated panel technology, achieving a zero-energy R20 insulation rating, to ensure our homes offer protection against natural disasters like hurricanes, tornadoes, earthquakes and fires.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1.25rem', textAlign: 'left' }}>
                <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--gold)', lineHeight: 1.45, margin: 0 }}>"It's not just a home; it's a permanent investment in peace of mind."</p>
              </div>
              <a href="https://www.youtube.com/watch?v=57Ch6CiTGgA" target="_blank" rel="noopener noreferrer" className="video-btn" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.58rem',
                padding: '0.45rem 0.9rem',
                border: '1px solid rgba(223,183,108,0.3)',
                borderRadius: '6px',
                background: 'rgba(0,0,0,0.4)',
                color: 'var(--gold)',
                textDecoration: 'none',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600,
              }}>
                <span>Watch Tech Video</span>
                <span style={{ fontSize: '0.58rem' }}>▶</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06 — Fire Protection */}
      <section id="fire-protection">
        <div className="content-wrapper">
          <div className="glow-content reveal" style={{ maxWidth: '680px' }}>
            <span className="section-subtitle">Fire Protection</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '0.58rem' }}>Fire Resistant up to <span style={{ color: '#ff6b35' }}>2200F</span></h2>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '0.6rem' }}>5x more durable than concrete</h3>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.45, color: 'rgba(255,255,255,0.8)', marginBottom: '1.1rem' }}>
              SCIP homes are built differently.
            </p>
            
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.6rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Flame size={14} color="#ff6b35" /> 
                <span style={{ lineHeight: 1.4 }}>Designed to resist fire, heat, and 5x more durable than regular concrete.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Activity size={14} color="#ff6b35" /> 
                <span style={{ lineHeight: 1.4 }}>Reinforced with concrete, steel mesh, and continuous insulation.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Shield size={14} color="var(--gold)" /> 
                <span style={{ lineHeight: 1.4 }}>SCIP shell designed to protect the home your family hopes to keep for generations.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 07 — Earthquake Protection */}
      <section id="earthquake-protection">
        <div className="content-wrapper" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className="glow-content reveal" style={{ maxWidth: '680px', textAlign: 'left' }}>
            <span className="section-subtitle">Seismic Strength</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '1.1rem' }}>Earthquake-Safe up to <span style={{ color: 'var(--gold)' }}>9.0</span></h2>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.6rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Activity size={14} color="var(--gold)" /> 
                <span style={{ lineHeight: 1.4 }}>Reinforced structure designed to resist cracking, shifting, and separation during seismic movement.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Layers size={14} color="var(--gold)" /> 
                <span style={{ lineHeight: 1.4 }}>Walls, roof, and floors working together as one connected protective shell.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Shield size={14} color="var(--gold)" /> 
                <span style={{ lineHeight: 1.4 }}>A stronger foundation for the family, memories, and legacy meant to last for generations.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 08 — Wind Protection */}
      <section id="wind-protection">
        <div className="content-wrapper">
          <div className="glow-content reveal" style={{ maxWidth: '680px' }}>
            <span className="section-subtitle">Extreme Wind Defense Against</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '1.1rem' }}><span style={{ color: 'var(--gold)' }}>250+ MPH</span> winds and projectile impacts.</h2>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.6rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Wind size={14} color="var(--gold)" /> 
                <span style={{ lineHeight: 1.4 }}>A durable envelope designed to withstand severe wind pressure and uplift forces.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Shield size={14} color="var(--gold)" /> 
                <span style={{ lineHeight: 1.4 }}>Reinforced walls and roof systems that help reduce weak points across the structure.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Infinity size={14} color="var(--gold)" /> 
                <span style={{ lineHeight: 1.4 }}>Built for the storms your family may face today, tomorrow, and decades from now.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 09 — Flood Protection */}
      <section id="flood-protection">
        <div className="content-wrapper" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className="glow-content reveal" style={{ maxWidth: '680px', textAlign: 'left' }}>
            <span className="section-subtitle">Water Defense</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '1.1rem' }}><span style={{ color: 'var(--gold)' }}>Flood</span> Resilience</h2>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.6rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Droplets size={14} color="var(--gold)" /> 
                <span style={{ lineHeight: 1.4 }}>Concrete-based construction that helps reduce water absorption, rot, and material breakdown.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Shield size={14} color="var(--gold)" /> 
                <span style={{ lineHeight: 1.4 }}>A stronger envelope designed to help resist moisture intrusion, mold, pests, and decay.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <Award size={14} color="var(--gold)" /> 
                <span style={{ lineHeight: 1.4 }}>A more resilient structure for families building near coastlines, flood zones, and changing climate conditions.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 10 — Layers of protection */}
      <section id="layers-protection">
        <div className="content-wrapper">
          <div className="glow-content reveal" style={{ maxWidth: '600px' }}>
            <span className="section-subtitle">Proven Strength</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '1.1rem' }}>In Any <span style={{ color: 'var(--gold)' }}>Climate</span></h2>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.82rem' }}>
                <CheckCircle2 size={14} color="var(--gold)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span style={{ lineHeight: 1.4 }}>Backed by the International Code Council and approved by the Miami-Dade County Building Code, our homes exceed U.S. structural and energy standards.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.82rem' }}>
                <Globe size={14} color="var(--gold)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span style={{ lineHeight: 1.4 }}>Over 30 years, in 20 countries, SCIP homes have endured zero damage—even in the face of CAT5 hurricanes, earthquakes, and wildfires.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.82rem' }}>
                <Zap size={14} color="var(--gold)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span style={{ lineHeight: 1.4 }}>VRF heat pumps for HVAC, Allergen Free, Zero Energy Ready Homes.</span>
              </li>
            </ul>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'flex-start', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
              {CERT_LOGOS.map(logo => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  style={{ height: '38px', width: 'auto', objectFit: 'contain', opacity: 0.85 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11 — About */}
      <section id="house-wireframe">
        <div className="content-wrapper" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className="glow-content reveal" style={{ maxWidth: '680px', textAlign: 'right' }}>
            <span className="section-subtitle">Everlasting Homes</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '0.58rem' }}>Our Story</h2>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '0.6rem' }}>Built on <span style={{ color: 'var(--gold)' }}>Precision</span> & Integrity</h3>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.45, color: 'rgba(255,255,255,0.8)', marginBottom: '1.1rem' }}>
              Everlasting Homes Building Group was founded by experienced builders and engineering-minded leaders with backgrounds in complex construction, luxury homes, and large-scale energy-sector projects. Led by Franck Boursier and George Mock, former ExxonMobil executives, they’ve reimagined construction using the revolutionary SCIP technology—setting a new standard for strength, safety, and sustainability. Together, Franck and George build more than homes; they craft legacies.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>Global Leader in Resilient Architecture</span>
              <Award size={22} color="var(--gold)" />
            </div>
            <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>Engineering-Led. Family-Focused. Built for the Future.</p>
            
            {/* The Team Grid */}
            <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>The Team</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src="/Headshots/Franck_headshot.webp" alt="Franck Boursier" style={{ width: '100%', height: 'auto', borderRadius: '6px', border: '1px solid var(--border)', marginBottom: '0.3rem' }} />
                  <h4 style={{ fontSize: '0.8rem', color: '#fff', margin: 0, fontWeight: 700 }}>Franck Boursier</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gold)', margin: 0 }}>Partner & CEO</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img src="/Headshots/GeorgeM_headshot.webp" alt="George Mock" style={{ width: '100%', height: 'auto', borderRadius: '6px', border: '1px solid var(--border)', marginBottom: '0.3rem' }} />
                  <h4 style={{ fontSize: '0.8rem', color: '#fff', margin: 0, fontWeight: 700 }}>George Mock</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gold)', margin: 0 }}>Partner & General Manager</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img src="/Headshots/JullieM_headshot.webp" alt="Julie Mock" style={{ width: '100%', height: 'auto', borderRadius: '6px', border: '1px solid var(--border)', marginBottom: '0.3rem' }} />
                  <h4 style={{ fontSize: '0.8rem', color: '#fff', margin: 0, fontWeight: 700 }}>Julie Mock</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gold)', margin: 0 }}>Partner & Business Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12 — Services */}
      <section id="services">
        <div className="content-wrapper">
          <div className="glow-content reveal" style={{ maxWidth: '680px' }}>
            <span className="section-subtitle">Our Capabilities</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '1.25rem' }}>Turnkey Luxury & <span style={{ color: 'var(--gold)' }}>Resilience</span></h2>
            <div style={{ display: 'grid', gap: '1.1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.27rem', color: 'var(--gold)' }}>Planning & Design Coordination</h3>
                <p style={{ fontSize: '0.85rem', marginTop: '0.2rem', lineHeight: 1.35, color: 'rgba(255,255,255,0.8)' }}>Shape the home around your lifestyle, property, and long-term goals.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.27rem', color: 'var(--gold)' }}>Permitting & Demolition Support</h3>
                <p style={{ fontSize: '0.85rem', marginTop: '0.2rem', lineHeight: 1.35, color: 'rgba(255,255,255,0.8)' }}>Move from site preparation to build-ready with a guided process.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.27rem', color: 'var(--gold)' }}>Complete Luxury Build</h3>
                <p style={{ fontSize: '0.85rem', marginTop: '0.2rem', lineHeight: 1.35, color: 'rgba(255,255,255,0.8)' }}>Bring together structure, systems, finishes, and performance into one cohesive home.</p>
              </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <a href="https://myeverlastinghome.netlify.app" target="_blank" rel="noopener noreferrer" className="cta-btn" style={{ fontSize: '0.72rem' }}>
                Design Your Resilient Home
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13 — Awards */}
      <section id="awards">
        <div className="content-wrapper" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className="glow-content reveal" style={{ maxWidth: '600px', textAlign: 'left' }}>
            <span className="section-subtitle">Recognized Performance</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '1rem' }}>Award-Winning Homes. <span style={{ color: 'var(--gold)' }}>Proven</span> Building Science.</h2>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.6rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <CheckCircle2 size={14} color="var(--gold)" />
                <span style={{ lineHeight: 1.35, color: '#fff' }}>DOE Recognition</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <CheckCircle2 size={14} color="var(--gold)" />
                <span style={{ lineHeight: 1.35, color: '#fff' }}>RESNET HERS Performance Focus</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <CheckCircle2 size={14} color="var(--gold)" />
                <span style={{ lineHeight: 1.35, color: '#fff' }}>Green Builder Recognition</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.82rem' }}>
                <CheckCircle2 size={14} color="var(--gold)" />
                <span style={{ lineHeight: 1.35, color: '#fff' }}>Luxury Concrete Homebuilding Recognition</span>
              </li>
            </ul>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
              {AWARD_SEALS.map(seal => (
                <img
                  key={seal.alt}
                  src={seal.src}
                  alt={seal.alt}
                  style={{ height: '90px', width: 'auto', objectFit: 'contain', opacity: 0.9, color: '#fff', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 20px rgba(255,255,255,0.6)) drop-shadow(0 0 40px rgba(255,255,255,0.05))' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14 — Portfolio */}
      <section id="portfolio">
        <div className="content-wrapper" style={{ textAlign: 'center' }}>
          <div className="glow-content reveal">
            <span className="section-subtitle">Featured Projects</span>
            <h2 style={{ fontSize: '2.94rem', marginBottom: '1.25rem' }}>Proven Strength <span style={{ color: 'var(--gold)' }}>Worldwide</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.1rem' }}>
              <div style={{ border: '1px solid var(--border)', padding: '1.1rem 1.25rem', textAlign: 'left', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--gold)' }}>The Meyerland</h3>
                <p style={{ fontSize: '0.72rem', marginTop: '0.3rem', color: 'var(--text)', lineHeight: 1.35 }}>Houston, TX — A flood-hardened masterpiece engineered to endure repeat catastrophic flooding.</p>
              </div>
              <div style={{ border: '1px solid var(--border)', padding: '1.1rem 1.25rem', textAlign: 'left', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--gold)' }}>West University</h3>
                <p style={{ fontSize: '0.72rem', marginTop: '0.3rem', color: 'var(--text)', lineHeight: 1.35 }}>Houston, TX — A high-efficiency luxury estate built for a 100-year design life.</p>
              </div>
              <div style={{ border: '1px solid var(--border)', padding: '1.1rem 1.25rem', textAlign: 'left', borderRadius: '8px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--gold)' }}>Coastal Fortress</h3>
                <p style={{ fontSize: '0.72rem', marginTop: '0.3rem', color: 'var(--text)', lineHeight: 1.35 }}>Gulf Coast — A hurricane-ready retreat built on a monolithic concrete foundation for absolute coastal security.</p>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <a href="#process" className="cta-btn" style={{ padding: '0.6rem 1.1rem', fontSize: '0.75rem' }}>Process</a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15 — FAQ */}
      <section id="angle-house">
        <div className="content-wrapper">
          <div className="glow-content reveal" style={{ maxWidth: '780px', margin: '0 auto' }}>
            <span className="section-subtitle" style={{ display: 'block', textAlign: 'center' }}>Before You Build</span>
            <h2 style={{ fontSize: '2.54rem', marginBottom: '0.58rem', textAlign: 'center' }}>Smart Questions Before Choosing Your Homebuilder</h2>
            <h3 style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', textAlign: 'center', textTransform: 'none', letterSpacing: '0', fontWeight: 400 }}>
              Building or rebuilding is a major decision. These answers help you understand why structure, resilience, and long-term performance should be part of the conversation from the start.
            </h3>
            
            {/* Elegant Scrollable Accordion Wrapper */}
            <div style={{ 
              maxHeight: '600px',
              overflowY: 'auto', 
              paddingRight: '0.58rem',
              display: 'grid', 
              gap: '0.25rem',
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--gold) rgba(0,0,0,0.2)'
            }}>
              {FAQ_DATA.map((faq, i) => (
                <div key={i} style={{
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  paddingBottom: '0.25rem',
                  transition: 'background 0.3s ease',
                  borderRadius: '4px',
                  paddingLeft: '0.58rem',
                  paddingRight: '0.58rem'
                }}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      padding: '0.35rem 0',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: openFaq === i ? 'var(--gold)' : 'var(--text)',
                      fontFamily: 'var(--font-accent)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      transition: 'color 0.3s ease',
                      outline: 'none'
                    }}
                  >
                    <span style={{ paddingRight: '1rem' }}>{faq.q}</span>
                    <span style={{ 
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', 
                      transition: 'transform 0.3s ease', 
                      color: 'var(--gold)',
                      fontSize: '0.65rem'
                    }}>
                      ▼
                    </span>
                  </button>
                  <div style={{
                    maxHeight: openFaq === i ? '300px' : '0px',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: openFaq === i ? 1 : 0
                  }}>
                    <p style={{
                      fontSize: '0.8rem',
                      lineHeight: 1.45,
                      color: 'rgba(255,255,255,0.75)',
                      paddingTop: '0.1rem',
                      paddingBottom: '0.58rem',
                      margin: 0,
                      textTransform: 'none'
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 16 — CTA */}
      <section id="cta">
        <div className="content-wrapper">
          <div className="glow-content reveal" style={{ textAlign: 'center', padding: '3.0rem 1.25rem' }}>
            <span className="section-subtitle">Begin Your Legacy</span>
            <h2 style={{ fontSize: '3.76rem', marginBottom: '0.75rem' }}>Secure Your <span style={{ color: 'var(--gold)' }}>Future</span> Today</h2>
            <p style={{ margin: '0 auto 1.5rem', maxWidth: '600px', fontSize: '1.2rem', lineHeight: 1.35 }}>
              Wherever you are in the world, our team will design a disaster-resistant fortress of luxury tailored precisely to your site, your climate, and your vision.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              <button onClick={() => setShowModal(true)} className="cta-btn">Schedule Private Consultation</button>
              <button onClick={() => setShowCalculator(true)} className="cta-btn" style={{ background: 'transparent', color: 'var(--gold)' }}>Calculate Your Risk</button>
              <a href="https://myeverlastinghome.netlify.app" target="_blank" rel="noopener noreferrer" className="cta-btn">Design Your Resilient Home</a>
            </div>
          </div>
        </div>
      </section>

      {/* Infographics Carousel */}
      <InfographicsCarousel />

      <TestimonialsSection />


      <footer style={{ padding: '2.94rem 0', width: '100%', textAlign: 'center', opacity: 0.5, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
        &copy; 2026 Everlasting Homes Building Group | Precision Engineered Luxury | Built for the World
      </footer>

      <ScrollToTopButton />
      <SectionNavDots />

      {showModal && <ConsultationModal onClose={() => setShowModal(false)} />}
      {showCalculator && (
        <RiskCalculator
          onClose={() => setShowCalculator(false)}
          onConsult={() => { setShowCalculator(false); setShowModal(true); }}
        />
      )}

      {/* ── Sticky bottom-left CTA ────────────────────── */}
      <a
        href="https://www.youtube.com/watch?v=57Ch6CiTGgA"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Explore the SCIP System — watch video"
        style={{
          position:       'fixed',
          bottom:         '2rem',
          left:           '2rem',
          zIndex:         200,
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '0.65rem',
          padding:        '0.7rem 1.2rem',
          background:     'rgba(5,5,5,0.75)',
          backdropFilter: 'blur(12px)',
          border:         '1px solid rgba(223,183,108,0.45)',
          borderRadius:   '6px',
          color:          'var(--gold)',
          textDecoration: 'none',
          fontSize:       '0.62rem',
          letterSpacing:  '2px',
          textTransform:  'uppercase',
          fontWeight:     700,
          fontFamily:     'var(--font-primary)',
          transition:     'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background  = 'rgba(223,183,108,0.12)';
          e.currentTarget.style.borderColor = 'var(--gold)';
          e.currentTarget.style.boxShadow   = '0 0 22px rgba(223,183,108,0.25), 0 0 44px rgba(223,183,108,0.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background  = 'rgba(5,5,5,0.75)';
          e.currentTarget.style.borderColor = 'rgba(223,183,108,0.45)';
          e.currentTarget.style.boxShadow   = 'none';
        }}
      >
        {/* Play icon */}
        <span style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          '18px',
          height:         '18px',
          borderRadius:   '50%',
          border:         '1px solid rgba(223,183,108,0.6)',
          fontSize:       '0.45rem',
          lineHeight:     1,
          flexShrink:     0,
        }}>
          ▶
        </span>
        Explore the SCIP System
      </a>
    </div>
  );
}

export default App;
