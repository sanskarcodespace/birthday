import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loveQuotes = [
  "Creating a beautiful experience for a beautiful soul...",
  "Loading memories that we cherish together...",
  "Gathering sparkles, hearts, and stars...",
  "Preparing a letter from the depth of my heart...",
  "Almost there, my love..."
];

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Simulating luxury loading experience
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onFinish, 800); // Allow fade out animation to finish
          }, 600);
          return 100;
        }
        // Random incremental steps for organic loading feel
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 150);

    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % loveQuotes.length);
    }, 1500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(quoteTimer);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 bg-[#07020d] z-9999 flex flex-col items-center justify-center p-6 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -100,
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } 
          }}
        >
          {/* Animated Ambient Light Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-pink-500/10 blur-[80px] pointer-events-none animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-purple-500/10 blur-[60px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Glowing Center Heart Icon */}
          <motion.div
            className="relative cursor-default select-none z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.95, 1.1, 0.95],
              opacity: 1
            }}
            transition={{ 
              scale: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
              opacity: { duration: 0.5 }
            }}
          >
            {/* SVG Heart with custom neon gradient */}
            <svg 
              className="w-24 h-24 filter drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                fill="url(#heartGradient)"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-bold text-xs tracking-wider text-white select-none">
              {progress}%
            </span>
          </motion.div>

          {/* Loader text and percentage bar */}
          <div className="w-64 mt-12 text-center z-10">
            {/* Loading Bar */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6 relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                style={{ width: `${progress}%` }}
                layoutId="progressBar"
              />
            </div>

            {/* Cycling Quotes with AnimatePresence */}
            <div className="h-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  className="text-pink-200/80 text-sm font-medium tracking-wide leading-relaxed font-outfit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {loveQuotes[quoteIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
