import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 577; // v3000 to v3576

const frameUrl = (index) => {
  let folder;
  const vIndex = index + 3000;
  
  if      (vIndex <= 3048) folder = 'hero';
  else if (vIndex <= 3084) folder = 'scip-intro';
  else if (vIndex <= 3121) folder = 'scip-technology';
  else if (vIndex <= 3170) folder = 'build-process';
  else if (vIndex <= 3207) folder = 'fire';
  else if (vIndex <= 3244) folder = 'earthquake';
  else if (vIndex <= 3281) folder = 'tornado';
  else if (vIndex <= 3318) folder = 'hurricane';
  else if (vIndex <= 3355) folder = 'snow';
  else if (vIndex <= 3392) folder = 'all-climates';
  else if (vIndex <= 3430) folder = 'house-wireframe';
  else if (vIndex <= 3465) folder = 'wireframe-house';
  else if (vIndex <= 3502) folder = 'rear-house';
  else if (vIndex <= 3539) folder = 'angle-house';
  else                     folder = 'front-house';

  return `/sequence/${folder}/EHBG_webscroll_v${vIndex}.webp`;
};

export default function ScrollytellingEngine() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const playheadRef = useRef({ frame: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Drawing function with cover effect
    const drawFrame = (index) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete) return;

      const { innerWidth: width, innerHeight: height } = window;
      canvas.width = width;
      canvas.height = height;

      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;

      let dWidth, dHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        dWidth = width;
        dHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - dHeight) / 2;
      } else {
        dWidth = height * imgRatio;
        dHeight = height;
        offsetX = (width - dWidth) / 2;
        offsetY = 0;
      }

      context.clearRect(0, 0, width, height);
      context.drawImage(img, offsetX, offsetY, dWidth, dHeight);
    };

    // Preload critical first frames and then the rest
    const preloadImages = async () => {
      const firstImg = new Image();
      firstImg.src = frameUrl(0);
      firstImg.onload = () => {
        imagesRef.current[0] = firstImg;
        drawFrame(0);
        setLoaded(true);
      };

      // Background loading for the rest
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = frameUrl(i);
        imagesRef.current[i] = img;
      }
    };

    preloadImages();

    // Define section-to-frame mapping for precise alignment
    const sectionMapping = [
      { id: '#hero', frame: 1 },
      { id: '#scip-core', frame: 49 },
      { id: '#scip-technology', frame: 86 },
      { id: '#process', frame: 122 },
      { id: '#solution', frame: 172 },
      { id: '#fire-protection', frame: 196 },
      { id: '#earthquake-protection', frame: 233 },
      { id: '#wind-protection', frame: 274 },
      { id: '#flood-protection', frame: 324 },
      { id: '#layers-protection', frame: 355 },
      { id: '#house-wireframe', frame: 393 },
      { id: '#services', frame: 430 },
      { id: '#awards', frame: 466 },
      { id: '#portfolio', frame: 503 },
      { id: '#angle-house', frame: 530 },
      { id: '#cta', frame: 576 }
    ];

    // Create contiguous ScrollTriggers for each section transition
    const triggers = [];
    sectionMapping.forEach((m, i) => {
      if (i === 0) return;
      const prev = sectionMapping[i - 1];
      const section = document.querySelector(m.id);
      const prevSection = document.querySelector(prev.id);
      
      if (!section || !prevSection) return;

      const trigger = ScrollTrigger.create({
        trigger: prevSection,
        start: "top top",
        endTrigger: section,
        end: "top top",
        scrub: 1.5,
        animation: gsap.fromTo(playheadRef.current, 
          { frame: prev.frame }, 
          { 
            frame: m.frame, 
            ease: "none",
            onUpdate: () => drawFrame(Math.floor(playheadRef.current.frame))
          }
        )
      });
      triggers.push(trigger);
    });

    const handleResize = () => drawFrame(Math.floor(playheadRef.current.frame));
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      triggers.forEach(t => t.kill());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
      {!loaded && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#050505',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          fontFamily: 'Outfit, sans-serif',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          fontSize: '0.8rem',
          color: 'var(--gold)'
        }}>
          Initializing Vision...
        </div>
      )}
    </>
  );
}
