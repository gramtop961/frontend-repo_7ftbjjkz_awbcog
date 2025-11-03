import { Mail, Instagram, Linkedin, Youtube, Github } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white grid place-items-center font-bold">F</div>
            <div>
              <div className="font-semibold text-neutral-900 dark:text-neutral-50">[Your Name]</div>
              <div className="text-sm text-neutral-500">Designer & Editor</div>
            </div>
          </div>
          <nav aria-label="Footer" className="flex gap-4 text-sm">
            <a href="#work" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline-offset-4 hover:underline">Work</a>
            <a href="#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline-offset-4 hover:underline">Services</a>
            <a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline-offset-4 hover:underline">About</a>
            <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline-offset-4 hover:underline">Contact</a>
          </nav>
          <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300">
            <a href="mailto:hello@example.com" aria-label="Email" className="hover:text-indigo-600 dark:hover:text-indigo-400"><Mail className="w-5 h-5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-indigo-600 dark:hover:text-indigo-400"><Instagram className="w-5 h-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-indigo-600 dark:hover:text-indigo-400"><Linkedin className="w-5 h-5" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-indigo-600 dark:hover:text-indigo-400"><Youtube className="w-5 h-5" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-indigo-600 dark:hover:text-indigo-400"><Github className="w-5 h-5" /></a>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between text-xs text-neutral-500">
          <p>© {year} [Your Name]. All rights reserved.</p>
          <p>
            Made with <span className="font-semibold text-neutral-800 dark:text-neutral-200">flames.blue</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
