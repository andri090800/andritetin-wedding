import { LightParticles } from "../ui/BackgroundAnimations";

export default function QuranVerse() {
  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0f100f] via-[#181a1f] to-[#0f100f]">
      <LightParticles count={30} />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        <div className="bg-[#1A1C19]/40 backdrop-blur-md border border-[#D4AF37]/20 p-8 sm:p-12 md:p-16 rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.1)] text-center relative group">
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-20 sm:w-32 h-20 sm:h-32 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-3xl opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-20 sm:w-32 h-20 sm:h-32 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-3xl opacity-60"></div>
          
          {/* Bismillah */}
          <div 
            className="text-3xl sm:text-4xl md:text-5xl text-[#D4AF37] mb-8 sm:mb-10 leading-loose drop-shadow-md" 
            style={{ fontFamily: "'Amiri Quran', serif" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
          
          {/* Ayat */}
          <div 
            className="text-2xl sm:text-3xl md:text-4xl text-white mb-8 sm:mb-10 leading-[2.2] sm:leading-[2.5] drop-shadow-lg" 
            dir="rtl" 
            style={{ fontFamily: "'Amiri Quran', serif" }}
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </div>

          {/* Translation */}
          <p className="text-sm sm:text-base md:text-lg text-gray-300 font-sans italic leading-relaxed mb-6 sm:mb-8 px-2 sm:px-8">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
          </p>
          
          {/* Source */}
          <div className="inline-block border-t border-[#D4AF37]/40 pt-4">
            <p className="text-[#D4AF37] font-semibold tracking-widest uppercase text-xs sm:text-sm">
              ( QS. Ar-Rum : 21 )
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
