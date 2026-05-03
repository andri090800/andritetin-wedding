import { HeartHandshake } from "lucide-react";

export default function ThankYou() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#0f100f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        <div className="bg-[#1A1C19]/80 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[40px] border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)] relative">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#0f100f] rounded-full flex justify-center items-center border border-[#D4AF37]/30">
            <HeartHandshake className="w-8 h-8 text-[#D4AF37]" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#D4AF37] mb-8 mt-4 tracking-wide">
            Ungkapan Terima Kasih
          </h2>

          <div className="space-y-6 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-sans italic px-2 sm:px-8">
            <p>
              Dari lubuk hati yang paling dalam, kami menyampaikan ucapan terima kasih yang tak terhingga kepada kedua orang tua kami yang telah memberikan dukungan penuh, doa, dan restu hingga kami bisa sampai di tahap yang membahagiakan ini.
            </p>
            <p>
              Terima kasih juga kami haturkan kepada seluruh saudara, kerabat, dan keluarga besar yang telah banyak membantu meluangkan waktu, tenaga, dan pikiran demi memudahkan segala urusan kami hingga puncak acara pernikahan ini dapat terselenggara dengan lancar.
            </p>
            <p className="font-semibold text-[#D4AF37] not-italic mt-8 pt-6 border-t border-[#D4AF37]/20 w-3/4 mx-auto">
              Semoga Allah SWT membalas segala kebaikan dan keikhlasan Bapak/Ibu/Saudara/i sekalian.
            </p>
          </div>
          
        </div>

      </div>
    </section>
  );
}
