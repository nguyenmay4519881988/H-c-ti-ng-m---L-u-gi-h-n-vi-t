import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, MapPin, Tag } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LightboxProps {
  image: {
    url: string;
    description: string;
    ethnic: string;
    location: string;
  };
  onClose: () => void;
}

export const Lightbox = ({ image, onClose }: LightboxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
      onClick={onClose}
    >
      <motion.button 
        onClick={onClose}
        className="absolute top-8 right-8 z-20 text-white/50 hover:text-white transition-colors"
      >
        <X size={40} />
      </motion.button>

      <div className="relative w-full h-full flex flex-col items-center justify-center gap-8" onClick={e => e.stopPropagation()}>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative max-w-5xl w-full aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-zoom-in"
        >
          <img 
            src={image.url} 
            alt={image.description} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl w-full text-center space-y-4"
        >
           <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
                 <Tag size={14} className="text-gold" />
                 Dân tộc {image.ethnic}
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
                 <MapPin size={14} className="text-gold" />
                 {image.location}
              </div>
           </div>
           <h3 className="text-3xl font-bold text-white italic font-display">{image.description}</h3>
        </motion.div>
      </div>
    </motion.div>
  );
};
