'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, Send, Sparkles, Heart, Lightbulb, Users } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export function MinimalPortfolio() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [expandedRoles, setExpandedRoles] = useState<{ [key: string]: number | null }>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero scroll progress
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Contact scroll progress
  const { scrollYProgress: contactScrollProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Parallax for hero title
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  
  // Smooth spring animation
  const smoothY = useSpring(heroY, { stiffness: 100, damping: 30 });

  // Wave animations based on scroll
  const heroWaveY = useTransform(heroScrollProgress, [0, 1], [0, 300]);
  const contactWaveY = useTransform(contactScrollProgress, [0, 1], [-100, 100]);

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulation d'envoi (remplacer par vraie API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormStatus('success');
    setFormState({ name: '', email: '', message: '' });
    
    setTimeout(() => setFormStatus('idle'), 5000);
  };
  
  // Détection prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center px-6 md:px-12 pt-4 md:pt-0 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Animated Wave Background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Wave Layer 1 - Emerald */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2"
            style={{ y: heroWaveY }}
          >
            <svg className="absolute bottom-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <motion.path
                fill="rgba(167, 243, 208, 0.6)"
                d="M0,160 C320,100 420,220 720,160 C1020,100 1120,220 1440,160 L1440,320 L0,320 Z"
                initial={{ d: "M0,160 C320,100 420,220 720,160 C1020,100 1120,220 1440,160 L1440,320 L0,320 Z" }}
                animate={{ 
                  d: [
                    "M0,160 C320,100 420,220 720,160 C1020,100 1120,220 1440,160 L1440,320 L0,320 Z",
                    "M0,180 C320,120 420,240 720,180 C1020,120 1120,240 1440,180 L1440,320 L0,320 Z",
                    "M0,160 C320,100 420,220 720,160 C1020,100 1120,220 1440,160 L1440,320 L0,320 Z"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>

          {/* Wave Layer 2 - Violet */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2"
            style={{ y: useTransform(heroWaveY, (v) => v * 0.7) }}
          >
            <svg className="absolute bottom-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <motion.path
                fill="rgba(221, 214, 254, 0.5)"
                d="M0,200 C360,140 480,260 840,200 C1200,140 1320,260 1440,200 L1440,320 L0,320 Z"
                initial={{ d: "M0,200 C360,140 480,260 840,200 C1200,140 1320,260 1440,200 L1440,320 L0,320 Z" }}
                animate={{ 
                  d: [
                    "M0,200 C360,140 480,260 840,200 C1200,140 1320,260 1440,200 L1440,320 L0,320 Z",
                    "M0,220 C360,160 480,280 840,220 C1200,160 1320,280 1440,220 L1440,320 L0,320 Z",
                    "M0,200 C360,140 480,260 840,200 C1200,140 1320,260 1440,200 L1440,320 L0,320 Z"
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </svg>
          </motion.div>

          {/* Wave Layer 3 - Orange */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2"
            style={{ y: useTransform(heroWaveY, (v) => v * 0.5) }}
          >
            <svg className="absolute bottom-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <motion.path
                fill="rgba(254, 215, 170, 0.4)"
                d="M0,240 C400,180 500,300 900,240 C1300,180 1400,300 1440,240 L1440,320 L0,320 Z"
                initial={{ d: "M0,240 C400,180 500,300 900,240 C1300,180 1400,300 1440,240 L1440,320 L0,320 Z" }}
                animate={{ 
                  d: [
                    "M0,240 C400,180 500,300 900,240 C1300,180 1400,300 1440,240 L1440,320 L0,320 Z",
                    "M0,250 C400,190 500,310 900,250 C1300,190 1400,310 1440,250 L1440,320 L0,320 Z",
                    "M0,240 C400,180 500,300 900,240 C1300,180 1400,300 1440,240 L1440,320 L0,320 Z"
                  ]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </svg>
          </motion.div>

          {/* Wave Layer 4 - Pink */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2"
            style={{ y: useTransform(heroWaveY, (v) => v * 0.3) }}
          >
            <svg className="absolute bottom-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <motion.path
                fill="rgba(251, 207, 232, 0.3)"
                d="M0,270 C380,230 520,290 960,270 C1400,250 1440,310 1440,290 L1440,320 L0,320 Z"
                initial={{ d: "M0,270 C380,230 520,290 960,270 C1400,250 1440,310 1440,290 L1440,320 L0,320 Z" }}
                animate={{ 
                  d: [
                    "M0,270 C380,230 520,290 960,270 C1400,250 1440,310 1440,290 L1440,320 L0,320 Z",
                    "M0,280 C380,240 520,300 960,280 C1400,260 1440,320 1440,300 L1440,320 L0,320 Z",
                    "M0,270 C380,230 520,290 960,270 C1400,250 1440,310 1440,290 L1440,320 L0,320 Z"
                  ]
                }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              />
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl w-full relative z-10"
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
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              className="px-8 py-4 min-h-[44px] bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none inline-flex items-center gap-2"
              aria-label="Naviguer vers la section contact pour m'embaucher"
            >
              {t('hero.cta.hire')}
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </motion.button>
            
            <button
              onClick={() => scrollToSection('work')}
              className="minimal-underline text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors min-h-[44px] inline-flex items-center"
              aria-label="Naviguer vers la section expérience"
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
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-6 md:gap-8 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-blue-600">5+</div>
                  <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">{t('about.stats.experience')}</div>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-blue-600">50+</div>
                  <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">{t('about.stats.projects')}</div>
                </div>
              </div>
              
              {/* Values Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Mes valeurs</h3>
                {t.raw('values.items').map((value: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : idx * 0.1 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <p className="text-sm md:text-base text-gray-800 italic">"{value.quote}"</p>
                    <p className="text-xs text-gray-500 mt-1">— {value.author}</p>
                  </motion.div>
                ))}
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
                      
                      {/* Mobile: Timeline visuelle améliorée */}
                      <div className="md:hidden space-y-4">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
                          Timeline des missions
                        </div>
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
                                className={`w-full text-left px-4 py-4 ${colorScheme.bg} rounded-xl ${colorScheme.hover} transition-all shadow-md min-h-[56px]`}
                                aria-expanded={isExpanded}
                                aria-controls={`role-details-${jobIndex}-${roleIndex}`}
                              >
                                <div className="flex items-start justify-between gap-3 mb-2">
                                  <div className="flex-1">
                                    <div className="text-base font-bold text-white mb-1">{role.title}</div>
                                    <div className="flex items-center gap-2">
                                      <span className="bg-white/30 text-white px-2 py-0.5 rounded text-xs font-semibold">
                                        {role.start}
                                      </span>
                                      <span className="text-white/80 text-xs">→</span>
                                      <span className="bg-white/30 text-white px-2 py-0.5 rounded text-xs font-semibold">
                                        {role.end}
                                      </span>
                                    </div>
                                  </div>
                                  <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-white flex-shrink-0"
                                    aria-hidden="true"
                                  >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </motion.div>
                                </div>
                              </button>
                              
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    id={`role-details-${jobIndex}-${roleIndex}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
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

      {/* Projects & Passions Section */}
      <section id="projects" className="px-6 md:px-12 py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t('projects.title')}</h2>
            <p className="text-lg md:text-xl text-gray-600">{t('projects.subtitle')}</p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {t.raw('projects.items').map((project: any, idx: number) => {
              const colorSchemes = [
                { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-200', bgLight: 'bg-blue-50', icon: Sparkles },
                { bg: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-200', bgLight: 'bg-emerald-50', icon: Heart },
                { bg: 'bg-violet-500', text: 'text-violet-700', border: 'border-violet-200', bgLight: 'bg-violet-50', icon: Users },
                { bg: 'bg-orange-500', text: 'text-orange-700', border: 'border-orange-200', bgLight: 'bg-orange-50', icon: Lightbulb },
              ];
              const colorScheme = colorSchemes[idx % colorSchemes.length];
              const Icon = colorScheme.icon;
              
              return (
                <motion.a
                  key={idx}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`group bg-white border-2 ${colorScheme.border} rounded-2xl p-6 transition-all cursor-pointer`}
                  aria-label={`Voir le projet ${project.title}`}
                >
                  <div className={`w-12 h-12 ${colorScheme.bgLight} rounded-xl flex items-center justify-center mb-4 ${colorScheme.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-white`} aria-hidden="true" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string, tagIdx: number) => (
                      <span
                        key={tagIdx}
                        className={`px-2 py-1 ${colorScheme.bgLight} ${colorScheme.text} text-xs font-medium rounded-md`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <ArrowUpRight className={`w-5 h-5 ${colorScheme.text} mt-4 opacity-0 group-hover:opacity-100 transition-opacity`} aria-hidden="true" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="relative px-6 md:px-12 py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Animated Wave Background for Contact */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Wave Layer 1 - Emerald */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2"
            style={{ y: contactWaveY }}
          >
            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <motion.path
                fill="rgba(167, 243, 208, 0.6)"
                d="M0,160 C320,100 420,220 720,160 C1020,100 1120,220 1440,160 L1440,0 L0,0 Z"
                initial={{ d: "M0,160 C320,100 420,220 720,160 C1020,100 1120,220 1440,160 L1440,0 L0,0 Z" }}
                animate={{ 
                  d: [
                    "M0,160 C320,100 420,220 720,160 C1020,100 1120,220 1440,160 L1440,0 L0,0 Z",
                    "M0,180 C320,120 420,240 720,180 C1020,120 1120,240 1440,180 L1440,0 L0,0 Z",
                    "M0,160 C320,100 420,220 720,160 C1020,100 1120,220 1440,160 L1440,0 L0,0 Z"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>

          {/* Wave Layer 2 - Violet */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2"
            style={{ y: useTransform(contactWaveY, (v) => v * 0.7) }}
          >
            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <motion.path
                fill="rgba(221, 214, 254, 0.5)"
                d="M0,120 C360,60 480,180 840,120 C1200,60 1320,180 1440,120 L1440,0 L0,0 Z"
                initial={{ d: "M0,120 C360,60 480,180 840,120 C1200,60 1320,180 1440,120 L1440,0 L0,0 Z" }}
                animate={{ 
                  d: [
                    "M0,120 C360,60 480,180 840,120 C1200,60 1320,180 1440,120 L1440,0 L0,0 Z",
                    "M0,140 C360,80 480,200 840,140 C1200,80 1320,200 1440,140 L1440,0 L0,0 Z",
                    "M0,120 C360,60 480,180 840,120 C1200,60 1320,180 1440,120 L1440,0 L0,0 Z"
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </svg>
          </motion.div>

          {/* Wave Layer 3 - Orange */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2"
            style={{ y: useTransform(contactWaveY, (v) => v * 0.5) }}
          >
            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <motion.path
                fill="rgba(254, 215, 170, 0.4)"
                d="M0,80 C400,20 500,140 900,80 C1300,20 1400,140 1440,80 L1440,0 L0,0 Z"
                initial={{ d: "M0,80 C400,20 500,140 900,80 C1300,20 1400,140 1440,80 L1440,0 L0,0 Z" }}
                animate={{ 
                  d: [
                    "M0,80 C400,20 500,140 900,80 C1300,20 1400,140 1440,80 L1440,0 L0,0 Z",
                    "M0,90 C400,30 500,150 900,90 C1300,30 1400,150 1440,90 L1440,0 L0,0 Z",
                    "M0,80 C400,20 500,140 900,80 C1300,20 1400,140 1440,80 L1440,0 L0,0 Z"
                  ]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </svg>
          </motion.div>

          {/* Wave Layer 4 - Pink */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2"
            style={{ y: useTransform(contactWaveY, (v) => v * 0.3) }}
          >
            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <motion.path
                fill="rgba(251, 207, 232, 0.3)"
                d="M0,50 C380,10 520,90 960,50 C1400,10 1440,90 1440,50 L1440,0 L0,0 Z"
                initial={{ d: "M0,50 C380,10 520,90 960,50 C1400,10 1440,90 1440,50 L1440,0 L0,0 Z" }}
                animate={{ 
                  d: [
                    "M0,50 C380,10 520,90 960,50 C1400,10 1440,90 1440,50 L1440,0 L0,0 Z",
                    "M0,60 C380,20 520,100 960,60 C1400,20 1440,100 1440,60 L1440,0 L0,0 Z",
                    "M0,50 C380,10 520,90 960,50 C1400,10 1440,90 1440,50 L1440,0 L0,0 Z"
                  ]
                }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              />
            </svg>
          </motion.div>
        </div>

        <div className="max-w-6xl w-full mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12">{t('contact.title')}</h2>
            
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {/* Contact Info */}
              <div>
                <p className="text-lg md:text-xl text-gray-600 mb-10">
                  {t('contact.subtitle')}
                </p>
                
                <div className="space-y-4 md:space-y-6">
                  <motion.a 
                    href="mailto:jean@example.com"
                    className="group flex items-center gap-3 md:gap-4 text-lg md:text-xl font-medium hover:translate-x-2 transition-all text-gray-900 hover:text-blue-600 min-h-[44px]"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    aria-label="Envoyer un email à jean@example.com"
                  >
                    <Mail className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-blue-600" aria-hidden="true" />
                    <span className="break-all">jean@example.com</span>
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-blue-600" aria-hidden="true" />
                  </motion.a>
                  
                  <motion.a 
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 md:gap-4 text-lg md:text-xl font-medium hover:translate-x-2 transition-all text-gray-900 hover:text-blue-600 min-h-[44px]"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    aria-label="Visiter mon profil GitHub"
                  >
                    <Github className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-blue-600" aria-hidden="true" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-blue-600" aria-hidden="true" />
                  </motion.a>
                  
                  <motion.a 
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 md:gap-4 text-lg md:text-xl font-medium hover:translate-x-2 transition-all text-gray-900 hover:text-blue-600 min-h-[44px]"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    aria-label="Visiter mon profil LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-blue-600" aria-hidden="true" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-blue-600" aria-hidden="true" />
                  </motion.a>
                </div>
              </div>
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
                viewport={{ once: true }}
              >
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulaire de contact">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 min-h-[44px] border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors"
                      aria-required="true"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 min-h-[44px] border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors"
                      aria-required="true"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors resize-none"
                      aria-required="true"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full px-8 py-4 min-h-[44px] bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none inline-flex items-center justify-center gap-2 cursor-pointer"
                    aria-label={formStatus === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          aria-hidden="true"
                        />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.form.submit')}
                        <Send className="w-5 h-5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {formStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg text-emerald-700 text-sm"
                        role="alert"
                        aria-live="polite"
                      >
                        {t('contact.form.success')}
                      </motion.div>
                    )}
                    
                    {formStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm"
                        role="alert"
                        aria-live="polite"
                      >
                        {t('contact.form.error')}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
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
