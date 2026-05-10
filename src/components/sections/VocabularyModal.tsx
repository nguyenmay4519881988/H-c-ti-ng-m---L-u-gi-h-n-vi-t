import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Globe, Languages } from 'lucide-react';
import { Vocabulary } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { playSound } from '@/src/lib/sounds';

interface VocabularyModalProps {
  vocab: Vocabulary;
  onClose: () => void;
}

export const VocabularyModal = ({ vocab, onClose }: VocabularyModalProps) => {
  const [isReading, setIsReading] = React.useState(false);

  const handleRead = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    playSound('pop');
    const vnUtterance = new SpeechSynthesisUtterance(`Từ này tiếng Việt là: ${vocab.vietnamese}.`);
    vnUtterance.lang = 'vi-VN';
    vnUtterance.rate = 1.0;
    
    vnUtterance.onstart = () => setIsReading(true);
    
    vnUtterance.onend = () => {
      const transition = `Tiếng dân tộc đọc là: `;
      const transUtterance = new SpeechSynthesisUtterance(transition);
      transUtterance.lang = 'vi-VN';
      transUtterance.rate = 0.9;

      transUtterance.onend = () => {
        const ethnicUtterance = new SpeechSynthesisUtterance(vocab.phonetic || vocab.ethnic);
        ethnicUtterance.lang = 'vi-VN';
        ethnicUtterance.rate = 0.6;
        ethnicUtterance.onend = () => setIsReading(false);
        window.speechSynthesis.speak(ethnicUtterance);
      };
      
      window.speechSynthesis.speak(transUtterance);
    };

    window.speechSynthesis.speak(vnUtterance);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-55 flex flex-col items-center justify-center p-4 bg-stone-900/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 bg-white/10 backdrop-blur-md border-b border-stone-100 z-10 sticky top-0">
          <button 
            onClick={onClose}
            className="p-3 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all shadow-sm"
          >
            <X size={20} className="text-stone-600" />
          </button>
          <div className="flex items-center gap-2 text-stone-900 font-black italic">
             <Languages size={18} className="text-forest" />
             <span>TỪ ĐIỂN BẢN SẮC</span>
          </div>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-sm border border-stone-100 relative group">
            <img src={vocab.image} alt={vocab.vietnamese} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <h2 className="absolute bottom-6 left-6 text-2xl font-black text-white italic tracking-tighter uppercase">{vocab.vietnamese}</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-forest/5 rounded-3xl border border-forest/10">
              <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-widest text-forest">Cách đọc tiếng Thái</div>
                <h3 className="text-3xl font-black text-forest italic">{vocab.ethnic}</h3>
                <div className="text-xs font-medium text-stone-400 italic">Phiên âm: {vocab.phonetic}</div>
              </div>
              <button 
                onClick={handleRead}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg ring-4 ring-forest/10",
                  isReading ? "bg-rose-500 text-white" : "bg-forest text-white"
                )}
              >
                <Volume2 size={24} className={cn(isReading && "animate-pulse")} />
              </button>
            </div>

            <div className="p-6 bg-stone-50 rounded-3xl space-y-4 border border-stone-100">
               <div className="grid grid-cols-2 gap-6">
                  <LangItem label="Mông" value="Nyob zoo" phonetic="Ny-ob zoo" />
                  <LangItem label="Khơ Mú" value="Kh'mơ mô" phonetic="Kh-muo" />
                  <LangItem label="Dao" value="Tào mên" phonetic="Tao-men" />
                  <LangItem label="Mường" value="Ú mỏi" phonetic="U-moi" />
               </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black text-lg hover:bg-forest transition-colors shadow-2xl shadow-stone-900/20"
          >
            KHÁM PHÁ TIẾP
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const LangItem = ({ label, value, phonetic }: any) => (
  <div className="space-y-0.5">
    <div className="text-[9px] font-black text-stone-400 uppercase tracking-widest">{label}</div>
    <div className="text-forest font-black text-lg">{value}</div>
    <div className="text-[10px] text-stone-400 font-medium italic">{phonetic}</div>
  </div>
);
