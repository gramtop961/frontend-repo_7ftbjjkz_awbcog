import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Work from './components/Work';
import Footer from './components/Footer';
import { motion, useAnimation } from 'framer-motion';

function Section({ id, title, children, description }) {
  const controls = useAnimation();
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            controls.start({ opacity: 1, y: 0, transition: { duration: prefersReduced ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] } });
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controls, id]);

  return (
    <section id={id} className="relative py-16 md:py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={controls}>
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">{title}</h2>
            {description && (
              <p className="mt-2 text-neutral-600 dark:text-neutral-300">{description}</p>
            )}
          </div>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export default function App() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email';
    if (!form.type) nextErrors.type = 'Please choose a project type';
    if (!form.message.trim()) nextErrors.message = 'Please add a short message';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setForm({ name: '', email: '', type: '', message: '' });
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 scroll-smooth">
      <Header />
      <main>
        <Hero />
        <Work />

        <Section id="services" title="Services" description="Four disciplines—built to move brands with clarity and confidence.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{
              name: 'Graphic Design',
              copy: 'Editorial, campaign, and product design with a sharp typographic core.',
              bullets: ['Editorial layouts', 'Campaign systems', 'Social templates']
            }, {
              name: 'Video Editing',
              copy: 'Narrative-first cuts with pacing, rhythm, and detail-oriented finishing.',
              bullets: ['Brand films', 'Product teasers', 'Doc-style edits']
            }, {
              name: 'Logo & Branding',
              copy: 'Identity systems designed for modern, motion-forward brands.',
              bullets: ['Logo suites', 'Visual language', 'Guidelines']
            }, {
              name: 'Animation',
              copy: 'Tactile motion that guides attention and elevates experience.',
              bullets: ['Explainers', 'Micro-interactions', 'Title sequences']
            }].map((s) => (
              <div key={s.name} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">{s.copy}</p>
                <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-neutral-700 dark:text-neutral-300 list-disc pl-5">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a href="#contact" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-indigo-600 text-white font-semibold shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">Start a project</a>
          </div>
        </Section>

        <Section id="about" title="About" description="Designer & editor focused on purposeful visuals and motion.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" alt="Portrait" className="w-full aspect-square object-cover rounded-lg border border-neutral-200 dark:border-neutral-800" loading="lazy" />
            </div>
            <div className="md:col-span-2 space-y-6">
              <p className="text-neutral-700 dark:text-neutral-300">I help brands communicate with clarity—through strong typography, considered grids, and motion that supports the message. My work spans graphic design, video editing, logo & branding, and animation.</p>
              <div>
                <h3 className="font-semibold">Toolset</h3>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {['Photoshop','Illustrator','After Effects','Premiere Pro','Figma','Blender'].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <a href="#" className="underline underline-offset-4 hover:text-indigo-600 dark:hover:text-indigo-400">Download résumé</a>
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact" title="Contact" description="Tell me about your project—let’s build something clear, confident, and moving.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <form onSubmit={onSubmit} className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                <input id="name" type="text" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input id="email" type="email" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1" htmlFor="type">Project Type</label>
                <select id="type" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="">Select a project type</option>
                  <option>Graphic Design</option>
                  <option>Video Editing</option>
                  <option>Logo & Branding</option>
                  <option>Animation</option>
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
                <textarea id="message" rows={5} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-indigo-600 text-white font-semibold shadow-sm hover:shadow-md transition-shadow">Send</button>
                {submitted && (
                  <span className="ml-3 text-sm text-green-600">Thanks — I’ll get back to you soon.</span>
                )}
              </div>
            </form>

            <div className="md:col-span-1 space-y-4">
              <div>
                <div className="text-sm text-neutral-500">Email</div>
                <a href="mailto:hello@example.com" className="font-medium underline underline-offset-4 hover:text-indigo-600 dark:hover:text-indigo-400">hello@example.com</a>
              </div>
              <div>
                <div className="text-sm text-neutral-500">Social</div>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  {['Behance','Dribbble','YouTube','Instagram','LinkedIn'].map((s) => (
                    <a key={s} href="#" className="underline underline-offset-4 hover:text-indigo-600 dark:hover:text-indigo-400">{s}</a>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">Location</div>
                <div className="mt-1">Remote • Available for select projects</div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 p-3 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-md hover:shadow-lg transition-shadow"
        >
          ↑
        </button>
      )}

      <Footer />
    </div>
  );
}
