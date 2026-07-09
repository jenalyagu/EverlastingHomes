import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, ExternalLink, Mail, Download, ArrowRight, Play } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────

const VIDEOS = [
  {
    outlet: 'FOX 26',
    outletSub: 'Houston',
    logo: '/media-logos/fox26.jpeg',
    title: 'Concrete Homes Offer More Resistance to Natural Disasters',
    description: 'CEO Franck Boursier discusses how SCIP construction enhances durability against fires, tornadoes, hurricanes, and earthquakes.',
    date: 'February 13, 2025',
    url: 'https://www.fox26houston.com/news/concrete-homes-natural-disasters',
    youtubeId: null,
  },
  {
    outlet: 'Bloomberg TV',
    outletSub: "World's Greatest Show",
    logo: null,
    title: "World's Greatest Show — Everlasting Homes Feature",
    description: 'Bloomberg TV spotlights Everlasting Homes as a pioneer in disaster-resilient luxury construction.',
    date: '',
    url: 'https://www.everlastinghomesgroup.com/media',
    youtubeId: null,
  },
  {
    outlet: 'CW39',
    outletSub: 'Houston',
    logo: '/media-logos/cw39.webp',
    title: 'The Technology Behind Weather-Resilient Homes',
    description: 'A meteorologist interview covering the building technology making Gulf Coast homes resilient to extreme weather.',
    date: '',
    url: 'https://cw39.com/weather/technology-behind-weather-resilient-homes/',
    youtubeId: null,
  },
  {
    outlet: 'Green Builder',
    outletSub: 'Magazine',
    logo: null,
    title: 'Home Builder of the Year — Wildfire & Flood Readiness',
    description: 'Green Builder Magazine recognizes Everlasting Homes for leadership in wildfire and flood-resistant homebuilding.',
    date: '',
    url: 'https://www.everlastinghomesgroup.com/media',
    youtubeId: null,
  },
];

const ARTICLES = [
  {
    outlet: 'TIME',
    outletSub: 'Magazine',
    logo: '/media-logos/time.png',
    title: "Wood and Steel Houses Keep Burning. Here's What to Build Instead.",
    description: 'As wildfires intensify across the U.S., the case for concrete and fire-resistant construction grows.',
    date: '2021',
    url: 'https://time.com/6046368/wood-steel-houses-fires/',
    cta: 'Read Article',
  },
  {
    outlet: 'CNN',
    outletSub: 'Business',
    logo: '/media-logos/cnn.png',
    title: 'How to Build a Home That Can Survive a Disaster',
    description: 'A deep dive into disaster-proof construction methods and how builders are rethinking structural resilience.',
    date: '2018',
    url: 'https://www.cnn.com/2018/10/08/success/disaster-proof-homes/index.html',
    cta: 'Read Article',
  },
  {
    outlet: 'CBS News',
    outletSub: 'San Francisco',
    logo: '/media-logos/cbs-news.png',
    title: 'Fire-Resistant and Earthquake-Safe: Rebuilding After Wildfires',
    description: 'Coverage of SCIP panel wall reconstruction following California wildfires.',
    date: '',
    url: 'https://www.cbsnews.com/sanfrancisco/news/embattled-debris-removal-company-helps-rebuild-wall-destroyed-in-wildfires/',
    cta: 'Read Article',
  },
  {
    outlet: 'Construction Business',
    outletSub: 'Magazine',
    logo: null,
    title: 'Custom Home Builder of the Year',
    description: 'Construction Business Magazine honors Everlasting Homes with its Custom Home Builder of the Year award.',
    date: '',
    url: 'https://www.everlastinghomesgroup.com/media',
    cta: 'Read Article',
  },
  {
    outlet: 'Concrete Credentials',
    outletSub: 'Podcast',
    logo: null,
    title: 'Building for the Future: Resilient Homes with Advanced Concrete Innovation',
    description: 'An in-depth interview on SCIP and UHPC technology and the future of concrete homebuilding.',
    date: '',
    url: 'https://buildwithstrength.com/resources/building-for-the-future-resilient-homes-with-advanced-concrete-innovation/',
    cta: 'Listen',
  },
  {
    outlet: 'RESNET',
    outletSub: 'Builder of the Month',
    logo: '/Certs/resnet.jpg',
    title: 'RESNET Builder of the Month',
    description: 'RESNET recognizes Everlasting Homes for outstanding energy performance and HERS-rated construction excellence.',
    date: '',
    url: 'https://www.everlastinghomesgroup.com/media',
    cta: 'Read Article',
  },
];

const PRESS_SERVICES = [
  'Executive interviews with co-founders Franck Boursier & George Mock',
  'Official statements on disaster-resilient construction',
  'SCIP technology briefings and design information',
  'Expert commentary on wildfire, flood & hurricane preparedness',
  'High-resolution photography and project documentation',
  'On-site access for editorial and documentary coverage',
];

