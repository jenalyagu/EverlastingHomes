import { ExternalLink } from 'lucide-react';

const MEDIA = [
  {
    outlet: 'FOX 26',
    outletSub: 'Houston',
    title: 'Concrete homes offer more resistance to natural disasters',
    description: 'Franck Boursier, CEO of Everlasting Homes Building Group, discusses how SCIP concrete construction enhances structural durability against fires, tornadoes, hurricanes, and earthquakes.',
    date: 'February 13, 2025',
    url: 'https://www.fox26houston.com/video/1593132',
  },
  {
    outlet: 'CW39',
    outletSub: 'Houston',
    title: 'The Technology Behind Weather-Resilient Homes',
    description: 'An inside look at the innovative building technology making homes more resilient to extreme weather events across the Gulf Coast.',
    date: '',
    url: 'https://cw39.com/weather/technology-behind-weather-resilient-homes/',
  },
  {
    outlet: 'TIME',
    outletSub: 'Magazine',
    title: 'Wood and Steel Houses Keep Burning. Here\'s What to Build Instead.',
    description: 'As wildfires intensify across the U.S., the case for concrete and fire-resistant construction grows — and builders like Everlasting Homes are leading the way.',
    date: '2021',
    url: 'https://time.com/6046368/wood-steel-houses-fires/',
  },
  {
    outlet: 'CNN',
    outletSub: 'Business',
    title: 'How to Build a Home That Can Survive a Disaster',
    description: 'A deep dive into disaster-proof construction methods and how innovative builders are rethinking what structural resilience really means.',
    date: '2018',
    url: 'https://www.cnn.com/2018/10/08/success/disaster-proof-homes/index.html',
  },
  {
    outlet: 'CBS News',
    outletSub: 'San Francisco',
    title: 'Fire-Resistant and Earthquake-Safe: Rebuilding After Wildfires',
    description: 'Coverage of SCIP panel wall reconstruction following devastating California wildfires — demonstrating the technology\'s real-world resilience.',
    date: '',
    url: 'https://www.cbsnews.com/sanfrancisco/news/embattled-debris-removal-company-helps-rebuild-wall-destroyed-in-wildfires/',
  },
];

export default function MediaSection() {
  return (
    <section id="media" style={{ position: 'relative', width: '100%', padding: '5.9rem 5%', overflow: 'hidden', backgroundColor: 'var(--bg)' }}>

      {/* Ambient blobs */}
      <div style={{ position: 'absolute', top: '15%', left: '-8rem', width: '28rem', height: '28rem', borderRadius: '50%', background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)', opacity: 0.06, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '-8rem', width: '28rem', height: '28rem', borderRadius: '50%', background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)', opacity: 0.06, filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>Press & Coverage</span>
          <h2 style={{ fontSize: '2.95rem', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.15, textShadow: '0 0 10px rgba(223,183,108,0.7), 0 0 20px rgba(223,183,108,0.3), 0 2px 8px rgba(0,0,0,0.8)' }}>
            As Seen <span style={{ color: 'var(--gold)' }}>In</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
          {MEDIA.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: '0 0 calc(33.33% - 1rem)',
                minWidth: '260px',
                maxWidth: '340px',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
                textDecoration: 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(223,183,108,0.35)';
                e.currentTarget.style.boxShadow = '0 4px 32px rgba(0,0,0,0.5), 0 0 20px rgba(223,183,108,0.07)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
              }}
            >
              {/* Outlet badge */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                <span style={{ fontSize: '1.05rem', fontFamily: 'var(--font-accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold)' }}>
                  {item.outlet}
                </span>
                {item.outletSub && (
                  <span style={{ fontSize: '0.62rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-primary)' }}>
                    {item.outletSub}
                  </span>
                )}
              </div>

              {/* Title */}
              <p style={{ fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.45, color: '#fff', margin: 0, fontFamily: 'var(--font-primary)' }}>
                {item.title}
              </p>

              {/* Description */}
              <p style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.5)', margin: 0, flex: 1 }}>
                {item.description}
              </p>

              {/* Footer row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                {item.date && (
                  <span style={{ fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
                    {item.date}
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.65rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', marginLeft: 'auto' }}>
                  Read Article <ExternalLink size={11} />
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
