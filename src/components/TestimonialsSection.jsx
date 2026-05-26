import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "The homes that you build are outstanding achievements and examples of how we can move the building industry to zero.",
    name: "Jaime Van Mourik",
    title: "Department of Energy Ready Home Program Director"
  },
  {
    quote: "We were happy with his crew and the quality of work done — still happy with the house more than 6 years later.",
    name: "Ayo Bello",
    title: "Homeowner"
  },
  {
    quote: "The concrete home is so solid, strong, and very energy efficient. The best house you can have in Houston.",
    name: "Hugues Thevoux",
    title: "Homeowner"
  },
  {
    quote: "You never have to go behind him or manage the quality of workmanship. Five stars. Highly recommended.",
    name: "Charles Mansour",
    title: "Homeowner"
  },
  {
    quote: "We were very impressed with the professionalism and project management skills. We highly recommend Everlasting Homes.",
    name: "Floyd & Gabriel",
    title: "Homeowners"
  },
  {
    quote: "If you're looking to build a high quality and truly custom home, I highly recommend you consider this group.",
    name: "Michelle Hong",
    title: "Homeowner"
  },
  {
    quote: "Our new house is more than high tech — it feels safe, comfortable and healthy. We recommend Everlasting without hesitation.",
    name: "Eric Chan",
    title: "Homeowner"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ position: 'relative', width: '100%', padding: '5.9rem 5%', overflow: 'hidden', backgroundColor: 'var(--bg)' }}>

      <div style={{ position: 'absolute', top: '10%', right: '-8rem', width: '28rem', height: '28rem', borderRadius: '50%', background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)', opacity: 0.07, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-8rem', width: '28rem', height: '28rem', borderRadius: '50%', background: 'radial-gradient(circle, var(--gold) 0%, transparent 70%)', opacity: 0.07, filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle" style={{ display: 'block', marginBottom: '0.75rem' }}>What Homeowners Say</span>
          <h2 style={{ fontSize: '2.95rem', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.15, textShadow: '0 0 10px rgba(223,183,108,0.7), 0 0 20px rgba(223,183,108,0.3), 0 2px 8px rgba(0,0,0,0.8)' }}>
            Built on <span style={{ color: 'var(--gold)' }}>Trust</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
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
                gap: '1rem',
                boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
              }}
            >
              <Quote size={20} color="var(--gold)" style={{ opacity: 0.7, flexShrink: 0 }} />
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', fontStyle: 'italic', flex: 1, margin: 0 }}>
                "{t.quote}"
              </p>
              <div style={{ borderTop: '1px solid rgba(223,183,108,0.2)', paddingTop: '0.75rem' }}>
                <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.5px', fontFamily: 'var(--font-accent)', textTransform: 'uppercase' }}>{t.name}</p>
                {t.title && <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--gold)', marginTop: '0.2rem' }}>{t.title}</p>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
