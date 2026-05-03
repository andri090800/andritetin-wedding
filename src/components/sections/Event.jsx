import { Calendar, MapPin, Clock } from "lucide-react";
import { LightParticles } from "../ui/BackgroundAnimations";

export default function Event() {
  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0f100f] via-[#2a221b] to-[#0f100f]">
      <LightParticles count={40} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-[#D4AF37] mb-3 sm:mb-4">
          Waktu & Tempat
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-10 sm:mb-16 drop-shadow-lg">
          Rangkaian Acara
        </h3>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <EventCard 
            title="Akad Nikah"
            date="Rabu, 20 Mei 2026"
            time="08:00 WIB - Selesai"
            location="Kediaman Mempelai Wanita"
            address="Kp. Tunggul Hideung RT 03/02 Desa Girimukti Kec. Cisewu Garut "
          />

          <EventCard 
            title="Resepsi Pernikahan"
            date="Rabu, 20 Mei 2026"
            time="10:00 WIB - Selesai"
            location="Kediaman Mempelai Wanita"
            address="Kp. Tunggul Hideung RT 03/02 Desa Girimukti Kec. Cisewu Garut"
          />
        </div>

        {/* Denah Lokasi */}
        <div className="mt-12 max-w-2xl mx-auto rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative group">
          <img 
            src="/src/assets/denah.png" 
            alt="Denah Lokasi" 
            className="w-full h-auto transform transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-center pb-6">
            <span className="text-white font-medium tracking-widest text-sm">DENAH LOKASI</span>
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex justify-center">
          <a 
            href="https://maps.app.goo.gl/kppzsgHChKhirrKn9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1C19] rounded-lg transition duration-500 font-medium tracking-wide text-sm sm:text-base shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
          >
            <MapPin className="w-5 h-5" />
            Lihat Peta Lokasi
          </a>
        </div>
      </div>
    </section>
  );
}

const EventCard = ({ title, date, time, location, address }) => (
  <div className="bg-[#1A1C19]/40 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-[#D4AF37]/30 relative overflow-hidden group text-left">
    {/* Decorative corner */}
    <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl from-[#D4AF37]/20 to-transparent rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-700" />
    
    <h4 className="text-xl sm:text-2xl font-serif text-white mb-4 sm:mb-6 border-b border-[#D4AF37]/30 pb-4">
      {title}
    </h4>

    <div className="space-y-4 sm:space-y-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="p-2 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 shrink-0">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
        </div>
        <div className="mt-1">
          <p className="font-medium text-gray-200 text-sm sm:text-base">{date}</p>
        </div>
      </div>

      <div className="flex items-start gap-3 sm:gap-4">
        <div className="p-2 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 shrink-0">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
        </div>
        <div className="mt-1">
          <p className="text-gray-400 text-sm sm:text-base">{time}</p>
        </div>
      </div>

      <div className="flex items-start gap-3 sm:gap-4">
        <div className="p-2 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20 shrink-0">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
        </div>
        <div className="mt-1">
          <p className="font-medium text-gray-200 text-sm sm:text-base">{location}</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">{address}</p>
        </div>
      </div>
    </div>
  </div>
);
