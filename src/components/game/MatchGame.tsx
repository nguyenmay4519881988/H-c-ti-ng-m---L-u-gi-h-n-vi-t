import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, RefreshCw, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { playSound } from '@/src/lib/sounds';

const CARDS = [
  { id: 1, text: 'Hà Nhì', type: 'ethnic' },
  { id: 2, text: 'Trang phục rực rỡ', type: 'desc' },
  { id: 3, text: 'Mông', type: 'ethnic' },
  { id: 4, text: 'Khèn Mông mang hồn núi', type: 'desc' },
  { id: 5, text: 'Tày', type: 'ethnic' },
  { id: 6, text: 'Nhà sàn ven suối', type: 'desc' },
  { id: 7, text: 'Thái', type: 'ethnic' },
  { id: 8, text: 'Múa Xòe gắn kết', type: 'desc' },
];

const PAIRS: Record<number, number> = {
  1: 2, 2: 1,
  3: 4, 4: 3,
  5: 6, 6: 5,
  7: 8, 8: 7,
};

export const MatchGame = ({ onClose }: { onClose: () => void }) => {
  const [cards, setCards] = React.useState(() => [...CARDS].sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = React.useState<number[]>([]);
  const [solved, setSolved] = React.useState<number[]>([]);
  const [disabled, setDisabled] = React.useState(false);

  const handleCardClick = (id: number) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    playSound('pop');

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [first, second] = newFlipped;
      
      if (PAIRS[first] === second) {
        playSound('correct');
        setSolved([...solved, first, second]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          playSound('wrong');
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const restart = () => {
    playSound('pop');
    setCards([...CARDS].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
  };

  const isFinished = solved.length === CARDS.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex flex-col bg-forest/95 backdrop-blur-xl"
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
           <div className="px-4 py-2 bg-black/20 rounded-xl flex items-center gap-2 text-white font-black">
              <Star size={18} className="text-gold" />
              <span>{solved.length / 2} / {CARDS.length / 2}</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-10 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-[40px] md:rounded-[56px] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="space-y-12">
            <div className="text-center space-y-4">
               <h2 className="text-3xl md:text-5xl font-black text-stone-900 font-display italic">Lật thẻ ghi nhớ</h2>
               <p className="text-stone-500 font-medium">Hãy tìm các cặp thẻ tương ứng giữa dân tộc và đặc điểm văn hóa.</p>
            </div>

            {!isFinished ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(card.id)}
                    className={cn(
                      "aspect-square rounded-3xl cursor-pointer transition-all duration-500 preserve-3d relative",
                      (flipped.includes(card.id) || solved.includes(card.id)) ? "[transform:rotateY(180deg)]" : ""
                    )}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 bg-stone-900 rounded-3xl flex items-center justify-center backface-hidden shadow-xl border-4 border-stone-800">
                      <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                         <Star size={24} className="text-gold" />
                      </div>
                    </div>

                    {/* Back */}
                    <div className={cn(
                      "absolute inset-0 rounded-3xl flex items-center justify-center p-4 md:p-6 text-center text-xs md:text-sm font-black backface-hidden [transform:rotateY(180deg)] shadow-xl",
                      card.type === 'ethnic' ? "bg-gold text-forest" : "bg-forest text-white"
                    )}>
                      {card.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-10 py-10"
              >
                 <div className="w-32 h-32 bg-gold/20 rounded-full flex items-center justify-center mx-auto text-gold animate-bounce">
                    <Trophy size={64} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-4xl md:text-5xl font-black text-stone-900 italic font-display">Tuyệt vời!</h3>
                    <p className="text-stone-500 text-lg md:text-xl font-medium">Bạn đã hoàn thành thử thách ghi nhớ.</p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={restart}
                      className="px-8 py-5 bg-stone-100 text-stone-900 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors"
                    >
                      <RefreshCw size={20} /> CHƠI LẠI
                    </button>
                    <button 
                      onClick={onClose}
                      className="px-8 py-5 bg-forest text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-forest/20"
                    >
                      XÁC NHẬN
                    </button>
                 </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
