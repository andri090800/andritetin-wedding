import { useState, useEffect } from "react";

export const FloatingPetals = ({ count = 20 }) => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const newPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 10 + 10}s`,
      size: `${Math.random() * 15 + 10}px`,
      rotation: `${Math.random() * 360}deg`,
    }));
    setPetals(newPetals);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float opacity-40"
          style={{
            left: p.left,
            top: "-20px",
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotation})`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="#ffb7c5" className="w-full h-full">
            <path d="M12,2C12,2 10,7 5,10C2,12 2,15 2,15C2,15 5,14 8,14C11,14 12,18 12,18C12,18 13,14 16,14C19,14 22,15 22,15C22,15 22,12 19,10C14,7 12,2 12,2Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export const LightParticles = ({ count = 30, color = "#D4AF37" }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 4 + 3}s`,
      size: `${Math.random() * 3 + 1}px`,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-drift opacity-0"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      ))}
    </div>
  );
};

export const BokehBackground = ({ count = 15 }) => {
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    const newOrbs = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 150 + 50}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 15 + 10}s`,
    }));
    setOrbs(newOrbs);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((o) => (
        <div
          key={o.id}
          className="absolute rounded-full animate-bokeh blur-[40px] opacity-10 bg-gradient-to-br from-[#D4AF37]/30 to-transparent"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            animationDelay: o.delay,
            animationDuration: o.duration,
          }}
        />
      ))}
    </div>
  );
};
