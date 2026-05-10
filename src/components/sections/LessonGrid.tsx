import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Star, Trophy, ArrowRight, CheckCircle2, Lock, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Language, Level, Lesson } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { LANGUAGES_DATA } from '@/src/mockData';

export const LessonGrid = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = React.useState<Language>(LANGUAGES_DATA[0]);
  const [activeLevelIdx, setActiveLevelIdx] = React.useState(0);

  const activeLevel = selectedLang.levels[activeLevelIdx];

  const handleLessonStart = (lesson: Lesson) => {
    navigate(`/lesson/${lesson.id}`);
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-forest text-white font-bold text-xs uppercase tracking-widest">
            Chọn lộ trình học
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 italic font-display">
            Chinh phục <span className="gradient-text">{selectedLang.name}</span>
          </h2>
        </div>
        
        <div className="flex bg-white p-2 rounded-[24px] shadow-sm border border-stone-100 overflow-x-auto max-w-full">
          {LANGUAGES_DATA.map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                setSelectedLang(lang);
                setActiveLevelIdx(0);
              }}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-[18px] transition-all whitespace-nowrap",
                selectedLang.id === lang.id ? "bg-forest text-white shadow-lg" : "text-stone-500 hover:bg-stone-50"
              )}
            >
              <span className="text-xl">{lang.icon}</span>
              <span className="font-bold">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr,2fr] gap-12 items-start">
        {/* Level List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4">
             <span className="text-stone-400 font-bold uppercase tracking-widest text-xs">Các cấp độ</span>
             <span className="text-emerald-600 font-bold text-xs">{selectedLang.progress}% hoàn thành</span>
          </div>
          <div className="space-y-3">
            {selectedLang.levels.map((level, idx) => (
              <button
                key={level.id}
                onClick={() => !level.isLocked && setActiveLevelIdx(idx)}
                className={cn(
                  "w-full flex items-center justify-between p-6 rounded-[28px] border-2 transition-all group",
                  activeLevelIdx === idx 
                    ? "bg-white border-forest shadow-xl scale-[1.02]" 
                    : level.isLocked 
                      ? "bg-stone-50 border-stone-100 opacity-60 cursor-not-allowed"
                      : "bg-white border-transparent hover:border-stone-200"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold transition-colors",
                    activeLevelIdx === idx ? "bg-forest text-white" : "bg-stone-100 text-stone-400"
                  )}>
                    {idx + 1}
                  </div>
                  <div className="text-left">
                    <div className={cn("font-bold", activeLevelIdx === idx ? "text-stone-900" : "text-stone-500")}>
                      {level.name.split(' — ')[1]}
                    </div>
                    <div className="text-xs text-stone-400 font-medium line-clamp-1">{level.description}</div>
                  </div>
                </div>
                {level.isLocked ? <Lock size={18} className="text-stone-300" /> : <ChevronRight className={cn("transition-transform", activeLevelIdx === idx ? "translate-x-1" : "text-stone-300")} />}
              </button>
            ))}
          </div>
        </div>

        {/* Lesson List */}
        <div className="space-y-6">
          <div className="p-8 bg-white rounded-[40px] border border-stone-100 shadow-sm">
            <div className="mb-8">
               <h3 className="text-2xl font-bold text-stone-900 mb-2">{activeLevel.name}</h3>
               <p className="text-stone-500">{activeLevel.description}</p>
            </div>

            <div className="grid gap-4">
              {activeLevel.lessons.map((lesson, idx) => (
                <div 
                  key={lesson.id}
                  className={cn(
                    "flex items-center justify-between p-5 rounded-3xl transition-all",
                    lesson.unlocked ? "bg-stone-50/50 hover:bg-stone-50 group cursor-pointer" : "opacity-40"
                  )}
                >
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg relative",
                      lesson.unlocked ? "bg-linear-to-br from-forest to-emerald-600" : "bg-stone-300"
                    )}>
                      {idx + 1}
                      {lesson.unlocked && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full border-2 border-white flex items-center justify-center">
                          <CheckCircle2 size={10} strokeWidth={4} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-lg">{lesson.title}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">{lesson.description}</span>
                        {lesson.stars && lesson.stars > 0 && (
                          <div className="flex gap-0.5">
                            {[...Array(3)].map((_, i) => (
                              <Star key={i} size={10} className={cn(i < lesson.stars! ? "text-gold fill-gold" : "text-stone-200")} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {lesson.unlocked ? (
                    <button 
                      onClick={() => handleLessonStart(lesson)}
                      className="px-6 py-3 rounded-2xl bg-white border-2 border-stone-100 shadow-sm group-hover:bg-forest group-hover:border-forest group-hover:text-white group-hover:scale-105 transition-all flex items-center gap-2 font-black text-xs uppercase italic tracking-widest"
                    >
                      Học ngay <Play size={14} fill="currentColor" />
                    </button>
                  ) : (
                    <div className="p-3 rounded-2xl border-2 border-stone-100 text-stone-300">
                      <Lock size={18} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* XP Summary Side */}
          <div className="grid grid-cols-2 gap-4">
             <div className="p-8 bg-gold rounded-[32px] text-forest relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                   <Trophy size={80} />
                </div>
                <div className="relative z-10">
                   <div className="text-xs font-black uppercase tracking-widest opacity-60">Thành tích</div>
                   <div className="text-3xl font-black italic">5,420 XP</div>
                </div>
             </div>
             <div className="p-8 bg-white border border-stone-100 rounded-[32px] text-stone-900">
                <div className="text-xs font-black uppercase tracking-widest text-stone-400">Streak</div>
                <div className="text-3xl font-black italic">🔥 14 Ngày</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
