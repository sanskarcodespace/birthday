import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import heroImage from '../assets/images/memory1.jpg';

export default function LandingHero({ onOpen }) {
  const [typedText, setTypedText] = useState('');
  const fullText = "Happy Birthday Shabnam ❤️";
  
  // Custom typing text animation
  useEffect(() => {
    let index = 0;
    setTypedText('');
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 120); // Smooth typewriter speed
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center text-center p-6 select-none z-10">
      
      {/* Background Image Container with Ken Burns Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center animate-ken-burns opacity-30 blur-[2px]"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Dark radial glow overlay to keep text ultra-readable & premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07020d] via-[#0d0614]/85 to-[#07020d]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0%,rgba(0,0,0,0)_75%)] pointer-events-none" />
      </div>

      {/* Main Hero Elements */}
      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        
        {/* Pulsing Floating Heart Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20 shadow-2xl animate-pulse">
            <Heart className="w-10 h-10 text-pink-500 fill-pink-500 filter drop-shadow-[0_0_8px_#ec4899]" />
          </div>
        </motion.div>

        {/* Typed Greeting Heading */}
        <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl md:text-7xl tracking-wide bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent filter drop-shadow-[0_4px_12px_rgba(236,72,153,0.15)] leading-tight min-h-[6rem] sm:min-h-[7rem] md:min-h-[10rem] pb-4">
          <span className="typing-cursor">{typedText}</span>
        </h1>

        {/* Cinematic Subtitle */}
        <motion.p
          className="mt-2 text-gray-300 font-sans font-light tracking-widest text-sm sm:text-lg uppercase text-glow-subtle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          A small surprise made with love.
        </motion.p>

        {/* Glow Trigger Button: "Open My Heart" */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <button
            onClick={onOpen}
            className="relative px-8 py-4 rounded-full font-outfit font-bold text-base tracking-widest text-white uppercase bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] border border-pink-400/30 overflow-hidden group transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            {/* Shimmer/Pulse button effect */}
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Heart className="w-5 h-5 text-white animate-bounce fill-white/20 group-hover:fill-white transition-colors duration-300" />
            Open My Heart
          </button>
        </motion.div>
      </div>

      {/* Floating Indicator at bottom */}
      <motion.div
        className="absolute bottom-6 flex flex-col items-center opacity-40 text-gray-400 text-xs font-outfit uppercase tracking-widest pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 3 }}
      >
        <span>Reveal Love</span>
        <ChevronDown className="w-4 h-4 mt-1 animate-bounce" />
      </motion.div>
    </section>
  );
}
