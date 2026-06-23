import { useState, useEffect } from 'react';
import AnimatedCounter from './AnimatedCounter';

const ZONES = {
  riverOaks:   { label: 'River Oaks',                  insuranceMult: 1.38, floodRisk: 'High',      windRisk: 'High' },
  meyerland:   { label: 'Meyerland',                   insuranceMult: 1.68, floodRisk: 'Extreme',   windRisk: 'High' },
  memorial:    { label: 'Memorial / Energy Corridor',  insuranceMult: 1.45, floodRisk: 'Very High', windRisk: 'High' },
  bellaire:    { label: 'Bellaire',                    insuranceMult: 1.52, floodRisk: 'Very High', windRisk: 'High' },
  westuniv:    { label: 'West University Place',       insuranceMult: 1.35, floodRisk: 'High',      windRisk: 'High' },
  woodlands:   { label: 'The Woodlands',               insuranceMult: 1.28, floodRisk: 'Moderate',  windRisk: 'Moderate' },
  kingwood:    { label: 'Kingwood',                    insuranceMult: 1.62, floodRisk: 'Extreme',   windRisk: 'High' },
  sugarland:   { label: 'Sugar Land / Fort Bend',      insuranceMult: 1.31, floodRisk: 'High',      windRisk: 'Moderate' },
  pearland:    { label: 'Pearland / Friendswood',      insuranceMult: 1.39, floodRisk: 'Very High', windRisk: 'High' },
  clearLake:   { label: 'Clear Lake / NASA Area',      insuranceMult: 1.44, floodRisk: 'Very High', windRisk: 'High' },
  galveston:   { label: 'Galveston Island',            insuranceMult: 1.85, floodRisk: 'Extreme',   windRisk: 'Very High' },
  katy:        { label: 'Katy / Cinco Ranch',          insuranceMult: 1.29, floodRisk: 'High',      windRisk: 'Moderate' },
};

const RISK_COLOR = { 'Extreme': '#ff4020', 'Very High': '#ff6b35', 'High': '#ffaa60', 'Moderate': '#dfb76c' };

function fmt(n) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000)    return `$${Math.round(n / 1000)}K`;
  return `$${Math.round(n)}`;
}

