import { useState, useEffect, useRef } from 'react';
import { Disc3 } from 'lucide-react';

export default function MusicPlayer({ isOpened }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isOpened && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Auto-play prevented by browser:", err);
      });
    }
  }, [isOpened]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* 
        Letakkan file MP3 'beautiful-in-white.mp3' di dalam folder 'public'
      */}
      <audio 
        ref={audioRef}
        src="/fix.mp3" 
        loop 
        preload="auto"
      />
      
      {isOpened && (
        <button 
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#1A1C19]/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-110"
          aria-label="Toggle Music"
        >
          <Disc3 className={`w-6 h-6 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
        </button>
      )}
    </>
  );
}
