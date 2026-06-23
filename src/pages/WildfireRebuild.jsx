import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Flame, Shield, CheckCircle2, Activity, Layers, X } from 'lucide-react';
import LandingNav from '../components/LandingNav';
import ConsultationModal from '../components/ConsultationModal';
import FireEmberParticles from '../components/FireEmberParticles';
import AnimatedCounter from '../components/AnimatedCounter';
import { useLandingPage } from '../hooks/useLandingPage';

const FAQS = [
  { q: "Can I rebuild my exact floor plan but with SCIP?", a: "Yes. SCIP panels can match virtually any architectural layout. Your architect can work with the same footprint, and Everlasting Homes can build the SCIP shell around your existing vision." },
  { q: "How does SCIP compare to wood-frame for fire resistance?", a: "Standard wood framing offers no meaningful fire resistance. SCIP's shotcrete shell carries a 4-hour fire rating and has survived wildfires exceeding 2,200°F — temperatures that incinerate conventional homes entirely." },
  { q: "Will my insurance rates be lower with a SCIP home?", a: "Many homeowners in high-risk fire zones report significant insurance savings after rebuilding with SCIP. Your insurer will need to assess your specific policy." },
  { q: "How long does a SCIP wildfire rebuild take?", a: "Timeline depends on your lot, permit jurisdiction, and design complexity. A consultation is the best place to establish a realistic schedule." },
  { q: "Do you work in California?", a: "Yes. Everlasting Homes builds nationally. We work alongside your local architect and contractor teams, or can provide full turnkey delivery." },
];

const sec = { height: 'auto', display: 'block', pointerEvents: 'auto' };

