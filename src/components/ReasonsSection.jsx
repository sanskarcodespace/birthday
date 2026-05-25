import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Smile, Sun, Eye, Award } from 'lucide-react';

const reasons = [
  {
    id: 1,
    title: "Your Smile",
    description: "It has the magic power to wash away my darkest days and make my world instantly brighter.",
    icon: Smile,
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236, 72, 153, 0.4)"
  },
  {
    id: 2,
    title: "Your Care",
    description: "The sweet ways you check up on me, support me, and make me feel incredibly protected and cherished.",
    icon: Heart,
    color: "from-purple-500 to-pink-500",
    glow: "rgba(168, 85, 247, 0.4)"
  },
  {
    id: 3,
    title: "Your Kindness",
    description: "Your gentle soul and big heart that treats everyone with love, patience, and warmth.",
    icon: Sparkles,
    color: "from-rose-500 to-purple-500",
    glow: "rgba(244, 63, 94, 0.4)"
  },
  {
    id: 4,
    title: "Your Presence",
    description: "Just having you near me makes everything feel right. Being close to you is where I find absolute peace.",
    icon: Sun,
    color: "from-pink-500 to-indigo-500",
    glow: "rgba(236, 72, 153, 0.4)"
  },
  {
    id: 5,
    title: "Your Laugh",
    description: "The sweetest symphony in my world. Hearing you laugh is my absolute favorite sound.",
    icon: Eye,
    color: "from-purple-500 to-rose-500",
    glow: "rgba(168, 85, 247, 0.4)"
  },
  {
    id: 6,
    title: "Everything About You",
    description: "From your cutest little details to your entire soul. I love you exactly as you are, forever.",
    icon: Award,
    color: "from-rose-500 to-pink-500",
    glow: "rgba(244, 63, 94, 0.4)"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 }
  }
};

export default function ReasonsSection() {
  return (
    <section id="reasons" className="relative py-24 px-6 max-w-6xl mx-auto z-10">
      
      {/* Title Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-outfit text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Sparkles className="w-4.5 h-4.5" />
          My Favorite Things
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-outfit font-extrabold text-3xl sm:text-5xl bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent"
        >
          Reasons Why I Love You
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 font-sans font-light mt-3 max-w-lg mx-auto text-sm sm:text-base"
        >
          There are a million reasons, but here are some of the most precious things that make me fall in love with you every single day.
        </motion.p>
      </div>

      {/* Grid of Love Reasons */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {reasons.map((reason) => {
          const Icon = reason.icon;
          return (
            <motion.div
              key={reason.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="glass-panel rounded-2xl p-6 border border-white/5 relative overflow-hidden group select-none"
              style={{
                boxShadow: `0 8px 32px 0 rgba(0,0,0,0.3)`
              }}
            >
              {/* Subtle dynamic background color on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 10% 10%, ${reason.glow} 0%, transparent 65%)`
                }}
              />

              {/* Glowing Color Accent bar on top */}
              <div className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r ${reason.color} opacity-80`} />

              {/* Icon Emblem */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${reason.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>

              {/* Text */}
              <h3 className="font-outfit font-bold text-lg text-white mb-2 tracking-wide group-hover:text-pink-300 transition-colors duration-300">
                {reason.title}
              </h3>
              
              <p className="text-gray-400 font-sans font-light text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
