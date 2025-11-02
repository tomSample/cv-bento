'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export function MinimalPortfolio() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedRoles, setExpandedRoles] = useState<{ [key: string]: number | null }>({});
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
  
  const toggleRole = (jobIndex: number, roleIndex: number) => {
    setExpandedRoles(prev => ({
      ...prev,
      [jobIndex]: prev[jobIndex] === roleIndex ? null : roleIndex
    }));
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
          
          {/* Mobile & Desktop: Unified Layout */}
          <div className="space-y-12 md:space-y-16 lg:space-y-20">
            {t.raw('experience.jobs').map((job: any, jobIndex: number) => {
              const roles = job.roles || [];
              const hasMultipleRoles = roles.length > 1;
              
              // Calculate timeline range
              const allYears = roles.flatMap((r: any) => [r.start, r.end]);
              const minYear = Math.min(...allYears);
              const maxYear = Math.max(...allYears);
              const yearRange = maxYear - minYear || 1;
              
              return (
                <motion.div
                  key={jobIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: jobIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white md:bg-gray-50 rounded-2xl p-6 md:p-8 border-2 border-gray-100"
                >
                  {/* Company Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{job.company}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                      {job.location && <span>{job.location}</span>}
                      <span className="hidden sm:inline text-gray-300">•</span>
                      <span className="font-medium">{job.period}</span>
                    </div>
                  </div>
                  
                  {/* Multiple Roles with Timeline */}
                  {hasMultipleRoles ? (
                    <div className="space-y-6">
                      {/* Timeline Visualization (Desktop Only) */}
                      <div className="hidden md:block bg-white rounded-xl p-6 border border-gray-200">
                        <div className="mb-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timeline
                        </div>
                        
                        {/* Year markers */}
                        <div className="flex justify-between mb-3 text-xs text-gray-400 font-medium">
                          {Array.from({ length: yearRange + 1 }, (_, i) => minYear + i).map(year => (
                            <div key={year} className="flex-1 text-center">{year}</div>
                          ))}
                        </div>
                        
                        {/* Timeline bars */}
                        <div className="space-y-3">
                          {roles.map((role: any, roleIndex: number) => {
                            const startOffset = ((role.start - minYear) / yearRange) * 100;
                            const duration = ((role.end - role.start) / yearRange) * 100;
                            
                            // Palette de couleurs distinctes pour chaque mission
                            const colorSchemes = [
                              { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-200', skillBg: 'bg-blue-50', dateBg: 'bg-blue-100', hover: 'hover:bg-blue-600' },
                              { bg: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-200', skillBg: 'bg-emerald-50', dateBg: 'bg-emerald-100', hover: 'hover:bg-emerald-600' },
                              { bg: 'bg-violet-500', text: 'text-violet-700', border: 'border-violet-200', skillBg: 'bg-violet-50', dateBg: 'bg-violet-100', hover: 'hover:bg-violet-600' },
                              { bg: 'bg-orange-500', text: 'text-orange-700', border: 'border-orange-200', skillBg: 'bg-orange-50', dateBg: 'bg-orange-100', hover: 'hover:bg-orange-600' },
                              { bg: 'bg-pink-500', text: 'text-pink-700', border: 'border-pink-200', skillBg: 'bg-pink-50', dateBg: 'bg-pink-100', hover: 'hover:bg-pink-600' },
                            ];
                            const colorScheme = colorSchemes[roleIndex % colorSchemes.length];
                            const isExpanded = expandedRoles[jobIndex] === roleIndex;
                            
                            return (
                              <div key={roleIndex} className="space-y-2">
                                <button
                                  onClick={() => toggleRole(jobIndex, roleIndex)}
                                  className="w-full flex items-center gap-3 cursor-pointer group"
                                >
                                  <div className="w-32 flex-shrink-0">
                                    <div className="text-xs font-medium text-gray-700 truncate group-hover:text-gray-900 group-hover:font-bold transition-all" title={role.title}>
                                      {role.title}
                                    </div>
                                  </div>
                                  <div className="flex-1 relative h-8 bg-gray-100 rounded-lg overflow-hidden transition-all">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${duration}%` }}
                                      transition={{ duration: 0.8, delay: roleIndex * 0.1 }}
                                      viewport={{ once: true }}
                                      className={`absolute h-full ${colorScheme.bg} ${colorScheme.hover} rounded-lg transition-colors`}
                                      style={{ left: `${startOffset}%` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white group-hover:font-bold transition-all" style={{ left: `${startOffset}%`, width: `${duration}%` }}>
                                      {role.start} - {role.end}
                                    </div>
                                  </div>
                                </button>
                                
                                {/* Accordéon avec détails de la mission */}
                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                                      className="overflow-hidden"
                                    >
                                      <div className={`ml-[8.5rem] bg-white border-2 ${colorScheme.border} rounded-xl p-5 mt-2`}>
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                          <h4 className="text-lg font-bold text-gray-900 flex-1">{role.title}</h4>
                                          <span className={`${colorScheme.dateBg} ${colorScheme.text} px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap`}>
                                            {role.start} - {role.end}
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{role.description}</p>
                                        
                                        {/* Skills tags */}
                                        {role.skills && role.skills.length > 0 && (
                                          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                                            {role.skills.map((skill: string, skillIdx: number) => (
                                              <span
                                                key={skillIdx}
                                                className={`px-2.5 py-1 ${colorScheme.skillBg} ${colorScheme.text} text-xs font-medium rounded-md border ${colorScheme.border}`}
                                              >
                                                {skill}
                                              </span>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Mobile: Simple list with accordion */}
                      <div className="md:hidden space-y-3">
                        {roles.map((role: any, roleIndex: number) => {
                          const colorSchemes = [
                            { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-200', skillBg: 'bg-blue-50', dateBg: 'bg-blue-100', hover: 'hover:bg-blue-600' },
                            { bg: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-200', skillBg: 'bg-emerald-50', dateBg: 'bg-emerald-100', hover: 'hover:bg-emerald-600' },
                            { bg: 'bg-violet-500', text: 'text-violet-700', border: 'border-violet-200', skillBg: 'bg-violet-50', dateBg: 'bg-violet-100', hover: 'hover:bg-violet-600' },
                            { bg: 'bg-orange-500', text: 'text-orange-700', border: 'border-orange-200', skillBg: 'bg-orange-50', dateBg: 'bg-orange-100', hover: 'hover:bg-orange-600' },
                            { bg: 'bg-pink-500', text: 'text-pink-700', border: 'border-pink-200', skillBg: 'bg-pink-50', dateBg: 'bg-pink-100', hover: 'hover:bg-pink-600' },
                          ];
                          const colorScheme = colorSchemes[roleIndex % colorSchemes.length];
                          const isExpanded = expandedRoles[jobIndex] === roleIndex;
                          
                          return (
                            <div key={roleIndex} className="space-y-2">
                              <button
                                onClick={() => toggleRole(jobIndex, roleIndex)}
                                className={`w-full text-left px-4 py-3 ${colorScheme.bg} rounded-lg ${colorScheme.hover} transition-colors`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex-1">
                                    <div className="text-sm font-bold text-white">{role.title}</div>
                                  </div>
                                  <span className="bg-white/20 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                                    {role.start} - {role.end}
                                  </span>
                                </div>
                              </button>
                              
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                  >
                                    <div className={`bg-white border-2 ${colorScheme.border} rounded-xl p-5`}>
                                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{role.description}</p>
                                      
                                      {role.skills && role.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                                          {role.skills.map((skill: string, skillIdx: number) => (
                                            <span
                                              key={skillIdx}
                                              className={`px-2.5 py-1 ${colorScheme.skillBg} ${colorScheme.text} text-xs font-medium rounded-md border ${colorScheme.border}`}
                                            >
                                              {skill}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Single Role */
                    <div className="border-l-4 border-blue-500 pl-6">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className="text-xl font-bold flex-1">{roles[0]?.title}</h4>
                        <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap">
                          {roles[0]?.start} - {roles[0]?.end}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">{roles[0]?.description}</p>
                      
                      {/* Skills tags */}
                      {roles[0]?.skills && roles[0].skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4">
                          {roles[0].skills.map((skill: string, skillIdx: number) => (
                            <span
                              key={skillIdx}
                              className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
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
