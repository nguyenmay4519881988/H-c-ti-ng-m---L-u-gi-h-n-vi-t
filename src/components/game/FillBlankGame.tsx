import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, RefreshCw, Send, CheckCircle2, XCircle, Info, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const QUESTIONS = [
  { 
    id: 1, 
    sentence: "_____ là món ăn truyền thống của người Mông trên cao nguyên đá.",
    answer: "Mèn mén",
    options: ["Thắng cố", "Mèn mén", "Pa pỉnh tộp", "Cơm lam"],
    explanation: "Mèn mén được làm từ ngô tẻ địa phương, là thực phẩm chính của người Mông."
  },
  { 
    id: 2, 
    sentence: "Trong tiếng Thái, trang phục áo xẻ ngực, bó sát người gọi là _____.",
    answer: "Áo Cỏm",
    options: ["Áo Dài", "Áo Tứ Thân", "Áo Cỏm", "Áo Chàm"],
    explanation: "Áo Cỏm là nét đặc trưng trong trang phục của phụ nữ Thái Đen và Thái Trắng."
  }
];

export const FillBlankGame = ({ onClose }: { onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [showResult, setShowResult] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const current = QUESTIONS[currentIndex];

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);
    if (option === current.answer) setScore(s => s + 200);
  };

  const next = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setShowResult(true); // Final state handled by if (currentIndex === ...)
    }
  };

  const isFinished = currentIndex === QUESTIONS.length - 1 && showResult;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex flex-col bg-orange-900/95 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="h-16 md:h-20 w-full flex items-center justify-between px-6 md:px-12 bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <button 
          onClick={onClose}
          className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all text-white backdrop-blur-sm shadow-xl"
        >
          <X size={24} className="md:w-8 md:h-8" />
        </button>
        <div className="flex items-center gap-4">
           <div className="px-4 py-2 bg-black/20 rounded-xl flex items-center gap-2 text-white font-black text-sm">
              Câu {currentIndex + 1} / {QUESTIONS.length}
           </div>
           <div className="px-4 py-2 bg-orange-500/20 rounded-xl flex items-center gap-2 text-orange-200 font-black text-sm">
              <Star size={16} />
              <span>{score}</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-10 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] md:rounded-[56px] p-6 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="space-y-12">
            {!isFinished ? (
              <>
                 <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-stone-900 font-display italic">Điền từ di sản</h2>
                    <p className="text-stone-500 font-medium">Chọn từ đúng nhất để hoàn thiện câu văn hóa.</p>
                 </div>

                 <div className="p-8 md:p-12 bg-stone-50 rounded-[32px] md:rounded-[40px] border-4 border-dashed border-stone-200 text-center shadow-inner">
                    <p className="text-2xl md:text-3xl font-bold text-stone-800 leading-relaxed md:leading-loose">
                      {current.sentence.split('_____').map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className={cn(
                              "inline-block min-w-32 px-4 border-b-4 mx-2 text-orange-600",
                              selected ? "border-transparent" : "border-stone-300"
                            )}>
                              {selected || "...."}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {current.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelect(opt)}
                        className={cn(
                          "p-6 rounded-3xl font-bold text-lg md:text-xl transition-all border-2 text-left flex items-center justify-between group",
                          selected === opt ? (opt === current.answer ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-rose-50 border-rose-500 text-rose-700") : "bg-white border-stone-100 hover:border-orange-500 hover:scale-[1.02]"
                        )}
                      >
                        {opt}
                        {showResult && opt === current.answer && <CheckCircle2 className="text-emerald-500" />}
                        {showResult && selected === opt && opt !== current.answer && <XCircle className="text-rose-500" />}
                        {!showResult && <div className="w-6 h-6 rounded-full border-2 border-stone-200 group-hover:border-orange-200" />}
                      </button>
                    ))}
                 </div>

                 <AnimatePresence>
                   {showResult && (
                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="p-8 bg-blue-50 rounded-[32px] border border-blue-100 space-y-6"
                     >
                        <div className="flex items-start gap-4">
                           <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                              <Info size={24} />
                           </div>
                           <div className="space-y-1">
                              <h4 className="font-black text-blue-900 tracking-tight">Kiến thức hôm nay:</h4>
                              <p className="text-blue-700 italic leading-relaxed">{current.explanation}</p>
                           </div>
                        </div>
                        <button 
                          onClick={next}
                          className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-200 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                          TIẾP TỤC
                        </button>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </>
            ) : (
              <div className="text-center space-y-10 py-10">
                 <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600 animate-bounce">
                    <Trophy size={64} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-4xl md:text-6xl font-black text-stone-900 font-display italic leading-tight">Hoàn thành di sản!</h3>
                    <p className="text-stone-500 text-lg md:text-xl font-medium">Kiến thức văn hóa của bạn thật đáng khâm phục.</p>
                 </div>
                 <div className="text-7xl md:text-9xl font-black text-orange-600 tracking-tighter">{score} <span className="text-2xl text-stone-300">XP</span></div>
                 <div className="flex justify-center">
                    <button 
                      onClick={onClose}
                      className="px-12 py-5 bg-stone-900 text-white font-black text-xl rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                      KẾT THÚC
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
