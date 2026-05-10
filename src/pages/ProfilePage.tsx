import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, Award, Trophy, Star, Zap, History, ChevronRight, Share2, Palette, Shield } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ProfilePage = () => {
  return (
    <div className="bg-mist min-h-screen">
      {/* Cover Profile */}
      <section className="h-64 bg-linear-to-r from-forest via-emerald-800 to-stone-900 relative">
         <div className="absolute inset-0 pattern-bg opacity-10" />
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
         <div className="grid lg:grid-cols-[1fr,2fr] gap-12">
            
            {/* Sidebar Stats */}
            <aside className="space-y-6">
               <div className="bg-white rounded-[48px] p-10 shadow-2xl border border-stone-100 text-center space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Shield size={120} />
                  </div>
                  <div className="relative inline-block group">
                    <div className="w-40 h-40 rounded-full border-[6px] border-white shadow-2xl overflow-hidden ring-4 ring-gold/20 group-hover:scale-105 transition-transform">
                       <img src="https://i.pravatar.cc/300?u=vuduchanh" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-2 right-2 w-10 h-10 bg-gold rounded-full border-4 border-white flex items-center justify-center text-forest shadow-lg">
                       <Zap size={20} fill="currentColor" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-3xl font-black text-stone-900 italic font-display">Vũ Đức Hạnh</h1>
                    <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Học sinh lớp 5C • Thanh Trường</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button className="px-6 py-3 bg-forest text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
                       <Settings size={18} /> Chỉnh sửa
                    </button>
                    <button className="p-3 bg-mist rounded-2xl text-stone-600 hover:bg-stone-100 transition-all">
                       <Share2 size={18} />
                    </button>
                  </div>
               </div>

               <div className="bg-stone-900 rounded-[40px] p-8 text-white space-y-8">
                  <h3 className="text-xl font-bold italic font-display underline decoration-gold underline-offset-8 decoration-2 mb-8">Thành tích chặng đường</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <StatBox icon={Trophy} label="XP" value="5,420" color="text-gold" />
                     <StatBox icon={Zap} label="Streak" value="14d" color="text-emerald-400" />
                     <StatBox icon={Star} label="Level" value="12" color="text-amber-400" />
                     <StatBox icon={Award} label="Badges" value="24" color="text-terracotta" />
                  </div>
               </div>
            </aside>

            {/* Main Profile Info */}
            <main className="space-y-8 pb-20">
               <div className="bg-white rounded-[48px] p-10 shadow-sm border border-stone-100">
                  <div className="flex items-center justify-between mb-10">
                     <h2 className="text-2xl font-black italic font-display">Lịch sử học tập</h2>
                     <button className="text-sm font-bold text-forest hover:underline">Xem tất cả</button>
                  </div>
                  <div className="space-y-4">
                     {[1,2,3].map(i => (
                       <div key={i} className="flex items-center justify-between p-6 bg-mist rounded-[32px] border border-stone-100 hover:border-forest/20 transition-all group">
                          <div className="flex items-center gap-6">
                             <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl">
                                {i === 1 ? '👘' : i === 2 ? '🏔️' : '🎋'}
                             </div>
                             <div>
                                <h4 className="font-bold text-stone-900">{i === 1 ? 'Tiếng Thái' : i === 2 ? 'Tiếng Mông' : 'Tiếng Khơ Mú'}</h4>
                                <div className="text-xs text-stone-400 font-bold uppercase tracking-widest mt-1">Level {i * 2} • 12 Bài hòan thành</div>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="h-2 w-32 bg-stone-200 rounded-full overflow-hidden hidden md:block">
                                <div className="h-full bg-forest w-3/4" />
                             </div>
                             <div className="p-2 rounded-xl group-hover:bg-forest group-hover:text-white transition-all">
                                <ChevronRight size={20} />
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-forest rounded-[40px] p-10 text-white relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 opacity-10">
                       <Palette size={100} />
                     </div>
                     <h3 className="text-2xl font-bold font-display italic mb-6">Huy hiệu đạt được</h3>
                     <div className="flex flex-wrap gap-4 relative z-10">
                        {[1,2,3,4,5,6].map(i => (
                          <div key={i} className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shadow-inner hover:scale-110 transition-transform">
                             <Award size={24} className={i % 3 === 0 ? 'text-gold' : 'text-white/60'} />
                          </div>
                        ))}
                     </div>
                  </div>
                  <div className="bg-stone-50 rounded-[40px] p-10 border border-stone-100 flex flex-col justify-center text-center space-y-4">
                     <div className="text-forest font-black italic text-4xl">5 v 5</div>
                     <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Thắng / Thua đấu trường</p>
                     <button className="px-8 py-3 bg-stone-900 text-white rounded-2xl font-black text-sm hover:scale-105 transition-all">
                        TÌM ĐỐI THỦ NGAY
                     </button>
                  </div>
               </div>
            </main>

         </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
    <Icon className={`${color} mb-2`} size={24} />
    <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</div>
    <div className={`text-xl font-black italic ${color}`}>{value}</div>
  </div>
);
