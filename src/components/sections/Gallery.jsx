import StarBackground from "../ui/StarBackground";
import gallery1 from '../../assets/gallery1.jpg';
import gallery2 from '../../assets/gallery2.jpg';
import gallery3 from '../../assets/gallery3.jpg';
import gallery4 from '../../assets/gallery4.jpg';
import gallery5 from '../../assets/gallery5.jpg';
import gallery6 from '../../assets/gallery6.jpg';

export default function Gallery() {
  const images = [
   gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-black">
      <StarBackground count={50} />
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-[#D4AF37] mb-3 sm:mb-4">
          Momen Indah
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-10 sm:mb-16 drop-shadow-lg">
          Galeri Kebersamaan
        </h3>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6 max-w-6xl mx-auto">
          {images.map((img, idx) => (
            <div key={idx} className="break-inside-avoid overflow-hidden rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-[#D4AF37]/20 group relative">
              <img 
                src={img} 
                alt={`Gallery ${idx + 1}`} 
                className="w-full h-auto object-cover transform transition duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C19]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

