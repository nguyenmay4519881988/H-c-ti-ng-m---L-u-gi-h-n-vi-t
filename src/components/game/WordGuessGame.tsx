import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, RefreshCw, Send, HelpCircle, Timer, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Real content for the game
const WORD_LIST = [
  { id: 1, vi: 'Cơm lam', ethnic: 'Khẩu lam', lang: 'Thái', image: 'https://images.unsplash.com/photo-1512058454905-6b841e7ad132?auto=format&fit=crop&q=80&w=600', hint: 'Gạo nếp nướng trong ống tre.' },
  { id: 2, vi: 'Áo Cỏm', ethnic: 'Xửa Cỏm', lang: 'Thái', image: 'https://images.unsplash.com/photo-1541018939203-36eeab6d9f21?auto=format&fit=crop&q=80&w=600', hint: 'Trang phục bò sát vòng eo phụ nữ Thái.' },
  { id: 3, vi: 'Khèn Mông', ethnic: 'Kềnh Mông', lang: 'Mông', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600', hint: 'Nhạc cụ múa thổi của người Mông.' },
  { id: 4, vi: 'Xin chào', ethnic: 'Nyob zoo', lang: 'Mông', image: 'https://images.unsplash.com/photo-1508913922359-8386c1236811?auto=format&fit=crop&q=80&w=600', hint: 'Câu chào hỏi đầu tiên.' },
];

export const WordGuessGame = ({ onClose }: { onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState('');
  const [showHint, setShowHint] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(30);
  const [gameOver, setGameOver] = React.useState(false);
  const [feedback, setFeedback] = React.useState<'correct' | 'wrong' | null>(null);

  const current = WORD_LIST[currentIndex];

  React.useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === current.ethnic.toLowerCase()) {
      setFeedback('correct');
      setScore(s => s + 100);
      setTimeout(() => {
        if (currentIndex < WORD_LIST.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setAnswer('');
          setShowHint(false);
          setFeedback(null);
          setTimeLeft(30);
        } else {
          setGameOver(true);
        }
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex flex-col bg-terracotta/95 backdrop-blur-xl"
    >
      {/* Dynamic Header */}
      <div className="h-16 md:h-20 w-full flex items-center justify-between px-6 md:px-12 bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <button 
          onClick={onClose}
          className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all text-white backdrop-blur-sm shadow-xl"
        >
          <X size={24} className="md:w-8 md:h-8" />
        </button>
        <div className="flex items-center gap-4">
           <div className="px-4 py-2 bg-black/20 rounded-xl flex items-center gap-2 text-white font-black">
              <Timer size={18} className="text-terracotta" />
              <span>{timeLeft}S</span>
           </div>
           <div className="px-4 py-2 bg-gold/20 rounded-xl flex items-center gap-2 text-gold font-black">
              <Star size={18} />
              <span>{score}</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-10 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] md:rounded-[56px] p-6 md:p-16 shadow-2xl relative overflow-hidden group">
          {!gameOver ? (
            <div className="flex flex-col space-y-10">
              <div className="text-center space-y-4">
                 <h2 className="text-3xl md:text-5xl font-black text-stone-900 italic font-display">{current.vi}</h2>
                 <p className="text-stone-500 font-medium italic">Hãy nhập tên bằng tiếng {current.lang}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-square rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl border-4 md:border-8 border-stone-50 mx-auto w-full max-w-sm lg:max-w-none">
                   <img src={current.image} alt="Guess the word" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>

                <div className="space-y-8">
                   <form onSubmit={handleSubmit} className="space-y-4">
                      <input 
                        autoFocus
                        type="text" 
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Nhập câu trả lời..."
                        className={cn(
                          "w-full p-6 bg-stone-50 rounded-3xl border-2 transition-all text-xl font-bold text-center uppercase tracking-widest",
                          feedback === 'correct' ? "border-emerald-500 bg-emerald-50 text-emerald-600" : 
                          feedback === 'wrong' ? "border-rose-500 bg-rose-50 text-rose-600 animate-shake" : 
                          "border-stone-100 focus:border-terracotta outline-hidden"
                        )}
                      />
                      <button 
                        type="submit"
                        className="w-full py-6 bg-terracotta text-white rounded-3xl font-black text-xl shadow-xl shadow-terracotta/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                        <Send size={24} /> KIỂM TRA
                      </button>
                   </form>

                   <div className="p-6 bg-gold/10 rounded-3xl border border-gold/20 flex flex-col items-center gap-4">
                      <button 
                        onClick={() => setShowHint(true)}
                        className="flex items-center gap-2 text-gold font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                      >
                        <HelpCircle size={16} /> HIỆN GỢI Ý
                      </button>
                      <AnimatePresence>
                        {showHint && (
                          <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-stone-600 text-sm font-medium italic text-center"
                          >
                            "{current.hint}"
                          </motion.p>
                        )}
                      </AnimatePresence>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-10 py-10">
               <div className="w-32 h-32 bg-gold/20 rounded-full flex items-center justify-center mx-auto text-gold animate-bounce">
                  <Trophy size={64} />
               </div>
               <div>
                  <h2 className="text-5xl md:text-6xl font-black text-stone-900 italic font-display">Chiến thắng!</h2>
                  <p className="text-stone-500 text-lg md:text-xl mt-2 font-medium">Bạn đã hoàn thành xuất sắc thử thách bản sắc.</p>
               </div>
               <div className="text-7xl md:text-9xl font-black text-terracotta tracking-tighter">{score} <span className="text-2xl text-stone-300">XP</span></div>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => {
                      setCurrentIndex(0);
                      setScore(0);
                      setTimeLeft(30);
                      setGameOver(false);
                      setAnswer('');
                    }}
                    className="px-8 py-5 bg-stone-100 text-stone-900 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors"
                  >
                    <RefreshCw size={20} /> CHƠI LẠI
                  </button>
                  <button 
                    onClick={onClose}
                    className="px-8 py-5 bg-stone-900 text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl"
                  >
                    TIẾP TỤC HÀNH TRÌNH
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
