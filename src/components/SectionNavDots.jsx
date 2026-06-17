import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero',                  label: 'Home'        },
  { id: 'scip-core',             label: 'SCIP Intro'  },
  { id: 'scip-technology',       label: 'Technology'  },
  { id: 'process',               label: 'Process'     },
  { id: 'solution',              label: 'Solution'    },
  { id: 'fire-protection',       label: 'Fire'        },
  { id: 'earthquake-protection', label: 'Earthquake'  },
  { id: 'wind-protection',       label: 'Wind'        },
  { id: 'flood-protection',      label: 'Flood'       },
  { id: 'layers-protection',     label: 'Climate'     },
  { id: 'house-wireframe',       label: 'About'       },
  { id: 'services',              label: 'Services'    },
  { id: 'awards',                label: 'Awards'      },
  { id: 'portfolio',             label: 'Portfolio'   },
  { id: 'angle-house',           label: 'FAQ'         },
  { id: 'cta',                   label: 'Contact'     },
  { id: 'infographics',          label: 'Infographics'},
  { id: 'testimonials',          label: 'Testimonials'},
];

// Fixed item height drives the absolute-positioned timeline lines
const ITEM_H   = 28;  // px — height of each nav row
const DOT_SIZE = 10;  // px — outer ring diameter
const LINE_R   = 4;   // px from container right — centres the 1px line on the dot

export default function SectionNavDots() {
  const [active,  setActive]  = useState('hero');
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const updateActive = () => {
      // The active section is the last one whose top edge is at or above
      // the vertical midpoint of the viewport — deterministic, no races.
      const mid = window.scrollY + window.innerHeight / 2;
      let bestId = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) bestId = id;
      }
      setActive(bestId);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeIndex = SECTIONS.findIndex(s => s.id === active);
  const totalH      = SECTIONS.length * ITEM_H;

  // Full line spans from centre of first dot to centre of last dot
  const lineTop    = ITEM_H / 2;
  const lineHeight = totalH - ITEM_H;

  // Gold "progress" line: from centre of first dot to centre of active dot
  const progressH  = activeIndex * ITEM_H;

  return (
    <div
      style={{
        position:  'fixed',
        right:     '1.75rem',
        top:       '50%',
        transform: 'translateY(-50%)',
        zIndex:    200,
      }}
    >
      <div style={{ position: 'relative' }}>

        {/* ── Full dim track line ───────────────────────── */}
        <div style={{
          position:   'absolute',
          right:      LINE_R,
          top:        lineTop,
          height:     lineHeight,
          width:      '1px',
          background: 'rgba(255,255,255,0.1)',
          pointerEvents: 'none',
        }} />

        {/* ── Gold progress line (visited sections) ─────── */}
        <div style={{
          position:   'absolute',
          right:      LINE_R,
          top:        lineTop,
          height:     progressH,
          width:      '1px',
          background: 'linear-gradient(to bottom, rgba(223,183,108,0.25), var(--gold))',
          transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }} />

        {/* ── Section rows ──────────────────────────────── */}
        {SECTIONS.map(({ id, label }, i) => {
          const isActive  = active  === id;
          const isVisited = i < activeIndex;
          const isHovered = hovered === id;
          const showLabel = isActive || isHovered;

          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Go to ${label}`}
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'flex-end',
                gap:            '9px',
                height:         `${ITEM_H}px`,
                width:          '100%',
                background:     'none',
                border:         'none',
                padding:        '0',
                cursor:         'pointer',
                outline:        'none',
              }}
            >
              {/* Label */}
              <span style={{
                fontSize:      '0.58rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontFamily:    'var(--font-primary)',
                fontWeight:    isActive ? 700 : 500,
                whiteSpace:    'nowrap',
                color:         isActive
                  ? 'var(--gold)'
                  : isHovered
                    ? 'rgba(255,255,255,0.8)'
                    : isVisited
                      ? 'rgba(223,183,108,0.45)'
                      : 'rgba(255,255,255,0.35)',
                opacity:   showLabel ? 1 : 0,
                transform: showLabel ? 'translateX(0)' : 'translateX(4px)',
                transition: 'opacity 0.22s ease, transform 0.22s ease, color 0.22s ease',
                pointerEvents: 'none',
              }}>
                {label}
              </span>

              {/* Horizontal tick connecting label to node */}
              <div style={{
                width:      isActive ? '16px' : isHovered ? '10px' : '6px',
                height:     '1px',
                flexShrink: 0,
                background: isActive
                  ? 'var(--gold)'
                  : isHovered
                    ? 'rgba(255,255,255,0.5)'
                    : isVisited
                      ? 'rgba(223,183,108,0.3)'
                      : 'rgba(255,255,255,0.12)',
                transition: 'all 0.22s ease',
              }} />

              {/* Node — ring + inner fill */}
              <div style={{
                position:   'relative',
                width:      `${DOT_SIZE}px`,
                height:     `${DOT_SIZE}px`,
                flexShrink: 0,
              }}>
                {/* Outer ring */}
                <div style={{
                  position:     'absolute',
                  inset:        0,
                  borderRadius: '50%',
                  border:       `1px solid ${
                    isActive  ? 'var(--gold)'
                    : isHovered ? 'rgba(255,255,255,0.65)'
                    : isVisited ? 'rgba(223,183,108,0.4)'
                    : 'rgba(255,255,255,0.18)'
                  }`,
                  boxShadow: isActive
                    ? '0 0 8px rgba(223,183,108,0.55), 0 0 18px rgba(223,183,108,0.2)'
                    : 'none',
                  transition: 'all 0.22s ease',
                }} />

                {/* Inner fill dot */}
                <div style={{
                  position:     'absolute',
                  top:          '50%',
                  left:         '50%',
                  transform:    'translate(-50%, -50%)',
                  borderRadius: '50%',
                  width:  isActive ? '5px' : isVisited ? '3px' : isHovered ? '3px' : '0px',
                  height: isActive ? '5px' : isVisited ? '3px' : isHovered ? '3px' : '0px',
                  background: isActive
                    ? 'var(--gold)'
                    : isVisited
                      ? 'rgba(223,183,108,0.6)'
                      : 'rgba(255,255,255,0.5)',
                  boxShadow: isActive
                    ? '0 0 6px rgba(223,183,108,0.9)'
                    : 'none',
                  transition: 'all 0.22s ease',
                }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
