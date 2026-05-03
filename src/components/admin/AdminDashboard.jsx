import { useState, useEffect } from "react";
import { useAdminRSVP } from "../../hooks/useRSVP";
import { useWishes } from "../../hooks/useWishes";
import { auth } from "../../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, UserX, LogOut, Trash2, Search, Download, AlertTriangle, MessageSquare, List, Menu, X } from "lucide-react";
import StarBackground from "../ui/StarBackground";

export default function AdminDashboard() {
  const { rsvps, loading: rsvpLoading, error, deleteRSVP } = useAdminRSVP();
  const { wishes, loading: wishesLoading, deleteWish } = useWishes();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("rsvp");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const filteredRSVPs = rsvps.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWishes = wishes.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter(r => r.status === "hadir").length,
    totalGuests: rsvps.filter(r => r.status === "hadir").reduce((acc, curr) => acc + (parseInt(curr.guests) || 0), 0),
    notAttending: rsvps.filter(r => r.status === "tidak_hadir").length,
    totalWishes: wishes.length
  };

  if (rsvpLoading || wishesLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-[#D4AF37] animate-pulse font-serif text-2xl">Loading Dashboard...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="text-center bg-[#1A1C19]/60 backdrop-blur-xl p-10 rounded-3xl border border-red-500/30 max-w-md">
        <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-6" />
        <h2 className="text-2xl font-serif text-white mb-4">Akses Ditolak</h2>
        <p className="text-gray-400 mb-8">{error}</p>
        <button 
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-[#D4AF37] text-[#1A1C19] font-bold rounded-xl hover:bg-[#F3E5AB] transition"
        >
          Kembali ke Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0f100f] text-gray-200 overflow-hidden relative">
      <div className="fixed inset-0 -z-10 bg-black">
         <StarBackground count={50} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#1A1C19]/90 backdrop-blur-2xl border-r border-[#D4AF37]/20 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Sidebar Header */}
        <div className="p-8 border-b border-[#D4AF37]/10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-white">Admin Panel</h1>
            <p className="text-[#D4AF37] text-xs uppercase tracking-widest mt-1">Andri & Tetin</p>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-3">
          <button 
            onClick={() => { setActiveTab("rsvp"); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-medium transition duration-300 ${activeTab === "rsvp" ? "bg-[#D4AF37] text-[#1A1C19] shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
          >
            <List className="w-5 h-5" />
            Data RSVP
          </button>
          
          <button 
            onClick={() => { setActiveTab("wishes"); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-medium transition duration-300 ${activeTab === "wishes" ? "bg-[#D4AF37] text-[#1A1C19] shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
          >
            <MessageSquare className="w-5 h-5" />
            Doa & Restu
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-[#D4AF37]/10">
          <button 
            onClick={handleLogout}
            className="w-full flex justify-center items-center gap-3 px-6 py-3.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition duration-300 font-medium"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        {/* Top Header for Mobile */}
        <header className="lg:hidden bg-[#1A1C19]/80 backdrop-blur-xl border-b border-[#D4AF37]/20 p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="text-[#D4AF37] p-1">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-serif text-white">Dashboard</h1>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-8">
            
            <div className="mb-2">
              <h2 className="text-3xl font-serif text-white mb-2">
                {activeTab === "rsvp" ? "Data Konfirmasi Kehadiran" : "Data Doa & Restu"}
              </h2>
              <p className="text-gray-400">
                Kelola data {activeTab === "rsvp" ? "tamu undangan" : "ucapan dari tamu"} Anda di sini.
              </p>
            </div>

            {/* Stats Grid */}
            {activeTab === "rsvp" ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                <StatCard title="Total Konfirmasi" value={stats.total} icon={<Users />} color="text-blue-400" />
                <StatCard title="Akan Hadir" value={stats.attending} icon={<UserCheck />} color="text-green-400" />
                <StatCard title="Total Tamu" value={stats.totalGuests} icon={<Users />} color="text-[#D4AF37]" />
                <StatCard title="Tidak Hadir" value={stats.notAttending} icon={<UserX />} color="text-red-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                <StatCard title="Total Ucapan" value={stats.totalWishes} icon={<MessageSquare />} color="text-purple-400" />
              </div>
            )}

            {/* Table Section */}
            <div className="bg-[#1A1C19]/60 backdrop-blur-xl rounded-[32px] border border-[#D4AF37]/20 shadow-2xl overflow-hidden flex flex-col h-[600px]">
              
              {/* Table Toolbar */}
              <div className="p-6 lg:p-8 border-b border-[#D4AF37]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="text"
                    placeholder={activeTab === "rsvp" ? "Cari nama tamu..." : "Cari ucapan..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#0f100f]/50 border border-[#D4AF37]/20 py-3.5 pl-12 pr-4 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] transition"
                  />
                </div>
                {activeTab === "rsvp" && (
                  <button className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-[#1A1C19] font-bold rounded-xl hover:bg-[#F3E5AB] transition shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <Download className="w-5 h-5" />
                    Ekspor CSV
                  </button>
                )}
              </div>

              {/* Table Content */}
              <div className="overflow-auto flex-1 custom-scrollbar">
                {activeTab === "rsvp" ? (
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-[#1A1C19] z-10 shadow-md">
                      <tr className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] border-b border-[#D4AF37]/20">
                        <th className="px-8 py-5 whitespace-nowrap">Nama Tamu</th>
                        <th className="px-8 py-5 whitespace-nowrap">Status Kehadiran</th>
                        <th className="px-8 py-5 whitespace-nowrap">Jumlah Tamu</th>
                        <th className="px-8 py-5 whitespace-nowrap">Waktu Konfirmasi</th>
                        <th className="px-8 py-5 whitespace-nowrap">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D4AF37]/10">
                      {filteredRSVPs.map((r) => (
                        <tr key={r.id} className="hover:bg-white/5 transition duration-300 group">
                          <td className="px-8 py-5 font-medium text-white whitespace-nowrap">{r.name}</td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-medium border ${
                              r.status === "hadir" 
                                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}>
                              {r.status === "hadir" ? "Hadir" : "Tidak Hadir"}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-gray-300 whitespace-nowrap">{r.guests} Orang</td>
                          <td className="px-8 py-5 text-gray-400 text-sm whitespace-nowrap">
                            {r.timestamp?.toDate ? new Date(r.timestamp.toDate()).toLocaleString("id-ID") : "-"}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <button 
                              onClick={async () => {
                                if (window.confirm("Hapus data konfirmasi ini?")) {
                                  const success = await deleteRSVP(r.id);
                                  if (!success) alert("Gagal menghapus RSVP! Pastikan izin Firebase Firestore Anda sudah benar.");
                                }
                              }}
                              className="p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                              title="Hapus RSVP"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredRSVPs.length === 0 && (
                        <tr>
                          <td colSpan="5" className="py-20 text-center text-gray-500 italic font-serif text-lg">
                            Tidak ada data konfirmasi ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-[#1A1C19] z-10 shadow-md">
                      <tr className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] border-b border-[#D4AF37]/20">
                        <th className="px-8 py-5 whitespace-nowrap">Nama Tamu</th>
                        <th className="px-8 py-5 min-w-[300px]">Ucapan & Doa</th>
                        <th className="px-8 py-5 whitespace-nowrap">Waktu Mengirim</th>
                        <th className="px-8 py-5 whitespace-nowrap">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D4AF37]/10">
                      {filteredWishes.map((w) => (
                        <tr key={w.id} className="hover:bg-white/5 transition duration-300 group">
                          <td className="px-8 py-5 font-medium text-white whitespace-nowrap">{w.name}</td>
                          <td className="px-8 py-5 text-gray-300 italic leading-relaxed">"{w.message}"</td>
                          <td className="px-8 py-5 text-gray-400 text-sm whitespace-nowrap">
                            {w.timestamp?.toDate ? new Date(w.timestamp.toDate()).toLocaleString("id-ID") : "-"}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <button 
                              onClick={async () => {
                                if (window.confirm("Hapus ucapan dan doa ini?")) {
                                  const success = await deleteWish(w.id);
                                  if (!success) alert("Gagal menghapus Ucapan! Data tidak terhapus di database. Ini terjadi karena izin (Rules) di Firebase Firestore belum mengizinkan penghapusan untuk koleksi 'wishes'. Silakan update Rules Firebase Anda.");
                                }
                              }}
                              className="p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                              title="Hapus Ucapan"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredWishes.length === 0 && (
                        <tr>
                          <td colSpan="4" className="py-20 text-center text-gray-500 italic font-serif text-lg">
                            Tidak ada data ucapan ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-[#1A1C19]/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#D4AF37]/20 shadow-xl flex items-center gap-4 hover:-translate-y-1 transition duration-300">
    <div className={`p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl ${color} shrink-0 shadow-inner`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest mb-1 truncate">{title}</p>
      <p className="text-2xl sm:text-3xl font-serif text-white">{value}</p>
    </div>
  </div>
);
