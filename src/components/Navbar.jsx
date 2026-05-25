import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Our Memories', href: '#gallery' },
  { name: 'Love Letter', href: '#letter' },
  { name: 'My Apology', href: '#sorry' },
  { name: 'Why I Love You', href: '#reasons' },
  { name: 'The Surprise', href: '#surprise' },
];

export default function Navbar({ heroOpened }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shrink navbar slightly on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Only render Navbar if the Hero has been opened
  if (!heroOpened) return null;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-black/60 backdrop-blur-xl border-b border-white/5' 
          : 'py-5 bg-transparent'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand/Logo */}
        <a 
          href="#gallery" 
          onClick={(e) => handleLinkClick(e, '#gallery')} 
          className="flex items-center gap-2 group cursor-pointer"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500 filter drop-shadow-[0_0_6px_#ec4899]" />
          </motion.div>
          <span className="font-outfit font-bold text-lg bg-gradient-to-r from-white via-pink-200 to-purple-300 bg-clip-text text-transparent tracking-wider">
            Shabnam
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="font-outfit text-sm font-medium tracking-wide text-gray-300 hover:text-pink-400 hover:text-glow-subtle transition-all duration-300 relative group"
            >
              {item.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-x-0 top-[60px] bg-[#0d0614]/95 backdrop-blur-2xl border-b border-pink-500/10 shadow-2xl py-6 flex flex-col items-center gap-5 z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="font-outfit text-base font-semibold tracking-wide text-gray-200 hover:text-pink-400 py-2 w-full text-center hover:bg-white/5 transition-all duration-200"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
