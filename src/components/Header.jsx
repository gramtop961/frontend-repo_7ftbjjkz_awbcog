import { useEffect, useMemo, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = height > 0 ? (scrollTop / height) * 100 : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

function useTheme() {
  const prefersDark = useMemo(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    []
  );
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

export default function Header() {
  const progress = useScrollProgress();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const NavLinks = (
    <ul className="flex flex-col lg:flex-row gap-2 lg:gap-6 text-sm font-medium">
      {[
        { href: '#work', label: 'Work' },
        { href: '#services', label: 'Services' },
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' },
      ].map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            className="px-3 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 underline-offset-4 hover:underline"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white grid place-items-center font-bold shadow-sm group-hover:shadow transition-shadow">F</div>
            <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">[Your Name]</span>
          </a>

          <nav className="hidden lg:block" aria-label="Primary">
            {NavLinks}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              className="lg:hidden p-2 rounded-md border border-neutral-200 dark:border-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Toggle menu"
              onClick={() => setOpen((s) => !s)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 px-4 py-3 bg-white dark:bg-neutral-900">
          {NavLinks}
        </div>
      )}

      <div className="h-0.5 w-full bg-neutral-200/60 dark:bg-neutral-800/80">
        <div
          className="h-0.5 bg-indigo-600 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      </div>
    </header>
  );
}
