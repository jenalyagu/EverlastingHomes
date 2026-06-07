import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Check, Shield, Flame, Activity,
  Droplets, Zap, Infinity, ChevronLeft, Zap as ZapIcon,
} from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────

const ESTATE_STYLES = [
  { id: 'modern',      label: 'Modern Luxury',         desc: 'Clean lines, open space, contemporary design' },
  { id: 'texas',       label: 'Texas Hill Country',    desc: 'Stone, cedar, and sweeping Texas landscape' },
  { id: 'ranch',       label: 'Contemporary Ranch',    desc: 'Single-story with commanding views and sprawling grounds' },
  { id: 'traditional', label: 'Traditional Estate',    desc: 'Timeless architecture and refined craftsmanship' },
  { id: 'coastal',     label: 'Coastal Retreat',       desc: 'Designed for waterfront living and climate resilience' },
  { id: 'custom',      label: 'Entirely Custom',       desc: "We'll define it together from the ground up" },
];

const ACREAGE = [
  { id: 'under1', label: 'Under 1 Acre' },
  { id: '1to5',   label: '1 – 5 Acres'  },
  { id: '5to20',  label: '5 – 20 Acres' },
  { id: '20plus', label: '20+ Acres'    },
  { id: 'tbd',    label: 'Not yet determined' },
];

const PRIORITIES = [
  { id: 'fire',    label: 'Wildfire Protection',       Icon: Flame,    color: '#ff6b35', bg: 'rgba(255,107,53,0.08)'   },
  { id: 'seismic', label: 'Seismic Resilience',        Icon: Activity, color: '#dfb76c', bg: 'rgba(223,183,108,0.08)'  },
  { id: 'flood',   label: 'Flood & Hurricane Defense', Icon: Droplets, color: '#4fc3f7', bg: 'rgba(79,195,247,0.08)'   },
  { id: 'energy',  label: 'Energy Efficiency',         Icon: Zap,      color: '#a5d6a7', bg: 'rgba(165,214,167,0.08)'  },
  { id: 'privacy', label: 'Privacy & Security',        Icon: Shield,   color: '#ce93d8', bg: 'rgba(206,147,216,0.08)'  },
  { id: 'legacy',  label: 'Generational Legacy',       Icon: Infinity, color: '#dfb76c', bg: 'rgba(223,183,108,0.08)'  },
];

const TIMELINES = [
  { id: 'soon',      label: 'Within 6 Months',   desc: 'Ready to begin immediately' },
  { id: 'year',      label: '6 – 12 Months',     desc: 'Actively planning'          },
  { id: 'two',       label: '1 – 2 Years',        desc: 'Thoughtful long-term approach' },
  { id: 'exploring', label: 'Still Exploring',    desc: 'Gathering vision and information' },
];

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
];

const TOTAL_STEPS = 5;

// ── Helpers ───────────────────────────────────────────────────────

function getConceptSummary(answers) {
  const style = ESTATE_STYLES.find(s => s.id === answers.style)?.label ?? 'Custom Estate';
  const state = answers.state || 'your region';
  const topPriorities = (answers.priorities ?? [])
    .map(id => PRIORITIES.find(p => p.id === id)?.label)
    .filter(Boolean)
    .slice(0, 3);
  const timeline = TIMELINES.find(t => t.id === answers.timeline)?.label ?? '';

  const messages = {
    fire:    "Your location and priorities signal a strong need for SCIP's fire-resistant shell, rated to 2,200°F — built to stand when others fall.",
    seismic: "With seismic risk in mind, SCIP's continuous steel mesh and concrete shell are engineered to distribute and absorb earthquake forces across the entire structure.",
    flood:   "For flood and hurricane exposure, SCIP's concrete-based construction resists moisture intrusion, structural uplift, and wind-borne impact where wood and steel cannot.",
    energy:  "SCIP's R-45 insulation core and thermal mass design dramatically reduce HVAC loads — creating a home that's as energy-efficient as it is strong.",
    privacy: "The solidity of SCIP construction provides both physical resilience and the quiet permanence that defines a truly private estate.",
    legacy:  "A SCIP Everlasting Home is built to last 100+ years — the right foundation for a legacy your family will pass down for generations.",
  };

  const primaryConcern = answers.priorities?.[0] ?? 'legacy';
  const message = messages[primaryConcern] ?? messages.legacy;

  return { style, state, topPriorities, timeline, message };
}