// ── Sub-components ─────────────────────────────────────────────

function LogoBadge({ logo, alt, height = 26 }) {
  if (logo) {
    return (
      <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: '6px', padding: '5px 10px', display: 'inline-flex', alignItems: 'center' }}>
        <img src={logo} alt={alt} style={{ height: `${height}px`, maxWidth: '100px', width: 'auto', objectFit: 'contain', display: 'block' }} />
      </div>
    );
  }
  return (
    <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '5px 10px', display: 'inline-flex', alignItems: 'center' }}>
      <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap' }}>{alt}</span>
    </div>
  );
}

function VideoCard({ v }) {
  const inner = (
    <>
      {/* Thumbnail / embed */}
      {v.youtubeId ? (
        <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${v.youtubeId}`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      ) : (
        <div style={{ position: 'relative', paddingBottom: '56.25%', background: 'rgba(255,255,255,0.025)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.85rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid rgba(223,183,108,0.5)', background: 'rgba(223,183,108,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={20} color="var(--gold)" style={{ marginLeft: '3px' }} />
            </div>
            <span style={{ fontSize: '0.58rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Watch Segment</span>
          </div>
        </div>
      )}

      {/* Card body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <LogoBadge logo={v.logo} alt={v.outlet} height={22} />
          {v.date && <span style={{ fontSize: '0.58rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>{v.date}</span>}
        </div>
        <div style={{ fontSize: '0.58rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>{v.outletSub}</div>
        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.4 }}>{v.title}</p>
        <p style={{ fontSize: '0.78rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.4)', margin: '0', flex: 1 }}>{v.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.62rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          View Segment <ExternalLink size={10} />
        </div>
      </div>
    </>
  );

  return v.youtubeId ? (
    <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {inner}
    </div>
  ) : (
    <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column', textDecoration: 'none', transition: 'border-color 0.25s ease' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(223,183,108,0.35)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
    >
      {inner}
    </a>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function Media() {
  const NAV_LINK = { textDecoration: 'none', color: 'var(--text)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' };

  return (
    <div style={{ background: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'var(--font-primary)' }}>

      {/* ── Nav ───────────────────────────────────────── */}
      <nav>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/Logos/ehbg-logo.png" alt="Everlasting Homes Building Group" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
        </Link>
        <div className="menu-links" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <Link to="/#scip-core"       className="nav-text-link" style={NAV_LINK}>Technology</Link>
          <Link to="/#fire-protection" className="nav-text-link" style={NAV_LINK}>Protection</Link>
          <Link to="/#house-wireframe" className="nav-text-link" style={NAV_LINK}>About</Link>
          <Link to="/#portfolio"       className="nav-text-link" style={NAV_LINK}>Projects</Link>
          <Link to="/media"            className="nav-text-link" style={{ ...NAV_LINK, color: 'var(--gold)' }}>Media</Link>
          <a href="https://www.facebook.com/youreverlastinghome"    target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--text)', display: 'flex', alignItems: 'center' }}><Facebook size={12} /></a>
          <a href="https://www.instagram.com/everlastinghomesgroup" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--text)', display: 'flex', alignItems: 'center' }}><Instagram size={12} /></a>
          <a href="https://www.youtube.com/channel/UClo9NRUNTukJqDvXSHrS5tg" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--text)', display: 'flex', alignItems: 'center' }}><Youtube size={12} /></a>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '11rem 5% 6rem', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70rem', height: '35rem', background: 'radial-gradient(ellipse, rgba(223,183,108,0.07) 0%, transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: '0.62rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1.25rem' }}>Press &amp; Coverage</div>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.0, marginBottom: '1.5rem', textShadow: '0 0 40px rgba(223,183,108,0.3), 0 2px 8px rgba(0,0,0,0.8)' }}>
            As Seen <span style={{ color: 'var(--gold)' }}>In</span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', maxWidth: '500px', margin: '0 auto 3.5rem', lineHeight: 1.8 }}>
            National and regional coverage of Everlasting Homes Building Group and the SCIP technology reshaping disaster-resilient homebuilding.
          </p>

          {/* Logo strip */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { logo: '/media-logos/fox26.jpeg', alt: 'FOX 26' },
              { logo: '/media-logos/cw39.webp',  alt: 'CW39' },
              { logo: '/media-logos/time.png',   alt: 'TIME' },
              { logo: '/media-logos/cnn.png',    alt: 'CNN' },
              { logo: '/media-logos/cbs-news.png', alt: 'CBS News' },
            ].map(o => (
              <div key={o.alt} style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '6px', padding: '5px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={o.logo} alt={o.alt} style={{ height: '22px', maxWidth: '80px', width: 'auto', objectFit: 'contain', display: 'block' }} />
              </div>
            ))}
            {['Bloomberg TV', 'Green Builder', 'Construction Business', 'RESNET'].map(name => (
              <div key={name} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '5px 12px' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gold divider ─────────────────────────────── */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(223,183,108,0.25), transparent)', margin: '0 5%' }} />

      {/* ── Broadcast / Video ────────────────────────── */}
      <section style={{ padding: '6rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.6rem' }}>Broadcast Coverage</div>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              Media <span style={{ color: 'var(--gold)' }}>Interviews</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {VIDEOS.map((v, i) => <VideoCard key={i} v={v} />)}
          </div>
        </div>
      </section>

      {/* ── White divider ────────────────────────────── */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)', margin: '0 5%' }} />

      {/* ── Print & Podcast ──────────────────────────── */}
      <section style={{ padding: '6rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.6rem' }}>Print &amp; Podcast</div>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              Editorial <span style={{ color: 'var(--gold)' }}>Coverage</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {ARTICLES.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', textDecoration: 'none', transition: 'border-color 0.25s ease, box-shadow 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(223,183,108,0.3)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(223,183,108,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <LogoBadge logo={item.logo} alt={item.outlet} height={24} />
                <div>
                  <div style={{ fontSize: '0.57rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.4rem' }}>{item.outletSub}</div>
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.45, color: '#fff', margin: 0 }}>{item.title}</p>
                </div>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.4)', margin: 0, flex: 1 }}>{item.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem' }}>
                  {item.date && <span style={{ fontSize: '0.6rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>{item.date}</span>}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.6rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', marginLeft: 'auto', fontWeight: 700 }}>
                    {item.cta} <ExternalLink size={10} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── White divider ────────────────────────────── */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)', margin: '0 5%' }} />

      {/* ── Press Inquiries ──────────────────────────── */}
      <section style={{ padding: '6rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.6rem' }}>For the Press</div>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '1rem' }}>
              Press <span style={{ color: 'var(--gold)' }}>Inquiries</span>
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
              We welcome media inquiries on topics related to Everlasting Homes Building Group, SCIP technology, and disaster-resilient construction. Our team is available for:
            </p>
          </div>

          {/* Services grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '3.5rem' }}>
            {PRESS_SERVICES.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px' }}>
                <ArrowRight size={12} color="var(--gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Two boxes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

            {/* Press Kit */}
            <div style={{ padding: '2.5rem', background: 'rgba(223,183,108,0.04)', border: '1px solid rgba(223,183,108,0.15)', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '2px', background: 'linear-gradient(to right, var(--gold), transparent)', borderRadius: '2px', marginBottom: '2rem' }} />
              <div style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.5rem' }}>Press Kit</div>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '0.85rem' }}>
                Media <span style={{ color: 'var(--gold)' }}>Assets</span>
              </h3>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', marginBottom: '1.75rem' }}>
                Logos, founder headshots, project photography, and company fact sheets available for editorial use. Contact us to request full-resolution files.
              </p>
              <ul style={{ listStyle: 'none', margin: '0 0 2.25rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
                {['Company Logo (SVG + PNG)', 'Founder Headshots (Hi-Res)', 'Project Photography', 'SCIP Technology Infographics', 'Company Fact Sheet'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
                    <ArrowRight size={11} color="var(--gold)" style={{ flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:media@everlasting.build?subject=Press Kit Request" className="cta-btn" style={{ fontSize: '0.7rem', alignSelf: 'flex-start' }}>
                <Download size={13} /> Request Press Kit
              </a>
            </div>

            {/* Media Contact */}
            <div style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '2px', background: 'linear-gradient(to right, rgba(255,255,255,0.12), transparent)', borderRadius: '2px', marginBottom: '2rem' }} />
              <div style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.5rem' }}>Media Inquiries</div>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '0.85rem' }}>
                Get in <span style={{ color: 'var(--gold)' }}>Touch</span>
              </h3>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', marginBottom: '1.75rem' }}>
                For interview requests, expert commentary, editorial partnerships, or on-site access, reach our team directly.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, marginBottom: '2.25rem' }}>
                <div style={{ padding: '1.1rem 1.4rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.57rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.35rem' }}>Media Email</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--gold)', fontWeight: 600 }}>media@everlasting.build</div>
                </div>
                <div style={{ padding: '1.1rem 1.4rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.57rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '0.35rem' }}>General Inquiries</div>
                  <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>info@everlastinghomesgroup.com</div>
                </div>
              </div>
              <a href="mailto:media@everlasting.build?subject=Media Inquiry — Everlasting Homes" className="cta-btn" style={{ fontSize: '0.7rem', alignSelf: 'flex-start', background: 'transparent', color: 'var(--gold)' }}>
                <Mail size={13} /> Send Inquiry
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer style={{ padding: '2.5rem 5%', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', opacity: 0.35, fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
        © 2026 Everlasting Homes Building Group
      </footer>

    </div>
  );
}
