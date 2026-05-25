import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importing Custom components
import LoadingScreen from './components/LoadingScreen';
import BackgroundEffects from './components/BackgroundEffects';
import MusicPlayer from './components/MusicPlayer';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import MemoryGallery from './components/MemoryGallery';
import LoveLetter from './components/LoveLetter';
import ApologySection from './components/ApologySection';
import ReasonsSection from './components/ReasonsSection';
import SurpriseSection from './components/SurpriseSection';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroOpened, setHeroOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for top progress bar indicator
  useEffect(() => {
    if (!heroOpened) return;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroOpened]);

  // Open heart trigger: Starts music, shows sections and smooth scrolls down
  const handleOpenHeart = () => {
    setHeroOpened(true);
    setIsPlaying(true);
    
    // Smooth scroll down to first content section after opening
    setTimeout(() => {
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {/* Step 1: Luxury intro loader screen */}
        {isLoading && (
          <LoadingScreen onFinish={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen text-gray-100 font-sans selection:bg-pink-500 selection:text-white select-none overflow-x-hidden">
          
          {/* Continuous floating heart and stardust background */}
          <BackgroundEffects />

          {/* Background Music player floating deck */}
          <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

          {/* Top Scroll Progress Indicator */}
          {heroOpened && (
            <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/5 z-50">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 transition-all duration-75"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          )}

          {/* Main Navigation menu */}
          <Navbar heroOpened={heroOpened} />

          {/* Step 2: Fullscreen Cinematic Landing Hero */}
          <LandingHero onOpen={handleOpenHeart} />

          {/* Step 3: Reveal rest of sections dynamically upon button trigger */}
          <AnimatePresence>
            {heroOpened && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full relative z-10"
              >
                {/* 1. Polaroid Memory Grid */}
                <MemoryGallery />

                {/* Horizontal Divider Line */}
                <div className="max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-pink-500/10 to-transparent" />

                {/* 2. Opening envelope love letter */}
                <LoveLetter />

                {/* Horizontal Divider Line */}
                <div className="max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

                {/* 3. Glowing sorry card */}
                <ApologySection />

                {/* Horizontal Divider Line */}
                <div className="max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-pink-500/10 to-transparent" />

                {/* 4. Love grid cards reasons */}
                <ReasonsSection />

                {/* Horizontal Divider Line */}
                <div className="max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

                {/* 5. Climax surprise heart explosion */}
                <SurpriseSection />

                {/* Responsive Footer */}
                <Footer heroOpened={heroOpened} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
