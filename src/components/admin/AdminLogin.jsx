import { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import StarBackground from "../ui/StarBackground";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      setError("Email atau password salah.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background stars for aesthetic consistency */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1c19] to-black opacity-80" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#1A1C19]/60 backdrop-blur-xl p-8 md:p-12 rounded-[40px] border border-[#D4AF37]/30 shadow-[0_0_60px_rgba(212,175,55,0.15)] text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#8a7224] rounded-full flex justify-center items-center mx-auto mb-8 shadow-lg ring-4 ring-[#D4AF37]/20">
            <Lock className="w-10 h-10 text-[#1A1C19]" />
          </div>

          <h2 className="text-3xl font-serif text-white mb-2">Admin Login</h2>
          <p className="text-gray-400 mb-10 text-sm uppercase tracking-widest">Wedding Dashboard</p>

          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div className="relative">
              <label className="text-xs uppercase tracking-widest text-[#D4AF37] ml-4 mb-2 block">Email Address</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#D4AF37] transition" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1C19]/50 border border-[#D4AF37]/20 py-4 pl-12 pr-4 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                  placeholder="admin@wedding.com"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs uppercase tracking-widest text-[#D4AF37] ml-4 mb-2 block">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#D4AF37] transition" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1C19]/50 border border-[#D4AF37]/20 py-4 pl-12 pr-12 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#D4AF37] transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-xs text-center">{error}</p>}

            <button
              disabled={loading}
              className="w-full bg-[#D4AF37] text-[#1A1C19] font-bold py-4 rounded-2xl hover:bg-[#F3E5AB] transition duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] disabled:opacity-50"
            >
              {loading ? "AUTHENTICATING..." : "LOGIN TO DASHBOARD"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
