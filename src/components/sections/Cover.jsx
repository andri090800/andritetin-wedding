import { useState, useEffect } from "react";
import { MailOpen } from "lucide-react";
import StarBackground from "../ui/StarBackground";

export default function Cover({ isOpened, onOpen }) {
  const [hidden, setHidden] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Timer Countdown to May 20, 2026
  useEffect(() => {
    const targetDate = new Date("May 20, 2026 08:00:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Remove component from DOM after animation
  useEffect(() => {
    if (isOpened) {
      const timer = setTimeout(() => {
        setHidden(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpened]);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-50 flex" style={{ perspective: "1500px" }}>
      {/* Left Door - Tema Malam Bertabur Bintang */}
      <div 
        className="w-1/2 h-full bg-black relative border-r border-[#D4AF37]/30 shadow-2xl overflow-hidden"
        style={{
          transformOrigin: "left center",
          transition: "transform 1.5s cubic-bezier(0.77, 0, 0.175, 1)",
          transform: isOpened ? "rotateY(-105deg)" : "rotateY(0deg)",
        }}
      >
        <StarBackground />
        {/* Ornamen Sunda Kiri */}
        <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="absolute top-10 right-4 opacity-30 text-[#D4AF37]">
          <SundaneseOrnamentLeft />
        </div>
        <div className="absolute bottom-10 right-4 opacity-30 text-[#D4AF37]">
          <SundaneseOrnamentLeft className="rotate-180" />
        </div>
      </div>

      {/* Right Door */}
      <div 
        className="w-1/2 h-full bg-black relative border-l border-[#D4AF37]/30 shadow-2xl overflow-hidden"
        style={{
          transformOrigin: "right center",
          transition: "transform 1.5s cubic-bezier(0.77, 0, 0.175, 1)",
          transform: isOpened ? "rotateY(105deg)" : "rotateY(0deg)",
        }}
      >
        <StarBackground />
        {/* Ornamen Sunda Kanan */}
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="absolute top-10 left-4 opacity-30 text-[#D4AF37]">
          <SundaneseOrnamentRight />
        </div>
        <div className="absolute bottom-10 left-4 opacity-30 text-[#D4AF37]">
          <SundaneseOrnamentRight className="rotate-180" />
        </div>
      </div>

      {/* Center Content */}
      <div 
        className={`absolute inset-0 flex flex-col justify-center items-center text-center px-4 transition-all duration-1000 ${
          isOpened ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto delay-300"
        }`}
      >
        <div className="bg-[#1A1C19]/80 p-6 sm:p-10 md:p-14 rounded-[28px] sm:rounded-[40px] border border-[#D4AF37]/40 shadow-[0_0_60px_rgba(212,175,55,0.15)] backdrop-blur-md flex flex-col items-center relative overflow-hidden w-full max-w-[90vw] sm:max-w-sm md:max-w-lg">
          
          {/* Subtle floral background behind text */}
          <div className="absolute inset-0 opacity-5 flex justify-center items-center pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#D4AF37]">
               <path d="M50 0 C60 30 90 40 100 50 C90 60 60 70 50 100 C40 70 10 60 0 50 C10 40 40 30 50 0 Z" />
            </svg>
          </div>

          <p className="font-serif italic text-[#D4AF37] mb-1 sm:mb-2 text-base sm:text-lg">Sampurasun,</p>
          <p className="uppercase tracking-[0.2em] text-[10px] sm:text-xs md:text-sm text-gray-300 mb-4 sm:mb-6 font-medium">
            Wiilujeung Sumping Pernikahan Adat Sunda
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif mb-4 sm:mb-6 text-white leading-tight drop-shadow-lg">
            Andri <span className="text-[#D4AF37] font-sans font-light px-1 sm:px-2">&</span> Tetin
          </h1>

          <p className="font-sans font-medium tracking-[0.3em] text-[#D4AF37] text-sm sm:text-base mb-6 sm:mb-8 border-y border-[#D4AF37]/30 py-2 px-6">
            20 MEI 2026
          </p>

          <div className="flex gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-10 text-[#D4AF37] font-serif">
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl md:text-4xl">{timeLeft.days}</span>
              <span className="text-[9px] sm:text-xs uppercase tracking-widest text-gray-400 font-sans">Hari</span>
            </div>
            <span className="text-xl sm:text-2xl md:text-4xl opacity-50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl md:text-4xl">{timeLeft.hours}</span>
              <span className="text-[9px] sm:text-xs uppercase tracking-widest text-gray-400 font-sans">Jam</span>
            </div>
            <span className="text-xl sm:text-2xl md:text-4xl opacity-50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl md:text-4xl">{timeLeft.minutes}</span>
              <span className="text-[9px] sm:text-xs uppercase tracking-widest text-gray-400 font-sans">Menit</span>
            </div>
            <span className="text-xl sm:text-2xl md:text-4xl opacity-50">:</span>
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl md:text-4xl">{timeLeft.seconds}</span>
              <span className="text-[9px] sm:text-xs uppercase tracking-widest text-gray-400 font-sans">Detik</span>
            </div>
          </div>

          <button 
            onClick={onOpen}
            className="relative z-10 group px-6 sm:px-8 py-2.5 sm:py-3 bg-[#D4AF37] text-[#1A1C19] rounded-full hover:bg-[#F3E5AB] transition duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] font-medium tracking-wide flex items-center gap-2 sm:gap-3 transform hover:-translate-y-1 text-sm sm:text-base"
          >
            <MailOpen className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple SVG components to represent generic traditional ornaments
const SundaneseOrnamentLeft = ({ className = "" }) => (
  <svg width="40" height="120" viewBox="0 0 40 120" fill="currentColor" className={className}>
    <path d="M38 0 C 10 20, 0 50, 0 60 C 0 70, 10 100, 38 120 L 40 120 L 40 0 Z" />
    <path d="M30 20 C 15 35, 10 50, 10 60 C 10 70, 15 85, 30 100" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const SundaneseOrnamentRight = ({ className = "" }) => (
  <svg width="40" height="120" viewBox="0 0 40 120" fill="currentColor" className={className}>
    <path d="M2 0 C 30 20, 40 50, 40 60 C 40 70, 30 100, 2 120 L 0 120 L 0 0 Z" />
    <path d="M10 20 C 25 35, 30 50, 30 60 C 30 70, 25 85, 10 100" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);
