'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { useRef } from 'react';

export function MinimalPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl w-full"
        >
          <motion.div 
            style={{ opacity }}
            className="mb-8"
          >
            <span className="text-sm tracking-wider text-gray-500 uppercase">Available for work</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tight">
            Jean Dupont
          </h1>
          
          <p className="text-2xl md:text-4xl text-gray-600 mb-12 max-w-3xl leading-relaxed">
            Creative Developer crafting minimal & functional digital experiences
          </p>
          
          <div className="flex gap-6 text-sm">
            <a 
              href="#contact" 
              className="minimal-underline text-black font-medium"
            >
              Get in touch
            </a>
            <a 
              href="#work" 
              className="minimal-underline text-gray-500 font-medium"
            >
              View work
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center px-6 md:px-12 py-32">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">About</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-600 leading-relaxed">
              I'm a developer and designer focused on creating clean, functional, and beautiful digital products. 
              With over 5 years of experience, I specialize in modern web technologies and user-centered design.
            </p>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Currently working with React, Next.js, and TypeScript to build scalable applications that users love.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <div className="text-4xl font-bold mb-2">5+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Projects</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="work" className="min-h-screen px-6 md:px-12 py-32">
        <div className="max-w-6xl w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-20"
          >
            Experience
          </motion.h2>
          
          <div className="space-y-24">
            {[
              {
                year: "2022 — Present",
                role: "Senior Developer",
                company: "Tech Startup Inc.",
                description: "Leading development team, building scalable web applications, and implementing modern design systems.",
                link: "#"
              },
              {
                year: "2020 — 2022",
                role: "Full Stack Developer",
                company: "Digital Agency",
                description: "Developed 20+ client websites using React, Node.js, and modern web technologies.",
                link: "#"
              },
              {
                year: "2018 — 2020",
                role: "Frontend Developer",
                company: "Startup Company",
                description: "Built MVP from scratch, created responsive interfaces, and mentored junior developers.",
                link: "#"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <a href={item.link} className="block">
                  <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                      {item.year}
                    </div>
                    
                    <div className="md:col-span-3 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
                            {item.role}
                          </h3>
                          <p className="text-gray-600">{item.company}</p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <p className="text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="w-12 h-px bg-black transition-all duration-300 group-hover:w-24" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="px-6 md:px-12 py-32 bg-gray-50">
        <div className="max-w-6xl w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-20"
          >
            Skills
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Frontend</h3>
              <ul className="space-y-3 text-lg">
                <li>React & Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Backend</h3>
              <ul className="space-y-3 text-lg">
                <li>Node.js</li>
                <li>PostgreSQL</li>
                <li>GraphQL</li>
                <li>REST APIs</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Tools</h3>
              <ul className="space-y-3 text-lg">
                <li>Git & GitHub</li>
                <li>Figma</li>
                <li>Docker</li>
                <li>Vercel & AWS</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center px-6 md:px-12 py-32">
        <div className="max-w-6xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-12">Let's work together</h2>
            
            <p className="text-2xl text-gray-600 mb-16 max-w-2xl">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-6">
              <a 
                href="mailto:jean@example.com"
                className="group flex items-center gap-4 text-2xl font-medium hover:translate-x-2 transition-transform"
              >
                <Mail className="w-6 h-6" />
                jean@example.com
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a 
                href="https://github.com"
                className="group flex items-center gap-4 text-2xl font-medium hover:translate-x-2 transition-transform"
              >
                <Github className="w-6 h-6" />
                GitHub
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a 
                href="https://linkedin.com"
                className="group flex items-center gap-4 text-2xl font-medium hover:translate-x-2 transition-transform"
              >
                <Linkedin className="w-6 h-6" />
                LinkedIn
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-gray-200">
        <div className="max-w-6xl w-full mx-auto flex justify-between items-center text-sm text-gray-500">
          <p>© 2024 Jean Dupont</p>
          <p>Built with Next.js & Tailwind</p>
        </div>
      </footer>
    </div>
  );
}
