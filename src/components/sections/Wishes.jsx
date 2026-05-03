import { useState } from "react";
import { useWishes } from "../../hooks/useWishes";
import { MessageCircleHeart } from "lucide-react";
import { LightParticles } from "../ui/BackgroundAnimations";

export default function Wishes() {
  const { wishes, loading, addWish } = useWishes();
  const [form, setForm] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    setIsSubmitting(true);
    const success = await addWish(form.name, form.message);
    if (success) {
      setForm({ name: "", message: "" });
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#0f100f] via-[#1a1c3a] to-[#0f100f]">
      <LightParticles count={30} color="#D4AF37" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-[#D4AF37] mb-3 sm:mb-4">
            Doa & Ucapan
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-4 drop-shadow-lg">
            Berikan Doa Restu
          </h3>
          <p className="text-gray-300 max-w-lg mx-auto text-sm sm:text-base">
            Terima kasih atas doa dan ucapan terbaik yang Anda berikan untuk kami.
          </p>
        </div>

        <div className="bg-[#1A1C19]/60 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-[#D4AF37]/30 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Nama Anda"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#1A1C19]/50 border border-[#D4AF37]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition placeholder-gray-500"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Tulis ucapan dan doa..."
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#1A1C19]/50 border border-[#D4AF37]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition resize-none placeholder-gray-500"
                required
              />
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full bg-[#D4AF37] text-[#1A1C19] py-4 rounded-xl hover:bg-[#F3E5AB] transition duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] font-medium flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed tracking-wide"
            >
              {isSubmitting ? "Mengirim..." : (
                <>
                  <MessageCircleHeart className="w-5 h-5" />
                  Kirim Ucapan
                </>
              )}
            </button>
          </form>
        </div>

        {/* Wishes List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <p className="text-center text-[#D4AF37] italic">Memuat ucapan...</p>
          ) : wishes.length > 0 ? (
            wishes.map((w) => (
              <div key={w.id} className="bg-[#1A1C19]/40 backdrop-blur-sm p-5 md:p-6 rounded-2xl shadow-lg border border-[#D4AF37]/20 flex gap-4 transition-transform hover:scale-[1.01]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8a7224] flex justify-center items-center text-[#1A1C19] font-bold font-serif shrink-0 shadow-inner">
                  {w.name.charAt(0).toUpperCase()}
                </div>
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                    <h4 className="font-medium text-[#D4AF37] text-lg">{w.name}</h4>
                    <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                      {w.timestamp?.toDate
                        ? new Date(w.timestamp.toDate()).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
                        : "Baru saja"}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {w.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-[#1A1C19]/40 backdrop-blur-sm rounded-2xl border border-dashed border-[#D4AF37]/30">
              <MessageCircleHeart className="w-10 h-10 text-[#D4AF37]/50 mx-auto mb-2" />
              <p className="text-gray-400">Jadilah yang pertama memberikan ucapan</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
