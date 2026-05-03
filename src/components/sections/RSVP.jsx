import { useState } from "react";
import { LightParticles } from "../ui/BackgroundAnimations";
import { useRSVP } from "../../hooks/useRSVP";
import { Send, CheckCircle2 } from "lucide-react";

export default function RSVP() {
  const { addRSVP } = useRSVP();
  const [form, setForm] = useState({ name: "", status: "hadir", guests: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return;

    setIsSubmitting(true);
    const success = await addRSVP(form.name, form.status, form.guests);
    if (success) {
      setIsSuccess(true);
      setForm({ name: "", status: "hadir", guests: 1 });
    }
    setIsSubmitting(false);
  };

  return (
    <section id="rsvp" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0f100f] via-[#1a1c3a] to-[#0f100f]">
      <LightParticles count={30} color="#D4AF37" />
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-[#D4AF37] mb-3 sm:mb-4">
          Kehadiran
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-6 sm:mb-10 drop-shadow-lg">
          Konfirmasi Kehadiran
        </h3>
        
        {isSuccess ? (
          <div className="max-w-md mx-auto bg-[#1A1C19]/60 backdrop-blur-md p-10 rounded-3xl border border-[#D4AF37]/30 shadow-2xl animate-fade-in">
            <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h4 className="text-2xl font-serif text-white mb-4">Terima Kasih!</h4>
            <p className="text-gray-300">Konfirmasi kehadiran Anda telah berhasil kami simpan.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="mt-8 text-[#D4AF37] hover:underline text-sm uppercase tracking-widest"
            >
              Kirim Konfirmasi Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 bg-[#1A1C19]/60 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(0,0,0,0.6)] text-left">
            <div>
              <label className="block text-sm font-medium text-[#D4AF37] mb-2">Nama Lengkap</label>
              <input 
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#1A1C19]/50 border border-[#D4AF37]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition" 
                placeholder="Masukkan nama Anda" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#D4AF37] mb-2">Konfirmasi Kehadiran</label>
              <select 
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-[#1A1C19]/50 border border-[#D4AF37]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition appearance-none cursor-pointer"
              >
                <option className="bg-[#1A1C19] text-white" value="hadir">Ya, Saya Akan Hadir</option>
                <option className="bg-[#1A1C19] text-white" value="tidak_hadir">Maaf, Tidak Bisa Hadir</option>
              </select>
            </div>

            {form.status === "hadir" && (
              <div>
                <label className="block text-sm font-medium text-[#D4AF37] mb-2">Jumlah Tamu</label>
                <input 
                  type="number"
                  min="1"
                  max="5"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full bg-[#1A1C19]/50 border border-[#D4AF37]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition" 
                />
              </div>
            )}

            <button 
              disabled={isSubmitting}
              className="w-full bg-[#D4AF37] text-[#1A1C19] font-semibold py-4 rounded-xl hover:bg-[#F3E5AB] transition duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] mt-6 tracking-wide flex justify-center items-center gap-2"
            >
              {isSubmitting ? "Mengirim..." : (
                <>
                  <Send className="w-5 h-5" />
                  Kirim Konfirmasi
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
