import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PROJECTS = [
  // Graphic Design
  {
    id: 'editorial-contrast-calm',
    title: 'Editorial Series: Contrast & Calm',
    category: 'Graphic Design',
    summary: 'Minimal editorial spreads balancing striking contrast with quiet rhythm.',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'poster-neon-nights',
    title: 'Poster Set: Neon Nights',
    category: 'Graphic Design',
    summary: 'A bold, chromatic poster triptych exploring light in motion.',
    img: 'https://images.unsplash.com/photo-1541870730196-cd1efcbf5646?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'social-fresh-brew',
    title: 'Social Campaign: Fresh Brew',
    category: 'Graphic Design',
    summary: 'Cohesive social templates for a craft coffee launch.',
    img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop',
  },
  // Video Editing
  {
    id: 'brand-film-beyond-blueprint',
    title: 'Brand Film: Beyond the Blueprint',
    category: 'Video Editing',
    summary: 'A cinematic brand story cut to emphasize craft and scale.',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'product-teaser-kinetic-light',
    title: 'Product Teaser: Kinetic Light',
    category: 'Video Editing',
    summary: 'Fast cuts and rhythmic typography for a futuristic teaser.',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'city-in-90',
    title: 'City in 90 Seconds',
    category: 'Video Editing',
    summary: 'Energetic travel montage with tonal pacing and texture.',
    img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop',
  },
  // Logo & Branding
  {
    id: 'brand-identity-solstice',
    title: 'Brand Identity: Solstice Studio',
    category: 'Logo & Branding',
    summary: 'Warm, modular identity system for a boutique creative team.',
    img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'rebrand-northwind-coffee',
    title: 'Rebrand: Northwind Coffee',
    category: 'Logo & Branding',
    summary: 'Crisp typographic rebrand with a flexible packaging grid.',
    img: 'https://images.unsplash.com/photo-1519336555923-59661f33f257?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'logo-system-drift-athletics',
    title: 'Logo System: Drift Athletics',
    category: 'Logo & Branding',
    summary: 'Motion-first logo suite designed for digital surfaces.',
    img: 'https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?q=80&w=1600&auto=format&fit=crop',
  },
  // Animation
  {
    id: 'explainer-cloudcraft',
    title: 'Explainer: CloudCraft',
    category: 'Animation',
    summary: 'Friendly vector animation with subtle depth and ease.',
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'icon-micro-anim-pack',
    title: 'Icon Micro-Animations Pack',
    category: 'Animation',
    summary: 'A library of polished icon loops for product UI.',
    img: 'https://images.unsplash.com/photo-1529686342340-35b9cfd5d6b0?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'title-sequence-aurora',
    title: 'Title Sequence: Aurora',
    category: 'Animation',
    summary: 'Atmospheric title open with layered gradients and grain.',
    img: 'https://images.unsplash.com/photo-1517867065801-e0d979d15851?q=80&w=1600&auto=format&fit=crop',
  },
];

const CATEGORIES = ['All', 'Graphic Design', 'Video Editing', 'Logo & Branding', 'Animation'];

export default function Work() {
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="work" className="relative py-16 md:py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-50 to-transparent dark:from-neutral-900" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-baseline justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">Selected Work</h2>
        </div>

        <div className="sticky top-16 z-30 bg-white/75 dark:bg-neutral-900/75 backdrop-blur rounded-md border border-neutral-200 dark:border-neutral-800 p-2 overflow-x-auto [-webkit-overflow-scrolling:touch]">
          <div role="tablist" aria-label="Filter projects" className="flex gap-2 min-w-max">
            {CATEGORIES.map((c) => {
              const active = c === filter;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    active
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence initial={false}>
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 hover:shadow-md transition-shadow focus-within:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover will-change-transform transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <h3>
                    <a
                      href={`#project-${p.id}`}
                      className="inline-flex items-center gap-1 text-neutral-900 dark:text-neutral-50 font-semibold underline-offset-4 decoration-transparent group-hover:decoration-indigo-600 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors"
                    >
                      {p.title}
                    </a>
                  </h3>
                  <div className="mt-1 text-xs text-neutral-500">{p.category}</div>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{p.summary}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
