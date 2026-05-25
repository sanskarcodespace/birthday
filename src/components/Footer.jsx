import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ heroOpened }) {
  // Only display footer once hero has been opened
  if (!heroOpened) return null;

  return (
    <footer className="relative w-full py-12 px-6 z-10 select-none overflow-hidden border-t border-white/5 bg-[#05010b]/80 backdrop-blur-md">
      
      {/* Decorative Glow */}
      <div className="absolute bottom-0 inset-x-0 h-[150px] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4 text-center">
        
        {/* Made with love tagline */}
        <div className="flex items-center gap-2 text-gray-400 font-outfit text-sm tracking-wide">
          <span>Made with love for</span>
          <a href="#gallery" className="font-bold text-gray-200 hover:text-pink-400 transition-colors duration-200 flex items-center gap-1.5 relative group">
            Shabnam
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="inline-block"
            >
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 filter drop-shadow-[0_0_4px_#ec4899]" />
            </motion.span>
            <span className="absolute bottom-[-2px] left-0 w-0 h-[1.5px] bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300" />
          </a>
        </div>

        {/* Delicate copyright and quote info */}
        <p className="text-[10px] sm:text-xs text-gray-500 font-sans tracking-widest uppercase">
          © {new Date().getFullYear()} • Forever & Always
        </p>

      </div>
    </footer>
  );
}
