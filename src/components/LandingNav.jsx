import { useState } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

export default function LandingNav() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav>
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/Logos/ehbg-logo.png" alt="Everlasting Homes Building Group" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
        </a>
        <div className="menu-links" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <a href="/#scip-core" className="nav-text-link" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Technology</a>
          <a href="/#fire-protection" className="nav-text-link" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Protection</a>
          <a href="/#portfolio" className="nav-text-link" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Projects</a>
          <a href="/media" className="nav-text-link" style={{ textDecoration: 'none', color: 'var(--text)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Media</a>
          <a href="https://www.facebook.com/youreverlastinghome" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--text)', display: 'flex', alignItems: 'center' }}><Facebook size={12} /></a>
          <a href="https://www.instagram.com/everlastinghomesgroup" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--text)', display: 'flex', alignItems: 'center' }}><Instagram size={12} /></a>
          <a href="https://www.youtube.com/channel/UClo9NRUNTukJqDvXSHrS5tg" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--text)', display: 'flex', alignItems: 'center' }}><Youtube size={12} /></a>
          <button onClick={() => setShowModal(true)} className="cta-btn" style={{ padding: '0.6rem 1.1rem', fontSize: '0.75rem', background: 'transparent', color: 'var(--gold)' }}>Free Consultation</button>
        </div>
      </nav>
      {showModal && <ConsultationModal onClose={() => setShowModal(false)} />}
    </>
  );
}
