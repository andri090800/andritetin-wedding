import { useState } from "react";
import { Gift as GiftIcon, Copy, CheckCircle2 } from "lucide-react";
import { BokehBackground } from "../ui/BackgroundAnimations";

export default function Gift() {
  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0f100f] via-[#112a1a] to-[#0f100f]">
      <BokehBackground count={12} />
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-[#D4AF37] mb-3 sm:mb-4">
          Tanda Kasih
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-4 sm:mb-8 drop-shadow-lg flex justify-center items-center gap-3">
          <GiftIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#D4AF37]" />
          Wedding Gift
        </h3>
        <p className="max-w-2xl mx-auto text-gray-300 mb-10 sm:mb-16 leading-relaxed text-sm sm:text-base">
          Bagi keluarga dan sahabat yang ingin memberikan tanda kasih untuk kami, dapat melalui nomor rekening atau dompet digital di bawah ini.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch gap-6 sm:gap-8 md:gap-12 max-w-4xl mx-auto">
          <BankCard 
            bankName="BJB"
            accountName="Andri Mulyana"
            accountNumber="0157452517100"
          />

          <BankCard 
            bankName="BRI"
            accountName="Tetin Tresnawati"
            accountNumber="416501017891507"
          />
        </div>
      </div>
    </section>
  );
}

const BankCard = ({ bankName, accountName, accountNumber }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-sm bg-[#1A1C19]/60 backdrop-blur-md p-8 rounded-3xl border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(0,0,0,0.5)] group relative overflow-hidden text-left">
      {/* Decorative subtle background gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-700" />
      
      <div className="flex justify-between items-center mb-8 border-b border-[#D4AF37]/20 pb-4">
        <h4 className="text-2xl font-serif text-[#D4AF37] font-bold tracking-wider">
          {bankName}
        </h4>
        <div className="px-3 py-1 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">
          <span className="text-xs text-[#D4AF37] tracking-widest uppercase">Transfer</span>
        </div>
      </div>

      <div className="space-y-2 mb-8">
        <p className="text-3xl font-mono text-gray-100 tracking-wider">
          {accountNumber}
        </p>
        <p className="text-gray-400 font-medium uppercase tracking-wide text-sm">
          a.n. {accountName}
        </p>
      </div>

      <button 
        onClick={handleCopy}
        className={`w-full py-3 rounded-xl flex justify-center items-center gap-2 transition duration-300 shadow-md font-medium tracking-wide ${
          copied 
            ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]" 
            : "bg-[#D4AF37] text-[#1A1C19] hover:bg-[#F3E5AB] border border-transparent shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
        }`}
      >
        {copied ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Berhasil Disalin
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            Salin No. Rekening
          </>
        )}
      </button>
    </div>
  );
};
