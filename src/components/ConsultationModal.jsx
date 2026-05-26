import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

const PROJECT_TYPES = [
  'New Custom Home',
  'Wildfire Rebuild',
  'SCIP Shell Only',
  'Unsure / Exploring Options',
];

const TIMELINES = [
  'As soon as possible',
  '3 – 6 months',
  '6 – 12 months',
  '1+ year',
  'Just exploring',
];

export default function ConsultationModal({ onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    location: '', projectType: '', timeline: '', message: ''
  });
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const set = key => e => setForm(p => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formId = import.meta.env.VITE_FORMSPREE_ID;

    if (!formId || formId === 'YOUR_FORMSPREE_ID') {
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || 'Not provided'}`,
        `Location: ${form.location || 'Not provided'}`,
        `Project Type: ${form.projectType || 'Not specified'}`,
        `Timeline: ${form.timeline || 'Not specified'}`,
        `Message: ${form.message || 'None'}`,
      ].join('\n');
      window.location.href = `mailto:hello@everlasting.build?subject=Consultation Request — ${encodeURIComponent(form.name)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus({ submitting: true, success: false, error: null });
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus({ submitting: false, success: true, error: null });
      } else {
        throw new Error();
      }
    } catch {
      setStatus({ submitting: false, success: false, error: 'Something went wrong. Please email us at hello@everlasting.build' });
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '600px',
          background: 'rgba(8,8,8,0.97)',
          border: '1px solid rgba(223,183,108,0.25)',
          borderRadius: '16px',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 0 80px rgba(0,0,0,0.9), 0 0 40px rgba(223,183,108,0.06)',
          maxHeight: '90vh',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--gold) rgba(0,0,0,0.2)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.35)', padding: '0.25rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
            Begin Your Legacy
          </span>
          <h2 style={{ fontSize: '1.85rem', marginTop: '0.4rem', color: '#fff', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '-0.02em', textShadow: '0 0 20px rgba(223,183,108,0.25)' }}>
            Schedule a Consultation
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.5rem', lineHeight: 1.55, textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--font-primary)', fontWeight: 400 }}>
            Tell us about your project and we'll be in touch within 24 hours.
          </p>
        </div>

        {status.success ? (
          <div style={{
            textAlign: 'center', padding: '2.5rem 1rem',
            color: 'var(--gold)', background: 'rgba(223,183,108,0.06)',
            borderRadius: '10px', border: '1px solid rgba(223,183,108,0.18)'
          }}>
            <CheckCircle2 size={40} style={{ marginBottom: '1rem' }} />
            <p style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-accent)' }}>Request Received</p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.6rem', textTransform: 'none', letterSpacing: 0, lineHeight: 1.5 }}>
              The Everlasting Homes team will reach out within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.85rem' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <input type="text" placeholder="Full Name *" required
                value={form.name} onChange={set('name')} disabled={status.submitting}
                className="form-input" style={{ width: '100%' }} />
              <input type="email" placeholder="Email Address *" required
                value={form.email} onChange={set('email')} disabled={status.submitting}
                className="form-input" style={{ width: '100%' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <input type="tel" placeholder="Phone Number"
                value={form.phone} onChange={set('phone')} disabled={status.submitting}
                className="form-input" style={{ width: '100%' }} />
              <input type="text" placeholder="City, State"
                value={form.location} onChange={set('location')} disabled={status.submitting}
                className="form-input" style={{ width: '100%' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <select value={form.projectType} onChange={set('projectType')} disabled={status.submitting}
                className="form-input" style={{ width: '100%' }}>
                <option value="">Project Type</option>
                {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select value={form.timeline} onChange={set('timeline')} disabled={status.submitting}
                className="form-input" style={{ width: '100%' }}>
                <option value="">Timeline</option>
                {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <textarea
              placeholder="Tell us about your project... (optional)"
              value={form.message} onChange={set('message')} disabled={status.submitting}
              className="form-input" rows={4}
              style={{ width: '100%', resize: 'vertical', lineHeight: 1.55 }}
            />

            {status.error && (
              <p style={{ fontSize: '0.78rem', color: '#ff6b35', margin: 0, textTransform: 'none', letterSpacing: 0 }}>
                {status.error}
              </p>
            )}

            <button
              type="submit" disabled={status.submitting} className="cta-btn"
              style={{
                width: '100%', justifyContent: 'center', marginTop: '0.25rem',
                opacity: status.submitting ? 0.6 : 1,
                cursor: status.submitting ? 'not-allowed' : 'pointer',
              }}
            >
              {status.submitting ? 'Sending...' : 'Submit Consultation Request'}
            </button>

            <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.22)', textAlign: 'center', margin: 0, textTransform: 'none', letterSpacing: 0, lineHeight: 1.5 }}>
              Or reach us directly at{' '}
              <a href="mailto:hello@everlasting.build" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                hello@everlasting.build
              </a>
            </p>

          </form>
        )}
      </div>
    </div>
  );
}
