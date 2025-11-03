import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const containerRef = useRef(null);
  const rafRef = useRef(0);
  const activeRef = useRef(false);
  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);

  // Motion utilities
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only enable mouse parallax on devices with fine pointer and no reduced motion
    const enableMouse = window.matchMedia('(pointer: fine)').matches && !prefersReduced;

    const onMouse = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const max = 10; // px, conservative for perf
      container.style.setProperty('--mx', `${dx * max}px`);
      container.style.setProperty('--my', `${dy * max}px`);
    };

    if (enableMouse) {
      window.addEventListener('mousemove', onMouse, { passive: true });
    }

    // Scroll parallax via rAF when in view only
    const update = () => {
      if (activeRef.current && !prefersReduced && document.visibilityState === 'visible') {
        const y = window.scrollY;
        const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
        const t1 = clamp(-(y * 0.08), -48, 48);
        const t2 = clamp(-(y * 0.05), -32, 32);
        container.style.setProperty('--p1', `${t1}px`);
        container.style.setProperty('--p2', `${t2}px`);
      }
      rafRef.current = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          activeRef.current = e.isIntersecting;
          // Defer Spline mounting until hero is actually in view to improve LCP
          if (e.isIntersecting) {
            if (prefersReduced) {
              setShouldRenderSpline(false);
            } else {
              // mount after idle or slight delay to avoid blocking input
              if ('requestIdleCallback' in window) {
                // @ts-ignore
                requestIdleCallback(() => setShouldRenderSpline(true), { timeout: 1500 });
              } else {
                setTimeout(() => setShouldRenderSpline(true), 600);
              }
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    io.observe(container);
    rafRef.current = requestAnimationFrame(update);

    const onVisibility = () => {
      // Pause loop work when tab hidden (handled by check in update)
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      io.disconnect();
      if (enableMouse) window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <section id="top" className="relative min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">
      {/* Background 3D (lazy-mounted) */}
      <div className="absolute inset-0" aria-hidden>
        {shouldRenderSpline && (
          <Spline
            scene="https://prod.spline.design/igThmltzmqv5hkWo/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        )}
        {/* Soft gradient overlay that doesn't block interaction */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-neutral-950 dark:via-neutral-950/60 pointer-events-none" />
      </div>

      {/* Content */}
      <div ref={containerRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="py-20 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
              [Your Name] — Designer & Editor shaping brands with motion and clarity.
            </h1>
            <p className="mt-4 md:mt-6 text-neutral-600 dark:text-neutral-300 text-lg md:text-xl max-w-2xl">
              Graphic Design, Video Editing, Logo & Branding, and Animation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#work" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-indigo-600 text-white font-semibold shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                View Work
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                Get in Touch
              </a>
            </div>
          </div>

          {/* Subtle shapes with parallax (GPU-friendly) */}
          <div className="pointer-events-none select-none relative">
            <div
              className="absolute z-0 top-8 right-6 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl will-change-transform"
              style={{ transform: 'translate3d(var(--mx,0), calc(var(--p1, 0)), 0)' }}
            />
            <div
              className="absolute z-0 top-24 left-0 w-56 h-56 rounded-full bg-indigo-300/10 blur-3xl will-change-transform"
              style={{ transform: 'translate3d(var(--mx,0), calc(var(--p2, 0)), 0)' }}
            />
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-neutral-500">
          <ArrowDown className="w-5 h-5 animate-bounce" />
          <span className="sr-only">Scroll</span>
        </div>
      </div>
    </section>
  );
}