export default function WildfireRebuild() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { bgRef } = useLandingPage();

  return (
    <>
      <Helmet>
        <title>Wildfire Home Rebuild | Fire-Resistant SCIP Homes | Everlasting Homes</title>
        <meta name="description" content="Rebuild after wildfire with SCIP luxury homes. 4-hour fire rating, tested to 2,200°F — engineered to survive the next wildfire. Serving CA, TX & nationwide." />
        <meta name="keywords" content="wildfire home rebuild, fire resistant home builder, rebuild after wildfire, fireproof home construction, SCIP fire resistant homes, wildfire rebuild California" />
        <link rel="canonical" href="https://everlasting.build/wildfire-rebuild" />
        <meta property="og:title" content="Wildfire Home Rebuild | Fire-Resistant SCIP Homes | Everlasting Homes" />
        <meta property="og:description" content="Rebuild after wildfire with a home engineered to survive the next one. 4-hour fire rating, 2,200°F tested." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://everlasting.build/wildfire-rebuild" />
        <meta property="og:image" content="https://everlasting.build/assets/WildfireRebuild.png" />
        <meta property="og:site_name" content="Everlasting Homes Building Group" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wildfire Home Rebuild | Fire-Resistant SCIP Homes" />
        <meta name="twitter:description" content="Rebuild after wildfire with a home engineered to survive the next one. 4-hour fire rating, 2,200°F tested." />
        <meta name="twitter:image" content="https://everlasting.build/assets/WildfireRebuild.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Wildfire Home Rebuild — SCIP Construction",
          "provider": { "@type": "Organization", "name": "Everlasting Homes Building Group", "url": "https://everlasting.build" },
          "description": "Luxury SCIP home construction for wildfire rebuilds. 4-hour fire rating, tested to 2,200°F.",
          "areaServed": ["California", "Texas", "United States"],
          "serviceType": "Custom Home Construction"
        })}</script>
      </Helmet>

      {/* Scroll progress bar */}
      <div id="scroll-progress-bar" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff6b35, #ffaa60)', zIndex: 500, transformOrigin: 'left', transform: 'scaleX(0)' }} />

      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}>
        <FireEmberParticles fixed particleCount={55} speed={1.1} spawnRate={4} />

        {/* Urgency Banner */}
        {!bannerDismissed && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: 'linear-gradient(90deg, rgba(160,50,10,0.97), rgba(210,90,30,0.97))', padding: '0.6rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Flame size={14} color="#fff" />
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.5px', color: '#fff', fontWeight: 600 }}>
              Fire season is here. Rebuild consultations are limited —
              <button onClick={() => setShowModal(true)} style={{ background: 'none', border: 'none', color: '#fff', textDecoration: 'underline', cursor: 'pointer', fontWeight: 800, fontSize: '0.78rem', padding: '0 0.3rem' }}>Reserve yours today</button>
            </span>
            <button onClick={() => setBannerDismissed(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', marginLeft: 'auto', display: 'flex' }}><X size={14} /></button>
          </div>
        )}

        <LandingNav />

        {/* ── HERO ── */}
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '9rem 2rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
          {/* Parallax background — ref passed from hook */}
          <div ref={bgRef} style={{ position: 'absolute', inset: '-20%', backgroundImage: 'url(/assets/hero.png)', backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.2 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.7) 55%, rgba(5,5,5,0.96) 100%)' }} />
          {/* Fire glow */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, rgba(200,60,10,0.15), transparent)', pointerEvents: 'none' }} />
          {/* Ember particles */}

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px', margin: '0 auto' }}>
            <div className="land-reveal" style={{ marginBottom: '1.75rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.1rem', background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.45)', borderRadius: '100px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#ff6b35', fontWeight: 700 }}>
                <Flame size={11} /> Wildfire Rebuild Specialists
              </span>
            </div>

            <h1 className="land-reveal" style={{ fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', lineHeight: 1.05, fontWeight: 800, marginBottom: '1.25rem', color: '#fff' }}>
              Rebuild After Wildfire<br />
              <span style={{ color: '#ff6b35' }}>Stronger Than Before</span>
            </h1>

            <p className="land-reveal" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', maxWidth: '640px', margin: '0 auto 2.25rem' }}>
              Rebuilding is a rare chance to build a home that can survive the next wildfire. Everlasting Homes constructs SCIP luxury homes with a certified 4-hour fire rating — tested to temperatures exceeding 2,200°F, where conventional wood-frame homes are ash.
            </p>

            <div className="land-reveal" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button onClick={() => setShowModal(true)} className="cta-btn" style={{ fontSize: '0.82rem', padding: '0.85rem 2rem' }}>Schedule Free Site Consultation</button>
              <a href="https://www.youtube.com/watch?v=57Ch6CiTGgA" target="_blank" rel="noopener noreferrer" className="cta-btn" style={{ background: 'transparent', color: '#ff6b35', borderColor: 'rgba(255,107,53,0.5)', fontSize: '0.82rem', padding: '0.85rem 2rem' }}>▶ Watch SCIP Fire Test</a>
            </div>

            <p className="land-reveal" style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.32)', marginBottom: '2rem' }}>
              30+ Year Track Record &nbsp;·&nbsp; 20 Countries &nbsp;·&nbsp; Zero Disaster Damage on Record
            </p>
            <p className="land-reveal" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem' }}>
              Also protecting against:&nbsp;
              <a href="/disaster-resistant-homes" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid rgba(223,183,108,0.35)' }}>Hurricanes &amp; Earthquakes</a>
              &nbsp;·&nbsp;
              <a href="/luxury-homes-texas" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid rgba(223,183,108,0.35)' }}>Building in Texas?</a>
            </p>

            <div className="land-reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.28)' }}>As Seen In</span>
              {[
                { src: '/Media Logos/CBS_2020_(Blue).svg.png', alt: 'CBS', h: 18 },
                { src: '/Media Logos/CNN.svg.png', alt: 'CNN', h: 14 },
                { src: '/Media Logos/time-logo-transparent.png', alt: 'Time', h: 16 },
                { src: '/Media Logos/CW39.webp', alt: 'CW39', h: 18 },
              ].map(({ src, alt, h }) => (
                <img key={alt} src={src} alt={alt} style={{ height: h, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.35 }} />
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.3 }}>
            <span style={{ fontSize: '0.58rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }} />
          </div>
        </div>

        {/* ── ANIMATED STATS BAR ── */}
        <div style={{ ...sec, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2.5rem 2rem', background: 'rgba(0,0,0,0.45)' }}>
          <div className="land-stagger" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 6vw, 5rem)', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            {[
              { target: 2200, suffix: '°F', label: 'Fire Resistance Tested' },
              { target: 4, suffix: '-Hour', label: 'Certified Fire Rating' },
              { target: 5, suffix: '×', label: 'Stronger Than Concrete' },
              { target: 30, suffix: '+', label: 'Years Zero Fire Damage' },
            ].map(({ target, suffix, label }) => (
              <div key={label}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ff6b35', fontFamily: 'var(--font-accent)', lineHeight: 1.1 }}>
                  <AnimatedCounter target={target} suffix={suffix} />
                </div>
                <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.42)', marginTop: '0.3rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHY REBUILD DIFFERENTLY ── */}
        <section style={{ ...sec, padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div className="land-reveal" style={{ maxWidth: '600px', marginBottom: '3rem' }}>
              <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>The Hard Truth</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '1rem', color: '#fff' }}>Why Rebuild the Same Way?</h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)' }}>
                The same wood-frame home that burned once will burn again. Wildfires are becoming more frequent and intense. A rebuild is a once-in-a-generation opportunity — not to restore what you lost, but to build something the next fire can't touch.
              </p>
            </div>
            <div className="land-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
              {[
                { icon: Flame, color: '#ff6b35', title: 'Tested to 2,200°F', body: 'SCIP homes have survived direct wildfire contact at temperatures exceeding what burns conventional structures to the ground.' },
                { icon: Shield, color: 'var(--gold)', title: '4-Hour Fire Rating', body: "The shotcrete shell provides a certified 4-hour fire barrier — protecting structure and family when it matters most." },
                { icon: Activity, color: 'var(--gold)', title: '5× Stronger Than Concrete', body: 'High-PSI shotcrete bonded to a continuous steel mesh cage creates a building envelope that resists fire, cracking, and failure.' },
                { icon: Layers, color: 'var(--gold)', title: 'No Combustible Frame', body: 'SCIP eliminates the wood framing that fuels most home fires. Concrete, steel, and EPS foam — nothing to burn.' },
              ].map(({ icon: Icon, color, title, body }) => (
                <div key={title}
                  style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease', cursor: 'default' }}
                  onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = '#ff6b35'; t.style.transform = 'translateY(-4px)'; t.style.boxShadow = '0 12px 40px rgba(255,107,53,0.12)'; }}
                  onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'var(--border)'; t.style.transform = 'none'; t.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: '36px', height: '36px', background: `${color}18`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Icon size={18} color={color} />
                  </div>
                  <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.5rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.83rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.58)', margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <div style={{ ...sec, padding: '0 2rem 4rem' }}>
          <div className="land-reveal" style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ borderLeft: '3px solid #ff6b35', background: 'rgba(255,107,53,0.04)', borderRadius: '0 10px 10px 0', padding: '2rem 2rem 2rem 2.5rem' }}>
              <p style={{ fontSize: '1.12rem', fontStyle: 'italic', lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', marginBottom: '1rem' }}>
                "After losing our home in the Palisades fire, we were determined to build something that would never burn again. Everlasting Homes built us a SCIP home that gave our family permanent peace of mind — it's more than a house, it's protection."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,107,53,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#ff6b35', fontWeight: 700, flexShrink: 0 }}>M</div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>Michael R.</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Los Angeles, CA — Wildfire Rebuild Client</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECOND TESTIMONIAL ── */}
        <div style={{ ...sec, padding: '0 2rem 4rem' }}>
          <div className="land-reveal" style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ borderLeft: '3px solid var(--gold)', background: 'rgba(223,183,108,0.04)', borderRadius: '0 10px 10px 0', padding: '2rem 2rem 2rem 2.5rem' }}>
              <p style={{ fontSize: '1.12rem', fontStyle: 'italic', lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', marginBottom: '1rem' }}>
                "The insurance savings alone paid for the upgrade within three years. But honestly it's the peace of mind during fire season that's priceless. Our neighbors are evacuating — we stay home."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(223,183,108,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>J</div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>Jennifer W.</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Sonoma County, CA — Wildfire Rebuild Client</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SCIP TECHNOLOGY ── */}
        <section style={{ ...sec, padding: '4rem 2rem', background: 'rgba(0,0,0,0.35)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div className="land-reveal">
              <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>The Technology</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', marginBottom: '1rem', color: '#fff' }}>What Makes SCIP <span style={{ color: 'var(--gold)' }}>Fire-Safe</span></h2>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', marginBottom: '1.5rem' }}>
                SCIP replaces combustible wood framing with a three-layer system: high-density EPS foam core, continuous welded steel mesh, and high-PSI shotcrete on both faces. No wood. No fuel.
              </p>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem', padding: 0 }}>
                {[
                  'No wood framing — no fuel for fire to consume',
                  'Shotcrete shell acts as a firebreak for the full structure',
                  'Steel mesh cage holds integrity under extreme heat',
                  'EPS core is self-extinguishing — melts, not burns',
                  'R-45 insulation slows fire heat penetration',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={14} color="#ff6b35" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                    <span style={{ lineHeight: 1.5, color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="land-reveal" style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="/Infographics/SCIP_graphic.png" alt="SCIP panel cross-section" style={{ width: '100%', maxWidth: '400px', objectFit: 'contain', borderRadius: '10px', border: '1px solid var(--border)', padding: '1.25rem', background: 'rgba(0,0,0,0.3)', transition: 'transform 0.4s ease', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              />
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section style={{ ...sec, padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div className="land-reveal">
              <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>Your Path Forward</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '2.5rem', color: '#fff' }}>The Wildfire Rebuild <span style={{ color: 'var(--gold)' }}>Process</span></h2>
            </div>
            <div className="land-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0' }}>
              {[
                { num: '01', title: 'Consultation', body: 'Discuss your property, timeline, insurance, and design goals.' },
                { num: '02', title: 'Site & Design', body: 'Site analysis, architectural coordination, and SCIP engineering.' },
                { num: '03', title: 'Permits & Demo', body: 'Full demolition and permitting support — we navigate it with you.' },
                { num: '04', title: 'SCIP Shell', body: 'Panel erection: foam core, steel mesh cage, and shotcrete application.' },
                { num: '05', title: 'Luxury Finish', body: 'Complete interiors with every finish and detail you envisioned.' },
              ].map(({ num, title, body }) => (
                <div key={num} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1.25rem', paddingRight: '1rem', paddingBottom: '1.5rem', transition: 'border-color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#ff6b35'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '1px' }}>{num}</div>
                  <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.4rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.78rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.52)', margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ ...sec, padding: '4rem 2rem', background: 'rgba(0,0,0,0.25)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="land-reveal">
              <span className="section-subtitle" style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem' }}>Common Questions</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', textAlign: 'center', marginBottom: '2.5rem', color: '#fff' }}>Wildfire Rebuild FAQ</h2>
            </div>
            <div style={{ display: 'grid', gap: '0.25rem' }}>
              {FAQS.map((faq, i) => (
                <div key={i} className="land-reveal" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', padding: '1rem 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: openFaq === i ? '#ff6b35' : 'var(--text)', fontFamily: 'var(--font-accent)', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.3s' }}>
                    <span style={{ paddingRight: '1rem' }}>{faq.q}</span>
                    <span style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.35s ease', color: '#ff6b35', fontSize: '0.6rem', flexShrink: 0 }}>▼</span>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s', opacity: openFaq === i ? 1 : 0 }}>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', paddingBottom: '1rem', margin: 0 }}>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ ...sec, padding: '6rem 2rem', textAlign: 'center', background: 'rgba(0,0,0,0.55)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
          <div className="land-reveal" style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>Begin Your Rebuild</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', marginBottom: '1rem', color: '#fff' }}>Don't Rebuild Vulnerable.<br /><span style={{ color: '#ff6b35' }}>Rebuild Everlasting.</span></h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', maxWidth: '520px', margin: '0 auto 2.5rem' }}>The consultation is free. The decision to rebuild stronger is yours.</p>
            <button onClick={() => setShowModal(true)} className="cta-btn" style={{ fontSize: '0.88rem', padding: '1rem 2.5rem' }}>Schedule Your Free Site Consultation</button>
            <p style={{ marginTop: '1.25rem', fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>No obligation · Free site consultation · Nationwide</p>
          </div>
        </section>

        <footer style={{ padding: '2rem 0', textAlign: 'center', opacity: 0.4, fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', borderTop: '1px solid var(--border)' }}>
          © 2026 Everlasting Homes Building Group | Precision Engineered Luxury
        </footer>
      </div>

      {showModal && <ConsultationModal onClose={() => setShowModal(false)} />}
    </>
  );
}
