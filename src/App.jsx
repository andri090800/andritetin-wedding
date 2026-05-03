import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cover from "./components/sections/Cover";
import Couple from "./components/sections/Couple";
import QuranVerse from "./components/sections/QuranVerse";
import Event from "./components/sections/Event";
import Gallery from "./components/sections/Gallery";
import Gift from "./components/sections/Gift";
import RSVP from "./components/sections/RSVP";
import Wishes from "./components/sections/Wishes";
import ThankYou from "./components/sections/ThankYou";
import Footer from "./components/sections/Footer";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import MusicPlayer from "./components/ui/MusicPlayer";

const Invitation = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
      setIsAutoScrolling(false);
    } else {
      document.body.style.overflow = "auto";
      const timer = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpened]);

  useEffect(() => {
    let scrollInterval;
    let isUserInteracting = false;
    let interactionTimeout;

    if (isAutoScrolling) {
      scrollInterval = setInterval(() => {
        // Hanya jalan jika user sedang tidak berinteraksi
        if (!isUserInteracting) {
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setIsAutoScrolling(false);
            return;
          }
          window.scrollBy({ top: 1, behavior: "auto" });
        }
      }, 40);
    }

    const handleInteraction = () => {
      isUserInteracting = true;
      clearTimeout(interactionTimeout);
      
      // Lanjutkan auto-scroll 1.5 detik setelah user berhenti menyentuh/scroll
      interactionTimeout = setTimeout(() => {
        isUserInteracting = false;
      }, 1500);
    };

    // Deteksi aktivitas user
    window.addEventListener('wheel', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('touchmove', handleInteraction, { passive: true });

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
      clearTimeout(interactionTimeout);
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
    };
  }, [isAutoScrolling]);

  return (
    <>
      <MusicPlayer isOpened={isOpened} />
      <Cover isOpened={isOpened} onOpen={() => setIsOpened(true)} />
      
      <div 
        className={`font-sans antialiased text-gray-200 selection:bg-[#D4AF37] selection:text-[#1A1C19] transition-opacity duration-1000 min-h-screen relative ${isOpened ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}
      >
        <div className="relative z-0 bg-[#0f100f]">
          <Couple />
          <QuranVerse />
          <Event />
          <Gallery />
          <Gift />
          <RSVP />
          <Wishes />
          <ThankYou />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Invitation />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
