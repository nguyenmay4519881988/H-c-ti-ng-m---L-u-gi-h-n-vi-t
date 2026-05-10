import React from 'react';
import { motion } from 'motion/react';
import { Languages, Mic, Volume2, ArrowRightLeft, Sparkles, Send } from 'lucide-react';
import { translateText } from '@/src/services/gemini';
import { cn } from '@/src/lib/utils';

export const AITranslator = () => {
  const [text, setText] = React.useState('');
  const [result, setResult] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [targetLang, setTargetLang] = React.useState('Tiếng Thái');

  const handleTranslate = async () => {
    if (!text) return;
    setLoading(true);
    const translation = await translateText(text, 'Tiếng Việt', targetLang);
    setResult(translation);
    setLoading(false);
  };

  return (
    <section className="py-24 px-6 bg-forest text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <Sparkles size={400} />
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="px-4 py-1 rounded-full bg-white/10 text-gold font-bold text-sm uppercase tracking-widest"
          >
            AI Multi-Language
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold">Thông dịch viên AI Thông minh</h2>
          <p className="text-white/60 max-w-xl">
            Sử dụng trí tuệ nhân tạo để dịch và học phát âm 
            ngôn ngữ các dân tộc thiểu số một cách chính xác nhất.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 rounded-t-2xl border-b border-white/10">
              <span className="font-bold text-sm">Tiếng Việt</span>
              <Volume2 size={18} className="text-white/40 cursor-pointer hover:text-white" />
            </div>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nhập nội dung cần dịch..."
              className="w-full h-48 p-6 bg-white/5 rounded-b-2xl focus:outline-hidden focus:ring-2 focus:ring-gold/30 transition-all resize-none text-lg"
            />
          </div>

          <div className="flex md:flex-col gap-4 justify-center">
            <button 
              onClick={() => {}} 
              className="w-12 h-12 rounded-full bg-gold text-forest flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-gold/20"
            >
              <ArrowRightLeft size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 rounded-t-2xl border-b border-white/10">
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-transparent font-bold text-sm focus:outline-hidden cursor-pointer"
              >
                <option value="Tiếng Thái" className="text-forest">Tiếng Thái</option>
                <option value="Tiếng Mông" className="text-forest">Tiếng Mông</option>
                <option value="Tiếng Khơ Mú" className="text-forest">Tiếng Khơ Mú</option>
              </select>
              <Volume2 size={18} className="text-white/40 cursor-pointer hover:text-white" />
            </div>
            <div className="w-full h-48 p-6 bg-white/10 rounded-b-2xl border border-white/10 overflow-y-auto relative group">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="text-lg whitespace-pre-wrap">{result || 'Kết quả dịch sẽ hiện ở đây...'}</div>
              )}
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 rounded-lg bg-gold text-forest animate-pulse">
                  <Sparkles size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button 
            onClick={handleTranslate}
            disabled={loading}
            className="px-12 py-4 bg-gold text-forest font-bold rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            {loading ? 'Đang xử lý...' : 'Bắt đầu dịch ngay'}
            <Send size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
