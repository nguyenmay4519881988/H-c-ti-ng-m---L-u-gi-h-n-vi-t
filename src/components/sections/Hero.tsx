import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 px-6 overflow-hidden pattern-bg">
      {/* Abstract Ornaments */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-forest/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/10 text-forest font-semibold text-sm">
            <Sparkles size={16} />
            <span>Công nghệ AI hiện đại - Bảo tồn di sản</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-stone-900">
            Học tiếng mẹ đẻ <br />
            <span className="gradient-text">Giữ hồn dân tộc</span>
          </h1>
          
          <p className="text-lg text-stone-600 max-w-lg leading-relaxed">
            Nơi lưu giữ ngôn ngữ và văn hóa dân tộc Việt Nam qua trải nghiệm học tập hiện đại. <br />
            <span className="font-medium text-stone-400 mt-2 block italic text-sm">
              Tác giả - Vũ Đức Hạnh - Học sinh lớp 5C trường TH & THCS Thanh Trường
            </span>
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/learn" className="px-8 py-4 bg-forest text-white rounded-2xl font-bold text-lg shadow-xl shadow-forest/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group">
              Bắt đầu học ngay
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/culture" className="px-8 py-4 bg-white border-2 border-stone-100 text-stone-700 rounded-2xl font-bold text-lg hover:bg-stone-50 transition-all">
              Khám phá văn hóa
            </Link>
          </div>
          
          <div className="flex items-center gap-6 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-bold text-forest">{(i * 1.5).toFixed(1)}k+</span>
                <span className="text-xs text-stone-500 uppercase tracking-widest font-bold">Thành viên</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 animate-float">
            <img 
              src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200" 
              alt="Học tập AI" 
              className="rounded-3xl shadow-2xl border-8 border-white"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating glass cards */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 glass p-4 rounded-2xl shadow-lg border border-white/50 max-w-[200px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                  <Sparkles size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-400">AI Tutor</div>
                  <div className="text-sm font-bold text-forest line-clamp-1">Hướng dẫn phát âm</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-10 -left-10 glass p-4 rounded-2xl shadow-lg border border-white/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold bg-forest text-white px-3 py-1 rounded-full">+12k</div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-forest/10 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
        </motion.div>
      </div>
    </section>
  );
};
