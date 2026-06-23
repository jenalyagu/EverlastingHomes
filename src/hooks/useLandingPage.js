import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLandingPage() {
  const bgRef = useRef(null); // hero background for parallax

  useEffect(() => {
    // ── Lenis smooth scroll ──────────────────────────────
    const lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = time => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // ── Entrance animations (.land-reveal) ──────────────
    const reveals = document.querySelectorAll('.land-reveal');
    reveals.forEach(el => {
      gsap.fromTo(el,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // ── Stagger children (.land-stagger > *) ────────────
    const staggerParents = document.querySelectorAll('.land-stagger');
    staggerParents.forEach(parent => {
      const children = parent.children;
      gsap.fromTo(children,
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: parent,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // ── Hero background parallax ─────────────────────────
    const heroBg = bgRef.current;
    if (heroBg) {
      gsap.to(heroBg, {
        y: '25%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroBg.parentElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // ── Scroll progress bar ──────────────────────────────
    const bar = document.getElementById('scroll-progress-bar');
    if (bar) {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 0.1 },
      });
    }

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return { bgRef };
}
