import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Heart } from 'lucide-react';

const letterContent = `Happy Birthday, Shabnam ❤️

Pata hai…
Life mein bahut log aate hain aur chale jaate hain,
but tum meri life ka woh beautiful part ho
jise main kabhi lose nahi karna chahta. ✨

Thank you itna pyaar dene ke liye,
mere har mood ko samajhne ke liye,
meri bakwaas baatein sunne ke liye,
aur hamesha mere saath rehne ke liye. 💖

Mujhse mistakes hui hain…
kabhi gussa, kabhi misunderstandings,
kabhi aisi baatein jo tumhe hurt kar gayi…
aur uske liye I’m truly sorry jaan. 🥺

But trust me…
maine kabhi bhi tumhe intentionally hurt nahi karna chaha.

n kabhi tumko rulana chaha 

wo to mai thoda sa bewakuf jo 

etna payara bacha ko rula deta hu 


Tum mere liye bohot special ho… bohot zyada.

Tumhari smile,
tumhari cute si baatein,
tumhara care,
tumhara mere life mein hona…
sab kuch meri duniya ko better bana deta hai. 🌸

Main perfect nahi hoon,
but ek cheez hamesha real rahegi —
mera pyaar tumhare liye. ❤️

Aaj tumhare birthday par bas itna kehna chahta hoon…

Thank you for being in my life.
Thank you for loving me.
And thank you for making my world beautiful. ✨

I promise,
main har din tumhe aur zyada pyaar karunga,
aur better person banne ki koshish karunga… sirf tumhare liye. 💞

Happy Birthday once again meri Shabnam ❤️

Forever yours,
[Tumhara  payar GADHA ]`;

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [startTyping, setStartTyping] = useState(false);

  // Typewriter effect triggered once envelope is fully opened
  useEffect(() => {
    if (!startTyping) return;

    let index = 0;
    setTypedText('');
    
    const interval = setInterval(() => {
      setTypedText(letterContent.slice(0, index + 1));
      index++;
      if (index >= letterContent.length) {
        clearInterval(interval);
      }
    }, 45); // Warm, organic reading/typing speed

    return () => clearInterval(interval);
  }, [startTyping]);


  const handleOpenEnvelope = () => {
    setIsOpen(true);
    // Add small delay so the typewriter starts after paper slides out
    setTimeout(() => {
      setStartTyping(true);
    }, 1000);
  };

  return (
    <section id="letter" className="relative py-24 px-6 max-w-4xl mx-auto z-10">
      
      {/* Title */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-outfit text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Mail className="w-4.5 h-4.5" />
          A Personal Note
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-outfit font-extrabold text-3xl sm:text-5xl bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent"
        >
          My Letter To You
        </motion.h2>
      </div>

      <div className="flex flex-col items-center">
        
        {/* Closed Envelope view */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed"
              className="glass-panel-glow w-full max-w-md p-8 py-12 rounded-2xl flex flex-col items-center text-center cursor-pointer border border-pink-500/20 hover:border-pink-500/40 shadow-2xl relative overflow-hidden group select-none"
              whileHover={{ scale: 1.02 }}
              onClick={handleOpenEnvelope}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, y: -40, transition: { duration: 0.4 } }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {/* Background ambient lighting */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-purple-500/5 pointer-events-none" />
              
              {/* Glowing Heart Seal */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-20 h-20 rounded-full bg-pink-500/15 flex items-center justify-center border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.3)] mb-6 group-hover:bg-pink-500/25 transition-all duration-300"
              >
                <Heart className="w-9 h-9 text-pink-500 fill-pink-500 animate-pulse" />
              </motion.div>

              <h3 className="font-outfit font-bold text-xl text-white tracking-wide">
                You have a new message
              </h3>
              
              <p className="text-gray-400 font-sans font-light mt-2 text-sm max-w-xs">
                Click this envelope seal to open my heart and read this special letter written just for you.
              </p>

              {/* Action Button */}
              <button 
                onClick={handleOpenEnvelope}
                className="mt-8 px-6 py-2.5 rounded-full font-outfit text-xs font-semibold uppercase tracking-wider text-white bg-pink-600 hover:bg-pink-500 transition-colors duration-300 shadow-md cursor-pointer"
              >
                Open Envelope
              </button>
            </motion.div>
          ) : (
            
            /* Opened Envelope & Letter view */
            <motion.div
              key="opened"
              className="w-full max-w-2xl relative z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Retro Letter Paper Design */}
              <div className="relative bg-[#faf7f2] border-2 border-[#eee6d8] rounded-lg p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden text-slate-800 font-serif">
                
                {/* Vintage Letter watermark texture lines */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Floating Heart pin inside */}
                <div className="absolute top-4 right-6 text-pink-500/20 font-bold hidden sm:block">
                  <Heart className="w-16 h-16 fill-pink-500/10 pointer-events-none" />
                </div>

                {/* Opened indicator seal */}
                <div className="flex items-center gap-1.5 text-[10px] font-outfit uppercase tracking-widest text-slate-400 font-bold mb-8 border-b border-slate-200 pb-3">
                  <MailOpen className="w-4 h-4 text-pink-500" />
                  Written with infinite love
                </div>

                {/* Letter Body - Uses beautiful handwriting class with proper formatting */}
                <div className="font-playfair text-base sm:text-lg md:text-xl leading-relaxed whitespace-pre-line text-slate-700 font-medium">
                  {typedText}
                  {/* Blinking Cursor at the end of typewriter */}
                  {typedText.length < letterContent.length && (
                    <span className="inline-block w-1.5 h-5 bg-pink-500 ml-1 animate-pulse" />
                  )}
                </div>

                {/* Back button option */}
                {typedText.length === letterContent.length && (
                  <motion.div
                    className="mt-12 text-center border-t border-slate-200 pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setStartTyping(false);
                        setTypedText('');
                      }}
                      className="px-5 py-2 rounded-full font-outfit text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-pink-500 border border-slate-200 hover:border-pink-500/40 hover:bg-pink-500/5 transition-all duration-300 cursor-pointer"
                    >
                      Close Letter
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
