import React from 'react';
import { motion } from 'motion/react';
import { Camera, Play, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

import { Lightbox } from '@/src/components/sections/Lightbox';
import { AnimatePresence } from 'motion/react';
import { CULTURE_DATA } from '@/src/mockData';

export const CultureGallery = () => {
  const [selectedImage, setSelectedImage] = React.useState<any>(null);

  // Take first 4 items for the featured grid
  const featuredItems = CULTURE_DATA.slice(0, 4).map((item, idx) => ({
    ...item,
    size: idx === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1',
    // Special layout for idx 2 to match previous design if possible
    ...(idx === 2 ? { size: 'col-span-1 row-span-2' } : {})
  }));

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-stone-900 tracking-tight">Góc Văn Hóa Tây Bắc</h2>
          <p className="text-stone-500">
            Khám phá kho tàng di sản văn hóa phong phú, những câu chuyện lịch sử 
            và vẻ đẹp thiên nhiên hùng vĩ của dải đất Tây Bắc.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
          {featuredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedImage({
                url: item.image,
                description: item.title,
                ethnic: item.ethnic,
                location: item.category // Using category as location for now
              })}
              className={cn(
                "relative group rounded-3xl overflow-hidden cursor-pointer",
                item.size
              )}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full w-fit text-[10px] font-bold text-white uppercase tracking-widest mb-3">
                  {item.category}
                </div>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-white/70 text-sm mt-1 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.subtitle}
                </p>
                <div className="h-1 w-0 group-hover:w-full bg-gold transition-all duration-700" />
              </div>
              
              <div className="absolute top-6 right-6 w-12 h-12 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                <ArrowUpRight size={24} />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center pt-8">
          <button className="flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-forest transition-colors">
            Xem tất cả bài viết 
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <Lightbox 
            image={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};
