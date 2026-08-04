import { Helmet } from 'react-helmet-async';
import LandingNav from '../components/LandingNav';

const TEAM = [
  { src: '/Headshots/Franck_headshot.webp',  name: 'Franck Boursier', role: 'Partner & CEO' },
  { src: '/Headshots/GeorgeM_headshot.webp', name: 'George Mock',     role: 'Partner & General Manager' },
  { src: '/Headshots/JullieM_headshot.webp', name: 'Julie Mock',      role: 'Partner & Business Manager' },
];

export default function Team() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Helmet>
        <title>The Team | Everlasting Homes Building Group</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <LandingNav />
      <div style={{ padding: '8rem 5% 5rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-subtitle">Everlasting Homes</span>
          <h2 style={{ fontSize: '2.94rem', marginBottom: '0.58rem' }}>The <span style={{ color: 'var(--gold)' }}>Team</span></h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.8)', maxWidth: '720px', margin: '0 auto' }}>
            Everlasting Homes Building Group was founded by experienced builders and engineering-minded leaders with backgrounds in complex construction, luxury homes, and large-scale energy-sector projects. Led by Franck Boursier and George Mock, former ExxonMobil executives, they&rsquo;ve reimagined construction using the revolutionary SCIP technology&mdash;setting a new standard for strength, safety, and sustainability. Together, Franck and George build more than homes; they craft legacies.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {TEAM.map(member => (
            <div key={member.name} style={{ textAlign: 'center' }}>
              <img src={member.src} alt={member.name} style={{ width: '100%', height: 'auto', borderRadius: '6px', border: '1px solid var(--border)', marginBottom: '0.5rem' }} />
              <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: 0, fontWeight: 700 }}>{member.name}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--gold)', margin: 0 }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      <footer style={{ padding: '2.94rem 0', width: '100%', textAlign: 'center', opacity: 0.5, fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
        &copy; 2026 Everlasting Homes Building Group | Precision Engineered Luxury | Built for the World
      </footer>
    </div>
  );
}