// ── Component ─────────────────────────────────────────────────────

export default function MyEverlastingHome() {
  const [step, setStep]           = useState(0); // 0 = not started, 1–5 = quiz, 6 = results
  const [generating, setGenerating] = useState(false);
  const [answers, setAnswers]     = useState({
    style:      null,
    state:      '',
    acreage:    null,
    priorities: [],
    timeline:   null,
    name:       '',
    email:      '',
  });

  const quizRef  = useRef(null);
  const heroRef  = useRef(null);

  useEffect(() => {
    document.title = 'My Everlasting Home | Estate Design Intake';
    window.scrollTo(0, 0);
  }, []);

  const setAnswer = (key, value) =>
    setAnswers(prev => ({ ...prev, [key]: value }));

  const togglePriority = (id) =>
    setAnswers(prev => ({
      ...prev,
      priorities: prev.priorities.includes(id)
        ? prev.priorities.filter(p => p !== id)
        : [...prev.priorities, id],
    }));

  const canProceed = () => {
    if (step === 1) return !!answers.style;
    if (step === 2) return !!answers.state && !!answers.acreage;
    if (step === 3) return answers.priorities.length > 0;
    if (step === 4) return !!answers.timeline;
    if (step === 5) return answers.name.trim().length > 0 && answers.email.trim().length > 0;
    return false;
  };

  const startQuiz = () => {
    setStep(1);
    setTimeout(() => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const next = () => {
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
    } else {
      setGenerating(true);
      setTimeout(() => { setGenerating(false); setStep(6); }, 1800);
    }
  };

  const back = () => setStep(s => Math.max(1, s - 1));

  const concept = step === 6 ? getConceptSummary(answers) : null;

  // ── Nav ──────────────────────────────────────────────────────────
  const Nav = (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
      padding: '0.75rem 5%',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: 'linear-gradient(to bottom, rgba(5,5,5,0.9), transparent)',
      backdropFilter: 'blur(10px)',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/Logos/ehbg-logo.png" alt="Everlasting Homes Building Group" style={{ height: '64px', width: 'auto', objectFit: 'contain' }} />
      </Link>
      <Link to="/" style={{
        display: 'flex', alignItems: 'center', gap: '0.45rem',
        fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
        transition: 'color 0.2s ease',
      }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
      >
        <ArrowLeft size={12} /> Everlasting Homes
      </Link>
    </nav>
  );

  // ── Hero ─────────────────────────────────────────────────────────
  const Hero = (
    <section ref={heroRef} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', position: 'relative', padding: '8rem 5% 5rem',
      background: 'radial-gradient(ellipse 90% 60% at 50% 38%, rgba(223,183,108,0.07) 0%, transparent 65%)',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: '820px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.45rem 1.2rem', marginBottom: '2.5rem',
          border: '1px solid rgba(223,183,108,0.3)', borderRadius: '100px',
          background: 'rgba(223,183,108,0.05)',
        }}>
          <ZapIcon size={11} color="var(--gold)" />
          <span style={{ fontSize: '0.58rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
            AI Estate Design Intake
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.05,
          marginBottom: '1.75rem', fontFamily: 'var(--font-accent)',
          fontWeight: 800, letterSpacing: '-0.02em',
        }}>
          My Everlasting<br />
          <span style={{ color: 'var(--gold)', textShadow: '0 0 40px rgba(223,183,108,0.35)' }}>Home</span>
        </h1>

        <p style={{
          fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', lineHeight: 1.55,
          color: 'rgba(255,255,255,0.72)', maxWidth: '580px', margin: '0 auto 3rem',
          fontWeight: 400,
        }}>
          A private estate design experience built for families who demand beauty, resilience, and a home built to last for generations. Tell us your vision — we'll shape the concept.
        </p>

        <button onClick={startQuiz} className="cta-btn" style={{ fontSize: '0.78rem', padding: '1rem 2.25rem' }}>
          Begin Your Design <ArrowRight size={15} style={{ marginLeft: '0.25rem' }} />
        </button>
      </div>
    </section>
  );

  // ── About ─────────────────────────────────────────────────────────
  const About = (
    <section style={{ padding: '5rem 5%', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <span className="section-subtitle">The Experience</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            Designed Around <span style={{ color: 'var(--gold)' }}>Your Legacy</span>
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.65)', marginBottom: '1rem', textTransform: 'none', letterSpacing: 0 }}>
            My Everlasting Home is an intelligent intake experience that collects your estate vision, priorities, and timeline — then generates a personalized concept to guide your private consultation with the Everlasting Homes team.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.65)', textTransform: 'none', letterSpacing: 0 }}>
            This is not a generic form. It's the first step in designing a home that will protect your family and outlast everything built around it.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            { label: '5-Minute Intake', desc: 'Five focused questions about your vision, property, and priorities.' },
            { label: 'Personalized Concept', desc: 'A tailored estate summary generated from your responses.' },
            { label: 'Private Consultation', desc: 'A direct path to a private briefing with our estate team.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
              padding: '1.1rem 1.25rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '10px',
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                background: 'rgba(223,183,108,0.12)', border: '1px solid rgba(223,183,108,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.62rem', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-accent)',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-accent)' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textTransform: 'none', letterSpacing: 0, lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ── Step progress bar ─────────────────────────────────────────────
  const StepBar = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const n = i + 1;
        const done   = n < step;
        const active = n === step;
        return (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: n < TOTAL_STEPS ? 1 : 'none' }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
              background: done ? 'var(--gold)' : active ? 'rgba(223,183,108,0.15)' : 'transparent',
              border: `1px solid ${done || active ? 'var(--gold)' : 'rgba(255,255,255,0.15)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.62rem', fontWeight: 700,
              color: done ? '#050505' : active ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.25s ease',
            }}>
              {done ? <Check size={12} strokeWidth={3} /> : n}
            </div>
            {n < TOTAL_STEPS && (
              <div style={{ flex: 1, height: '1px', background: done ? 'rgba(223,183,108,0.5)' : 'rgba(255,255,255,0.08)', transition: 'background 0.25s ease' }} />
            )}
          </div>
        );
      })}
    </div>
  );

  // ── Quiz steps ────────────────────────────────────────────────────
  const stepLabels = ['Your Vision', 'Your Property', 'Your Priorities', 'Your Timeline', 'Connect'];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <p style={qPrompt}>What best describes the home you're envisioning?</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              {ESTATE_STYLES.map(s => {
                const on = answers.style === s.id;
                return (
                  <button key={s.id} onClick={() => setAnswer('style', s.id)} style={{
                    ...cardBtn,
                    background: on ? 'rgba(223,183,108,0.1)' : cardBtn.background,
                    border: `1px solid ${on ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`,
                  }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-accent)' }}>{s.label}</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', textTransform: 'none', letterSpacing: 0, lineHeight: 1.4 }}>{s.desc}</div>
                  </button>
                );
              })}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <p style={qPrompt}>Where is your property located, and how large is it?</p>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>State</label>
              <div style={{ position: 'relative' }}>
                <select
                  value={answers.state}
                  onChange={e => setAnswer('state', e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Select a state…</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Approximate acreage</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                {ACREAGE.map(a => {
                  const on = answers.acreage === a.id;
                  return (
                    <button key={a.id} onClick={() => setAnswer('acreage', a.id)} style={{
                      ...cardBtn,
                      padding: '0.75rem 0.6rem',
                      background: on ? 'rgba(223,183,108,0.1)' : cardBtn.background,
                      border: `1px solid ${on ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`,
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--font-accent)' }}>{a.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <p style={qPrompt}>What matters most to your family? <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>Select all that apply</span></p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              {PRIORITIES.map(p => {
                const on = answers.priorities.includes(p.id);
                return (
                  <button key={p.id} onClick={() => togglePriority(p.id)} style={{
                    ...cardBtn,
                    background: on ? p.bg : cardBtn.background,
                    border: `1px solid ${on ? p.color : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex', alignItems: 'center', gap: '0.65rem',
                  }}>
                    <p.Icon size={16} color={on ? p.color : 'rgba(255,255,255,0.25)'} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: on ? '#fff' : 'rgba(255,255,255,0.5)', textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--font-accent)' }}>
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        );

      case 4:
        return (
          <>
            <p style={qPrompt}>When do you hope to break ground?</p>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {TIMELINES.map(t => {
                const on = answers.timeline === t.id;
                return (
                  <button key={t.id} onClick={() => setAnswer('timeline', t.id)} style={{
                    ...cardBtn,
                    background: on ? 'rgba(223,183,108,0.1)' : cardBtn.background,
                    border: `1px solid ${on ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-accent)' }}>{t.label}</span>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'none', letterSpacing: 0 }}>{t.desc}</span>
                  </button>
                );
              })}
            </div>
          </>
        );

      case 5:
        return (
          <>
            <p style={qPrompt}>How should we address you?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { key: 'name',  label: 'Full Name',       type: 'text',  placeholder: 'Your name',  required: true  },
                { key: 'email', label: 'Email Address',   type: 'email', placeholder: 'your@email.com', required: true  },
              ].map(f => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}{f.required && <span style={{ color: 'var(--gold)', marginLeft: '0.25rem' }}>*</span>}</label>
                  <input
                    type={f.type}
                    value={answers[f.key]}
                    onChange={e => setAnswer(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                  />
                </div>
              ))}
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', textTransform: 'none', letterSpacing: 0, lineHeight: 1.5, marginTop: '0.25rem' }}>
                Your information is private and will only be used by the Everlasting Homes team to prepare your estate concept.
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // ── Shared styles ─────────────────────────────────────────────────
  const qPrompt = {
    fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)',
    marginBottom: '1.1rem', textTransform: 'none', letterSpacing: 0, lineHeight: 1.5,
  };
  const cardBtn = {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '10px', padding: '0.9rem 1rem',
    textAlign: 'left', cursor: 'pointer', transition: 'all 0.18s ease',
    fontFamily: 'inherit',
  };
  const labelStyle = {
    display: 'block', fontSize: '0.65rem', letterSpacing: '2px',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
    marginBottom: '0.5rem', fontWeight: 600,
  };
  const selectStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px',
    padding: '0.85rem 1rem', color: '#fff',
    fontSize: '0.85rem', fontFamily: 'var(--font-accent)',
    appearance: 'none', cursor: 'pointer', outline: 'none',
    marginBottom: '1.25rem',
  };
  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px',
    padding: '0.85rem 1rem', color: '#fff',
    fontSize: '0.85rem', fontFamily: 'var(--font-accent)',
    outline: 'none', transition: 'border-color 0.18s ease',
  };

  // ── Quiz card ─────────────────────────────────────────────────────
  const QuizSection = step >= 1 && step <= 5 && (
    <section ref={quizRef} style={{ padding: '4rem 5% 6rem', scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Card header */}
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
            Step {step} of {TOTAL_STEPS} — {stepLabels[step - 1]}
          </span>
        </div>

        <div style={{
          background: 'rgba(8,8,8,0.9)', border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '16px', padding: '2.5rem',
          backdropFilter: 'blur(20px)',
        }}>
          {StepBar}
          {renderStep()}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
            {step > 1 ? (
              <button onClick={back} style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '8px', padding: '0.65rem 1.1rem',
                color: 'rgba(255,255,255,0.35)', cursor: 'pointer',
                fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                <ChevronLeft size={13} /> Back
              </button>
            ) : <div />}

            <button
              onClick={next}
              disabled={!canProceed()}
              style={{
                background: 'transparent',
                border: `1px solid ${canProceed() ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '8px', padding: '0.75rem 1.75rem',
                color: canProceed() ? 'var(--gold)' : 'rgba(255,255,255,0.18)',
                cursor: canProceed() ? 'pointer' : 'not-allowed',
                fontSize: '0.72rem', letterSpacing: '1.5px', textTransform: 'uppercase',
                fontWeight: 700, fontFamily: 'var(--font-primary)',
                transition: 'all 0.18s ease', display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
            >
              {step === TOTAL_STEPS ? 'Generate My Estate Concept' : 'Continue'}
              {step < TOTAL_STEPS && <ArrowRight size={13} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  // ── Generating overlay ────────────────────────────────────────────
  const Generating = generating && (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 400,
      background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(12px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        border: '1px solid rgba(223,183,108,0.3)',
        borderTop: '1px solid var(--gold)',
        animation: 'spin 1s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem', fontWeight: 600 }}>
          Composing Your Concept
        </div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'none', letterSpacing: 0 }}>
          Shaping {answers.name ? answers.name.split(' ')[0] + "'s" : 'your'} estate vision…
        </div>
      </div>
    </div>
  );

  // ── Results ───────────────────────────────────────────────────────
  const Results = step === 6 && concept && (
    <section style={{ padding: '5rem 5% 8rem' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Concept header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-subtitle">Your Estate Concept</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.5rem' }}>
            {concept.style} Estate
          </h2>
          {concept.state && (
            <p style={{ fontSize: '1rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
              {concept.state}
            </p>
          )}
        </div>

        {/* Concept card */}
        <div style={{
          background: 'rgba(8,8,8,0.9)', border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem',
        }}>
          {/* Gold top bar */}
          <div style={{ height: '3px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }} />

          <div style={{ padding: '2.5rem' }}>
            {/* Personalized message */}
            <div style={{ marginBottom: '2.25rem' }}>
              <div style={{ fontSize: '0.6rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 600 }}>
                Estate Overview
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', textTransform: 'none', letterSpacing: 0 }}>
                {concept.message}
              </p>
            </div>

            {/* Priorities */}
            {concept.topPriorities.length > 0 && (
              <div style={{ marginBottom: '2.25rem' }}>
                <div style={{ fontSize: '0.6rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Your Core Priorities
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {concept.topPriorities.map((label, i) => (
                    <span key={i} style={{
                      padding: '0.35rem 0.85rem',
                      border: '1px solid rgba(223,183,108,0.3)',
                      borderRadius: '100px', fontSize: '0.7rem',
                      color: 'var(--gold)', fontWeight: 600,
                      letterSpacing: '0.5px', textTransform: 'uppercase',
                      background: 'rgba(223,183,108,0.06)',
                    }}>{label}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline + greeting */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {concept.timeline && (
                <div style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.35rem' }}>Timeline</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-accent)' }}>{concept.timeline}</div>
                </div>
              )}
              <div style={{ padding: '1rem 1.25rem', background: 'rgba(223,183,108,0.05)', border: '1px solid rgba(223,183,108,0.15)', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.35rem' }}>Prepared For</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-accent)' }}>{answers.name || 'Your Family'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Next step copy */}
        <p style={{
          textAlign: 'center', fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.65, marginBottom: '2.5rem', textTransform: 'none', letterSpacing: 0, maxWidth: '540px', margin: '0 auto 2.5rem',
        }}>
          Your concept is ready. The next step is a private conversation with the Everlasting Homes team — where we turn this vision into an engineered plan built to last a century.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/private-estate-inquiry" className="cta-btn" style={{ fontSize: '0.75rem' }}>
            Request a Private Resilience Briefing
          </Link>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.8rem 1.5rem', fontSize: '0.72rem',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px',
            color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
            textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
          >
            <ArrowLeft size={13} /> Learn About Everlasting Homes
          </Link>
        </div>

      </div>
    </section>
  );

  // ── Footer ────────────────────────────────────────────────────────
  const Footer = (
    <footer style={{ padding: '2.5rem 5%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', opacity: 0.4, fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
      © 2026 Everlasting Homes Building Group
    </footer>
  );

  return (
    <div style={{ background: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-primary)' }}>
      {Nav}
      {Hero}
      {About}
      {QuizSection}
      {Generating}
      {Results}
      {step !== 6 && (
        <div style={{ height: step >= 1 ? '0' : '4rem' }} />
      )}
      {Footer}
    </div>
  );
}
