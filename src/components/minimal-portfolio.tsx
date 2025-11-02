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

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl w-full"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-24 h-24 md:w-32 md:h-32"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center text-4xl md:text-5xl font-bold text-gray-600">
                JD
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-black/10"></div>
            </motion.div>
            
            <motion.div 
              style={{ opacity }}
              className="flex-1"
            >
              <span className="text-sm tracking-[0.2em] text-gray-500 uppercase font-light">{t('hero.badge')}</span>
            </motion.div>
          </div>
          
          <motion.h1 
            style={{ y: smoothY, scale: heroScale }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.9] tracking-[-0.02em]"
          >
            <span className="bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
              {t('hero.name')}
            </span>
          </motion.h1>
          
          <p className="text-2xl md:text-4xl text-gray-600 mb-12 max-w-3xl leading-[1.4] font-light">
            {t('hero.title')}
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 min-h-[44px] bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none inline-flex items-center gap-2"
            >
              {t('hero.cta.hire')}
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
            
            <a 
              href="#work" 
              className="minimal-underline text-gray-500 font-medium text-sm"
            >
              {t('hero.cta.work')}
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center px-6 md:px-12 py-16 md:py-32">
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">{t('about.title')}</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-600 leading-[1.7]">
              {t('about.intro')}
            </p>
            
            <p className="text-lg text-gray-600 leading-[1.8]">
              {t('about.description')}
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <div className="text-4xl font-bold mb-2">5+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{t('about.stats.experience')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{t('about.stats.projects')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="work" className="px-6 md:px-12 py-16 md:py-32">
        <div className="max-w-6xl w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-20 leading-[1.1] tracking-tight"
          >
            {t('experience.title')}
          </motion.h2>
          
          <div className="relative space-y-24">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-[calc(25%-0.5px)] top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            
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
                <div className="absolute left-0 md:left-[calc(25%-6px)] top-8 w-3 h-3 rounded-full bg-black hidden md:block" />
                
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                      {job.year}
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 space-y-4 pl-6 md:pl-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {job.role}
                        </h3>
                        <p className="text-gray-600 font-medium">{job.company}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 leading-[1.7]">
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
      <section id="skills" className="px-6 md:px-12 py-16 md:py-32 bg-gray-50">
        <div className="max-w-6xl w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-20 leading-[1.1] tracking-tight"
          >
            {t('skills.title')}
          </motion.h2>
          
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-6 font-medium">{t('skills.categories.frontend')}</h3>
              <div className="flex flex-wrap gap-3">
                {t.raw('skills.items.frontend').map((skill: string, idx: number) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-medium"
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
              <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-6 font-medium">{t('skills.categories.backend')}</h3>
              <div className="flex flex-wrap gap-3">
                {t.raw('skills.items.backend').map((skill: string, idx: number) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-medium"
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
              <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-6 font-medium">{t('skills.categories.tools')}</h3>
              <div className="flex flex-wrap gap-3">
                {t.raw('skills.items.tools').map((skill: string, idx: number) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-medium"
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
      <section id="contact" className="min-h-screen flex items-center px-6 md:px-12 py-16 md:py-32">
        <div className="max-w-6xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-12">{t('contact.title')}</h2>
            
            <p className="text-2xl text-gray-600 mb-16 max-w-2xl">
              {t('contact.subtitle')}
            </p>
            
            <div className="space-y-6">
              <motion.a 
                href="mailto:jean@example.com"
                className="group flex items-center gap-4 text-2xl font-medium hover:translate-x-2 transition-transform"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-6 h-6" />
                jean@example.com
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              
              <motion.a 
                href="https://github.com"
                className="group flex items-center gap-4 text-2xl font-medium hover:translate-x-2 transition-transform"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-6 h-6" />
                GitHub
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com"
                className="group flex items-center gap-4 text-2xl font-medium hover:translate-x-2 transition-transform"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Linkedin className="w-6 h-6" />
                LinkedIn
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
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
