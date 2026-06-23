import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, MapPin, CheckCircle2, Star, Droplets, Wind, Flame, X } from 'lucide-react';
import LandingNav from '../components/LandingNav';
import ConsultationModal from '../components/ConsultationModal';
import AnimatedCounter from '../components/AnimatedCounter';
import ROICalculator from '../components/ROICalculator';
import { useLandingPage } from '../hooks/useLandingPage';

const TEXAS_RISKS = [
  { icon: Droplets, color: '#4fc3f7', title: 'Hurricane & Flooding', stat: 250, statSuffix: '+ MPH', statLabel: 'Wind resistance', body: 'Harvey dumped 60 inches of rain on Houston. SCIP construction is impervious to moisture damage, rot, and repeated flood exposure that destroys wood-frame homes.' },
  { icon: Wind, color: '#7ec8e3', title: 'Tornado Winds', stat: 250, statSuffix: '+ MPH', statLabel: 'Miami-Dade wind rating', body: "Texas tornado season is a reality. SCIP homes carry the world's most demanding wind resistance certification — the Miami-Dade County standard." },
  { icon: Flame, color: '#ff6b35', title: 'Wildfire Exposure', stat: 2200, statSuffix: '°F', statLabel: 'Tested fire resistance', body: 'Drought and heat make Texas increasingly fire-prone. SCIP\'s 4-hour fire rating and shotcrete exterior provide barriers conventional construction simply cannot match.' },
  { icon: Shield, color: 'var(--gold)', title: 'Extreme Heat', stat: 45, statSuffix: ' R', statLabel: 'Insulation value', body: 'R-45 continuous insulation eliminates thermal bridging that drives energy bills. SCIP homes maintain comfort under extreme Texas heat at a fraction of the cost.' },
];

const PROJECTS = [
  { name: 'Meyerland Fortress', location: 'Meyerland, Houston', img: '/assets/project1.jpg', tag: 'Harvey Rebuild Zone', desc: '5,200 sq ft luxury rebuild in one of the most flood-prone neighborhoods in the country. Three floods in five years — zero damage after SCIP rebuild.' },
  { name: 'West University Estate', location: 'West University Place, TX', img: '/assets/project2.jpg', tag: 'Energy Corridor Executive', desc: '6,800 sq ft estate for an energy industry executive requiring discreet luxury, privacy, and resilience in equal measure.' },
  { name: 'Coastal Fortress', location: 'Galveston Island, TX', img: '/assets/project3.jpg', tag: 'Gulf Coast Direct Exposure', desc: 'Direct Gulf exposure with tidal flooding risk. SCIP concrete-and-steel shell engineered for CAT5 hurricane direct strike conditions.' },
];

const TEAM = [
  { src: '/Headshots/Franck_headshot.webp', name: 'Franck Boursier', title: 'Founder & CEO', detail: '35 years, 20 countries' },
  { src: '/Headshots/GeorgeM_headshot.webp', name: 'George Mock', title: 'COO', detail: 'Texas operations lead' },
  { src: '/Headshots/JullieM_headshot.webp', name: 'Julie Mock', title: 'Director of Client Experience', detail: 'Luxury concierge process' },
];

const sec = { height: 'auto', display: 'block', pointerEvents: 'auto' };

