import React from 'react';
import { motion, Reorder } from 'motion/react';
import { X, Trophy, RefreshCw, Star, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const PUZZLE_ITEMS = [
  { id: '1', text: 'Chào mừng bạn' },
  { id: '2', text: 'đến với thế giới' },
  { id: '3', text: 'ngôn ngữ mẹ đẻ' },
  { id: '4', text: 'và văn hóa dân tộc.' },
];

const CORRECT_ORDER = ['1', '2', '3', '4'];

export const PuzzleGame = ({ onClose }: { onClose: () => void }) => {
  const [items, setItems] = React.useState(() => [...PUZZLE_ITEMS].sort(() => Math.random() - 0.5));
  const [isVictory, setIsVictory] = React.useState(false);

  const checkOrder = (newItems: any[]) => {
    const isCorrect = newItems.every((item, idx) => item.id === CORRECT_ORDER[idx]);
    if (isCorrect) {
      setIsVictory(true);
    }
  };

  const handleReorder = (newItems: any[]) => {
    setItems(newItems);
    checkOrder(newItems);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex flex-col bg-emerald-900/95 backdrop-blur-xl"
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
           <div className="px-4 py-2 bg-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-200 font-black">
              <Star size={18} />
              <span>Sắp xếp câu</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-10 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] md:rounded-[56px] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="space-y-12">
            <div className="text-center space-y-4">
               <h2 className="text-4xl md:text-6xl font-black text-stone-900 font-display italic">Sắp xếp sứ mệnh</h2>
               <p className="text-stone-500 font-medium">Kéo thả các mảnh ghép để tạo thành câu giới thiệu ý nghĩa về văn hóa.</p>
            </div>

            {!isVictory ? (
              <div className="max-w-2xl mx-auto">
                <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-3">
                  {items.map((item) => (
                    <Reorder.Item 
                      key={item.id} 
                      value={item}
                      className="p-6 bg-stone-50 rounded-2xl border-2 border-stone-100 cursor-grab active:cursor-grabbing shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-colors"
                    >
                      <span className="text-xl font-bold text-stone-800">{item.text}</span>
                      <div className="w-10 h-10 rounded-xl bg-white border border-stone-100 flex items-center justify-center text-stone-300 group-hover:text-emerald-500 transition-colors">
                         <Star size={20} />
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-10 py-10"
              >
                 <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                    <Trophy size={64} />
                 </div>
                 <div className="bg-emerald-50 p-10 rounded-[40px] border-4 border-emerald-100 shadow-inner">
                    <p className="text-3xl md:text-4xl font-black text-emerald-800 leading-tight italic">
                      "{items.map(i => i.text).join(' ')}"
                    </p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => {
                          setItems([...PUZZLE_ITEMS].sort(() => Math.random() - 0.5));
                          setIsVictory(false);
                      }}
                      className="px-8 py-5 bg-stone-100 text-stone-900 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors"
                    >
                      <RefreshCw size={20} /> CHƠI LẠI
                    </button>
                    <button 
                      onClick={onClose}
                      className="px-8 py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-emerald-200"
                    >
                      HOÀN THÀNH
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
