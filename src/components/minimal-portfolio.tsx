'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export function MinimalPortfolio() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Parallax for hero title
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  
  // Smooth spring animation
  const smoothY = useSpring(heroY, { stiffness: 100, damping: 30 });

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section id="hero" className="min-h-[60vh] md:min-h-screen flex items-center justify-center px-6 md:px-12 pt-12 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl w-full"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 mb-6 md:mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-20 h-20 md:w-32 md:h-32"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center text-3xl md:text-5xl font-bold text-gray-600">
                JD
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-black/10"></div>
            </motion.div>
          </div>
          
          <motion.h1 
            style={{ y: smoothY, scale: heroScale }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 md:mb-8 leading-[0.9] tracking-[-0.02em]"
          >
            <span className="text-blue-600">{t('hero.name').split(' ')[0]}</span>
            {' '}
            <span className="text-black">{t('hero.name').split(' ').slice(1).join(' ')}</span>
          </motion.h1>
          
          <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-gray-600 mb-8 md:mb-12 max-w-3xl leading-[1.4] font-light">
            {t('hero.title')}
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 min-h-[44px] bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none inline-flex items-center gap-2"
            >
              {t('hero.cta.hire')}
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
            
            <button
              onClick={() => scrollToSection('work')}
              className="minimal-underline text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              {t('hero.cta.work')}
            </button>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="flex items-center px-6 md:px-12 py-12 md:py-24 lg:py-32">
        <div className="max-w-6xl w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12"
          >
            {t('about.title')}
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6"
            >
              <p className="text-base md:text-xl text-gray-600 leading-[1.7]">
                {t('about.intro')}
              </p>
              
              <p className="text-sm md:text-lg text-gray-600 leading-[1.8]">
                {t('about.description')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-blue-600">5+</div>
                  <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">{t('about.stats.experience')}</div>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-blue-600">50+</div>
                  <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">{t('about.stats.projects')}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="work" className="px-6 md:px-12 py-12 md:py-24 lg:py-32">
        <div className="max-w-6xl w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-16 lg:mb-20 leading-[1.1] tracking-tight"
          >
            {t('experience.title')}
          </motion.h2>
          
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden -mx-6 px-6">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
              {t.raw('experience.jobs').map((job: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-[85vw] snap-start"
                >
                  <div className="bg-gray-50 rounded-2xl p-6 h-full border-2 border-gray-100">
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-4">
                      {job.year}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">
                      {job.role}
                    </h3>
                    <p className="text-gray-600 font-medium mb-4">{job.company}</p>
                    
                    <p className="text-sm text-gray-500 leading-[1.7]">
                      {job.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {t.raw('experience.jobs').map((_: any, index: number) => (
                <div key={index} className="w-2 h-2 rounded-full bg-blue-300 first:bg-blue-600"></div>
              ))}
            </div>
          </div>
          
          {/* Desktop: Timeline */}
          <div className="hidden md:block relative space-y-16 lg:space-y-24">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-[calc(25%-0.5px)] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-blue-300 to-blue-100" />
            
            {t.raw('experience.jobs').map((job: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-[calc(25%-6px)] top-8 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                
                <div className="grid md:grid-cols-4 gap-6 md:gap-8">
                  <div className="flex items-start gap-4">
                    <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                      {job.year}
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 space-y-3 md:space-y-4 pl-6 md:pl-8">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        {job.role}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 font-medium">{job.company}</p>
                    </div>
                    
                    <p className="text-sm md:text-base text-gray-500 leading-[1.7]">
                      {job.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-16 lg:mb-20 leading-[1.1] tracking-tight px-6 md:px-12"
          >
            {t('skills.title')}
          </motion.h2>
          
          {/* Mobile: Compact Grid */}
          <div className="md:hidden px-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-blue-600 mb-4 font-medium">{t('skills.categories.frontend')}</h3>
              <div className="flex flex-wrap gap-2">
                {t.raw('skills.items.frontend').map((skill: string, idx: number) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    viewport={{ once: true }}
                    className="px-3 py-1.5 bg-white border-2 border-blue-200 rounded-full text-xs font-medium text-gray-900"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-blue-600 mb-4 font-medium">{t('skills.categories.backend')}</h3>
              <div className="flex flex-wrap gap-2">
                {t.raw('skills.items.backend').map((skill: string, idx: number) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    viewport={{ once: true }}
                    className="px-3 py-1.5 bg-white border-2 border-blue-200 rounded-full text-xs font-medium text-gray-900"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-blue-600 mb-4 font-medium">{t('skills.categories.tools')}</h3>
              <div className="flex flex-wrap gap-2">
                {t.raw('skills.items.tools').map((skill: string, idx: number) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    viewport={{ once: true }}
                    className="px-3 py-1.5 bg-white border-2 border-blue-200 rounded-full text-xs font-medium text-gray-900"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Desktop: Wrapped Badges */}
          <div className="hidden md:block px-12 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-[0.2em] text-blue-600 mb-6 font-medium">{t('skills.categories.frontend')}</h3>
              <div className="flex flex-wrap gap-3">
                {t.raw('skills.items.frontend').map((skill: string, idx: number) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-white border-2 border-blue-200 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-[0.2em] text-blue-600 mb-6 font-medium">{t('skills.categories.backend')}</h3>
              <div className="flex flex-wrap gap-3">
                {t.raw('skills.items.backend').map((skill: string, idx: number) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-white border-2 border-blue-200 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-[0.2em] text-blue-600 mb-6 font-medium">{t('skills.categories.tools')}</h3>
              <div className="flex flex-wrap gap-3">
                {t.raw('skills.items.tools').map((skill: string, idx: number) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-white border-2 border-blue-200 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="flex items-center px-6 md:px-12 py-12 md:py-24 lg:py-32">
        <div className="max-w-6xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12">{t('contact.title')}</h2>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-10 md:mb-16 max-w-2xl">
              {t('contact.subtitle')}
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <motion.a 
                href="mailto:jean@example.com"
                className="group flex items-center gap-3 md:gap-4 text-lg md:text-xl lg:text-2xl font-medium hover:translate-x-2 transition-all text-gray-900 hover:text-blue-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-blue-600" />
                <span className="break-all">jean@example.com</span>
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-blue-600" />
              </motion.a>
              
              <motion.a 
                href="https://github.com"
                className="group flex items-center gap-3 md:gap-4 text-lg md:text-xl lg:text-2xl font-medium hover:translate-x-2 transition-all text-gray-900 hover:text-blue-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-blue-600" />
                <span>GitHub</span>
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-blue-600" />
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com"
                className="group flex items-center gap-3 md:gap-4 text-lg md:text-xl lg:text-2xl font-medium hover:translate-x-2 transition-all text-gray-900 hover:text-blue-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-blue-600" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-blue-600" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-gray-200">
        <div className="max-w-6xl w-full mx-auto flex justify-between items-center text-sm text-gray-500">
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.built')}</p>
        </div>
      </footer>
    </div>
  );
}
