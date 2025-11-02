'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';

const navItems = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'work', labelKey: 'nav.experience' },
  { id: 'contact', labelKey: 'nav.contact' },
];

export function Navigation() {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const currentLocale = params.locale as string;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLocale = () => {
    const newLocale = currentLocale === 'en' ? 'fr' : 'en';
    router.replace('/', { locale: newLocale });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);

      // Detect active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      // If at the very top, set hero as active
      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 z-50 origin-left shadow-lg shadow-blue-500/20"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-8 left-1/2 -translate-x-1/2 z-40">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-1 px-2 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {t(item.labelKey)}
            </button>
          ))}
        </motion.div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-6 left-6 z-50 p-3 rounded-full bg-white border-2 border-blue-200 shadow-lg hover:border-blue-400 hover:bg-blue-50 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5 text-blue-600" /> : <Menu className="w-5 h-5 text-blue-600" />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2 mt-16">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 rounded-lg text-left font-medium transition-all duration-300 min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {t(item.labelKey)}
                  </button>
                ))}
                
                {/* Language Switcher in Mobile Menu */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={toggleLocale}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                    aria-label={`Changer de langue vers ${currentLocale === 'en' ? 'Français' : 'English'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4" aria-hidden="true" />
                      <span className="font-medium">
                        {currentLocale === 'en' ? 'English' : 'Français'}
                      </span>
                    </div>
                    <span className="text-xs uppercase font-semibold px-2 py-1 bg-blue-50 text-blue-600 rounded">
                      {currentLocale}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
    </>
  );
}
