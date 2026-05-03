import { useState, useEffect } from "react";

export default function StarBackground({ count = 40 }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = Array.from({ length: count }).map((_, i) => {
      const isGold = Math.random() > 0.8;
      const size = Math.random() * 2 + 1;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${size}px`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
        color: isGold ? "#D4AF37" : "#FFFFFF",
        boxShadow: `0 0 ${size * 2}px ${isGold ? "rgba(212,175,55,0.8)" : "rgba(255,255,255,0.8)"}`,
      };
    });
    setStars(newStars);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full opacity-0 animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
            boxShadow: star.boxShadow,
          }}
        />
      ))}
    </div>
  );
}
