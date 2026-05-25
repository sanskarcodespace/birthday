import React, { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function MusicPlayer({ isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  // Auto-manage play and pause based on parent state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Audio autoplay prevented by browser. Waiting for interaction.", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  // Handle Play/Pause toggle manually
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle Mute toggle
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Update track progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setTrackProgress(isNaN(progress) ? 0 : progress);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Audio element - Feel free to replace the URL with your own song path */}
      <audio
        ref={audioRef}
        src="https://www.chosic.com/wp-content/uploads/2020/07/Beautiful-Piano-Theme-chosic.com_.mp3"
        loop
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Music Player Glass Container */}
      <div className="glass-panel-glow flex items-center gap-3 p-2.5 px-4 rounded-full shadow-lg border border-pink-500/20 backdrop-blur-xl group hover:border-pink-500/40 transition-all duration-300">
        
        {/* Spinning Vinyl Record Visual */}
        <div 
          className={`relative w-9 h-9 rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center shadow-md transition-transform duration-[20000ms] ease-linear ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-black flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white"></div>
          </div>
          <Music className="absolute text-white/40 w-4 h-4 pointer-events-none" />
        </div>

        {/* Dynamic Equalizer Lines (waves when playing) */}
        <div className="flex items-end gap-[3px] h-3.5 w-6 px-1">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`w-[2.5px] bg-pink-500 rounded-full transition-all duration-300 ${
                isPlaying 
                  ? 'animate-pulse' 
                  : 'h-1.5'
              }`}
              style={{
                height: isPlaying ? `${Math.floor(Math.random() * 100) + 10}%` : '6px',
                animationDelay: `${i * 150}ms`,
                animationDuration: '0.6s'
              }}
            />
          ))}
        </div>

        {/* Progress bar wrapper */}
        <div className="hidden group-hover:block md:group-hover:block transition-all duration-300">
          <div className="w-20 bg-white/10 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-pink-500 h-full transition-all duration-100" 
              style={{ width: `${trackProgress}%` }}
            />
          </div>
        </div>

        {/* Buttons Controls */}
        <button
          onClick={togglePlay}
          className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors duration-200"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? <Pause className="w-4 h-4 text-pink-400" /> : <Play className="w-4 h-4 text-white" />}
        </button>

        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors duration-200"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
        </button>
      </div>
    </div>
  );
}
