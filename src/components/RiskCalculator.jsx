import { useState } from 'react';
import { X, Flame, Activity, Droplets, Wind, Shield, MapPin } from 'lucide-react';

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

// County ratings extracted from FEMA's National Risk Index county table
// (Very Low=10 ... Very High=90 per hazard; wind = max of hurricane/
// tornado/strong wind, flood = max of inland/coastal flooding).
// Keyed by 5-digit county FIPS: [fire, wind, flood, quake, countyName]
let nriCountiesPromise = null;
const loadNriCounties = () => {
  nriCountiesPromise ??= fetch('/data/nri-counties.json').then(r => {
    if (!r.ok) throw new Error('nri data unavailable');
    return r.json();
  }).catch(err => { nriCountiesPromise = null; throw err; });
  return nriCountiesPromise;
};

// Display order and labels follow the four hazard families tracked by
// FEMA's National Risk Index (wildfire; hurricane/tornado/strong wind;
// riverine & coastal flooding; earthquake).
const CATEGORIES = [
  { id: 'fire',  label: 'Fire & Wildfire',           Icon: Flame,    color: '#ff6b35' },
  { id: 'wind',  label: 'Wind — Hurricane & Tornado', Icon: Wind,     color: '#a5d6a7' },
  { id: 'flood', label: 'Flood',                     Icon: Droplets, color: '#4fc3f7' },
  { id: 'quake', label: 'Earthquake',                Icon: Activity, color: '#dfb76c' },
];

const SCIP_STATS = {
  fire:  { rating: 'Fire Resistance up to 2,200°F',   detail: 'The shotcrete shell resists fire up to 2,200°F continuously — no combustible framing anywhere in the structure' },
  quake: { rating: 'Engineered for Seismic Zones',        detail: 'Continuous steel mesh cage distributes seismic energy across the full shell' },
  flood: { rating: 'Flood & Moisture Resilient',          detail: 'Concrete shell resists water absorption, rot, mold, and flood saturation' },
  wind:  { rating: 'Up to 200+ MPH Wind Resistance',      detail: 'Engineered to resist extreme uplift and wind-borne projectiles, designed to Miami-Dade standards' },
};

function getRiskLevel(score) {
  if (score >= 90) return { label: 'CRITICAL', color: '#ff4444', bg: 'rgba(255,68,68,0.1)'   };
  if (score >= 80) return { label: 'HIGH',     color: '#ff8c00', bg: 'rgba(255,140,0,0.1)'   };
  if (score >= 60) return { label: 'ELEVATED', color: '#ffb74d', bg: 'rgba(255,183,77,0.1)'  };
  if (score >= 40) return { label: 'MODERATE', color: '#dfb76c', bg: 'rgba(223,183,108,0.1)' };
  return                    { label: 'LOW',     color: '#66bb6a', bg: 'rgba(102,187,106,0.1)' };
}

export default function RiskCalculator({ onClose, onConsult }) {
  const [zip, setZip]               = useState('');
  const [zipLoading, setZipLoading] = useState(false);
  const [zipError, setZipError]     = useState(null);
  const [location, setLocation]     = useState(null); // { city, state, stateAbbr, risks }

  const reset = () => {
    setZip(''); setZipError(null); setLocation(null);
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

      // Resolve the ZIP's county via FCC census lookup, then read that
      // county's FEMA NRI ratings. Falls back to state-level averages.
      let county = null;
      let risks = STATE_RISKS[stateAbbr] ?? DEFAULT_RISKS;
      try {
        const [fccRes, counties] = await Promise.all([
          fetch(`https://geo.fcc.gov/api/census/area?lat=${place.latitude}&lon=${place.longitude}&censusYear=2020&format=json`),
          loadNriCounties(),
        ]);
        if (fccRes.ok) {
          const fcc = await fccRes.json();
          const fips = fcc.results?.[0]?.county_fips;
          const row = fips && counties[fips];
          if (row) {
            risks = { fire: row[0], wind: row[1], flood: row[2], quake: row[3] };
            county = row[4];
          }
        }
      } catch {
        // keep state-level fallback
      }

      setLocation({
        city:      place['place name'],
        state:     place['state'],
        stateAbbr,
        county,
        risks,
      });
    } catch {
      setZipError('ZIP code not found. Please check and try again.');
    } finally {
      setZipLoading(false);
    }
  };

  // Overall risk = simple average of the four category scores (0–100).
  const score = location
    ? Math.round(CATEGORIES.reduce((sum, c) => sum + location.risks[c.id], 0) / CATEGORIES.length)
    : null;

  const risk = score !== null ? getRiskLevel(score) : null;

  // Highlight SCIP protection for the two highest-scoring hazards
  const topRisks = location
    ? [...CATEGORIES].sort((a, b) => location.risks[b.id] - location.risks[a.id]).slice(0, 2)
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
              {location ? 'Your Disaster Risk Report' : 'Calculate Your Disaster Risk'}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: '0.25rem', marginLeft: '1rem', flexShrink: 0, lineHeight: 1 }}>
            <X size={20} />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '1.25rem 1.75rem 1.75rem' }}>

          {/* ZIP lookup */}
          {!location && (
            <>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem', textTransform: 'none', letterSpacing: 0 }}>
                Enter your ZIP code for an instant localized risk report.
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

          {/* Results */}
          {location && score !== null && risk !== null && (
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
                    {location.county ? `${location.county} — ${location.city}, ${location.stateAbbr}` : `${location.city}, ${location.state}`}
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
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.58rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.7rem', fontWeight: 600 }}>
                  Risk Breakdown
                </div>
                {CATEGORIES.map(c => {
                  const value = location.risks[c.id] ?? 0;
                  const lvl   = getRiskLevel(value);
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
                        <div style={{ height: '100%', width: `${value}%`, background: lvl.color, borderRadius: '2px' }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Methodology note */}
              <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.32)', textTransform: 'none', letterSpacing: 0, lineHeight: 1.5, marginBottom: '1.2rem' }}>
                {location.county
                  ? `Category levels are FEMA National Risk Index ratings for ${location.county} (Very Low through Very High, shown on a 0–100 scale). Wind combines hurricane, tornado, and strong-wind ratings; Flood combines inland and coastal flooding.`
                  : 'Category scores are state-level estimates calibrated to FEMA National Risk Index, USGS seismic, and NOAA storm data.'}{' '}
                Your overall level is the average of the four categories: Low &lt;40, Moderate 40–59, Elevated 60–79, High 80–89, Critical 90+.
              </p>

              {/* SCIP protection */}
              <div style={{ marginBottom: '1.5rem', background: 'rgba(223,183,108,0.04)', border: '1px solid rgba(223,183,108,0.1)', borderRadius: '10px', padding: '1rem 1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
                  <Shield size={13} color="var(--gold)" />
                  <span style={{ fontSize: '0.58rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
                    How SCIP Protects You
                  </span>
                </div>
                {topRisks.map((c, i) => (
                  <div key={c.id} style={{ marginBottom: i < topRisks.length - 1 ? '0.65rem' : 0, paddingBottom: i < topRisks.length - 1 ? '0.65rem' : 0, borderBottom: i < topRisks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
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
                Check Another ZIP Code
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
