import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Zap, Heart, Trophy, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { playSound } from '@/src/lib/sounds';
import confetti from 'canvas-confetti';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  { id: '1', question: 'Từ "Chao" trong tiếng Thái có nghĩa là gì?', options: ['Chào bạn', 'Người/Dân tộc', 'Ngày mai', 'Cái bát'], correct: 1, explanation: '"Chao" thường dùng để chỉ người hoặc một nhóm dân tộc (ví dụ: Chao Thái).' },
  { id: '2', question: 'Trang phục truyền thống của phụ nữ Thái nổi tiếng với vật dụng gì?', options: ['Khăn Piêu', 'Váy Đăm', 'Áo Cơm', 'Cả 3 phương án'], correct: 3, explanation: 'Phụ nữ Thái nổi tiếng với sự kết hợp hài hòa giữa Khăn Piêu, Áo Cỏm và Váy Đăm.' },
  { id: '3', question: 'Múa Xòe là điệu múa đặc trưng của dân tộc nào?', options: ['Mông', 'Thái', 'Khơ Mú', 'Dao'], correct: 1, explanation: 'Xòe Thái là di sản văn hóa phi vật thể đại diện của nhân loại được UNESCO công nhận.' },
];

export const QuizGame = ({ onFadeOut }: { onFadeOut: () => void }) => {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
  const [lives, setLives] = React.useState(3);
  const [score, setScore] = React.useState(0);
  const [gameState, setGameState] = React.useState<'playing' | 'result'>('playing');

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === QUESTIONS[currentIdx].correct;
    setIsCorrect(correct);
    
    if (correct) {
      playSound('correct');
      setScore(s => s + 100);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      playSound('wrong');
      setLives(l => l - 1);
    }
  };

  const handleNext = () => {
    playSound('pop');
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      playSound('victory');
      setGameState('result');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="fixed inset-0 z-100 flex flex-col bg-stone-50"
    >
      {/* Dynamic Header */}
      <div className="h-16 md:h-20 w-full flex items-center justify-between px-6 md:px-12 bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <button 
          onClick={onFadeOut}
          className="p-3 hover:bg-stone-100 rounded-2xl transition-all text-stone-400 hover:text-stone-900 shadow-sm border border-transparent hover:border-stone-200"
        >
          <X size={24} className="md:w-8 md:h-8" />
        </button>
        
        <div className="flex-1 max-w-sm mx-8 h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200 hidden sm:block">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
             className="h-full bg-forest shadow-sm"
           />
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1 text-rose-500 font-black">
              <Heart size={20} fill="currentColor" />
              <span>{lives}</span>
           </div>
           <div className="px-4 py-2 bg-gold/10 rounded-xl flex items-center gap-2 text-gold font-black shadow-sm border border-gold/20">
              <Star size={18} fill="currentColor" />
              <span className="hidden sm:inline">SCORE:</span>
              <span>{score}</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-10 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {gameState === 'playing' ? (
              <motion.div 
                key={currentIdx}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-12"
              >
                <div className="text-center space-y-4">
                   <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-500 rounded-full text-xs font-black uppercase tracking-widest border border-stone-200">
                      Câu hỏi {currentIdx + 1} / {QUESTIONS.length}
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-stone-900 font-display italic leading-tight max-w-3xl mx-auto px-4">
                      {QUESTIONS[currentIdx].question}
                   </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {QUESTIONS[currentIdx].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={!selected ? { y: -4, scale: 1.02, backgroundColor: '#f8fafc' } : {}}
                      whileTap={!selected ? { scale: 0.98 } : {}}
                      onClick={() => handleSelect(idx)}
                      disabled={selected !== null}
                      className={cn(
                        "p-8 rounded-[32px] text-left transition-all duration-300 border-b-8 flex items-center gap-6 group",
                        selected === null ? "bg-white border-stone-200 hover:border-forest text-stone-700 shadow-xl" : 
                        idx === QUESTIONS[currentIdx].correct ? "bg-emerald-500 border-emerald-700 text-white shadow-2xl" :
                        selected === idx ? "bg-rose-500 border-rose-700 text-white" :
                        "bg-white border-stone-100 opacity-40 grayscale"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg",
                        selected === null ? "bg-stone-50 text-stone-400 group-hover:bg-forest/10 group-hover:text-forest" : "bg-white/20 text-white"
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-xl md:text-2xl font-bold tracking-tight leading-tight">{option}</span>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {selected !== null && (
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className={cn(
                        "mt-12 p-8 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl overflow-hidden relative",
                        isCorrect ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-rose-500 text-white shadow-rose-200"
                      )}
                    >
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                            {isCorrect ? <CheckCircle2 size={40} /> : <AlertCircle size={40} />}
                         </div>
                         <div className="text-left">
                            <h4 className="text-2xl font-black mb-1">{isCorrect ? 'Tuyệt vời!' : 'Học hỏi từ sai lầm!'}</h4>
                            <p className="opacity-90 font-medium italic leading-relaxed max-w-lg">
                               {QUESTIONS[currentIdx].explanation}
                            </p>
                         </div>
                      </div>
                      <button 
                        onClick={handleNext}
                        className="w-full md:w-auto px-12 py-5 bg-white text-stone-900 rounded-[20px] font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
                      >
                        TIẾP TỤC
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-10 py-10"
              >
                 <div className="w-40 h-40 bg-gold/20 rounded-full flex items-center justify-center mx-auto text-gold animate-bounce">
                    <Trophy size={80} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-5xl md:text-7xl font-black text-stone-900 font-display italic">Vinh quang!</h3>
                    <p className="text-stone-500 text-xl font-medium">Bạn đã hoàn thành bản năng văn hóa của mình.</p>
                 </div>
                 <div className="text-8xl md:text-9xl font-black text-forest tracking-tighter drop-shadow-sm">{score} <span className="text-3xl text-stone-300 uppercase">XP</span></div>
                 <div className="flex justify-center">
                    <button 
                      onClick={onFadeOut}
                      className="px-12 py-6 bg-stone-900 text-white font-black text-2xl rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                      NHẬN THƯỞNG
                    </button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
