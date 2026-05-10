import React from 'react';
import { LessonGrid } from '@/src/components/sections/LessonGrid';
import { Award, Trophy, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const LearnPage = () => {
  return (
    <div className="space-y-0">
      {/* Mini Profile Header */}
      <section className="bg-white border-b border-stone-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-forest to-emerald-800 p-1 shadow-xl">
               <img src="https://i.pravatar.cc/150?u=vuduchanh" alt="avatar" className="w-full h-full rounded-[20px] object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 leading-tight">Vũ Đức Hạnh</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-forest font-bold bg-forest/10 px-3 py-1 rounded-full text-xs uppercase tracking-widest">
                  <Star size={14} fill="currentColor" /> Level 12
                </span>
                <span className="flex items-center gap-1.5 text-stone-400 font-bold text-xs uppercase tracking-widest">
                  14 Day Streak 🔥
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
             <StatBox icon={Trophy} label="XP" value="5,420" color="text-gold" />
             <StatBox icon={Zap} label="League" value="Silver" color="text-emerald-600" />
             <StatBox icon={Award} label="Badges" value="12" color="text-terracotta" />
          </div>
        </div>
      </section>

      <LessonGrid />
    </div>
  );
};

const StatBox = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-mist px-6 py-4 rounded-2xl border border-stone-100 flex items-center gap-4 min-w-[140px]">
    <div className={`p-2 rounded-xl bg-white shadow-sm ${color}`}>
      <Icon size={20} />
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">{label}</div>
      <div className={`text-lg font-black italic ${color}`}>{value}</div>
    </div>
  </div>
);
