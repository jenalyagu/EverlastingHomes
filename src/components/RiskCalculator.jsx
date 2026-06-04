import { useState } from 'react';
import { X, Flame, Activity, Droplets, Wind, Shield, ChevronLeft, MapPin } from 'lucide-react';

// State-level risk scores (0–100) calibrated to FEMA / USGS / NOAA hazard data
const STATE_RISKS = {
  AL: { fire: 38, quake: 22, flood: 72, wind: 68 },
  AK: { fire: 65, quake: 92, flood: 55, wind: 60 },
  AZ: { fire: 85, quake: 55, flood: 30, wind: 48 },
  AR: { fire: 38, quake: 48, flood: 68, wind: 72 },
  CA: { fire: 96, quake: 90, flood: 45, wind: 35 },
  CO: { fire: 82, quake: 58, flood: 35, wind: 55 },
  CT: { fire: 22, quake: 28, flood: 55, wind: 52 },
  DE: { fire: 20, quake: 22, flood: 62, wind: 50 },
  DC: { fire: 15, quake: 22, flood: 55, wind: 45 },
  FL: { fire: 45, quake: 10, flood: 92, wind: 92 },
  GA: { fire: 40, quake: 28, flood: 62, wind: 60 },
  HI: { fire: 55, quake: 78, flood: 65, wind: 70 },
  ID: { fire: 78, quake: 65, flood: 38, wind: 42 },
  IL: { fire: 30, quake: 48, flood: 60, wind: 62 },
  IN: { fire: 28, quake: 38, flood: 58, wind: 60 },
  IA: { fire: 30, quake: 28, flood: 65, wind: 72 },
  KS: { fire: 55, quake: 38, flood: 58, wind: 92 },
  KY: { fire: 28, quake: 42, flood: 62, wind: 55 },
  LA: { fire: 30, quake: 15, flood: 92, wind: 85 },
  ME: { fire: 25, quake: 18, flood: 48, wind: 48 },
  MD: { fire: 22, quake: 25, flood: 60, wind: 52 },
  MA: { fire: 22, quake: 30, flood: 58, wind: 55 },
  MI: { fire: 35, quake: 22, flood: 52, wind: 55 },
  MN: { fire: 40, quake: 20, flood: 58, wind: 65 },
  MS: { fire: 35, quake: 20, flood: 78, wind: 72 },
  MO: { fire: 38, quake: 52, flood: 65, wind: 75 },
  MT: { fire: 80, quake: 60, flood: 38, wind: 48 },
  NE: { fire: 50, quake: 32, flood: 60, wind: 88 },
  NV: { fire: 72, quake: 62, flood: 25, wind: 42 },
  NH: { fire: 22, quake: 20, flood: 50, wind: 45 },
  NJ: { fire: 28, quake: 25, flood: 68, wind: 58 },
  NM: { fire: 80, quake: 52, flood: 30, wind: 50 },
  NY: { fire: 25, quake: 28, flood: 62, wind: 52 },
  NC: { fire: 42, quake: 30, flood: 70, wind: 65 },
  ND: { fire: 42, quake: 18, flood: 55, wind: 78 },
  OH: { fire: 25, quake: 30, flood: 55, wind: 55 },
  OK: { fire: 58, quake: 52, flood: 60, wind: 94 },
  OR: { fire: 80, quake: 72, flood: 50, wind: 40 },
  PA: { fire: 25, quake: 28, flood: 60, wind: 48 },
  RI: { fire: 20, quake: 25, flood: 60, wind: 55 },
  SC: { fire: 38, quake: 32, flood: 68, wind: 65 },
  SD: { fire: 48, quake: 25, flood: 52, wind: 80 },
  TN: { fire: 32, quake: 42, flood: 62, wind: 58 },
  TX: { fire: 62, quake: 22, flood: 82, wind: 82 },
  UT: { fire: 75, quake: 68, flood: 32, wind: 45 },
  VT: { fire: 20, quake: 22, flood: 52, wind: 45 },
  VA: { fire: 28, quake: 28, flood: 58, wind: 52 },
  WA: { fire: 72, quake: 75, flood: 52, wind: 42 },
  WV: { fire: 30, quake: 32, flood: 55, wind: 45 },
  WI: { fire: 38, quake: 18, flood: 52, wind: 58 },
  WY: { fire: 70, quake: 52, flood: 30, wind: 55 },
};

const DEFAULT_RISKS = { fire: 50, quake: 40, flood: 55, wind: 55 };

