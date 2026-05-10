import React from 'react';
import { motion } from 'motion/react';
import { Camera, Play, MapPin, Music, Utensils, Home, Palette, Shirt, ArrowRight, Video } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { CULTURE_DATA } from '@/src/mockData';
import { CultureDetail } from '@/src/types';
import { CultureDetailModal } from '@/src/components/sections/CultureDetailModal';
import { AnimatePresence } from 'motion/react';

const CATEGORIES = [
  { id: 'all', name: 'Tất cả', icon: Palette },
  { id: 'fashion', name: 'Trang phục', icon: Shirt },
  { id: 'food', name: 'Ẩm thực', icon: Utensils },
  { id: 'music', name: 'Nhạc cụ', icon: Music },
  { id: 'arch', name: 'Kiến trúc', icon: Home },
  { id: 'fest', name: 'Lễ hội', icon: Camera },
];

export const CulturePage = () => {
  const [activeCat, setActiveCat] = React.useState('all');
  const [selectedItem, setSelectedItem] = React.useState<CultureDetail | null>(null);

  const filteredItems = activeCat === 'all' 
    ? CULTURE_DATA 
    : CULTURE_DATA.filter(item => item.category === activeCat);

  return (
    <div className="space-y-0">
      <section className="bg-white py-20 px-6 border-b border-stone-100">
        <div className="max-w-7xl mx-auto space-y-8">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                 <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-terracotta/10 text-terracotta font-bold text-xs uppercase tracking-widest">
                    Di sản sống
                 </div>
                 <h1 className="text-5xl md:text-7xl font-bold text-stone-900 italic font-display">Văn hóa <span className="gradient-text">Tây Bắc</span></h1>
              </div>
              <div className="flex bg-mist p-2 rounded-3xl overflow-x-auto max-w-full">
                 {CATEGORIES.map(cat => (
                   <button
                     key={cat.id}
                     onClick={() => setActiveCat(cat.id)}
                     className={cn(
                       "flex items-center gap-2 px-6 py-3 rounded-2xl transition-all whitespace-nowrap font-bold",
                       activeCat === cat.id ? "bg-white text-forest shadow-sm" : "text-stone-400 hover:text-stone-600"
                     )}
                   >
                     <cat.icon size={18} />
                     <span>{cat.name}</span>
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
         {filteredItems.length > 0 ? (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredItems.map((item, idx) => (
               <CultureCard key={item.id} item={item} index={idx} onOpen={() => setSelectedItem(item)} />
             ))}
           </div>
         ) : (
           <div className="text-center py-20 space-y-4">
              <div className="text-stone-200 flex justify-center">
                 <Video size={100} />
              </div>
              <h3 className="text-2xl font-bold text-stone-400">Dữ liệu đang được cập nhật...</h3>
           </div>
         )}
         
         <div className="mt-20 p-12 bg-forest rounded-[48px] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-32" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h2 className="text-4xl font-bold font-display italic">Phim tư liệu: Đi tìm Hồn Việt</h2>
                  <p className="text-white/60 text-lg">Hành trình dọc chiều dài dãy Hoàng Liên Sơn, khám phá những nét đẹp văn hóa.</p>
                  <button className="flex items-center gap-3 px-8 py-4 bg-gold text-forest font-black rounded-2xl hover:scale-105 transition-all">
                     <Play size={20} fill="currentColor" /> XEM NGAY
                  </button>
               </div>
               <div className="aspect-video bg-stone-800 rounded-3xl overflow-hidden shadow-2xl relative">
                  <img src="https://images.unsplash.com/photo-1541018939203-36eeab6d9f21?auto=format&fit=crop&q=80&w=800" alt="Video" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white ring-8 ring-white/10">
                        <Play size={40} fill="currentColor" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <CultureDetailModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface CultureCardProps {
  item: CultureDetail;
  index: number;
  onOpen: () => void;
}

const CultureCard: React.FC<CultureCardProps> = ({ item, index, onOpen }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    onClick={onOpen}
    className="group bg-white rounded-[40px] overflow-hidden border border-stone-100 hover:shadow-2xl transition-all cursor-pointer"
  >
    <div className="aspect-[4/5] overflow-hidden relative">
       <img 
         src={item.image} 
         alt={item.title} 
         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
       />
       <div className="absolute top-6 left-6 px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase tracking-widest text-stone-800">
          {item.category === 'fashion' ? 'Trang phục' : item.category === 'food' ? 'Ẩm thực' : item.category === 'music' ? 'Nhạc cụ' : item.category === 'fest' ? 'Lễ hội' : 'Kiến trúc'} • {item.ethnic}
       </div>
    </div>
    <div className="p-8 space-y-4">
       <h3 className="text-2xl font-bold text-stone-900 group-hover:text-forest transition-colors">{item.title}</h3>
       <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
         {item.description}
       </p>
       <div className="flex items-center justify-between pt-4 border-t border-stone-50">
          <span className="text-xs font-bold text-stone-400">Khám phá chi tiết</span>
          <div className="p-2 rounded-xl bg-forest/5 text-forest group-hover:bg-forest group-hover:text-white transition-all">
             <ArrowRight size={20} />
          </div>
       </div>
    </div>
  </motion.div>
);
