import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  MessageSquare,
  ExternalLink,
  X
} from 'lucide-react';

import { DISCORD_ID, GITHUB_USERNAME, SOCIAL_LINKS, MESSAGING_APPS } from './config/constants';
import { useLanyard } from './hooks/useLanyard';
import GlowingCard from './components/GlowingCard';
import StatusWidget from './components/StatusWidget';
import SocialLinks from './components/SocialLinks';
import Skills from './components/Skills';
import ContactForm from './components/ContactForm';
import RepoList from './components/RepoList';
import profileImg from './assets/profile.jpg';

export default function App() {
  // Cursor Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  const cursorDotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const cursorDotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

  const [expandedProfile, setExpandedProfile] = useState(false);
  const [repos, setRepos] = useState([]);
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const lanyardData = useLanyard(DISCORD_ID);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
      })
      .catch(err => console.error("Error fetching repos:", err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  const handleMouseMove = (e) => {
    if (!isMobile) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
  };

  return (
    <div
      className={`min-h-screen bg-black text-zinc-100 selection:bg-indigo-500/30 font-sans ${!isMobile ? 'cursor-none' : ''}`}
      onMouseMove={handleMouseMove}
    >
      {/* Custom Cursor - Only on Desktop */}
      {!isMobile && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 border-2 border-indigo-500 rounded-full pointer-events-none z-[100] mix-blend-difference"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%"
            }}
          >
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-sm"></div>
          </motion.div>
          <motion.div
            className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100]"
            style={{
              x: cursorDotX,
              y: cursorDotY,
              translateX: "-50%",
              translateY: "-50%"
            }}
          />
        </>
      )}

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Expanded Profile Modal */}
      <AnimatePresence>
        {expandedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setExpandedProfile(false)}
          >
            <motion.div
              layoutId="profile-container"
              className="relative w-full max-w-4xl h-[80vh] bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                layoutId="profile-image"
                src={profileImg}
                className="w-full h-full object-contain bg-black/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none"></div>

              {/* Cyberpunk Overlay Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-8 left-8 right-8"
              >
                <h2 className="text-2xl md:text-6xl font-black text-white mb-2 tracking-tighter glitch-text" data-text="METHMIKA MANIPURA">
                  METHMIKA MANIPURA
                </h2>
                <p className="text-sm md:text-xl text-indigo-400 font-mono">SYSTEM.ADMIN // LEVEL_99</p>
              </motion.div>

              <button
                onClick={() => setExpandedProfile(false)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors z-50"
              >
                <X size={24} />
              </button>

              {/* Scanlines */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%]"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Left Column: Profile Card */}
          <motion.div variants={itemVariants} className="h-full">
            <GlowingCard
              className="flex flex-col justify-between overflow-visible h-full"
              style={{ animationDelay: '0s' }}
            >
              <div className="space-y-6">
                <div className="relative inline-block cursor-pointer" onClick={() => setExpandedProfile(true)}>
                  <motion.div
                    layoutId="profile-container"
                    className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-zinc-700 shadow-2xl relative z-10"
                  >
                    <motion.img
                      layoutId="profile-image"
                      src={profileImg}
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-indigo-500/20 blur-2xl -z-10 rounded-full" />
                </div>

                <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                    Methmika <span className="text-indigo-400">Manipura</span>
                  </h1>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
                    <span>Soap612</span>
                  </div>
                  <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                    Full-Stack Creative Developer building immersive web experiences. Obsessed with performance, animation, and clean UI.
                  </p>
                </div>
              </div>

              <SocialLinks />

              {/* System Stats */}
              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-zinc-800/20 border border-white/5">
                  <div className="text-xs text-zinc-500 font-mono mb-1">LOCATION</div>
                  <div className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Ratnapura, Sri Lanka
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-800/20 border border-white/5">
                  <div className="text-xs text-zinc-500 font-mono mb-1">LOCAL TIME</div>
                  <div className="text-sm font-bold text-zinc-200 font-mono">
                    {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-800/20 border border-white/5">
                  <div className="text-xs text-zinc-500 font-mono mb-1">EXPERIENCE</div>
                  <div className="text-sm font-bold text-zinc-200">3+ Years</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-800/20 border border-white/5">
                  <div className="text-xs text-zinc-500 font-mono mb-1">PROJECTS</div>
                  <div className="text-sm font-bold text-zinc-200">20+ Shipped</div>
                </div>
              </div>
            </GlowingCard>
          </motion.div>

          {/* Right Column: Status, Chat, Stack */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* 2. Live Status Card */}
            <motion.div variants={itemVariants}>
              <GlowingCard
                className="h-fit"
                style={{ animationDelay: '0.2s' }}
              >
                <StatusWidget lanyardData={lanyardData} />
              </GlowingCard>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* 3. Chat Card */}
              <motion.div variants={itemVariants} className="h-full">
                <GlowingCard
                  className="h-full"
                  style={{ animationDelay: '0.3s' }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <MessageSquare className="text-indigo-400" />
                      <h3 className="text-xl font-bold">Chat</h3>
                    </div>
                    <div className="space-y-3 flex-1">
                      {MESSAGING_APPS.map((app, i) => (
                        <a
                          key={i}
                          href={app.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 transition-all hover:scale-105 ${app.color} group`}
                        >
                          <app.icon size={18} />
                          <span className="font-medium">{app.label}</span>
                          <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                </GlowingCard>
              </motion.div>

              {/* 4. Stack Card */}
              <motion.div variants={itemVariants} className="h-full">
                <GlowingCard
                  className="h-full"
                  style={{ animationDelay: '0.4s' }}
                >
                  <Skills />
                </GlowingCard>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Full Width Sections */}
        <motion.div
          className="mt-6 grid grid-cols-1 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Latest Repos */}
          <motion.div variants={itemVariants}>
            <GlowingCard
              className="w-full"
              style={{ animationDelay: '0.5s' }}
            >
              <RepoList repos={repos} />
            </GlowingCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <GlowingCard
              className="w-full"
              style={{ animationDelay: '0.6s' }}
            >
              <ContactForm />
            </GlowingCard>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-zinc-600 text-sm pb-8">
        <p>© 2025 Methmika Manipura. Built with React & Tailwind.</p>
      </footer>
    </div >
  );
}