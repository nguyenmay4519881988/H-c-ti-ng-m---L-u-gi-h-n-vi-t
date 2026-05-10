import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, RefreshCw, Star, Zap, Gift, MapPin, Heart } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const SECTORS = [
  { label: '+50 XP', icon: Zap, color: 'bg-emerald-500' },
  { label: 'Huy hiệu', icon: Trophy, color: 'bg-amber-500' },
  { label: 'Voucher', icon: Gift, color: 'bg-rose-500' },
  { label: 'Du lịch', icon: MapPin, color: 'bg-blue-500' },
  { label: 'Trái tim', icon: Heart, color: 'bg-pink-500' },
  { label: 'Bonus', icon: Star, color: 'bg-purple-500' },
];

export const WheelGame = ({ onClose }: { onClose: () => void }) => {
  const [rotation, setRotation] = React.useState(0);
  const [spinning, setSpinning] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const extra = 1800 + Math.random() * 3600;
    const newRotation = rotation + extra;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const degree = (newRotation % 360);
      const sectorIndex = Math.floor((360 - degree) / (360 / SECTORS.length)) % SECTORS.length;
      setResult(SECTORS[sectorIndex]);
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex flex-col bg-purple-900/95 backdrop-blur-xl"
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
           <div className="px-4 py-2 bg-purple-600/20 rounded-xl flex items-center gap-2 text-purple-200 font-black">
              <Zap size={18} />
              <span>Vòng quay bản sắc</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-10 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] md:rounded-[56px] p-8 md:p-16 shadow-2xl relative overflow-hidden text-center">
          <div className="space-y-12">
            <div className="space-y-4">
               <h2 className="text-4xl md:text-6xl font-black text-stone-900 font-display italic">Vòng quay <span className="text-purple-600">May Mắn</span></h2>
               <p className="text-stone-500 font-medium">Mỗi lần quay là một cơ hội tìm hiểu văn hóa vùng cao.</p>
            </div>

            <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto group">
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-purple-600">
                 <div className="w-8 h-12 bg-purple-600 clip-triangle-down shadow-xl" />
              </div>

              {/* Wheel */}
              <motion.div 
                animate={{ rotate: rotation }}
                transition={{ duration: 5, ease: "circOut" }}
                className="w-full h-full rounded-full border-[12px] border-stone-100 shadow-2xl overflow-hidden relative"
              >
                 {SECTORS.map((s, i) => (
                   <div 
                     key={i} 
                     className={cn("absolute top-0 left-0 w-full h-full origin-center flex flex-col items-center pt-8 md:pt-10", s.color)}
                     style={{ 
                       transform: `rotate(${i * (360 / SECTORS.length)}deg)`,
                       clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%)'
                     }}
                   >
                      <s.icon size={window.innerWidth < 768 ? 16 : 24} className="text-white mb-2" />
                      <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-tighter truncate px-2">{s.label}</span>
                   </div>
                 ))}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full shadow-lg border-4 border-stone-50 z-10" />
                 </div>
              </motion.div>
            </div>

            <div className="space-y-8">
               <AnimatePresence>
                  {result && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-4"
                    >
                       <div className="text-2xl font-black text-purple-600 tracking-tight">CHÚC MỪNG!</div>
                       <div className="px-8 py-3 bg-stone-100 rounded-full font-bold text-stone-900 flex items-center gap-2 shadow-sm border border-stone-200">
                          <result.icon size={20} className="text-purple-600" />
                          BẠN NHẬN ĐƯỢC: {result.label}
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>

               <button 
                  onClick={spin}
                  disabled={spinning}
                  className={cn(
                    "w-full max-w-sm px-12 py-6 rounded-3xl font-black text-2xl shadow-2xl transition-all",
                    spinning ? "bg-stone-200 text-stone-400 cursor-not-allowed" : "bg-purple-600 text-white hover:scale-105 active:scale-95 shadow-purple-200"
                  )}
               >
                 {spinning ? 'ĐANG QUAY...' : 'QUAY NGAY!'}
               </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
