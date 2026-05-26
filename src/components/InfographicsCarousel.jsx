import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { id: 1, image: '/Infographics/Infographic Lower Op Costs.png',          alt: 'Lower Operational Costs' },
  { id: 2, image: '/Infographics/Infographic SCIP building process 2.png', alt: 'SCIP Building Process' },
  { id: 3, image: '/Infographics/Infographic house cutout black.png',       alt: 'House Structure Cutout' },
  { id: 4, image: '/Infographics/Infographic_PerformanceAnalysis.jpeg',     alt: 'Performance Analysis' },
];

export default function InfographicsCarousel() {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [auto]);

  const prev = () => { setCurrent(p => (p - 1 + slides.length) % slides.length); setAuto(false); };
  const next = () => { setCurrent(p => (p + 1) % slides.length); setAuto(false); };
  const go   = i => { setCurrent(i); setAuto(false); };

  return (
    <section id="infographics" style={{ position: 'relative', width: '100%', padding: '5.9rem 5%', overflow: 'hidden', backgroundColor: 'var(--bg)' }}>

      {/* Gold ambient blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '-8rem', width: '28rem', height: '28rem', borderRadius: '50%', background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)', opacity: 0.07, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '-8rem', width: '28rem', height: '28rem', borderRadius: '50%', background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)', opacity: 0.07, filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>Performance Data</span>
          <h2 style={{ fontSize: '2.95rem', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.15, textShadow: '0 0 10px rgba(223,183,108,0.7), 0 0 20px rgba(223,183,108,0.3), 0 2px 8px rgba(0,0,0,0.8)' }}>
            Built to <span style={{ color: 'var(--gold)' }}>Outperform</span>
          </h2>
        </div>

        {/* Slide area */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative', height: '580px', borderRadius: '12px', overflow: 'hidden', background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 48px rgba(0,0,0,0.5)' }}>

            {slides.map((slide, i) => (
              <div
                key={slide.id}
                style={{
                  position: 'absolute', inset: 0,
                  transition: 'opacity 0.7s ease, transform 0.7s ease',
                  opacity: i === current ? 1 : 0,
                  transform: `translateX(${i === current ? '0%' : i < current ? '-6%' : '6%'})`,
                  pointerEvents: i === current ? 'auto' : 'none',
                  padding: '2rem',
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px', display: 'block' }}
                />
              </div>
            ))}

            {/* Bottom fade */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(5,5,5,0.55) 100%)', pointerEvents: 'none' }} />
          </div>

          {/* Prev / Next */}
          <button
            onClick={prev}
            aria-label="Previous"
            style={{ position: 'absolute', left: '-1.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '3rem', height: '3rem', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--gold)', boxShadow: '0 0 20px var(--gold-glow)', transition: 'transform 0.25s, box-shadow 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)'; e.currentTarget.style.boxShadow = '0 0 30px var(--gold-glow)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.boxShadow = '0 0 20px var(--gold-glow)'; }}
          >
            <ChevronLeft size={22} color="var(--bg)" />
          </button>

          <button
            onClick={next}
            aria-label="Next"
            style={{ position: 'absolute', right: '-1.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '3rem', height: '3rem', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--gold)', boxShadow: '0 0 20px var(--gold-glow)', transition: 'transform 0.25s, box-shadow 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)'; e.currentTarget.style.boxShadow = '0 0 30px var(--gold-glow)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.boxShadow = '0 0 20px var(--gold-glow)'; }}
          >
            <ChevronRight size={22} color="var(--bg)" />
          </button>
        </div>

        {/* Dot pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              style={{ height: '10px', width: i === current ? '36px' : '10px', borderRadius: '9999px', border: 'none', cursor: 'pointer', transition: 'all 0.35s ease', backgroundColor: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.2)', boxShadow: i === current ? '0 0 10px var(--gold-glow)' : 'none' }}
            />
          ))}
        </div>

        {/* Caption */}
        <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.8rem', lineHeight: 1.5, color: 'var(--muted)', maxWidth: '640px', margin: '2.5rem auto 0' }}>
          Every metric tells the same story — SCIP construction outperforms conventional building in energy efficiency, structural resilience, and long-term value.
        </p>

      </div>
    </section>
  );
}
