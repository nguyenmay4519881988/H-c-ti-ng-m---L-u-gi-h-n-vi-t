import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Trophy, Star, Zap, Play, Layout, History, User, Search, Award } from 'lucide-react';
import { QuizGame } from '@/src/components/game/QuizGame';
import { MatchGame } from '@/src/components/game/MatchGame';
import { WordGuessGame } from '@/src/components/game/WordGuessGame';
import { WheelGame } from '@/src/components/game/WheelGame';
import { PuzzleGame } from '@/src/components/game/PuzzleGame';
import { FillBlankGame } from '@/src/components/game/FillBlankGame';
import { cn } from '@/src/lib/utils';

const GAMES = [
  { id: 'quiz', name: 'Đấu trường kiến thức', desc: 'Sân chơi trắc nghiệm ngôn ngữ và văn hóa.', icon: Zap, color: 'bg-gold', xp: '+500' },
  { id: 'guess', name: 'Đoán từ bản sắc', desc: 'Nhìn hình đoán tên vật phẩm bằng tiếng dân tộc.', icon: Search, color: 'bg-emerald-600', xp: '+450' },
  { id: 'match', name: 'Lật thẻ ghi nhớ', desc: 'Rèn luyện trí nhớ với bộ thẻ từ vựng sinh động.', icon: Layout, color: 'bg-emerald-500', xp: '+300' },
  { id: 'puzzle', name: 'Sắp xếp sứ mệnh', desc: 'Ghép các mảnh câu hoàn chỉnh về văn hóa.', icon: Gamepad2, color: 'bg-terracotta', xp: '+400' },
  { id: 'blank', name: 'Điền từ di sản', desc: 'Thử thách kiến thức về món ăn và phong tục.', icon: Award, color: 'bg-orange-500', xp: '+350' },
  { id: 'wheel', name: 'Vòng quay may mắn', desc: 'Quay thưởng XP và vật phẩm hiếm mỗi ngày.', icon: History, color: 'bg-purple-500', xp: 'Random' },
];

export const GamesPage = () => {
  const [activeGame, setActiveGame] = React.useState<string | null>(null);

  return (
    <div className="bg-mist min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-forest text-white font-bold text-xs uppercase tracking-widest">
                 Gamification
              </div>
              <h1 className="text-5xl font-bold text-stone-900 italic font-display">Khu vui chơi <span className="gradient-text">Hồn Việt</span></h1>
           </div>
           
           <div className="flex gap-4">
              <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-stone-100 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
                    <Trophy size={24} />
                 </div>
                 <div>
                    <div className="text-[10px] font-black uppercase text-stone-400">Hạng của bạn</div>
                    <div className="text-xl font-black text-stone-900">#124</div>
                 </div>
              </div>
              <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-stone-100 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center">
                    <Award size={24} />
                 </div>
                 <div>
                    <div className="text-[10px] font-black uppercase text-stone-400">Huy hiệu</div>
                    <div className="text-xl font-black text-stone-900">24/48</div>
                 </div>
              </div>
           </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {GAMES.map((game, idx) => (
             <motion.div
               key={game.id}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: idx * 0.1 }}
               onClick={() => setActiveGame(game.id)}
               className="group relative bg-white rounded-[40px] p-8 border border-stone-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer overflow-hidden"
             >
                <div className={cn("inline-flex p-4 rounded-2xl mb-8 group-hover:scale-110 transition-transform text-white shadow-lg", game.color)}>
                   <game.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">{game.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-8">{game.desc}</p>
                <div className="flex items-center justify-between">
                   <span className="font-black text-forest">{game.xp} XP</span>
                   <button className="w-12 h-12 rounded-full border-2 border-stone-100 flex items-center justify-center group-hover:bg-forest group-hover:text-white transition-all">
                      <Play size={20} fill="currentColor" />
                   </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 -skew-x-12 translate-x-16 -translate-y-8 -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
             </motion.div>
           ))}
        </div>

        <section className="bg-stone-900 text-white p-12 md:p-20 rounded-[56px] overflow-hidden relative">
           <div className="absolute inset-0 pattern-bg opacity-10" />
           <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <h2 className="text-4xl md:text-6xl font-bold font-display italic">Bảng xếp hạng <br /><span className="text-gold">Sơn Cước</span></h2>
                 <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                         <div className="flex items-center gap-4">
                            <span className="font-black text-stone-500 w-6">#{i}</span>
                            <img src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                            <span className="font-bold">Hanh Vu {i === 1 && '(Bạn)'}</span>
                         </div>
                         <span className={cn("font-black", i === 1 ? "text-gold" : "text-white")}>{5000 - (i*200)} XP</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="hidden md:block">
                 <div className="aspect-square bg-linear-to-br from-gold to-yellow-600 rounded-full flex flex-col items-center justify-center p-12 text-forest relative animate-float">
                    <Trophy size={160} />
                    <div className="text-4xl font-black italic mt-4 underline decoration-4 underline-offset-8">Vinh Danh</div>
                    <div className="absolute inset-0 border-[20px] border-white/10 rounded-full" />
                 </div>
              </div>
           </div>
        </section>
      </div>

      <AnimatePresence mode="wait">
         {activeGame === 'quiz' && <QuizGame onFadeOut={() => setActiveGame(null)} />}
         {activeGame === 'match' && <MatchGame onClose={() => setActiveGame(null)} />}
         {activeGame === 'guess' && <WordGuessGame onClose={() => setActiveGame(null)} />}
         {activeGame === 'wheel' && <WheelGame onClose={() => setActiveGame(null)} />}
         {activeGame === 'puzzle' && <PuzzleGame onClose={() => setActiveGame(null)} />}
         {activeGame === 'blank' && <FillBlankGame onClose={() => setActiveGame(null)} />}
      </AnimatePresence>
    </div>
  );
};
