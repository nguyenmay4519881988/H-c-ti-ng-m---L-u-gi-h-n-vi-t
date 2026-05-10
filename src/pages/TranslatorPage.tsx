import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, Mic, Volume2, ArrowRightLeft, Sparkles, Send, History, Star, Search, Globe } from 'lucide-react';
import { translateText } from '@/src/services/gemini';
import { cn } from '@/src/lib/utils';
import { VocabularyModal } from '@/src/components/sections/VocabularyModal';

export const TranslatorPage = () => {
  const [text, setText] = React.useState('');
  const [result, setResult] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [targetLang, setTargetLang] = React.useState('Tiếng Thái');
  const [selectedVocab, setSelectedVocab] = React.useState<any>(null);

  const handleTranslate = async () => {
    if (!text) return;
    setLoading(true);
    const translation = await translateText(text, 'Tiếng Việt', targetLang);
    setResult(translation);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-mist p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-forest text-white font-bold text-xs uppercase tracking-widest">
                AI Powered
             </div>
             <h1 className="text-5xl font-bold text-stone-900 italic font-display">Thông dịch viên <span className="gradient-text">Thông minh</span></h1>
          </div>
          <div className="flex gap-2">
             <button className="p-4 bg-white rounded-2xl border border-stone-100 text-stone-400 hover:text-forest transition-colors shadow-sm">
                <History size={24} />
             </button>
             <button className="p-4 bg-white rounded-2xl border border-stone-100 text-stone-400 hover:text-gold transition-colors shadow-sm">
                <Star size={24} />
             </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white rounded-[40px] shadow-2xl border border-stone-100 overflow-hidden flex flex-col h-[500px]">
             <div className="px-8 py-6 border-b border-stone-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
                      <Languages size={20} />
                   </div>
                   <span className="font-bold text-stone-900">Tiếng Việt</span>
                </div>
                <div className="flex items-center gap-2">
                   <button className="p-2 rounded-lg hover:bg-stone-50 text-stone-400 transition-colors">
                      <Mic size={20} />
                   </button>
                   <button className="p-2 rounded-lg hover:bg-stone-50 text-stone-400 transition-colors">
                      <Volume2 size={20} />
                   </button>
                </div>
             </div>
             <div className="flex-1 p-8">
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Nhập nội dung cần dịch hoặc bấm chọn micro để nói..."
                  className="w-full h-full bg-transparent border-none focus:outline-none text-2xl font-medium placeholder:text-stone-200 resize-none"
                />
             </div>
             <div className="p-8 border-t border-stone-50 flex justify-between items-center bg-stone-50/50">
                <div className="flex gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
                   <span>{text.length} / 5000 ký tự</span>
                </div>
                <button 
                  onClick={handleTranslate}
                  disabled={loading || !text}
                  className="px-8 py-4 bg-forest text-white rounded-2xl font-black flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-xl shadow-forest/20"
                >
                  {loading ? 'Đang dịch...' : 'DỊCH NGAY'}
                  <Send size={18} />
                </button>
             </div>
          </div>

          {/* Output Panel */}
          <div className="bg-stone-900 rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[500px] relative group">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Sparkles size={300} />
             </div>
             <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center">
                      <Sparkles size={20} />
                   </div>
                   <select 
                     value={targetLang}
                     onChange={(e) => setTargetLang(e.target.value)}
                     className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                   >
                     <option value="Tiếng Thái" className="text-stone-900">Tiếng Thái</option>
                     <option value="Tiếng Mông" className="text-stone-900">Tiếng Mông</option>
                     <option value="Tiếng Khơ Mú" className="text-stone-900">Tiếng Khơ Mú</option>
                   </select>
                </div>
                <div className="flex items-center gap-2">
                   <button className="p-2 rounded-lg hover:bg-white/5 text-stone-400 transition-colors">
                      <Volume2 size={20} />
                   </button>
                </div>
             </div>
             <div className="flex-1 p-8 overflow-y-auto">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                     <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                     <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">AI đang suy nghĩ...</span>
                  </div>
                ) : (
                  <div className="text-white text-2xl font-medium leading-relaxed whitespace-pre-wrap">
                    {result || <span className="text-white/10 italic">Bản dịch sẽ hiển thị ở đây...</span>}
                  </div>
                )}
             </div>
             {result && !loading && (
               <div className="p-8 border-t border-white/5 flex gap-4">
                  <button className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <History size={18} /> Lưu vào lịch sử
                  </button>
                  <button className="w-16 h-14 bg-gold text-forest rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-gold/20">
                    <Volume2 size={24} />
                  </button>
               </div>
             )}
          </div>
        </div>

        {/* Floating Switch Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex">
           <button className="w-16 h-16 rounded-full bg-mist border-4 border-white shadow-2xl flex items-center justify-center text-forest hover:rotate-180 transition-transform duration-500 hover:scale-110">
              <ArrowRightLeft size={28} />
           </button>
        </div>

        {/* Suggested Phrases */}
        <section className="space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-stone-900 italic font-display">Cụm từ phổ biến</h2>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Xin chào', 'Cảm ơn', 'Đẹp quá', 'Hẹn gặp lại'].map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => setSelectedVocab({
                    id: phrase,
                    vietnamese: phrase,
                    ethnic: '...',
                    phonetic: '...',
                    image: 'https://images.unsplash.com/photo-1541018939203-36eeab6d9f21?auto=format&fit=crop&q=80&w=800'
                  })}
                  className="p-6 bg-white rounded-3xl border border-stone-100 hover:shadow-xl transition-all text-left flex flex-col gap-4 group"
                >
                   <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-forest/10 group-hover:text-forest transition-colors">
                      <Globe size={24} />
                   </div>
                   <span className="font-black text-stone-800 text-lg">{phrase}</span>
                </button>
              ))}
           </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedVocab && (
          <VocabularyModal 
            vocab={selectedVocab} 
            onClose={() => setSelectedVocab(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
