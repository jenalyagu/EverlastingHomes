import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Flame, Wind, Droplets, Activity, Shield, Zap, CheckCircle2, Globe, X } from 'lucide-react';
import LandingNav from '../components/LandingNav';
import ConsultationModal from '../components/ConsultationModal';
import AnimatedCounter from '../components/AnimatedCounter';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { useLandingPage } from '../hooks/useLandingPage';

const HAZARDS = [
  { icon: Flame, color: '#ff6b35', title: 'Wildfire & Fire', stat: 2200, statSuffix: '°F', statLabel: 'Fire resistance tested', body: "SCIP's shotcrete shell holds a 4-hour fire rating. No wood framing means no combustible structure. Homes have survived direct wildfire contact across 20 countries." },
  { icon: Activity, color: '#dfb76c', title: 'Earthquakes', stat: 9, statSuffix: '.0 M', statLabel: 'Seismic resistance designed to', body: 'The continuous steel mesh cage and monolithic concrete shell resist cracking, separation, and collapse that destroys conventional structures under seismic loading.' },
  { icon: Wind, color: '#7ec8e3', title: 'Hurricanes & Wind', stat: 250, statSuffix: '+ MPH', statLabel: 'Wind resistance rating', body: 'Approved by Miami-Dade County Building Code — the world benchmark for hurricane resistance. Withstands Category 5 wind loads and projectile impacts.' },
  { icon: Droplets, color: '#4fc3f7', title: 'Flooding & Moisture', stat: 0, statSuffix: '%', statLabel: 'Water absorption in concrete shell', body: 'Concrete-based construction does not rot, swell, or harbor mold. SCIP homes in coastal and flood-prone zones have resisted moisture damage and repeat flooding events.' },
];

const CERTS = [
  { src: '/Certs/ghba.png', alt: 'GHBA' },
  { src: '/Certs/resnet.jpg', alt: 'RESNET' },
  { src: '/Certs/energy-star.png', alt: 'Energy Star' },
  { src: '/Certs/nahb.webp', alt: 'NAHB' },
  { src: '/Certs/rsg.png', alt: 'RSG' },
];

const AWARD_SEALS = [
  { src: '/award-seals/doe-seal.png', alt: 'Department of Energy' },
  { src: '/award-seals/resnet-seal.png', alt: 'RESNET HERS' },
  { src: '/award-seals/green-builder-seal.png', alt: 'Green Builder' },
  { src: '/award-seals/build-mag-seal.png', alt: 'BUILD Magazine' },
];

const sec = { height: 'auto', display: 'block', pointerEvents: 'auto' };

