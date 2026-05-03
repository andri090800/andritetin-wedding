import { FloatingPetals } from "../ui/BackgroundAnimations";
import foto8 from '../../assets/foto8.jpg';
import foto7 from '../../assets/foto7.jpg';

export default function Couple() {
  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0f100f] via-[#1a1c2c] to-[#0f100f]">
      <FloatingPetals count={25} />
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-[#D4AF37] mb-3 sm:mb-4">
          Mempelai
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-10 sm:mb-16 drop-shadow-lg">
          Pasangan Berbahagia
        </h3>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 sm:gap-12 md:gap-20 lg:gap-28">
          <Card 
            name="Andri Mulyana, S.Kom"
            desc="Putra dari Bpk. Hermin & Ibu Tati"
            img={foto8}
          />

          <div className="text-4xl sm:text-5xl font-serif text-[#D4AF37]/50 drop-shadow-md">
            &
          </div>

          <Card 
            name="Tetin Tresnawati, S.KM"
            desc="Putri dari Bpk. Tatang & Ibu Sukanah"
            img={foto7}
          />
        </div>
      </div>
    </section>
  );
}

const Card = ({ name, desc, img }) => (
  <div className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto group">
    <div className="relative w-full aspect-[3/4] mx-auto mb-5 sm:mb-8 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.15)] ring-2 ring-[#D4AF37]/40 p-1.5 bg-[#1A1C19]/40 backdrop-blur-sm">
      <img 
        src={img} 
        alt={name}
        className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105"
      />
    </div>

    <div className="bg-[#1A1C19]/40 backdrop-blur-md border border-[#D4AF37]/20 p-4 sm:p-6 rounded-2xl shadow-xl transform transition duration-500 group-hover:-translate-y-2">
      <h4 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-2">
        {name}
      </h4>

      <p className="text-sm md:text-base text-gray-400 font-sans">
        {desc}
      </p>
    </div>
  </div>
);

