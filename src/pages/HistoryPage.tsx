import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, BookOpen, Search, ArrowRight } from 'lucide-react';

const TIMELINE = [
  { year: 'Thiên niên kỷ 1 TCN', title: 'Nguồn gốc các dân tộc', desc: 'Tại khu vực các thung lũng sông Hồng, sông Đà, các nhóm dân tộc sơ khai bắt đầu hình thành cộng đồng.' },
  { year: 'Thế kỷ 11', title: 'Cuộc di cư lớn', desc: 'Người Thái từ phương Bắc bắt đầu di cư xuống các thung lũng vùng cao phía Bắc Việt Nam.' },
  { year: 'Thế kỷ 14 - 15', title: 'Xây dựng bản mường', desc: 'Sự hình thành của các đơn vị dân cư đặc trưng (Bản/Mường) tại vùng Tây Bắc.' },
  { year: 'Thời kỳ hiện đại', title: 'Bảo tồn & Phát triển', desc: 'Ngôn ngữ và văn hóa dân tộc được công nhận là di sản quốc gia và quốc tế.' },
];

export const HistoryPage = () => {
  return (
    <div className="bg-mist min-h-screen">
      <section className="relative py-32 px-6 overflow-hidden bg-stone-900 text-white">
         <div className="absolute inset-0 pattern-bg opacity-10" />
         <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-gold font-bold text-xs uppercase tracking-widest">
                  Thời gian & Ký ức
               </div>
               <h1 className="text-5xl md:text-7xl font-bold font-display italic">Dặm dài <span className="text-gold">Lịch sử</span></h1>
               <p className="text-stone-400 text-lg leading-relaxed max-w-lg">
                  Lịch sử các dân tộc vùng cao là bản hùng ca về sự kiên cường, tình yêu thiên nhiên và ý chí bảo vệ bản sắc muôn đời.
               </p>
               <div className="flex bg-white/5 border border-white/10 p-2 rounded-2xl max-w-md">
                 <Search size={20} className="text-stone-500 m-2" />
                 <input type="text" placeholder="Tìm kiếm sự kiện, nhân vật..." className="bg-transparent border-none focus:outline-none flex-1 text-sm" />
               </div>
            </div>
            <div className="relative">
               <div className="aspect-[3/4] bg-stone-800 rounded-[40px] overflow-hidden border-8 border-stone-800 shadow-2xl skew-y-3">
                  <img src="https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&q=80&w=800" alt="History" className="w-full h-full object-cover grayscale opacity-60" />
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-gold/20 rounded-full animate-ping" />
            </div>
         </div>
      </section>

      <section className="py-24 px-6 max-w-4xl mx-auto">
         <div className="space-y-20 relative">
            <div className="absolute top-0 left-8 bottom-0 w-1 bg-stone-200 -translate-x-1/2" />
            
            {TIMELINE.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative pl-24 group"
              >
                <div className="absolute left-8 top-0 w-12 h-12 bg-white rounded-2xl border-4 border-mist shadow-lg shadow-forest/10 flex items-center justify-center -translate-x-1/2 group-hover:scale-125 transition-transform group-hover:bg-forest group-hover:text-white">
                   <Calendar size={20} className={idx % 2 === 0 ? 'text-forest' : 'text-terracotta'} />
                </div>
                <div className="space-y-3">
                   <div className="text-forest font-black uppercase tracking-widest text-sm">{item.year}</div>
                   <h3 className="text-3xl font-bold text-stone-900">{item.title}</h3>
                   <p className="text-stone-500 text-lg leading-relaxed">{item.desc}</p>
                   <button className="flex items-center gap-2 text-stone-400 font-bold hover:text-forest transition-colors pt-4 group-hover:gap-4 transition-all">
                      Xem chi tiết bài viết <ArrowRight size={18} />
                   </button>
                </div>
              </motion.div>
            ))}
         </div>
      </section>

      <section className="py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-[40px] overflow-hidden shadow-2xl aspect-square relative group">
               <img src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800" alt="Map" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 bg-forest/20 mix-blend-overlay" />
               <div className="absolute bottom-8 left-8 p-6 glass rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                     <MapPin className="text-forest" />
                     <span className="font-bold">Bản đồ phân bổ dân tộc</span>
                  </div>
               </div>
            </div>
            <div className="space-y-8">
               <h2 className="text-4xl font-bold text-stone-900 leading-tight">Vùng đất của những <br /> <span className="gradient-text">Huyền thoại</span></h2>
               <p className="text-stone-500 text-lg leading-relaxed">
                 Từ Mù Cang Chải rực rỡ lúa vàng đến Cao nguyên đá Đồng Văn hùng vĩ, mỗi tấc đất đều gắn liền với những câu chuyện cổ tích và sự hình thành của các bộ tộc anh em.
               </p>
               <div className="grid grid-cols-2 gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="p-6 bg-mist rounded-3xl border border-stone-100 font-bold text-stone-700 hover:bg-forest hover:text-white transition-all cursor-pointer">
                       Vùng {i === 1 ? 'Tây Bắc' : i === 2 ? 'Đông Bắc' : i === 3 ? 'Trường Sơn' : 'Tây Nguyên'}
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};
