import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SurpriseSection() {
  const [surpriseTriggered, setSurpriseTriggered] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  // Generate floating heart bursts
  const createHeartBurst = () => {
    const newHearts = [];
    for (let i = 0; i < 35; i++) {
      newHearts.push({
        id: Date.now() + i + Math.random(),
        x: Math.random() * 100 - 50, // relative left/right offset
        y: Math.random() * -100 - 50, // floating upwards
        scale: Math.random() * 1.5 + 0.8,
        delay: Math.random() * 0.4,
        duration: Math.random() * 2 + 1.5,
        rotation: Math.random() * 90 - 45
      });
    }
    setFloatingHearts(newHearts);
  };

  const handleTriggerSurprise = () => {
    setSurpriseTriggered(true);
    createHeartBurst();

    // Trigger Luxury Confetti Explosion
    // 1. Center Burst
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#ec4899', '#a855f7', '#f43f5e', '#ffffff', '#ffd700']
    });

    // 2. Left and Right continuous showers
    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 45 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <section id="surprise" className="relative py-32 px-6 max-w-4xl mx-auto text-center z-10 overflow-hidden min-h-[500px] flex flex-col justify-center items-center">
      
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!surpriseTriggered ? (
          
          /* Step 1: Glowing Call to Action Button */
          <motion.div
            key="button-state"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20 shadow-lg">
              <Sparkles className="w-8 h-8 text-pink-400 fill-pink-400/20 animate-pulse" />
            </div>

            <h3 className="font-outfit font-extrabold text-2xl sm:text-4xl text-white mb-4 tracking-wide">
              Are you ready for the final surprise?
            </h3>
            
            <p className="text-gray-400 font-sans font-light text-sm sm:text-base max-w-md mb-10 leading-relaxed">
              Click the button below to unlock my ultimate birthday declaration for you.
            </p>

            <button
              onClick={handleTriggerSurprise}
              className="px-10 py-5 rounded-full font-outfit font-extrabold text-base sm:text-lg tracking-widest text-white uppercase bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:shadow-[0_0_45px_rgba(236,72,153,0.7)] border border-pink-400/30 group transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-5 h-5 text-white animate-pulse fill-white" />
              Click for Final Surprise ❤️
            </button>
          </motion.div>
        ) : (
          
          /* Step 2: The grand climax love letter card */
          <motion.div
            key="surprise-state"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="flex flex-col items-center max-w-xl z-20 relative"
          >
            {/* Glowing Light Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-pink-500/15 blur-[90px] pointer-events-none animate-pulse" />

            {/* Floating Heart Bursts elements */}
            {floatingHearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute text-pink-500 pointer-events-none"
                style={{ left: 0, top: 0 }}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
                animate={{ 
                  opacity: [1, 1, 0], 
                  scale: heart.scale, 
                  x: heart.x * 6, // multiply to spread wide
                  y: heart.y * 5, // float high
                  rotate: heart.rotation
                }}
                transition={{ 
                  delay: heart.delay, 
                  duration: heart.duration, 
                  ease: "easeOut" 
                }}
              >
                <Heart className="w-6 h-6 fill-pink-500 filter drop-shadow-[0_0_8px_#ec4899]" />
              </motion.div>
            ))}

            {/* Heart Core Emblem */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                filter: ["drop-shadow(0 0 10px #ec4899)", "drop-shadow(0 0 25px #ec4899)", "drop-shadow(0 0 10px #ec4899)"]
              }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="mb-8"
            >
              <Heart className="w-24 h-24 text-pink-500 fill-pink-500" />
            </motion.div>

            {/* Grand finale text declaration */}
            <h2 className="font-outfit font-black text-4xl sm:text-6xl text-white tracking-wider leading-tight filter drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
              I Love You Forever,<br/>Shabnam ❤️
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-pink-200/80 font-handwriting text-3xl tracking-wide max-w-md text-center"
            >
              You are my present, my future, and my forever love story. Happy Birthday, my beautiful queen!
            </motion.p>
            
            {/* Replay button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
              onClick={() => {
                setSurpriseTriggered(false);
                setFloatingHearts([]);
              }}
              className="mt-12 text-xs font-outfit uppercase tracking-widest text-gray-400 hover:text-pink-400 transition-colors duration-200 cursor-pointer"
            >
              Replay the Magic ✨
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
