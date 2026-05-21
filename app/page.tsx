'use client';

import { ChevronDown, Download, Github, Linkedin, Mail, ArrowRight, Database, BarChart3, Code2, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const roles = ['Data Analyst', 'Excel Queen', 'SQL Star', 'Data Storyteller', 'BI Specialist', 'Insight Expert'];

const DynamicRole = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.h2
        key={roleIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="text-2xl lg:text-3xl font-semibold text-[#666666]"
      >
        {roles[roleIndex]}
      </motion.h2>
    </AnimatePresence>
  );
};

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveNav(id);
  };

  const downloadResume = () => {
    alert('Resume download functionality - connect to your actual resume file');
  };

  return (
    <div className="bg-[#D4C3F3] min-h-screen text-[#000000] overflow-x-hidden">
      {/* Fixed Navigation Bar */}
      <motion.nav
        className={`fixed top-0 w-full z-50 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold text-[#2A0845]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Meet <span className="logo-glow-text">CeeJay</span><span className="text-[#D4C3F3]">.</span>
          </motion.div>

          {/* Navigation Links & CTA */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-6 items-center">
              {['About', 'Experience', 'Projects', 'Contact'].map((item, idx) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium text-[#000000] relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ color: '#2A0845' }}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-[#2A0845]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Download Resume Button */}
            <motion.button
              onClick={downloadResume}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#2A0845] text-white rounded-full shadow-lg font-medium text-sm"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(42, 8, 69, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Download size={16} />
              Resume
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              className="space-y-6 order-2 lg:order-1"
              initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 30 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-2">
                <motion.h1
                  className="text-5xl lg:text-6xl font-bold leading-tight text-[#2A0845]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Hi, I&apos;m Chioma Jonathan
                </motion.h1>
                <div className="min-h-12">
                  <DynamicRole />
                </div>
              </div>

              <motion.p
                className="text-lg text-[#333333] leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                I transform raw data into strategic business decisions. By combining SQL queries with
                creative visualization, I help organizations unlock hidden patterns and drive measurable growth.
              </motion.p>

              {/* Dual CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3.5 bg-[#2A0845] text-white rounded-full shadow-lg font-semibold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(42, 8, 69, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore My Work
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ArrowRight size={18} />
                  </motion.div>
                </motion.button>
                <motion.button
                  className="px-8 py-3.5 border-2 border-[#D4C3F3] text-[#2A0845] rounded-full font-semibold glow-button relative overflow-hidden group"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ borderColor: ['#D4C3F3', '#2A0845', '#D4C3F3'] }}
                  transition={{ borderColor: { repeat: Infinity, duration: 2.5 } }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4C3F3]/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <span className="relative z-10 flex items-center justify-center">Let&apos;s Collaborate</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Accent Card */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                {/* Decorative background circle with gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#2A0845]/10 to-[#D4C3F3]/20 rounded-3xl blur-3xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                ></motion.div>

                {/* Main Card */}
                <motion.div
                  className="relative bg-white rounded-3xl p-8 shadow-2xl border border-[#000000]/10"
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(42, 8, 69, 0.2)' }}
                >
                  <div className="aspect-square bg-gradient-to-br from-[#2A0845]/5 to-[#D4C3F3]/30 rounded-2xl flex items-center justify-center overflow-hidden">
                    {/* Animated data visualization placeholder */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A0845]/20 to-transparent"></div>
                      <div className="flex flex-col items-center gap-4 relative z-10">
                        <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                          <BarChart3 size={48} className="text-[#2A0845]/60" />
                        </motion.div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-[#2A0845]/70">Analytics Ready</p>
                          <p className="text-xs text-[#666666]">Let&apos;s explore your data</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats mini-card inside */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      { number: '4+', label: 'Major Projects', bg: 'bg-[#D4C3F3]/30' },
                      { number: '10K+', label: 'Data Rows', bg: 'bg-[#2A0845]/5' },
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        className={`${stat.bg} rounded-lg p-3`}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                      >
                        <motion.p
                          className="text-2xl font-bold text-[#2A0845]"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
                        >
                          {stat.number}
                        </motion.p>
                        <p className="text-xs text-[#666666]">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics / Analytics Banner */}
      <section className="bg-[#2A0845] text-white py-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { number: '4+', label: 'Major Analytics Projects' },
              { number: '10K+', label: 'Rows Cleaned & Modeled' },
              { number: '3+', label: 'Core Business Industries' },
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                className="space-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <motion.p
                  className="text-5xl font-bold"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: idx * 0.3 }}
                >
                  {metric.number}
                </motion.p>
                <p className="text-lg text-white/80">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-6 bg-[#D4C3F3] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-[#2A0845] mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left Column - Professional Portrait (40%) */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 40 : 0, scale: isMobile ? 0.95 : 1 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 70, damping: 15, duration: 0.7 }}
            >
              <div className="sticky top-32">
                <motion.div
                  className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#000000]/10"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(42, 8, 69, 0.2)' }}
                >
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[#2A0845]/10 to-[#D4C3F3]/40">
                    <Image
                      src="/images/me.png"
                      alt="Chioma Jonathan"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Narrative (60%) */}
            <motion.div
              className="lg:col-span-3 space-y-8"
              initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 40 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 70, damping: 15, duration: 0.7 }}
            >
              {/* My Philosophy */}
              <motion.div
                className="bg-white rounded-xl p-8 border border-[#000000]/10 shadow-lg"
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: isMobile ? 0.05 : 0.2 }}
              >
                <h3 className="text-2xl font-bold text-[#2A0845] mb-4">My Philosophy</h3>
                <p className="text-[#333333] leading-relaxed mb-3">
                  I believe that great data work sits at the intersection of technical rigor and human insight.
                  Every SQL query, every Python script, every dashboard tells a story—one that drives real business outcomes.
                </p>
                <p className="text-[#333333] leading-relaxed">
                  My mission is to bridge the gap between raw data and actionable strategy, enabling teams to
                  make confident, data-driven decisions that move the needle on revenue, efficiency, and growth.
                </p>
              </motion.div>

              {/* My Analytical Journey */}
              <motion.div
                className="bg-white rounded-xl p-8 border border-[#000000]/10 shadow-lg"
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: isMobile ? 0.1 : 0.3 }}
              >
                <h3 className="text-2xl font-bold text-[#2A0845] mb-4">My Analytical Journey</h3>
                <p className="text-[#333333] leading-relaxed mb-3">
                  Starting with Excel pivot tables and simple SQL queries, I&apos;ve evolved into a full-stack data strategist.
                  My toolkit now spans cloud databases, Python automation, and advanced visualization platforms.
                </p>
                <p className="text-[#333333] leading-relaxed">
                  Over the past 4+ years, I&apos;ve worked across e-commerce, fintech, and SaaS environments,
                  consistently uncovering insights that improved customer retention, reduced operational costs, and scaled revenue.
                </p>
              </motion.div>

              {/* Industry Focus Badges */}
              <div>
                <p className="text-sm font-semibold text-[#2A0845] mb-3 uppercase tracking-wide">Industry Focus</p>
                <div className="flex flex-wrap gap-3">
                  {['E-Commerce', 'Finance', 'Tech/SaaS', 'Logistics'].map((industry, idx) => (
                    <motion.span
                      key={industry}
                      className="px-4 py-2 bg-[#2A0845] text-white rounded-full text-sm font-medium cursor-pointer"
                      whileHover={{ scale: 1.1, backgroundColor: '#1A0530' }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 120, damping: 10, delay: idx * 0.08 }}
                    >
                      {industry}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* My Methodology Framework */}
      <section id="experience" className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-[#2A0845] mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My Methodology Framework
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Ingestion & Extraction', desc: 'SQL & Database Design', icon: Database },
              { step: '02', title: 'Cleaning & Engineering', desc: 'Python & Data Prep', icon: Code2 },
              { step: '03', title: 'Analysis & Visualization', desc: 'Tableau & Power BI', icon: BarChart3 },
              { step: '04', title: 'Executive Insights', desc: 'Storytelling & Strategy', icon: FileText },
            ].map((stage, idx) => (
              <motion.div
                key={idx}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 80, damping: 12, delay: isMobile ? 0.05 : idx * 0.12 }}
              >
                {/* Connection arrow */}
                {idx < 3 && (
                  <motion.div
                    className="hidden md:block absolute top-24 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#2A0845] to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: '24px' }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 + 0.25 }}
                  ></motion.div>
                )}

                <motion.div
                  className="bg-[#D4C3F3]/20 rounded-2xl p-8 border border-[#2A0845]/20 h-full flex flex-col items-center text-center shadow-lg"
                  whileHover={{ y: -10, boxShadow: '0 15px 40px rgba(42, 8, 69, 0.15)' }}
                >
                  <motion.div
                    className="w-16 h-16 bg-[#2A0845] text-white rounded-full flex items-center justify-center mb-4 font-bold text-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: idx * 0.3 }}
                  >
                    {stage.step}
                  </motion.div>
                  <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                    <stage.icon size={32} className="text-[#2A0845] mb-4" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-[#2A0845] mb-2">{stage.title}</h3>
                  <p className="text-sm text-[#666666]">{stage.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Toolbox */}
      <section className="py-20 px-6 bg-[#D4C3F3] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-[#2A0845] mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technical Toolbox
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: 'Languages & Databases',
                skills: ['SQL (PostgreSQL, MySQL)', 'Python (Pandas, NumPy, Scikit-learn)', 'Excel VBA'],
              },
              {
                category: 'Visualization & BI',
                skills: ['Tableau (Advanced)', 'Power BI (DAX, M)', 'Excel (Advanced)', 'Google Data Studio'],
              },
              {
                category: 'Core Competencies',
                skills: ['Exploratory Data Analysis', 'ETL Pipeline Design', 'A/B Testing & Experimentation', 'Statistical Modeling'],
              },
            ].map((toolbox, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-lg border border-[#000000]/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 80, damping: 12, delay: isMobile ? 0.05 : idx * 0.12 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(42, 8, 69, 0.15)' }}
              >
                <h3 className="text-xl font-bold text-[#2A0845] mb-6">{toolbox.category}</h3>
                <ul className="space-y-3">
                  {toolbox.skills.map((skill, sidx) => (
                    <motion.li
                      key={sidx}
                      className="flex items-start gap-3 text-[#333333]"
                      initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 10 : 0 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: isMobile ? sidx * 0.05 : idx * 0.1 + sidx * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.span
                        className="w-2 h-2 bg-[#2A0845] rounded-full mt-2 flex-shrink-0"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: sidx * 0.1 }}
                      ></motion.span>
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-[#2A0845] mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: 'E-Commerce Customer Churn Analysis',
                metric: 'Impact: Reduced churn by 18%',
                description:
                  'Built a predictive churn model analyzing 50K+ customer transactions. Identified key behavioral patterns and segmented customers for targeted retention campaigns, directly contributing to a $2.4M revenue recovery.',
                tools: ['SQL', 'Python', 'Tableau'],
              },
              {
                title: 'Finance Fraud Detection Dashboard',
                metric: 'Impact: Detected 94% of fraudulent transactions',
                description:
                  'Designed a real-time monitoring system using Power BI that flags suspicious activities across 5M+ transactions monthly. Reduced fraudulent charges by $800K annually while maintaining a 99.2% legitimate transaction accuracy rate.',
                tools: ['SQL', 'Power BI', 'Python'],
              },
              {
                title: 'SaaS Product Analytics & Growth Funnel',
                metric: 'Impact: Increased MRR by 32%',
                description:
                  'Conducted a comprehensive funnel analysis of 10K+ users across signup, onboarding, and activation phases. Provided actionable insights that optimized conversion rates and increased Monthly Recurring Revenue from $125K to $165K.',
                tools: ['SQL', 'Google Analytics', 'Tableau'],
              },
              {
                title: 'Logistics Optimization & Route Analysis',
                metric: 'Impact: Reduced delivery time by 14%',
                description:
                  'Analyzed 200K+ delivery records to identify bottlenecks in route optimization. Recommended data-driven changes that cut average delivery time, improved customer satisfaction scores by 22%, and reduced operational costs by 11%.',
                tools: ['SQL', 'Python', 'Excel'],
              },
            ].map((project, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-[#000000] shadow-lg flex flex-col h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, delay: isMobile ? 0.05 : idx * 0.12 }}
                whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(42, 8, 69, 0.2)' }}
              >
                {/* Project Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-[#2A0845]/10 to-[#D4C3F3]/20 flex items-center justify-center relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#2A0845]/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                  <motion.div
                    className="relative z-10 flex flex-col items-center gap-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <BarChart3 size={48} className="text-[#2A0845]/50" />
                    <p className="text-sm font-semibold text-[#666666]">Dashboard Preview</p>
                  </motion.div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex-1 flex flex-col">
                  <motion.h3
                    className="text-xl font-bold text-[#2A0845] mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: isMobile ? 0.05 : idx * 0.12 + 0.05 }}
                  >
                    {project.title}
                  </motion.h3>

                  {/* Highlighted Metric */}
                  <motion.p
                    className="text-sm font-bold text-[#2A0845] bg-[#D4C3F3]/30 rounded-lg px-3 py-2 inline-block mb-4"
                    animate={{ backgroundColor: ['rgba(212, 195, 243, 0.3)', 'rgba(212, 195, 243, 0.5)', 'rgba(212, 195, 243, 0.3)'] }}
                    transition={{ repeat: Infinity, duration: 3, delay: idx * 0.3 }}
                  >
                    {project.metric}
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    className="text-[#333333] leading-relaxed mb-6 flex-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: isMobile ? 0.1 : idx * 0.12 + 0.1 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tool Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tools.map((tool, tidx) => (
                      <motion.span
                        key={tidx}
                        className="px-3 py-1 bg-[#D4C3F3] text-[#2A0845] rounded-full text-xs font-semibold"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: isMobile ? tidx * 0.03 : idx * 0.12 + tidx * 0.03 }}
                        whileHover={{ scale: 1.1, backgroundColor: '#2A0845', color: '#FFFFFF' }}
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <motion.button
                      className="flex-1 px-4 py-2.5 border-2 border-[#2A0845] text-[#2A0845] rounded-lg font-semibold text-sm"
                      whileHover={{ backgroundColor: '#2A0845', color: '#FFFFFF', scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Explore Repository
                    </motion.button>
                    <motion.button
                      className="flex-1 px-4 py-2.5 bg-[#2A0845] text-white rounded-lg font-semibold text-sm"
                      whileHover={{ backgroundColor: '#1A0530', scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Launch App
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-[#2A0845] text-white overflow-hidden">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <motion.h2
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Let&apos;s Build Something Great
            </motion.h2>
            <motion.p
              className="text-lg text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              I&apos;m always interested in discussing new data challenges and collaboration opportunities.
              Feel free to reach out.
            </motion.p>
          </div>

          {/* Contact Links */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {[
              { icon: Mail, label: 'Send an Email', href: 'mailto:alex@example.com', external: false },
              { icon: Linkedin, label: 'LinkedIn Profile', href: 'https://linkedin.com', external: true },
              { icon: Github, label: 'GitHub', href: 'https://github.com', external: true },
            ].map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="flex items-center justify-center gap-3 px-8 py-3 rounded-full font-semibold"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                {...(idx === 0
                  ? {
                    className: 'flex items-center justify-center gap-3 px-8 py-3 bg-white text-[#2A0845] rounded-full font-semibold',
                    onHoverStart: undefined,
                  }
                  : {})}
              >
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: idx * 0.3 }}>
                  <link.icon size={20} />
                </motion.div>
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-[#1A0530] text-white py-8 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="flex justify-center gap-6">
            {['GitHub', 'LinkedIn', 'Email'].map((link, idx) => (
              <motion.a
                key={link}
                href={
                  link === 'GitHub'
                    ? 'https://github.com'
                    : link === 'LinkedIn'
                      ? 'https://linkedin.com'
                      : 'mailto:alex@example.com'
                }
                className="text-white/80"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ color: '#D4C3F3', scale: 1.1 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
          <motion.p
            className="text-white/60 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            &copy; 2026 Chioma Jonathan. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
}