export default function DisasterResistantHomes() {
  const [showModal, setShowModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const { bgRef } = useLandingPage();

  return (
    <>
      <Helmet>
        <title>Disaster-Resistant Custom Homes | SCIP Construction | Everlasting Homes</title>
        <meta name="description" content="Build homes engineered to survive wildfires, hurricanes, earthquakes & floods. SCIP concrete and steel construction — proven across 20 countries, zero disaster damage." />
        <meta name="keywords" content="disaster resistant home builder, hurricane proof home, earthquake resistant home, flood resistant construction, SCIP homes, concrete custom home builder, fireproof luxury home" />
        <link rel="canonical" href="https://everlasting.build/disaster-resistant-homes" />
        <meta property="og:title" content="Disaster-Resistant Custom Homes | SCIP Construction | Everlasting Homes" />
        <meta property="og:description" content="SCIP luxury homes: 30+ years, 20 countries, zero disaster damage." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://everlasting.build/disaster-resistant-homes" />
        <meta property="og:image" content="https://everlasting.build/assets/DisasterResistantHomes.png" />
        <meta property="og:site_name" content="Everlasting Homes Building Group" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Disaster-Resistant Custom Homes | SCIP Construction" />
        <meta name="twitter:description" content="Custom homes engineered to survive wildfires, hurricanes, earthquakes & floods. 30+ years, 20 countries, zero disaster damage." />
        <meta name="twitter:image" content="https://everlasting.build/assets/DisasterResistantHomes.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Everlasting Homes Building Group",
          "url": "https://everlasting.build",
          "logo": "https://everlasting.build/Logos/ehbg-logo.png",
          "description": "Luxury SCIP custom home builder — disaster-resistant construction proven across 20 countries and 30+ years.",
          "areaServed": "Worldwide",
          "serviceType": "Custom Home Construction"
        })}</script>
      </Helmet>

      {/* Scroll progress bar */}
      <div id="scroll-progress-bar" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--gold), #fff8e1)', zIndex: 500, transformOrigin: 'left', transform: 'scaleX(0)' }} />

      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}>

        {!bannerDismissed && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: 'rgba(10,10,18,0.97)', borderBottom: '1px solid rgba(223,183,108,0.25)', padding: '0.6rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Shield size={13} color="var(--gold)" />
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>
              Climate disasters are increasing. Build the home that can withstand them. &nbsp;
              <button onClick={() => setShowModal(true)} style={{ background: 'none', border: 'none', color: 'var(--gold)', textDecoration: 'underline', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem', padding: 0 }}>Free consultation →</button>
            </span>
            <button onClick={() => setBannerDismissed(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', marginLeft: 'auto', display: 'flex' }}><X size={13} /></button>
          </div>
        )}

        <LandingNav />

        {/* ── HERO ── */}
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '9rem 2rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
          <div ref={bgRef} style={{ position: 'absolute', inset: '-20%', backgroundImage: 'url(/assets/hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.57 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.05) 0%, rgba(5,5,5,0.32) 65%, rgba(5,5,5,0.65) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, rgba(223,183,108,0.05), transparent)', pointerEvents: 'none' }} />

          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(30,80,160,0.2) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '880px', margin: '0 auto' }}>
            <div className="land-reveal" style={{ marginBottom: '1.75rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.1rem', background: 'rgba(223,183,108,0.08)', border: '1px solid rgba(223,183,108,0.35)', borderRadius: '100px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold)', fontWeight: 700 }}>
                <Shield size={11} /> Multi-Hazard Resilience
              </span>
            </div>

            <h1 className="land-reveal" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', lineHeight: 1.05, fontWeight: 800, marginBottom: '1.25rem', color: '#fff' }}>
              Custom Homes Built to Survive<br /><span style={{ color: 'var(--gold)' }}>Every Natural Disaster</span>
            </h1>

            <p className="land-reveal" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)', maxWidth: '680px', margin: '0 auto 2.25rem' }}>
              Everlasting Homes builds luxury custom homes using SCIP technology — a structural concrete and steel panel system with a 30-year global track record against wildfires, Category 5 hurricanes, magnitude 9.0 earthquakes, and major flooding events.
            </p>

            <div className="land-reveal" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button onClick={() => setShowModal(true)} className="cta-btn" style={{ fontSize: '0.82rem', padding: '0.85rem 2rem' }}>Schedule Free Site Consultation</button>
              <a href="/wildfire-rebuild" className="cta-btn" style={{ background: 'transparent', color: 'var(--gold)', borderColor: 'rgba(223,183,108,0.4)', fontSize: '0.82rem', padding: '0.85rem 2rem' }}>Wildfire Rebuild Guide →</a>
            </div>

            <p className="land-reveal" style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.3)', marginBottom: '2rem' }}>
              30+ Years &nbsp;·&nbsp; 20 Countries &nbsp;·&nbsp; Zero Disaster Damage &nbsp;·&nbsp; ICC Approved
            </p>
            <p className="land-reveal" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem' }}>
              Specialized pages:&nbsp;
              <a href="/wildfire-rebuild" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid rgba(223,183,108,0.35)' }}>Wildfire Rebuild Guide</a>
              &nbsp;·&nbsp;
              <a href="/luxury-homes-texas" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid rgba(223,183,108,0.35)' }}>Houston Luxury Homes</a>
            </p>

            <div className="land-reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.28)' }}>As Seen In</span>
              {[
                { src: '/Media Logos/CBS_2020_(Blue).svg.png', alt: 'CBS', h: 16 },
                { src: '/Media Logos/CNN.svg.png', alt: 'CNN', h: 13 },
                { src: '/Media Logos/time-logo-transparent.png', alt: 'Time', h: 15 },
                { src: '/Media Logos/CW39.webp', alt: 'CW39', h: 16 },
              ].map(({ src, alt, h }) => (
                <img key={alt} src={src} alt={alt} style={{ height: h, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.32 }} />
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.28 }}>
            <span style={{ fontSize: '0.58rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }} />
          </div>
        </div>

        {/* ── BEFORE / AFTER SLIDER ── */}
        <section style={{ ...sec, padding: '5rem 2rem', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="land-reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.5rem' }}>The Difference Is Everything</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff' }}>What Survives. <span style={{ color: 'var(--gold)' }}>What Doesn't.</span></h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.48)', marginTop: '0.75rem', maxWidth: '540px', margin: '0.75rem auto 0' }}>Drag to compare a conventional wood-frame home after a hurricane event versus an Everlasting SCIP home in the same neighborhood.</p>
            </div>
            <div className="land-reveal">
              <BeforeAfterSlider
                beforeSrc="/Before:After/DisasterHomeBefore.png"
                afterSrc="/Before:After/DisasterHomeAfter.png"
                beforePosition="60% center"
                beforeLabel="Wood Frame — After Hurricane"
                afterLabel="SCIP Home — Zero Damage"
                beforeCaption="Conventional wood-frame construction. Roof failure, wall collapse, complete interior exposure."
                afterCaption="SCIP concrete-and-steel shell. Structural integrity fully intact. Ready to re-occupy."
                defaultPosition={50}
              />
            </div>
          </div>
        </section>

        {/* ── ANIMATED STATS BAR ── */}
        <div style={{ ...sec, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2.5rem 2rem', background: 'rgba(0,0,0,0.45)' }}>
          <div className="land-stagger" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 6vw, 5rem)', flexWrap: 'wrap', maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            {[
              { target: 30, suffix: '+', label: 'Years Proven' },
              { target: 20, suffix: '', label: 'Countries Built' },
              { target: 0, suffix: '', label: 'Disaster Damage Events' },
              { target: 4, suffix: '-Hour', label: 'Fire Rating' },
            ].map(({ target, suffix, label }) => (
              <div key={label}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-accent)', lineHeight: 1.1 }}>
                  <AnimatedCounter target={target} suffix={suffix} />
                </div>
                <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.42)', marginTop: '0.3rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HAZARD CARDS ── */}
        <section style={{ ...sec, padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div className="land-reveal" style={{ maxWidth: '580px', marginBottom: '3rem' }}>
              <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>Multi-Hazard Resilience</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '0.75rem' }}>One Home. <span style={{ color: 'var(--gold)' }}>Every Threat Covered.</span></h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.52)', lineHeight: 1.6 }}>Unlike conventional construction that addresses one hazard at a time, SCIP's monolithic design provides full-spectrum protection in a single building system.</p>
            </div>

            <div className="land-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
              {HAZARDS.map(({ icon: Icon, color, title, stat, statSuffix, statLabel, body }) => (
                <div key={title}
                  style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '1.75rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', transition: 'all 0.35s ease', cursor: 'default' }}
                  onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = color; t.style.transform = 'translateY(-5px)'; t.style.boxShadow = `0 16px 48px ${color}18`; t.style.background = 'rgba(0,0,0,0.6)'; }}
                  onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'var(--border)'; t.style.transform = 'none'; t.style.boxShadow = 'none'; t.style.background = 'rgba(0,0,0,0.4)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '34px', height: '34px', background: `${color}15`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={17} color={color} />
                    </div>
                    <h3 style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>{title}</h3>
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color, fontFamily: 'var(--font-accent)' }}>
                      <AnimatedCounter target={stat} suffix={statSuffix} duration={1600} />
                    </span>
                    <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.32)', marginTop: '0.15rem' }}>{statLabel}</span>
                  </div>
                  <p style={{ fontSize: '0.83rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.58)', margin: 0 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <div style={{ ...sec, padding: '0 2rem 4rem' }}>
          <div className="land-reveal" style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ borderLeft: '3px solid var(--gold)', background: 'rgba(223,183,108,0.04)', borderRadius: '0 10px 10px 0', padding: '2rem 2rem 2rem 2.5rem' }}>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', marginBottom: '1rem' }}>
                "We considered standard construction, hurricane straps, impact windows — the usual approach. Then we found SCIP. The decision wasn't even close. Our home now has a 4-hour fire rating, 250 MPH wind resistance, and concrete walls. One system solves everything."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(223,183,108,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>D</div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>David K.</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Gulf Coast, TX — New Construction Client</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECOND TESTIMONIAL ── */}
        <div style={{ ...sec, padding: '0 2rem 4rem' }}>
          <div className="land-reveal" style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ borderLeft: '3px solid var(--gold)', background: 'rgba(223,183,108,0.04)', borderRadius: '0 10px 10px 0', padding: '2rem 2rem 2rem 2.5rem' }}>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', marginBottom: '1rem' }}>
                "After the Northridge earthquake, we swore our next home would never be at risk like that again. We found Everlasting Homes a decade later and it's everything we wanted — M9.0 rated, Category 5 wind certified, and it looks like an architectural masterpiece."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(223,183,108,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>R</div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>Robert & Diana M.</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Ventura County, CA — New Construction Client</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SCIP TECHNOLOGY ── */}
        <section style={{ ...sec, padding: '4rem 2rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="land-reveal">
              <span className="section-subtitle" style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem' }}>The Engineering</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', textAlign: 'center', marginBottom: '2.5rem', color: '#fff' }}>SCIP: <span style={{ color: 'var(--gold)' }}>Structural Concrete Insulated Panel</span></h2>
            </div>
            <div className="land-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: Zap, label: 'The Core', desc: 'High-density EPS foam — R-45 thermal performance and self-extinguishing fire behavior.' },
                { icon: Shield, label: 'The Steel', desc: 'Continuous welded steel mesh — 250 MPH wind resistance and seismic ductility.' },
                { icon: Activity, label: 'The Shell', desc: 'High-PSI shotcrete on both faces — 4-hour fire rating, flood and moisture barrier.' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1.25rem', transition: 'border-color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Icon size={16} color="var(--gold)" />
                    <h3 style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>{label}</h3>
                  </div>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.58)', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GLOBAL TRACK RECORD ── */}
        <section style={{ ...sec, padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="land-reveal" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2.5rem' }}>
              <Globe size={22} color="var(--gold)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <div>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', marginBottom: '0.75rem', color: '#fff' }}>30 Years. 20 Countries. <span style={{ color: 'var(--gold)' }}>Zero Disaster Damage.</span></h2>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', maxWidth: '680px' }}>RSG 3-D SCIP homes have been built and tested across climates from Caribbean hurricane zones to seismically active regions in Asia and Latin America. Over 30 years, zero structural damage in disaster events — including direct CAT5 hurricane strikes and 7.0+ magnitude earthquakes.</p>
              </div>
            </div>
            <div className="land-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.25rem' }}>
              {[
                { label: 'CAT5 Hurricanes', detail: 'Zero damage on record' },
                { label: 'M7+ Earthquakes', detail: 'Zero structural failure' },
                { label: 'Wildfire Events', detail: 'Survived direct contact' },
                { label: 'Flood Exposure', detail: 'No rot or structural damage' },
              ].map(({ label, detail }) => (
                <div key={label} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem', transition: 'border-color 0.3s, padding-left 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.paddingLeft = '1.4rem'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.paddingLeft = '1rem'; }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section style={{ ...sec, padding: '3.5rem 2rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="land-reveal" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', marginBottom: '1.75rem' }}>Certifications & Industry Recognition</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
              {CERTS.map(c => <img key={c.alt} src={c.src} alt={c.alt} style={{ height: '38px', objectFit: 'contain', opacity: 0.75, transition: 'opacity 0.3s' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.75'} />)}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'center', paddingTop: '1.75rem', borderTop: '1px solid var(--border)' }}>
              {AWARD_SEALS.map(a => <img key={a.alt} src={a.src} alt={a.alt} style={{ height: '78px', objectFit: 'contain', opacity: 0.88, filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))', transition: 'opacity 0.3s, transform 0.3s' }} onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'none'; }} />)}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ ...sec, padding: '4rem 2rem', background: 'rgba(0,0,0,0.25)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="land-reveal">
              <span className="section-subtitle" style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem' }}>Common Questions</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', textAlign: 'center', marginBottom: '2.5rem', color: '#fff' }}>Disaster-Resistant Homes FAQ</h2>
            </div>
            <div style={{ display: 'grid', gap: '0.25rem' }}>
              {[
                { q: 'Does SCIP really protect against all four major disaster types?', a: 'Yes. SCIP\'s monolithic shotcrete shell, continuous steel mesh cage, and EPS foam core address fire, seismic, wind, and flood resistance simultaneously in a single building system. No add-ons required.' },
                { q: 'How does SCIP compare to ICF (Insulated Concrete Forms)?', a: 'Both use concrete, but SCIP uses a continuous welded steel mesh cage on both faces — providing significantly higher tensile strength and seismic ductility than ICF. SCIP also achieves R-45 insulation vs. typical R-22 for ICF.' },
                { q: 'Is SCIP construction more expensive than wood frame?', a: 'Construction costs are comparable or marginally higher upfront. However, lower insurance premiums, dramatically reduced energy bills, and elimination of disaster rebuild risk typically make SCIP significantly more economical over a 10-year horizon.' },
                { q: 'Can I get any design I want with SCIP?', a: 'Yes. SCIP panels can replicate virtually any architectural style — modern, Mediterranean, traditional, or contemporary. The panel system is a structural shell; your architect designs the aesthetics freely.' },
                { q: 'What certifications does SCIP construction carry?', a: 'Everlasting Homes\' SCIP construction is ICC approved and carries Miami-Dade County wind resistance certification — the world\'s most stringent hurricane standard. Additionally: RESNET HERS, GHBA, NAHB, and Energy Star certifications.' },
                { q: 'How long does a SCIP home take to build?', a: 'SCIP construction is typically 15-25% faster than wood-frame due to the panel prefabrication process. A full custom home generally runs 10-14 months from permit to completion depending on complexity and jurisdiction.' },
              ].map((faq, i) => (
                <div key={i} className="land-reveal" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', padding: '1rem 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: openFaq === i ? 'var(--gold)' : 'var(--text)', fontFamily: 'var(--font-accent)', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.3s' }}>
                    <span style={{ paddingRight: '1rem' }}>{faq.q}</span>
                    <span style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.35s ease', color: 'var(--gold)', fontSize: '0.6rem', flexShrink: 0 }}>▼</span>
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
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/pool.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07 }} />
          <div className="land-reveal" style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>Build to Last</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', marginBottom: '1rem', color: '#fff' }}>Build a Home That <span style={{ color: 'var(--gold)' }}>Outlasts Everything.</span></h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', maxWidth: '520px', margin: '0 auto 2.5rem' }}>A free consultation with the Everlasting Homes team is the first step toward a home your family can count on for generations.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setShowModal(true)} className="cta-btn" style={{ fontSize: '0.88rem', padding: '1rem 2.5rem' }}>Schedule Free Site Consultation</button>
              <a href="/wildfire-rebuild" className="cta-btn" style={{ background: 'transparent', color: 'var(--gold)', borderColor: 'rgba(223,183,108,0.4)', fontSize: '0.88rem', padding: '1rem 2.5rem' }}>Wildfire Rebuild Guide</a>
            </div>
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
