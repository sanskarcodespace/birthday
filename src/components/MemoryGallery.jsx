import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Heart, ZoomIn } from 'lucide-react';

// Importing the new custom images
import memory1 from '../assets/images/memory1.jpg';
import memory2 from '../assets/images/memory2.jpg';
import memory3 from '../assets/images/memory3.jpg';
import memory4 from '../assets/images/memory4.jpg';
import memory5 from '../assets/images/memory5.jpg';
import memory6 from '../assets/images/memory6.jpg';

const galleryPhotos = [
  {
    id: 1,
    url: memory1,
    caption: "A beautiful day in the park with you. ❤️",
    tilt: "polaroid-tilt-left",
    date: "A beautiful memory"
  },
  {
    id: 2,
    url: memory2,
    caption: "Sitting together, my favorite place is next to you.",
    tilt: "polaroid-tilt-right",
    date: "Together with you"
  },
  {
    id: 3,
    url: memory3,
    caption: "Another perfect moment captured forever.",
    tilt: "polaroid-tilt-left",
    date: "Simply breathtaking"
  },
  {
    id: 4,
    url: memory4,
    caption: "Our lovely mirror selfie. Always stylish, always together.",
    tilt: "polaroid-tilt-right",
    date: "Connecting our hearts"
  },
  {
    id: 5,
    url: memory5,
    caption: "Looking amazing as always.",
    tilt: "polaroid-tilt-left",
    date: "My favorite person"
  },
  {
    id: 6,
    url: memory6,
    caption: "Every moment with you is a treasure.",
    tilt: "polaroid-tilt-right",
    date: "Forever and always"
  }
];


export default function MemoryGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="gallery" className="relative py-24 px-6 max-w-6xl mx-auto z-10">
      
      {/* Title block */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-outfit text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Camera className="w-4.5 h-4.5" />
          Our Love Story
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-outfit font-extrabold text-3xl sm:text-5xl bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent"
        >
          Memory Polaroid Gallery
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 font-sans font-light mt-3 max-w-lg mx-auto text-sm sm:text-base"
        >
          A look at some of the most precious moments that I hold very close to my heart. Click any photo to see it in full.
        </motion.p>
      </div>

      {/* Masonry/Grid Gallery - optimized for 6 images (1, 2, or 3 columns based on screen size) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {galleryPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            onClick={() => setSelectedPhoto(photo)}
            className={`polaroid-card cursor-pointer bg-[#ffffff] p-4 pb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-200/5 ${photo.tilt} w-full max-w-[340px] group relative`}
          >
            {/* Interactive Glow effect overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Polaroid image window */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-900 border border-gray-100/10">
              <img
                src={photo.url}
                alt={`Memory ${photo.id}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Zoom overlay on image hover */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 shadow-md">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Handwritten bottom caption area */}
            <div className="mt-5 text-center px-1">
              <p className="font-handwriting text-2xl text-slate-800 leading-tight">
                {photo.caption}
              </p>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-outfit uppercase tracking-widest text-slate-400 font-bold">
                <Heart className="w-3 h-3 text-pink-500 fill-pink-500/40" />
                {photo.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Full Photo Preview Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Polaroid in Lightbox */}
            <motion.div
              className="bg-white p-4 pb-8 max-w-[90vw] md:max-w-[450px] shadow-[0_25px_60px_rgba(236,72,153,0.15)] rounded-sm relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Stop click from closing
            >
              {/* Heart pin icon on top */}
              <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 bg-pink-500 p-2.5 rounded-full shadow-lg border border-white">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>

              {/* Lightbox Image */}
              <div className="w-full overflow-hidden bg-gray-900 border border-gray-100/10">
                <img
                  src={selectedPhoto.url}
                  alt="Precious Moment"
                  className="w-full h-auto max-h-[70vh] object-contain rounded-sm"
                />
              </div>

              {/* Lightbox caption */}
              <div className="mt-6 text-center px-4">
                <h4 className="font-handwriting text-3xl text-slate-800 leading-normal">
                  {selectedPhoto.caption}
                </h4>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-outfit uppercase tracking-widest text-slate-400 font-bold">
                  <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                  {selectedPhoto.date}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