const CONCERNS = [
  { id: 'fire',  label: 'Wildfire',             Icon: Flame,    color: '#ff6b35', bg: 'rgba(255,107,53,0.1)'   },
  { id: 'quake', label: 'Earthquake',           Icon: Activity, color: '#dfb76c', bg: 'rgba(223,183,108,0.1)'  },
  { id: 'flood', label: 'Hurricane & Flood',    Icon: Droplets, color: '#4fc3f7', bg: 'rgba(79,195,247,0.1)'   },
  { id: 'wind',  label: 'Tornado & High Winds', Icon: Wind,     color: '#a5d6a7', bg: 'rgba(165,214,167,0.1)'  },
];

const SITUATIONS = [
  { id: 'disaster', label: 'Rebuilding after a disaster',  boost: 20 },
  { id: 'new',      label: 'Building a new custom home',   boost: 0  },
  { id: 'upgrade',  label: 'Upgrading an existing home',   boost: 10 },
  { id: 'research', label: 'Just researching options',     boost: 0  },
];

const SCIP_STATS = {
  fire:  { rating: '2,200°F Fire Rated',      detail: '4-hour fire rating — 5× more durable than standard concrete' },
  quake: { rating: '9.0 Magnitude Rated',     detail: 'Continuous steel mesh cage distributes seismic energy across the full shell' },
  flood: { rating: 'Flood & Moisture Proof',  detail: 'Concrete shell resists water absorption, rot, mold, and flood saturation' },
  wind:  { rating: '250+ MPH Wind Rated',     detail: 'Miami-Dade approved — engineered to resist extreme uplift and wind-borne projectiles' },
};

function getRiskLevel(score) {
  if (score >= 75) return { label: 'CRITICAL', color: '#ff4444', bg: 'rgba(255,68,68,0.1)'   };
  if (score >= 55) return { label: 'HIGH',     color: '#ff8c00', bg: 'rgba(255,140,0,0.1)'   };
  if (score >= 35) return { label: 'MODERATE', color: '#dfb76c', bg: 'rgba(223,183,108,0.1)' };
  return                    { label: 'LOW',     color: '#66bb6a', bg: 'rgba(102,187,106,0.1)' };
}

const STEP_LABELS = ['Location', 'Concerns', 'Situation'];