export default function ROICalculator({ onConsult }) {
  const [homeValue, setHomeValue]   = useState(1200000);
  const [sqft, setSqft]             = useState(4500);
  const [zone, setZone]             = useState('riverOaks');
  const [computed, setComputed]     = useState(null);
  const [key, setKey]               = useState(0); // force counter re-mount on recalc

  useEffect(() => {
    const z = ZONES[zone];

    // Insurance: conventional ~1.2% of home value/yr in TX high-risk zones
    // SCIP discount: 25–40% depending on flood/wind risk zone
    const conventionalInsurance = homeValue * 0.012 * z.insuranceMult;
    const scipInsurance = conventionalInsurance * 0.62; // avg 38% savings
    const insuranceSavingsAnnual = conventionalInsurance - scipInsurance;
    const insuranceSavings10yr = insuranceSavingsAnnual * 10;

    // Energy: SCIP R-45 insulation vs TX average R-19 wood frame
    // Average TX energy bill ~$200/mo for comparably sized home
    const monthlyEnergyConventional = (sqft / 1000) * 44; // ~$44/1000sqft/mo
    const energySavingsPct = 0.47; // 47% typical reduction from R-45
    const energySavingsAnnual = monthlyEnergyConventional * 12 * energySavingsPct;
    const energySavings10yr = energySavingsAnnual * 10;

    // Resale premium: disaster-resistant homes in TX command 8–14% premium
    const resalePremiumPct = z.floodRisk === 'Extreme' ? 0.13 : z.floodRisk === 'Very High' ? 0.11 : 0.08;
    const resalePremium = homeValue * resalePremiumPct;

    // Rebuild avoidance: avg TX disaster claim $340K (Harvey avg was $450K)
    const avgDisasterClaim = z.floodRisk === 'Extreme' ? 420000 : z.floodRisk === 'Very High' ? 340000 : 180000;
    const rebuildRiskReduction = avgDisasterClaim * 0.95; // 95% damage elimination

    const total10yr = insuranceSavings10yr + energySavings10yr + resalePremium;

    setComputed({ insuranceSavingsAnnual, insuranceSavings10yr, energySavingsAnnual, energySavings10yr, resalePremium, resalePremiumPct, rebuildRiskReduction, total10yr, z, conventionalInsurance, scipInsurance });
    setKey(k => k + 1);
  }, [homeValue, sqft, zone]);

  const sliderThumb = `
    input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; width: 100%; }
    input[type=range]::-webkit-slider-runnable-track { height: 3px; background: rgba(255,255,255,0.12); border-radius: 2px; }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--gold); margin-top: -7.5px; cursor: pointer; box-shadow: 0 0 0 3px rgba(223,183,108,0.2); transition: box-shadow 0.2s; }
    input[type=range]::-webkit-slider-thumb:hover { box-shadow: 0 0 0 6px rgba(223,183,108,0.18); }
    input[type=range]:focus { outline: none; }
  `;

  return (
    <div style={{ border: '1px solid rgba(223,183,108,0.22)', borderRadius: '16px', overflow: 'hidden', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)' }}>
      <style>{sliderThumb}</style>

      {/* Header */}
      <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', background: 'rgba(223,183,108,0.04)' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0, fontWeight: 700 }}>SCIP Home ROI Calculator</h3>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.42)', margin: '0.3rem 0 0' }}>Estimated 10-year financial advantage vs. wood-frame construction</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0 }}>

        {/* ── INPUTS ── */}
        <div style={{ padding: '1.75rem 2rem', borderRight: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem' }}>Your Project</p>

          {/* Home Value */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>Home Value</label>
              <span style={{ fontSize: '0.88rem', color: 'var(--gold)', fontWeight: 700, fontFamily: 'var(--font-accent)' }}>{fmt(homeValue)}</span>
            </div>
            <input type="range" min={500000} max={5000000} step={50000} value={homeValue} onChange={e => setHomeValue(+e.target.value)}
              style={{ '--pct': `${((homeValue - 500000) / 4500000) * 100}%` }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
              <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>$500K</span>
              <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>$5M</span>
            </div>
          </div>

          {/* Square Footage */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>Square Footage</label>
              <span style={{ fontSize: '0.88rem', color: 'var(--gold)', fontWeight: 700, fontFamily: 'var(--font-accent)' }}>{sqft.toLocaleString()} sq ft</span>
            </div>
            <input type="range" min={2000} max={12000} step={250} value={sqft} onChange={e => setSqft(+e.target.value)} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
              <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>2,000</span>
              <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>12,000</span>
            </div>
          </div>

          {/* Location */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.5rem' }}>Location</label>
            <div style={{ display: 'grid', gap: '0.4rem' }}>
              {Object.entries(ZONES).map(([k, z]) => (
                <button key={k} onClick={() => setZone(k)}
                  style={{ textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: '6px', border: `1px solid ${zone === k ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`, background: zone === k ? 'rgba(223,183,108,0.1)' : 'transparent', color: zone === k ? 'var(--gold)' : 'rgba(255,255,255,0.55)', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}
                >
                  <span>{z.label}</span>
                  <span style={{ fontSize: '0.6rem', color: RISK_COLOR[z.floodRisk], fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{z.floodRisk} Flood</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RESULTS ── */}
        {computed && (
          <div style={{ padding: '1.75rem 2rem' }}>
            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.35)', marginBottom: '1.5rem' }}>10-Year Financial Advantage</p>

            {/* Total headline */}
            <div style={{ background: 'linear-gradient(135deg, rgba(223,183,108,0.1), rgba(223,183,108,0.04))', border: '1px solid rgba(223,183,108,0.25)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem' }}>Total 10-Year Advantage</div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-accent)', lineHeight: 1 }} key={`total-${key}`}>
                <AnimatedCounter target={Math.round(computed.total10yr / 1000)} prefix="$" suffix="K+" duration={1200} />
              </div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.4rem' }}>Insurance + Energy + Resale</div>
            </div>

            {/* Line items */}
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                {
                  label: 'Insurance Savings',
                  annual: computed.insuranceSavingsAnnual,
                  decade: computed.insuranceSavings10yr,
                  note: `${ZONES[zone].label} premium zone discount`,
                  color: '#4fc3f7',
                },
                {
                  label: 'Energy Bill Reduction',
                  annual: computed.energySavingsAnnual,
                  decade: computed.energySavings10yr,
                  note: 'R-45 vs. typical TX R-19',
                  color: 'var(--gold)',
                },
                {
                  label: 'Resale Premium',
                  annual: null,
                  decade: computed.resalePremium,
                  note: `+${Math.round(computed.resalePremiumPct * 100)}% disaster-resilient premium`,
                  color: '#a8e6a0',
                },
              ].map(({ label, annual, decade, note, color }) => (
                <div key={label} style={{ borderLeft: `2px solid ${color}`, paddingLeft: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{label}</span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color, fontFamily: 'var(--font-accent)' }} key={`${label}-${key}`}>
                      +{fmt(decade)}
                    </span>
                  </div>
                  {annual && (
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.15rem' }}>
                      {fmt(annual)}/yr savings
                    </div>
                  )}
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.28)', marginTop: '0.1rem' }}>{note}</div>
                </div>
              ))}
            </div>

            {/* Rebuild risk avoidance callout */}
            <div style={{ background: 'rgba(255,64,32,0.06)', border: '1px solid rgba(255,100,50,0.2)', borderRadius: '8px', padding: '0.9rem 1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,100,50,0.7)', marginBottom: '0.3rem' }}>Disaster Rebuild Risk Eliminated</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>Avg {ZONES[zone].label} disaster claim</span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#ff8060', fontFamily: 'var(--font-accent)' }}>{fmt(computed.rebuildRiskReduction)}</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.2rem' }}>95% structural damage elimination on record</div>
            </div>

            <button onClick={onConsult}
              className="cta-btn"
              style={{ width: '100%', fontSize: '0.82rem', padding: '0.85rem' }}
            >
              Get My Custom ROI Report →
            </button>
            <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.22)', textAlign: 'center', margin: '0.6rem 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Estimates based on TX insurance data, RESNET energy studies & local MLS comps
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
