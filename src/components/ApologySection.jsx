import React from 'react';
import { motion } from 'framer-motion';
import { HeartOff, Heart } from 'lucide-react';

export default function ApologySection() {
  return (
    <section id="sorry" className="relative py-24 px-6 max-w-4xl mx-auto z-10">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[90px] pointer-events-none" />

      {/* Sincere Apology Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass-panel-glow rounded-3xl p-8 sm:p-12 border border-purple-500/25 relative overflow-hidden shadow-2xl"
      >
        {/* Soft Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/[0.03] to-purple-500/[0.03] pointer-events-none" />

        {/* Ambient Top Light Beam */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="flex flex-col items-center text-center">
          
          {/* Apology Icon Overlay: Transforming broken to whole heart */}
          <div className="relative mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.08, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              <Heart className="w-8 h-8 text-purple-400 fill-purple-400/20" />
            </motion.div>
          </div>

          <h3 className="font-outfit font-extrabold text-2xl sm:text-3xl text-purple-200 tracking-wider">
            From the Bottom of My Heart
          </h3>

          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent my-6" />

          {/* Sincere Text Message with romantic glow styling */}
          <p className="font-playfair text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed text-gray-200 filter drop-shadow-[0_2px_8px_rgba(236,72,153,0.15)] max-w-2xl">
            “Sorry for every mistake, every misunderstanding, and every moment that hurt you. You mean everything to me.”
          </p>

          <p className="mt-8 text-gray-400 font-sans font-light tracking-wide text-xs sm:text-sm max-w-md">
            No relationship is perfect, but my love for you has always been absolute. Thank you for your endless patience and understanding. ❤️
          </p>

        </div>
      </motion.div>
    </section>
  );
}
