import { useEffect, useRef } from 'react';

export default function FireEmberParticles({
  particleCount = 55,
  particleColor = '#FF6B35',
  particleColorAlt = '#FFA040',
  minSize = 1.5,
  maxSize = 5,
  speed = 1.1,
  spawnRate = 4,
  fixed = false,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hexRgb = hex => {
      const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : [255, 107, 53];
    };
    const c1 = hexRgb(particleColor);
    const c2 = hexRgb(particleColorAlt);

    let particles = [];
    let lastSpawn = 0;
    let raf;
    let running = true;

    const mkParticle = (scattered = false) => {
      const life = 100 + Math.random() * 80;
      return {
        x: Math.random() * canvas.width,
        y: scattered ? Math.random() * canvas.height : canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.5 * speed,
        vy: -(0.8 + Math.random() * 1.6) * speed,
        life, maxLife: life,
        size: minSize + Math.random() * (maxSize - minSize),
      };
    };

    const setSize = () => {
      const w = fixed ? window.innerWidth : ((canvas.parentElement?.offsetWidth) || window.innerWidth);
      const h = fixed ? Math.round(window.innerHeight * 0.45) : ((canvas.parentElement?.offsetHeight) || window.innerHeight);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        return true;
      }
      return false;
    };

    const draw = ts => {
      if (!running) return;

      // Spawn
      if (ts - lastSpawn > 1000 / spawnRate) {
        if (particles.length < particleCount * 2) {
          for (let i = 0; i < spawnRate; i++) particles.push(mkParticle(false));
        }
        lastSpawn = ts;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        p.vy += 0.008 * speed;
        p.vx += (Math.random() - 0.5) * 0.04;
        if (p.life <= 0 || p.y < -20) return false;

        const alpha = Math.max(0, p.life / p.maxLife);
        const mix = Math.random();
        const r = Math.floor(c1[0] * mix + c2[0] * (1 - mix));
        const g = Math.floor(c1[1] * mix + c2[1] * (1 - mix));
        const b = Math.floor(c1[2] * mix + c2[2] * (1 - mix));

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        if (Math.random() > 0.97) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,240,180,${alpha * 0.9})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        return true;
      });

      raf = requestAnimationFrame(draw);
    };

    // Wait until we have real dimensions before seeding particles
    const init = () => {
      setSize();
      if (canvas.width === 0 || canvas.height === 0) {
        // Not ready yet — try next frame
        raf = requestAnimationFrame(init);
        return;
      }
      // Seed scattered particles so the canvas isn't empty on first frame
      particles = Array.from({ length: particleCount }, () => mkParticle(true));
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
    };

    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(init);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [particleCount, particleColor, particleColorAlt, minSize, maxSize, speed, spawnRate]);

  return (
    <canvas
      ref={canvasRef}
      style={fixed
        ? { position: 'fixed', bottom: 0, left: 0, right: 0, pointerEvents: 'none', zIndex: 50 }
        : { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }
      }
    />
  );
}