export default function LuxuryHomesTexas() {
  const [showModal, setShowModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const { bgRef } = useLandingPage();

  return (
    <>
      <Helmet>
        <title>Luxury Custom Homes Texas | Disaster-Resistant SCIP | Everlasting Homes</title>
        <meta name="description" content="Houston luxury custom home builder specializing in disaster-resistant SCIP. Hurricane-proof, flood-resistant, fire-rated. Serving Meyerland, West University, Galveston & all of Texas." />
        <meta name="keywords" content="luxury home builder Houston Texas, custom home builder Houston, disaster resistant luxury home Texas, hurricane proof home Houston, flood resistant home Meyerland, SCIP homes Texas, luxury construction Houston" />
        <link rel="canonical" href="https://everlasting.build/luxury-homes-texas" />
        <meta property="og:title" content="Luxury Custom Homes Texas | Disaster-Resistant SCIP | Everlasting Homes" />
        <meta property="og:description" content="Houston luxury custom homes engineered to survive every Texas weather event." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://everlasting.build/luxury-homes-texas" />
        <meta property="og:image" content="https://everlasting.build/assets/LuxuryHomeTexas.png" />
        <meta property="og:site_name" content="Everlasting Homes Building Group" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Custom Homes Texas | Disaster-Resistant SCIP" />
        <meta name="twitter:description" content="Houston luxury custom homes engineered to survive every Texas weather event. Serving Meyerland, West University, Galveston & all of Texas." />
        <meta name="twitter:image" content="https://everlasting.build/assets/LuxuryHomeTexas.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Everlasting Homes Building Group",
          "image": "https://everlasting.build/Logos/ehbg-logo.png",
          "url": "https://everlasting.build/luxury-homes-texas",
          "description": "Houston luxury custom home builder specializing in disaster-resistant SCIP construction.",
          "address": { "@type": "PostalAddress", "addressLocality": "Houston", "addressRegion": "TX", "addressCountry": "US" },
          "areaServed": ["Houston", "Meyerland", "West University Place", "Galveston", "The Woodlands", "River Oaks", "Bellaire", "Kingwood", "Katy", "Pearland", "Clear Lake"],
          "serviceType": "Luxury Custom Home Builder",
          "founder": { "@type": "Person", "name": "Franck Boursier" }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Franck Boursier",
          "jobTitle": "Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Everlasting Homes Building Group" },
          "image": "https://everlasting.build/Headshots/Franck_headshot.webp",
          "description": "35 years of SCIP construction expertise across 20 countries."
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Susan T." },
          "reviewBody": "Harvey flooded our Meyerland home three times in five years. We rebuilt with Everlasting Homes and SCIP. Two hurricanes since — not a drop inside. Not one call to the insurance company.",
          "itemReviewed": { "@type": "LocalBusiness", "name": "Everlasting Homes Building Group" }
        })}</script>
      </Helmet>

      {/* Scroll progress bar */}
      <div id="scroll-progress-bar" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--gold), #fff8e1)', zIndex: 500, transformOrigin: 'left', transform: 'scaleX(0)' }} />

      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}>

        {!bannerDismissed && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: 'rgba(10,10,15,0.97)', borderBottom: '1px solid rgba(223,183,108,0.2)', padding: '0.6rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <MapPin size={13} color="var(--gold)" />
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>
              Texas storm season is here. Summer intake slots are filling fast. &nbsp;
              <button onClick={() => setShowModal(true)} style={{ background: 'none', border: 'none', color: 'var(--gold)', textDecoration: 'underline', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem', padding: 0 }}>Reserve your consultation →</button>
            </span>
            <button onClick={() => setBannerDismissed(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', marginLeft: 'auto', display: 'flex' }}><X size={13} /></button>
          </div>
        )}

        <LandingNav />

        {/* ── HERO ── */}
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '9rem 2rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
          <div ref={bgRef} style={{ position: 'absolute', inset: '-20%', backgroundImage: 'url(/assets/pool.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.63 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.05) 0%, rgba(5,5,5,0.32) 55%, rgba(5,5,5,0.65) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, rgba(223,183,108,0.06), transparent)', pointerEvents: 'none' }} />

          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(160,120,30,0.2) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
            <div className="land-reveal" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', background: 'rgba(223,183,108,0.08)', border: '1px solid rgba(223,183,108,0.35)', borderRadius: '100px', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold)', fontWeight: 700 }}>
                <MapPin size={10} /> Houston, TX
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>
                Trusted by Energy Executives
              </span>
            </div>

            <h1 className="land-reveal" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', lineHeight: 1.05, fontWeight: 800, marginBottom: '1.25rem', color: '#fff' }}>
              Texas Luxury Living<br /><span style={{ color: 'var(--gold)' }}>Built to Endure Everything</span>
            </h1>

            <p className="land-reveal" style={{ fontSize: 'clamp(1rem, 2vw, 1.18rem)', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)', maxWidth: '720px', margin: '0 auto 2.25rem' }}>
              Everlasting Homes brings luxury custom construction and structural disaster resistance together in one building system. Trusted by Houston-area energy executives, medical professionals, and families who refuse to accept a home that cannot survive Texas weather.
            </p>

            <div className="land-reveal" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button onClick={() => setShowModal(true)} className="cta-btn" style={{ fontSize: '0.82rem', padding: '0.85rem 2rem' }}>Schedule Free Site Consultation</button>
              <a href="/disaster-resistant-homes" className="cta-btn" style={{ background: 'transparent', color: 'var(--gold)', borderColor: 'rgba(223,183,108,0.4)', fontSize: '0.82rem', padding: '0.85rem 2rem' }}>View SCIP Technology →</a>
            </div>

            <p className="land-reveal" style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.3)', marginBottom: '2rem' }}>
              Houston &nbsp;·&nbsp; Galveston &nbsp;·&nbsp; The Woodlands &nbsp;·&nbsp; West University &nbsp;·&nbsp; Meyerland
            </p>
            <p className="land-reveal" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem' }}>
              Learn more:&nbsp;
              <a href="/disaster-resistant-homes" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid rgba(223,183,108,0.35)' }}>Multi-Hazard Resilience</a>
              &nbsp;·&nbsp;
              <a href="/wildfire-rebuild" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid rgba(223,183,108,0.35)' }}>Wildfire Rebuild Guide</a>
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

        {/* ── ROI CALCULATOR ── */}
        <section style={{ ...sec, padding: '5rem 2rem', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div className="land-reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.5rem' }}>The Financial Case</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff' }}>SCIP Pays for Itself. <span style={{ color: 'var(--gold)' }}>See Your Numbers.</span></h2>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.48)', marginTop: '0.75rem', maxWidth: '560px', margin: '0.75rem auto 0' }}>Adjust your home value, size, and Houston-area location to see the estimated 10-year financial advantage of building with SCIP vs. conventional wood-frame construction.</p>
            </div>
            <div className="land-reveal">
              <ROICalculator onConsult={() => setShowModal(true)} />
            </div>
          </div>
        </section>

        {/* ── ANIMATED STATS BAR ── */}
        <div style={{ ...sec, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2.5rem 2rem', background: 'rgba(0,0,0,0.45)' }}>
          <div className="land-stagger" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 6vw, 5rem)', flexWrap: 'wrap', maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            {[
              { target: 35, suffix: '+', label: 'Years Experience' },
              { target: 20, suffix: '', label: 'Countries Built' },
              { target: 0, suffix: '', label: 'Disaster Damage Events' },
              { target: 5000, suffix: '+', label: 'Sq Ft Avg Texas Build' },
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

        {/* ── TEXAS RISKS ── */}
        <section style={{ ...sec, padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div className="land-reveal" style={{ maxWidth: '600px', marginBottom: '3rem' }}>
              <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>Texas-Specific Resilience</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '0.75rem' }}>Texas Weather is <span style={{ color: 'var(--gold)' }}>Unforgiving.</span></h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.52)', lineHeight: 1.6 }}>Harvey. Ida. Wildfires. Polar vortex. No other state subjects its residents to the range and severity of weather events Texas does. Your home should be engineered for all of it.</p>
            </div>

            <div className="land-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
              {TEXAS_RISKS.map(({ icon: Icon, color, title, stat, statSuffix, statLabel, body }) => (
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
              <div style={{ display: 'flex', gap: '0.15rem', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={13} color="var(--gold)" fill="var(--gold)" />)}
              </div>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', marginBottom: '1rem' }}>
                "Harvey flooded our Meyerland home three times in five years. We rebuilt with Everlasting Homes and SCIP. Two hurricanes since — not a drop inside. Not one call to the insurance company. It's the best decision we've made as homeowners."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(223,183,108,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>S</div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>Susan T.</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Meyerland, Houston — Harvey Rebuild Client</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECOND TESTIMONIAL ── */}
        <div style={{ ...sec, padding: '0 2rem 4rem' }}>
          <div className="land-reveal" style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ borderLeft: '3px solid var(--gold)', background: 'rgba(223,183,108,0.04)', borderRadius: '0 10px 10px 0', padding: '2rem 2rem 2rem 2.5rem' }}>
              <div style={{ display: 'flex', gap: '0.15rem', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={13} color="var(--gold)" fill="var(--gold)" />)}
              </div>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', marginBottom: '1rem' }}>
                "We're in River Oaks and looked at every high-end builder in Houston. Nobody else was offering what Everlasting does — true disaster resilience without compromising on finishes or design. The ROI calculator sold my wife. The finished home sold me permanently."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(223,183,108,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>T</div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>Thomas B.</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>River Oaks, Houston — New Construction Client</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PROJECT HIGHLIGHTS ── */}
        <section style={{ ...sec, padding: '4rem 2rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div className="land-reveal" style={{ marginBottom: '2.5rem' }}>
              <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.5rem' }}>Texas Portfolio</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff' }}>Notable Texas <span style={{ color: 'var(--gold)' }}>Projects</span></h2>
            </div>
            <div className="land-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {PROJECTS.map(({ name, location, img, tag, desc }) => (
                <div key={name}
                  style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', background: 'rgba(0,0,0,0.4)', transition: 'all 0.35s ease', cursor: 'default' }}
                  onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'var(--gold)'; t.style.transform = 'translateY(-4px)'; t.style.boxShadow = '0 16px 48px rgba(223,183,108,0.1)'; }}
                  onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'var(--border)'; t.style.transform = 'none'; t.style.boxShadow = 'none'; }}
                >
                  <div style={{ height: '180px', background: 'rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
                    <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75, transition: 'opacity 0.4s ease, transform 0.5s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '0.75'; e.currentTarget.style.transform = 'none'; }}
                    />
                    <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', padding: '0.25rem 0.7rem', background: 'rgba(0,0,0,0.7)', borderRadius: '6px', fontSize: '0.62rem', letterSpacing: '0.5px', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600 }}>{tag}</div>
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.3rem' }}>{name}</h3>
                    <p style={{ fontSize: '0.72rem', color: 'var(--gold)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={10} /> {location}
                    </p>
                    <p style={{ fontSize: '0.83rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT SETS US APART ── */}
        <section style={{ ...sec, padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div className="land-reveal">
              <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>Why Everlasting</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', marginBottom: '1rem', color: '#fff' }}>The Only Builder in Texas <span style={{ color: 'var(--gold)' }}>That Does Both</span></h2>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', marginBottom: '1.5rem' }}>Other luxury builders deliver beautiful homes. Other disaster-resistant builders deliver safe ones. Everlasting Homes is the only builder in Texas that delivers both — in the same structure, at the same price point.</p>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem', padding: 0 }}>
                {[
                  'Turnkey luxury design-build, not just shells',
                  'Full-spectrum disaster protection in one system',
                  'R-45 insulation — dramatically lower energy bills',
                  'Faster construction than traditional wood-frame',
                  'Better resale value, lower insurance premiums',
                  '35-year proven track record in 20 countries',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={14} color="var(--gold)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                    <span style={{ lineHeight: 1.5, color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="land-reveal" style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="/Infographics/SCIP_graphic.png" alt="SCIP technology" style={{ width: '100%', maxWidth: '420px', objectFit: 'contain', borderRadius: '10px', border: '1px solid var(--border)', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', transition: 'transform 0.4s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              />
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section style={{ ...sec, padding: '4rem 2rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <div className="land-reveal">
              <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.5rem' }}>The Team</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', marginBottom: '0.75rem', color: '#fff' }}>Meet the <span style={{ color: 'var(--gold)' }}>Team</span></h2>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.52)', maxWidth: '540px', margin: '0 auto 2.5rem' }}>Three decades of SCIP expertise and an unwavering commitment to the highest standard in residential construction.</p>
            </div>
            <div className="land-stagger" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {TEAM.map(({ src, name, title, detail }) => (
                <div key={name} style={{ textAlign: 'center', cursor: 'default', transition: 'transform 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <div style={{ width: '88px', height: '88px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 0.75rem', border: '2px solid rgba(223,183,108,0.3)', transition: 'border-color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(223,183,108,0.3)'}
                  >
                    <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.style.background = 'rgba(223,183,108,0.12)'; }} />
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>{name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>{title}</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{detail}</div>
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
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', textAlign: 'center', marginBottom: '2.5rem', color: '#fff' }}>Texas Luxury SCIP Homes FAQ</h2>
            </div>
            <div style={{ display: 'grid', gap: '0.25rem' }}>
              {[
                { q: 'Is SCIP construction common in Houston?', a: 'No — that\'s a competitive advantage. Most Houston builders still use wood-frame or traditional masonry. Everlasting Homes brings SCIP technology developed across 20 countries and 35 years to the Houston luxury market, offering disaster protection no local wood-frame builder can match.' },
                { q: 'Will my insurance be lower with a SCIP home in Houston?', a: 'Most homeowners in high-risk Houston flood and wind zones report significant insurance savings after building with SCIP. Miami-Dade wind certification and the absence of combustible framing are significant factors insurers reward. We recommend consulting your insurer for specific policy details.' },
                { q: 'Can SCIP match the luxury finishes I want?', a: 'Absolutely. SCIP is a structural system, not an aesthetic one. Your architect chooses every finish, material, and detail. We\'ve delivered everything from modern minimalist to French chateau — the exterior and interior aesthetic is entirely yours.' },
                { q: 'How did SCIP homes perform in Hurricane Harvey?', a: 'Everlasting SCIP homes in Harvey-affected areas sustained zero structural damage. Our Meyerland clients rebuilt after three consecutive flood events and have since weathered two additional named storms without a single insurance claim.' },
                { q: 'Do you work with Houston architects and interior designers?', a: 'Yes. We work alongside your chosen architect and design team, or can provide referrals to Houston-area luxury designers we\'ve partnered with. Our role is the structural SCIP system and construction management.' },
                { q: 'What is the typical size and price range for your Texas projects?', a: 'Our Texas projects typically range from 3,500 to 12,000+ sq ft. Price range depends on lot, finishes, and design complexity. A free site consultation is the best starting point for understanding your specific investment.' },
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
            <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>Start Your Texas Build</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', marginBottom: '1rem', color: '#fff' }}>Luxury Without <span style={{ color: 'var(--gold)' }}>Compromise.</span></h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', maxWidth: '520px', margin: '0 auto 2.5rem' }}>A free Texas site consultation is the first step. Let's design a home that's as beautiful as it is indestructible.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setShowModal(true)} className="cta-btn" style={{ fontSize: '0.88rem', padding: '1rem 2.5rem' }}>Schedule Free Site Consultation</button>
              <a href="/disaster-resistant-homes" className="cta-btn" style={{ background: 'transparent', color: 'var(--gold)', borderColor: 'rgba(223,183,108,0.4)', fontSize: '0.88rem', padding: '1rem 2.5rem' }}>Disaster Resistance Overview</a>
            </div>
            <p style={{ marginTop: '1.25rem', fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>No obligation · Free site consultation · Houston & all of Texas</p>
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
