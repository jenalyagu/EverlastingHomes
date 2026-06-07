import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Zap } from 'lucide-react';

const STATS = [
  { value: '250', unit: 'MPH', label: 'Wind Resistance' },
  { value: '4',   unit: 'HR',  label: 'Fire Rating'    },
  { value: '60',  unit: '%',   label: 'Energy Savings'  },
  { value: '100', unit: 'YR',  label: 'Design Life'     },
];

export default function HeroSection({ onOpenCalculator }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.2 })
        .fromTo('.hero-badge',
          { opacity: 0, y: -16, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
        )
        .fromTo('.hero-line',
          { opacity: 0, y: 72, rotateX: -12 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.1, stagger: 0.14, ease: 'power4.out' },
          '-=0.5'
        )
        .fromTo('.hero-body',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo('.hero-ctas',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo('.hero-stat',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo('.scroll-indicator',
          { opacity: 0 },
          { opacity: 0.6, duration: 1.2, ease: 'power2.out' },
          '-=0.3'
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={ref}>

      {/* Radial glow behind content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 55% at 50% 42%, rgba(223,183,108,0.09) 0%, transparent 68%)',
        pointerEvents: 'none',
      }} />

      <div className="content-wrapper" style={{ textAlign: 'center', position: 'relative' }}>

        {/* ── Badge ─────────────────────────────────────────── */}
        <div className="hero-badge" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.45rem 1.2rem',
          marginBottom: '2.2rem',
          border: '1px solid rgba(223,183,108,0.35)',
          borderRadius: '100px',
          background: 'rgba(223,183,108,0.05)',
          backdropFilter: 'blur(10px)',
        }}>
          <Zap size={11} color="var(--gold)" />
          <span style={{
            fontSize: '0.58rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontWeight: 600,
            textShadow: '0 2px 10px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.8)',
          }}>
            Everlasting Homes
          </span>
          <ArrowRight size={11} color="var(--gold)" />
        </div>

        {/* ── Headline ──────────────────────────────────────── */}
        <h1 style={{
          fontSize: 'clamp(2.95rem, 7.6vw, 6.35rem)',
          lineHeight: 1.0,
          marginBottom: '2rem',
          perspective: '900px',
          overflow: 'hidden',
        }}>
          <span className="hero-line" style={{ display: 'block' }}>
            Resilient Luxury Homebuilding
          </span>
          <span className="hero-line" style={{
            display: 'block',
            color: 'var(--gold)',
            textShadow: '0 2px 16px rgba(0,0,0,0.95), 0 4px 32px rgba(0,0,0,0.85), 0 0 40px rgba(223,183,108,0.45)',
          }}>
            Built for Strength
          </span>
        </h1>

        {/* ── Body ──────────────────────────────────────────── */}
        <p className="hero-body" style={{
          margin: '0 auto 2.25rem',
          fontSize: 'clamp(0.85rem, 1.4vw, 1.0rem)',
          maxWidth: '660px',
          color: 'rgba(255,255,255,1)',
          lineHeight: 1.4,
          fontWeight: 700,
          textShadow: '0 0 18px rgba(255,255,255,0.35), 0 2px 12px rgba(0,0,0,0.9)',
        }}>
          Your home should do more than look beautiful. It should be built to last.
        </p>

        {/* ── CTAs ──────────────────────────────────────────── */}
        <div className="hero-ctas" style={{
          display: 'flex',
          gap: '1.25rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3.5rem',
        }}>
          <a href="#cta" className="cta-btn" style={{
            filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.75))',
            textShadow: '0 2px 10px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.8)',
          }}>Schedule Consultation</a>
          <button onClick={onOpenCalculator} className="cta-btn" style={{
            background: 'transparent',
            borderColor: 'rgba(223,183,108,0.35)',
            color: 'rgba(223,183,108,0.8)',
            filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.75))',
            textShadow: '0 2px 10px rgba(0,0,0,0.95)',
          }}>
            Calculate Your Risk
          </button>
          <Link to="/my-everlasting-home" className="cta-btn" style={{
            background: 'transparent',
            borderColor: 'rgba(255,255,255,0.18)',
            color: 'rgba(255,255,255,0.7)',
            filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.75))',
            textShadow: '0 2px 10px rgba(0,0,0,0.95)',
          }}>
            Design Your Resilient Home
          </Link>
        </div>

        {/* ── Stats Strip ───────────────────────────────────── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid var(--border)',
          paddingTop: '2.8rem',
          flexWrap: 'wrap',
          gap: '0',
        }}>
          {STATS.map((stat, i) => (
            <div key={i} className="hero-stat" style={{
              padding: '0 clamp(1.5rem, 3vw, 3.5rem)',
              borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-accent)',
                fontWeight: 800,
                fontSize: 'clamp(1.65rem, 2.95vw, 2.35rem)',
                color: 'var(--gold)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textShadow: '0 2px 12px rgba(0,0,0,0.95), 0 4px 24px rgba(0,0,0,0.8)',
              }}>
                {stat.value}
                <span style={{ fontSize: '0.45em', opacity: 0.75, marginLeft: '2px' }}>
                  {stat.unit}
                </span>
              </div>
              <div style={{
                fontSize: '0.55rem',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginTop: '0.6rem',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Scroll Cue ────────────────────────────────────── */}
      <div className="scroll-indicator">
        <span style={{ fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', textShadow: '0 2px 10px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.8)' }}>
          Scroll
        </span>
        <div className="scroll-line" />
      </div>

    </section>
  );
}
