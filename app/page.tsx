'use client';

import { ChevronDown, Download, Github, Linkedin, Mail, ArrowRight, Database, BarChart3, Code2, FileText, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const roles = ['Data Analyst', 'Data Storyteller', 'BI Specialist', 'Insight Expert'];

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

const ProjectSlideshow = ({ images, title }: { images: string[]; title: string }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIdx]}
            alt={`${title} - Preview ${currentIdx + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Slide Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
          {images.map((_, sIdx) => (
            <button
              key={sIdx}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCurrentIdx(sIdx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIdx === sIdx ? 'bg-white w-3' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${sIdx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Hope_Jonathan_Resume.pdf';
    link.click();
  };

  return (
    <div className="bg-[#D4C3F3] min-h-screen text-[#000000] overflow-x-hidden">
      {/* Fixed Navigation Bar */}
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
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
            Meet <span className="logo-glow-text">Me</span><span className="text-[#D4C3F3]">.</span>
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

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#2A0845] p-2 hover:bg-[#2A0845]/10 rounded-full transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden w-full bg-white/98 backdrop-blur-md border-t border-[#000000]/10 shadow-xl overflow-hidden absolute left-0 top-[100%] z-40"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {['About', 'Experience', 'Projects', 'Contact'].map((item, idx) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      scrollToSection(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-base font-semibold text-[#000000] hover:text-[#2A0845] py-1 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {item}
                  </motion.button>
                ))}
                
                <div className="h-px bg-[#000000]/10 my-1" />

                {/* Mobile Resume Button */}
                <motion.button
                  onClick={() => {
                    downloadResume();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#2A0845] text-white rounded-full shadow-lg font-semibold text-sm cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={16} />
                  Resume
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                  Hi, I&apos;m Hope Jonathan
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
                I turn messy datasets into clear business decisions. From SQL queries and Python scripts 
                to Power BI dashboards, I help teams uncover patterns, track KPIs, and act on data with confidence.
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
                <motion.a
                  href="https://wa.me/2347081145509?text=Hi%20Hope%2C%20I%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20collaborate!"
                  target="_blank"
                  rel="noopener noreferrer"
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
                </motion.a>
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
                    <svg
                      width="100%"
                      viewBox="0 0 680 680"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                    >
                      <title>Analytics dashboard visualization</title>
                      <desc>Animated bar chart, sparkline, and KPI cards styled in deep purple and lavender</desc>

                      <defs>
                        <style>{`
                          @keyframes riseBar { from { transform: scaleY(0); } to { transform: scaleY(1); } }
                          @keyframes drawLine { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
                          @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                          @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
                          .b1 { animation: riseBar 0.5s cubic-bezier(.22,.68,0,1.2) 0.1s both; transform-origin: bottom; }
                          .b2 { animation: riseBar 0.5s cubic-bezier(.22,.68,0,1.2) 0.2s both; transform-origin: bottom; }
                          .b3 { animation: riseBar 0.5s cubic-bezier(.22,.68,0,1.2) 0.3s both; transform-origin: bottom; }
                          .b4 { animation: riseBar 0.5s cubic-bezier(.22,.68,0,1.2) 0.4s both; transform-origin: bottom; }
                          .b5 { animation: riseBar 0.5s cubic-bezier(.22,.68,0,1.2) 0.5s both; transform-origin: bottom; }
                          .b6 { animation: riseBar 0.5s cubic-bezier(.22,.68,0,1.2) 0.6s both; transform-origin: bottom; }
                          .sparkline { stroke-dasharray: 400; animation: drawLine 1.2s ease-out 0.8s both; }
                          .fadein { animation: fadeUp 0.5s ease-out 0.9s both; }
                          .dot-pulse { animation: pulse 2s ease-in-out 1.4s infinite; }
                        `}</style>
                      </defs>

                      {/* Background card */}
                      <rect x="40" y="40" width="600" height="600" rx="24" fill="white" stroke="#E8E0F5" strokeWidth="1" />

                      {/* Header row */}
                      <text x="72" y="88" fontFamily="sans-serif" fontSize="13" fontWeight="600" fill="#2A0845">Revenue Overview</text>
                      <text x="72" y="106" fontFamily="sans-serif" fontSize="11" fill="#9980C4">Jan – Jun 2026</text>
                      {/* Live dot */}
                      <circle cx="592" cy="88" r="5" fill="#2A0845" className="dot-pulse" />
                      <text x="580" y="92" fontFamily="sans-serif" fontSize="10" fill="#9980C4" textAnchor="end">LIVE</text>

                      {/* Divider */}
                      <line x1="72" y1="118" x2="608" y2="118" stroke="#EDE8F7" strokeWidth="0.8" />

                      {/* KPI Cards */}
                      {/* Card 1 */}
                      <rect x="72" y="130" width="156" height="66" rx="12" fill="#F5F0FF" />
                      <text x="88" y="153" fontFamily="sans-serif" fontSize="11" fill="#7A5CAA">Total Revenue</text>
                      <text x="88" y="178" fontFamily="sans-serif" fontSize="20" fontWeight="700" fill="#2A0845" className="fadein">$2.4M</text>
                      <text x="200" y="178" fontFamily="sans-serif" fontSize="11" fill="#5BB85B" className="fadein">↑ 18%</text>

                      {/* Card 2 */}
                      <rect x="244" y="130" width="156" height="66" rx="12" fill="#F5F0FF" />
                      <text x="260" y="153" fontFamily="sans-serif" fontSize="11" fill="#7A5CAA">Active Users</text>
                      <text x="260" y="178" fontFamily="sans-serif" fontSize="20" fontWeight="700" fill="#2A0845" className="fadein">10.4K</text>
                      <text x="360" y="178" fontFamily="sans-serif" fontSize="11" fill="#5BB85B" className="fadein">↑ 12%</text>

                      {/* Card 3 - dark */}
                      <rect x="416" y="130" width="164" height="66" rx="12" fill="#2A0845" />
                      <text x="432" y="153" fontFamily="sans-serif" fontSize="11" fill="#C9B8F0">Retention Rate</text>
                      <text x="432" y="178" fontFamily="sans-serif" fontSize="20" fontWeight="700" fill="white" className="fadein">94.2%</text>
                      <text x="537" y="178" fontFamily="sans-serif" fontSize="11" fill="#C9B8F0" className="fadein">↑ 3%</text>

                      {/* Chart label */}
                      <text x="72" y="226" fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#2A0845">Monthly Revenue</text>

                      {/* Baseline */}
                      <line x1="72" y1="440" x2="580" y2="440" stroke="#EDE8F7" strokeWidth="1" />

                      {/* Gridlines */}
                      <line x1="72" y1="360" x2="580" y2="360" stroke="#F0EBF9" strokeWidth="0.6" strokeDasharray="4 4" />
                      <line x1="72" y1="320" x2="580" y2="320" stroke="#F0EBF9" strokeWidth="0.6" strokeDasharray="4 4" />
                      <line x1="72" y1="280" x2="580" y2="280" stroke="#F0EBF9" strokeWidth="0.6" strokeDasharray="4 4" />
                      <line x1="72" y1="240" x2="580" y2="240" stroke="#F0EBF9" strokeWidth="0.6" strokeDasharray="4 4" />

                      {/* Y-axis labels */}
                      <text x="68" y="444" fontFamily="sans-serif" fontSize="10" fill="#B8A8D8" textAnchor="end">0</text>
                      <text x="68" y="364" fontFamily="sans-serif" fontSize="10" fill="#B8A8D8" textAnchor="end">200</text>
                      <text x="68" y="284" fontFamily="sans-serif" fontSize="10" fill="#B8A8D8" textAnchor="end">400</text>

                      {/* Bars */}
                      <rect x="88"  y="300" width="52" height="140" rx="6" fill="#D4C3F3" className="b1" />
                      <rect x="168" y="280" width="52" height="160" rx="6" fill="#C4AFFE" className="b2" />
                      <rect x="248" y="330" width="52" height="110" rx="6" fill="#D4C3F3" className="b3" />
                      <rect x="328" y="260" width="52" height="180" rx="6" fill="#2A0845" className="b4" />
                      <rect x="408" y="285" width="52" height="155" rx="6" fill="#C4AFFE" className="b5" />
                      <rect x="488" y="240" width="52" height="200" rx="6" fill="#2A0845" className="b6" />

                      {/* Value label on tallest bar */}
                      <text x="514" y="234" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#2A0845" textAnchor="middle" className="fadein">$430K</text>

                      {/* Month labels */}
                      <text x="114" y="458" fontFamily="sans-serif" fontSize="10" fill="#9980C4" textAnchor="middle">Jan</text>
                      <text x="194" y="458" fontFamily="sans-serif" fontSize="10" fill="#9980C4" textAnchor="middle">Feb</text>
                      <text x="274" y="458" fontFamily="sans-serif" fontSize="10" fill="#9980C4" textAnchor="middle">Mar</text>
                      <text x="354" y="458" fontFamily="sans-serif" fontSize="10" fill="#9980C4" textAnchor="middle">Apr</text>
                      <text x="434" y="458" fontFamily="sans-serif" fontSize="10" fill="#9980C4" textAnchor="middle">May</text>
                      <text x="514" y="458" fontFamily="sans-serif" fontSize="10" fill="#2A0845" fontWeight="600" textAnchor="middle">Jun</text>

                      {/* Sparkline */}
                      <polyline
                        className="sparkline"
                        points="114,300 194,280 274,330 354,260 434,285 514,240"
                        fill="none"
                        stroke="#2A0845"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.5"
                      />
                      {/* Sparkline dots */}
                      <circle cx="114" cy="300" r="3" fill="#2A0845" opacity="0.5" className="fadein" />
                      <circle cx="194" cy="280" r="3" fill="#2A0845" opacity="0.5" className="fadein" />
                      <circle cx="274" cy="330" r="3" fill="#2A0845" opacity="0.5" className="fadein" />
                      <circle cx="354" cy="260" r="3" fill="#2A0845" opacity="0.5" className="fadein" />
                      <circle cx="434" cy="285" r="3" fill="#2A0845" opacity="0.5" className="fadein" />
                      <circle cx="514" cy="240" r="4" fill="#2A0845" className="fadein" />

                      {/* Bottom section label */}
                      <text x="72" y="500" fontFamily="sans-serif" fontSize="11" fontWeight="600" fill="#2A0845">Segment Split</text>

                      {/* Donut chart */}
                      <circle cx="130" cy="560" r="34" fill="none" stroke="#EDE8F7" strokeWidth="12" />
                      <circle cx="130" cy="560" r="34" fill="none" stroke="#2A0845" strokeWidth="12"
                        strokeDasharray="117 213" strokeDashoffset="0" strokeLinecap="round" className="fadein" />
                      <circle cx="130" cy="560" r="34" fill="none" stroke="#D4C3F3" strokeWidth="12"
                        strokeDasharray="64 266" strokeDashoffset="-119" strokeLinecap="round" className="fadein" />
                      <circle cx="130" cy="560" r="34" fill="none" stroke="#9B7EE0" strokeWidth="12"
                        strokeDasharray="32 298" strokeDashoffset="-185" strokeLinecap="round" className="fadein" />
                      <text x="130" y="557" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#2A0845" textAnchor="middle">100%</text>
                      <text x="130" y="569" fontFamily="sans-serif" fontSize="9" fill="#9980C4" textAnchor="middle">split</text>

                      {/* Legend */}
                      <rect x="190" y="530" width="10" height="10" rx="2" fill="#2A0845" />
                      <text x="206" y="540" fontFamily="sans-serif" fontSize="10" fill="#2A0845">Enterprise 55%</text>
                      <rect x="190" y="550" width="10" height="10" rx="2" fill="#D4C3F3" />
                      <text x="206" y="560" fontFamily="sans-serif" fontSize="10" fill="#2A0845">SMB 30%</text>
                      <rect x="190" y="570" width="10" height="10" rx="2" fill="#9B7EE0" />
                      <text x="206" y="580" fontFamily="sans-serif" fontSize="10" fill="#2A0845">Consumer 15%</text>

                      {/* Churn badge */}
                      <rect x="430" y="528" width="148" height="52" rx="10" fill="#F5F0FF" />
                      <text x="444" y="548" fontFamily="sans-serif" fontSize="10" fill="#7A5CAA">Churn Reduction</text>
                      <text x="444" y="568" fontFamily="sans-serif" fontSize="18" fontWeight="700" fill="#2A0845" className="fadein">−18%</text>
                      <text x="548" y="568" fontFamily="sans-serif" fontSize="10" fill="#5BB85B" className="fadein">✓ Target met</text>
                    </svg>
                  </div>

                  {/* Stats mini-card inside */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      { number: '4+', label: 'Analytics Projects', bg: 'bg-[#D4C3F3]/30' },
                      { number: '3.9K+', label: 'Customer Records', bg: 'bg-[#2A0845]/5' },
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
              { number: '4+', label: 'Analytics Projects Completed' },
              { number: '630+', label: 'Survey Respondents Analyzed' },
              { number: '3+', label: 'Industries: Health, Retail, Ops' },
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
                      alt="Hope Jonathan"
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
                  I believe great data work sits at the intersection of technical rigor and human curiosity.
                  Every SQL query, every Python script, every dashboard tells a story — one that drives real decisions
                  and real outcomes for the teams that act on them.
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
                  Starting with Excel pivot tables and Python scripts, I&apos;ve grown into an analyst who builds end-to-end
                  pipelines — from raw data cleaning with Pandas to interactive Power BI dashboards stakeholders can act on.
                </p>
                <p className="text-[#333333] leading-relaxed">
                  My projects span healthcare (hospital readmission risk), retail (customer churn & shopping behaviour),
                  and operations (furniture sales profitability) — consistently turning raw datasets into insights
                  that reduce costs, improve retention, and flag risk early.
                </p>
              </motion.div>

              {/* Industry Focus Badges */}
              <div>
                <p className="text-sm font-semibold text-[#2A0845] mb-3 uppercase tracking-wide">Industry Focus</p>
                <div className="flex flex-wrap gap-3">
                  {['Healthcare', 'Retail & E-Commerce', 'Operations', 'Customer Analytics'].map((industry, idx) => (
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

      {/* Work Experience Section */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-[#2A0845] mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience
          </motion.h2>

          <div className="space-y-6 max-w-4xl mx-auto">

            {/* QwantomHub */}
            <motion.div
              className="bg-white rounded-2xl p-8 border border-[#000000]/10 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(42, 8, 69, 0.1)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#2A0845]">Data Analytics Instructor</h3>
                  <a
                    href="https://www.qwantomhub.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7A5CAA] font-semibold hover:underline text-base"
                  >
                    QwantomHub Technologies
                  </a>
                  <span className="text-[#666666] text-sm"> — Abuja, FCT (Part-time)</span>
                </div>
                <span className="text-sm font-medium text-white bg-[#2A0845] px-4 py-1.5 rounded-full whitespace-nowrap self-start">
                  2025 – Present
                </span>
              </div>
              <ul className="space-y-2 text-[#333333]">
                {[
                  'Deliver hands-on data analytics training covering Python (Pandas), SQL, Excel, and Power BI to students and corporate professionals.',
                  'Design and structure course curricula, practical exercises, and real-world datasets to reinforce analytical thinking.',
                  'Mentor students through end-to-end analytics projects — from data cleaning to dashboard presentation.',
                  'Translate complex data concepts into clear, beginner-friendly lessons for non-technical learners.',
                ].map((point, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="w-2 h-2 bg-[#2A0845] rounded-full mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Freelance */}
            <motion.div
              className="bg-white rounded-2xl p-8 border border-[#000000]/10 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(42, 8, 69, 0.1)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#2A0845]">Operations & Reporting Analyst</h3>
                  <span className="text-[#7A5CAA] font-semibold text-base">Freelance, Self-Employed</span>
                  <span className="text-[#666666] text-sm"> — Remote</span>
                </div>
                <span className="text-sm font-medium text-white bg-[#2A0845] px-4 py-1.5 rounded-full whitespace-nowrap self-start">
                  Jan 2025 – Present
                </span>
              </div>
              <ul className="space-y-2 text-[#333333]">
                {[
                  'Built and maintained Excel-based reports and dashboards to track operational metrics, cutting reporting turnaround from 3 days to 1 day.',
                  'Cleaned raw operational data using Python (Pandas) and Excel Power Query to ensure accuracy before analysis.',
                  'Designed interactive Power BI and Excel dashboards to track KPIs across sales, marketing, and customer engagement.',
                  'Collaborated with non-technical stakeholders to translate data findings into clear, actionable recommendations.',
                ].map((point, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="w-2 h-2 bg-[#2A0845] rounded-full mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* My Methodology Framework */}
      <section id="methodology" className="py-20 px-6 bg-white overflow-hidden">
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
                skills: ['SQL (PostgreSQL, MySQL)', 'Python (Pandas, NumPy)', 'Excel (Power Query, Pivot Tables)', 'Google Sheets'],
              },
              {
                category: 'Visualization & BI',
                skills: ['Power BI (DAX, Reports)', 'Excel Dashboards', 'Seaborn & Matplotlib', 'Google Data Studio'],
              },
              {
                category: 'Core Competencies',
                skills: ['Exploratory Data Analysis (EDA)', 'Data Cleaning & Feature Engineering', 'KPI Tracking & Dashboard Design', 'Stakeholder Communication'],
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
                title: 'Customer Shopping Behaviour Analysis',
                metric: 'Impact: 10 business questions answered across 3.9K customers',
                description:
                  'Analyzed 3,900+ customer records to uncover revenue patterns by gender, age group, and subscription status. Identified top-rated products, compared shipping modes, and segmented customers into New, Returning, and Loyal tiers — delivering a full Power BI dashboard with actionable retention insights.',
                tools: ['Python', 'SQL', 'Power BI'],
                image: '/images/project2.png',
                repoLink: 'https://colab.research.google.com/drive/1y5mSnFqSQ_Y5O7etzXi2GX211CpXyQ45',
                liveLink: 'https://colab.research.google.com/drive/1y5mSnFqSQ_Y5O7etzXi2GX211CpXyQ45',
              },
              {
                title: 'Survey Analysis of Data Professionals',
                metric: 'Impact: 630 respondents analyzed across 7 job titles',
                description:
                  'Conducted end-to-end survey analysis on data professionals worldwide — covering salary benchmarks by job title, programming language preferences, work/life balance scores, and difficulty breaking into the field. Built an interactive Power BI dashboard to surface insights for career planning.',
                tools: ['Power BI', 'Excel'],
                image: '/images/project1.png',
                repoLink: 'https://github.com/Analystceejay/Data-professional-survey-analysis',
                liveLink: 'https://github.com/Analystceejay/Data-professional-survey-analysis',
              },
              {
                title: 'Hospital Readmission Analysis',
                metric: 'Impact: 10+ clinical variables analyzed for readmission risk',
                description:
                  'Analyzed clinical data to identify key drivers of hospital readmission using EDA — missing value assessment, outlier detection, and correlation analysis with Pandas and Seaborn. Performed feature engineering on medical specialty and medication variables, then built a Power BI dashboard to flag high-risk patient segments.',
                tools: ['Python', 'Seaborn'],
                image: [
                  '/images/hospital_analysis.png',
                  '/images/hospital_analysis2.png',
                  '/images/hospital_analysis3.png',
                ],
                repoLink: 'https://colab.research.google.com/drive/1jbaq4k1x6pTZCTXT_cKVMvpC34Fu2bTB',
                liveLink: 'https://colab.research.google.com/drive/1jbaq4k1x6pTZCTXT_cKVMvpC34Fu2bTB',
              },
              {
                title: 'Furniture Sales Profit Leak Analysis',
                metric: 'Impact: Uncovered loss-making segments in $742K sales data',
                description:
                  'Analyzed furniture sales data using Excel Pivot Tables to surface revenue drivers and profitability gaps. Identified Tables (-8.5%) and Bookcases (-3.0%) as loss-making sub-categories and recommended pricing and shipping changes. Evaluated delivery mode efficiency to support logistics optimization.',
                tools: ['Excel', 'Pivot Tables', 'Data Visualization'],
                image: '/images/furniture_sales.png',
                repoLink: 'https://github.com/Analystceejay/Furniture-Sales-Analysis',
                liveLink: 'https://github.com/Analystceejay/Furniture-Sales-Analysis',
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
                  {project.image ? (
                    Array.isArray(project.image) ? (
                      <ProjectSlideshow images={project.image} title={project.title} />
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )
                  ) : (
                    <motion.div className="relative z-10 flex flex-col items-center gap-2" whileHover={{ scale: 1.1 }}>
                      <BarChart3 size={48} className="text-[#2A0845]/50" />
                      <p className="text-sm font-semibold text-[#666666]">Dashboard Preview</p>
                    </motion.div>
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#2A0845]/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                    transition={{ duration: 0.3 }}
                  />
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
                    <motion.a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2.5 border-2 border-[#2A0845] text-[#2A0845] rounded-lg font-semibold text-sm text-center"
                      whileHover={{ backgroundColor: '#2A0845', color: '#FFFFFF', scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Notebook
                    </motion.a>
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2.5 bg-[#2A0845] text-white rounded-lg font-semibold text-sm text-center"
                      whileHover={{ backgroundColor: '#1A0530', scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Open in Colab
                    </motion.a>
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
              { icon: Mail, label: 'Send an Email', href: 'mailto:hopejonathan958@gmail.com', external: false },
              { icon: Linkedin, label: 'LinkedIn Profile', href: 'https://linkedin.com/in/hope.jonathan', external: true },
              { icon: Github, label: 'GitHub', href: 'https://github.com/Analystceejay', external: true },
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
                    ? 'https://github.com/Analystceejay'
                    : link === 'LinkedIn'
                      ? 'https://linkedin.com/in/hope.jonathan'
                      : 'mailto:hopejonathan958@gmail.com'
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
            &copy; 2026 Hope Jonathan. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
}
