import { useRef, useState, useEffect, useCallback } from 'react';

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeCaption,
  afterCaption,
  defaultPosition = 50,
  beforePosition = 'center',
  afterPosition = 'center',
}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(defaultPosition);
  const [dragging, setDragging] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const getPos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e) => { e.preventDefault(); setDragging(true); };
  const onMouseMove = useCallback((e) => { if (dragging) getPos(e.clientX); }, [dragging, getPos]);
  const onMouseUp = useCallback(() => setDragging(false), []);

  const onTouchStart = (e) => { e.preventDefault(); setDragging(true); };
  const onTouchMove = useCallback((e) => {
    if (dragging) getPos(e.touches[0].clientX);
  }, [dragging, getPos]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [dragging, onMouseMove, onMouseUp, onTouchMove]);

  return (
    <div style={{ userSelect: 'none', opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
      {/* Labels above */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{beforeLabel}</span>
        <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold)', fontWeight: 600 }}>{afterLabel}</span>
      </div>

      {/* Slider container */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', cursor: dragging ? 'grabbing' : 'grab', border: '1px solid var(--border)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
      >
        {/* AFTER image (full width, behind) */}
        <img
          src={afterSrc}
          alt={afterLabel}
          draggable={false}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: afterPosition }}
        />

        {/* Gold tint overlay on after side */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(223,183,108,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

        {/* BEFORE image (clipped to left of slider) */}
        <div style={{ position: 'absolute', inset: 0, width: `${position}%`, overflow: 'hidden' }}>
          <img
            src={beforeSrc}
            alt={beforeLabel}
            draggable={false}
            style={{ position: 'absolute', top: 0, left: 0, width: `${10000 / position}%`, maxWidth: 'none', height: '100%', objectFit: 'cover', objectPosition: beforePosition }}
          />
          {/* Dark red tint on before side */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(180,40,10,0.22) 0%, transparent 60%)', pointerEvents: 'none' }} />
        </div>

        {/* Divider line */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: `${position}%`, width: '2px',
          background: 'linear-gradient(to bottom, transparent, #fff 15%, #fff 85%, transparent)',
          transform: 'translateX(-1px)',
          boxShadow: '0 0 12px rgba(255,255,255,0.4)',
          pointerEvents: 'none',
        }} />

        {/* Handle */}
        <div
          style={{
            position: 'absolute', top: '50%', left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            width: '44px', height: '44px', borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: dragging ? 'grabbing' : 'grab',
            transition: dragging ? 'none' : 'transform 0.1s ease',
            zIndex: 10,
          }}
        >
          {/* Chevrons */}
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
            <path d="M5 7L1 3.5M5 7L1 10.5" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M17 7L21 3.5M17 7L21 10.5" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="5" y1="7" x2="17" y2="7" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Inline stat badges */}
        {position > 18 && (
          <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', padding: '0.35rem 0.8rem', background: 'rgba(180,40,10,0.85)', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', backdropFilter: 'blur(4px)', pointerEvents: 'none', transition: 'opacity 0.3s', opacity: Math.min(1, position / 25) }}>
            ✕ Destroyed
          </div>
        )}
        {position < 82 && (
          <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', padding: '0.35rem 0.8rem', background: 'rgba(20,20,20,0.85)', border: '1px solid rgba(223,183,108,0.5)', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', backdropFilter: 'blur(4px)', pointerEvents: 'none', transition: 'opacity 0.3s', opacity: Math.min(1, (100 - position) / 25) }}>
            ✓ Zero Damage
          </div>
        )}

        {/* Hint on first load */}
        {position === defaultPosition && !dragging && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: '0.5rem', pointerEvents: 'none', animation: 'sliderPulse 2s ease-in-out infinite' }}>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', background: 'rgba(0,0,0,0.5)', padding: '0.3rem 0.75rem', borderRadius: '100px', backdropFilter: 'blur(8px)' }}>Drag to compare</span>
          </div>
        )}
      </div>

      {/* Captions below */}
      {(beforeCaption || afterCaption) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
          {beforeCaption && <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.5, margin: 0 }}>{beforeCaption}</p>}
          {afterCaption && <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.5, margin: 0, textAlign: 'right' }}>{afterCaption}</p>}
        </div>
      )}

      <style>{`
        @keyframes sliderPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