export default function RiskCalculator({ onClose, onConsult }) {
  const [step, setStep]           = useState(1);
  const [zip, setZip]             = useState('');
  const [zipLoading, setZipLoading] = useState(false);
  const [zipError, setZipError]   = useState(null);
  const [location, setLocation]   = useState(null); // { city, state, stateAbbr, risks }
  const [concerns, setConcerns]   = useState([]);
  const [situation, setSituation] = useState(null);

  const toggleConcern = (id) =>
    setConcerns(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  const reset = () => {
    setStep(1); setZip(''); setZipError(null);
    setLocation(null); setConcerns([]); setSituation(null);
  };

  const lookupZip = async () => {
    const clean = zip.trim().slice(0, 5);
    if (!/^\d{5}$/.test(clean)) {
      setZipError('Please enter a valid 5-digit ZIP code.');
      return;
    }
    setZipLoading(true);
    setZipError(null);
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${clean}`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      const place = data.places[0];
      const stateAbbr = place['state abbreviation'];
      setLocation({
        city:      place['place name'],
        state:     place['state'],
        stateAbbr,
        risks:     STATE_RISKS[stateAbbr] ?? DEFAULT_RISKS,
      });
      setStep(2);
    } catch {
      setZipError('ZIP code not found. Please check and try again.');
    } finally {
      setZipLoading(false);
    }
  };

  const score = (() => {
    if (!location || !situation) return null;
    const r = location.risks;
    const boost = SITUATIONS.find(s => s.id === situation)?.boost ?? 0;
    const weights = CONCERNS.map(c => concerns.includes(c.id) ? 2 : 0.5);
    const weighted = CONCERNS.reduce((sum, c, i) => sum + r[c.id] * weights[i], 0);
    return Math.min(100, Math.round(weighted / weights.reduce((a, b) => a + b, 0) + boost));
  })();

  const risk = score !== null ? getRiskLevel(score) : null;

  const topConcerns = location
    ? [...CONCERNS]
        .sort((a, b) => {
          const aChosen = concerns.includes(a.id) ? 1 : 0;
          const bChosen = concerns.includes(b.id) ? 1 : 0;
          if (bChosen !== aChosen) return bChosen - aChosen;
          return location.risks[b.id] - location.risks[a.id];
        })
        .slice(0, 2)
    : [];

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div style={{
        width: '100%', maxWidth: '560px',
        background: 'rgba(6,6,6,0.98)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        maxHeight: '92vh',
        overflowY: 'auto',
        position: 'relative',
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: '1.5rem 1.75rem 1rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <span style={{ fontSize: '0.58rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
              Risk Assessment
            </span>
            <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '0.2rem', textTransform: 'none', letterSpacing: 0, fontWeight: 700 }}>
              {step < 4 ? 'Calculate Your Home Risk Rate' : 'Your Risk Assessment'}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: '0.25rem', marginLeft: '1rem', flexShrink: 0, lineHeight: 1 }}>
            <X size={20} />
          </button>
        </div>

        {/* ── Step indicator ── */}
        {step < 4 && (
          <div style={{ padding: '1rem 1.75rem 0', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            {STEP_LABELS.map((label, i) => {
              const n = i + 1;
              const done   = n < step;
              const active = n === step;
              return (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: active || done ? 1 : 0.3 }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                      background: done ? 'var(--gold)' : active ? 'rgba(223,183,108,0.12)' : 'transparent',
                      border: `1px solid ${done || active ? 'var(--gold)' : 'rgba(255,255,255,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.58rem', fontWeight: 700,
                      color: done ? '#050505' : 'var(--gold)',
                    }}>{done ? '✓' : n}</div>
                    <span style={{ fontSize: '0.6rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: active ? 'var(--gold)' : done ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.25)' }}>
                      {label}
                    </span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div style={{ width: '20px', height: '1px', background: done ? 'rgba(223,183,108,0.5)' : 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Body ── */}
        <div style={{ padding: '1.25rem 1.75rem 1.75rem' }}>

          {/* STEP 1 — ZIP lookup */}
          {step === 1 && (
            <>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem', textTransform: 'none', letterSpacing: 0 }}>
                Enter your ZIP code for a localized risk report.
              </p>
              <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <MapPin size={14} color="rgba(255,255,255,0.25)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="e.g. 90210"
                    value={zip}
                    onChange={(e) => { setZip(e.target.value.replace(/\D/g, '')); setZipError(null); }}
                    onKeyDown={(e) => e.key === 'Enter' && lookupZip()}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${zipError ? '#ff4444' : 'rgba(255,255,255,0.12)'}`,
                      borderRadius: '10px',
                      padding: '0.85rem 1rem 0.85rem 2.5rem',
                      color: '#fff',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-accent)',
                      fontWeight: 600,
                      letterSpacing: '3px',
                      outline: 'none',
                      transition: 'border-color 0.18s ease',
                    }}
                    onFocus={e => { if (!zipError) e.target.style.borderColor = 'var(--gold)'; }}
                    onBlur={e  => { if (!zipError) e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  />
                </div>
                <button
                  onClick={lookupZip}
                  disabled={zipLoading || zip.length < 5}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${zip.length === 5 ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '10px',
                    padding: '0.85rem 1.25rem',
                    color: zip.length === 5 ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                    cursor: zip.length === 5 ? 'pointer' : 'not-allowed',
                    fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700,
                    transition: 'all 0.18s ease', whiteSpace: 'nowrap',
                    minWidth: '100px',
                  }}
                >
                  {zipLoading ? 'Locating...' : 'Check Risk'}
                </button>
              </div>
              {zipError && (
                <p style={{ fontSize: '0.7rem', color: '#ff6b6b', textTransform: 'none', letterSpacing: 0, marginTop: '0.25rem' }}>
                  {zipError}
                </p>
              )}
            </>
          )}

          {/* STEP 2 — Concerns */}
          {step === 2 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', background: 'rgba(223,183,108,0.06)', border: '1px solid rgba(223,183,108,0.15)', borderRadius: '8px', padding: '0.55rem 0.85rem' }}>
                <MapPin size={12} color="var(--gold)" />
                <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}>
                  {location?.city}, {location?.stateAbbr}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem', textTransform: 'none', letterSpacing: 0 }}>
                What are your biggest concerns?{' '}
                <span style={{ color: 'rgba(255,255,255,0.28)' }}>Select all that apply</span>
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.2rem' }}>
                {CONCERNS.map(c => {
                  const on = concerns.includes(c.id);
                  return (
                    <button key={c.id} onClick={() => toggleConcern(c.id)} style={{
                      background: on ? c.bg : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${on ? c.color : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '10px', padding: '1rem',
                      textAlign: 'left', cursor: 'pointer', transition: 'all 0.18s ease',
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                    }}>
                      <c.Icon size={17} color={on ? c.color : 'rgba(255,255,255,0.28)'} />
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: on ? '#fff' : 'rgba(255,255,255,0.5)', textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--font-accent)' }}>
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(1)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '8px', padding: '0.6rem 1rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ChevronLeft size={13} /> Back
                </button>
                <button onClick={() => setStep(3)} disabled={concerns.length === 0} style={{
                  background: 'transparent',
                  border: `1px solid ${concerns.length > 0 ? 'var(--gold)' : 'rgba(255,255,255,0.09)'}`,
                  borderRadius: '8px', padding: '0.6rem 1.5rem',
                  color: concerns.length > 0 ? 'var(--gold)' : 'rgba(255,255,255,0.18)',
                  cursor: concerns.length > 0 ? 'pointer' : 'not-allowed',
                  fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700,
                  transition: 'all 0.18s ease',
                }}>
                  Continue
                </button>
              </div>
            </>
          )}

          {/* STEP 3 — Situation */}
          {step === 3 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', background: 'rgba(223,183,108,0.06)', border: '1px solid rgba(223,183,108,0.15)', borderRadius: '8px', padding: '0.55rem 0.85rem' }}>
                <MapPin size={12} color="var(--gold)" />
                <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}>
                  {location?.city}, {location?.stateAbbr}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem', textTransform: 'none', letterSpacing: 0 }}>
                What best describes your situation?
              </p>
              <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1.2rem' }}>
                {SITUATIONS.map(s => (
                  <button key={s.id} onClick={() => { setSituation(s.id); setStep(4); }} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px', padding: '0.9rem 1.1rem',
                    textAlign: 'left', cursor: 'pointer', transition: 'all 0.18s ease',
                    color: '#fff', fontSize: '0.82rem', fontWeight: 600,
                    textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--font-accent)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(223,183,108,0.4)'; e.currentTarget.style.background = 'rgba(223,183,108,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '8px', padding: '0.6rem 1rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ChevronLeft size={13} /> Back
              </button>
            </>
          )}

          {/* STEP 4 — Results */}
          {step === 4 && score !== null && risk !== null && (
            <>
              {/* Score card */}
              <div style={{
                background: risk.bg,
                border: `1px solid ${risk.color}44`,
                borderRadius: '12px', padding: '1.5rem',
                textAlign: 'center', marginBottom: '1.2rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  <MapPin size={12} color="rgba(255,255,255,0.4)" />
                  <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', textTransform: 'none', letterSpacing: 0 }}>
                    {location?.city}, {location?.state}
                  </span>
                </div>
                <div style={{ fontSize: '0.58rem', letterSpacing: '3px', textTransform: 'uppercase', color: risk.color, marginBottom: '0.5rem', fontWeight: 600 }}>
                  Overall Risk Level
                </div>
                <div style={{ fontSize: '4rem', fontWeight: 800, color: risk.color, lineHeight: 1, fontFamily: 'var(--font-accent)', marginBottom: '0.15rem' }}>
                  {score}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: risk.color, letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-accent)' }}>
                  {risk.label}
                </div>
              </div>

              {/* Risk breakdown bars */}
              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ fontSize: '0.58rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.7rem', fontWeight: 600 }}>
                  Risk Breakdown
                </div>
                {CONCERNS.map(c => {
                  const base    = location?.risks[c.id] ?? 0;
                  const boosted = concerns.includes(c.id) ? Math.min(100, base + 12) : base;
                  const lvl     = getRiskLevel(boosted);
                  return (
                    <div key={c.id} style={{ marginBottom: '0.6rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.22rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <c.Icon size={11} color={c.color} />
                          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', textTransform: 'none', letterSpacing: 0 }}>{c.label}</span>
                        </div>
                        <span style={{ fontSize: '0.62rem', fontWeight: 700, color: lvl.color, letterSpacing: '1px', textTransform: 'uppercase' }}>{lvl.label}</span>
                      </div>
                      <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${boosted}%`, background: lvl.color, borderRadius: '2px' }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SCIP protection */}
              <div style={{ marginBottom: '1.5rem', background: 'rgba(223,183,108,0.04)', border: '1px solid rgba(223,183,108,0.1)', borderRadius: '10px', padding: '1rem 1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
                  <Shield size={13} color="var(--gold)" />
                  <span style={{ fontSize: '0.58rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
                    How SCIP Protects You
                  </span>
                </div>
                {topConcerns.map((c, i) => (
                  <div key={c.id} style={{ marginBottom: i < topConcerns.length - 1 ? '0.65rem' : 0, paddingBottom: i < topConcerns.length - 1 ? '0.65rem' : 0, borderBottom: i < topConcerns.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div style={{ fontSize: '0.77rem', fontWeight: 700, color: '#fff', marginBottom: '0.12rem', textTransform: 'none', letterSpacing: 0 }}>
                      {SCIP_STATS[c.id].rating}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', textTransform: 'none', letterSpacing: 0, lineHeight: 1.45 }}>
                      {SCIP_STATS[c.id].detail}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={onConsult} className="cta-btn" style={{ width: '100%', justifyContent: 'center', fontSize: '0.72rem' }}>
                Schedule Your Consultation
              </button>
              <button onClick={reset} style={{ width: '100%', background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', fontSize: '0.62rem', marginTop: '0.75rem', padding: '0.4rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'var(--font-primary)' }}>
                Retake Assessment
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
