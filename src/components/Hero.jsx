export default function Hero() {
  return (
    <section id="top" className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-950" />
        <svg
          className="absolute -right-24 -top-24 w-[480px] h-[480px] opacity-30 dark:opacity-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <path fill="url(#g)" d="M49.4,-64.7C61.7,-55.5,67.3,-38.4,71.2,-21.9C75.2,-5.4,77.4,10.4,73.2,24.3C69.1,38.3,58.6,50.4,45.6,59.4C32.6,68.5,16.3,74.5,-0.8,75.6C-18,76.7,-35.9,72.9,-48.6,62.6C-61.4,52.2,-69,35.4,-72.6,18.2C-76.1,1.1,-75.6,-16.4,-68.9,-29.8C-62.2,-43.1,-49.3,-52.4,-35.6,-61.2C-22,-70,-11,-78.3,2.4,-81.7C15.9,-85.1,31.8,-83.8,49.4,-64.7Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
              [Your Name] — Design, Editing, Branding, Animation.
            </h1>
            <p className="mt-4 md:mt-6 text-neutral-600 dark:text-neutral-300 text-lg md:text-xl max-w-2xl">
              Clean, fast portfolio. No 3D, no heavy effects — just the work.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#work" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-indigo-600 text-white font-semibold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                View Work
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
