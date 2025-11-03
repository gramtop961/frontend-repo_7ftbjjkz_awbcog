import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const shapesRef = useRef(null);
  const rafRef = useRef(0);
  const activeRef = useRef(false);

  useEffect(() => {
    const container = shapesRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          activeRef.current = e.isIntersecting;
        });
      },
      { root: null, threshold: 0.01 }
    );
    obs.observe(container);

    const onMouse = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const max = 12; // px
      container.style.setProperty('--mx', `${dx * max}px`);
      container.style.setProperty('--my', `${dy * max}px`);
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    const update = () => {
      if (activeRef.current) {
        const y = window.scrollY;
        const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
        const t1 = clamp(-(y * 0.10), -80, 80);
        const t2 = clamp(-(y * 0.06), -48, 48);
        container.style.setProperty('--p1', `${t1}px`);
        container.style.setProperty('--p2', `${t2}px`);
      }
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouse);
      obs.disconnect();
    };
  }, []);

  return (
    <section id="top" className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-neutral-950 dark:via-neutral-950/50 pointer-events-none" />
      </div>

      <div ref={shapesRef} className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="py-24 md:py-28 lg:py-32">
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

          <div className="pointer-events-none select-none relative">
            <div
              className="absolute -z-0 top-8 right-6 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl will-change-transform"
              style={{ transform: 'translate3d(var(--mx,0), calc(var(--p1, 0)), 0)' }}
            />
            <div
              className="absolute -z-0 top-24 left-0 w-56 h-56 rounded-full bg-indigo-300/10 blur-3xl will-change-transform"
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
