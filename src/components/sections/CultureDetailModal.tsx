import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Share2, Heart, Info, Camera, MapPin, Music, Utensils, Shirt, Home, Volume2 } from 'lucide-react';
import { CultureDetail } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { playSound } from '@/src/lib/sounds';

interface CultureDetailModalProps {
  item: CultureDetail;
  onClose: () => void;
}

export const CultureDetailModal = ({ item, onClose }: CultureDetailModalProps) => {
  const [activeTab, setActiveTab] = React.useState<'info' | 'gallery' | 'video'>('info');
  const [isReading, setIsReading] = React.useState(false);

  const handleRead = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    playSound('pop');
    // Phase 1: Vietnamese Introduction
    const vnIntro = `Đây là nội dung giới thiệu về ${item.title}. ${item.subtitle}. ${item.description}. Nguồn gốc của nó từ ${item.content.origin}. Về ý nghĩa: ${item.content.meaning}.`;
    const vnUtterance = new SpeechSynthesisUtterance(vnIntro);
    vnUtterance.lang = 'vi-VN';
    vnUtterance.rate = 1.0;
    
    vnUtterance.onstart = () => setIsReading(true);
    
    vnUtterance.onend = () => {
      // Phase 2: Ethnic Language Transition
      if (item.ethnicTitle || item.phoneticEthnicTitle) {
        const transition = `Trong tiếng dân tộc ${item.ethnic}, ${item.title} được gọi là: `;
        const transUtterance = new SpeechSynthesisUtterance(transition);
        transUtterance.lang = 'vi-VN';
        transUtterance.rate = 0.9;

        transUtterance.onend = () => {
           // Phase 3: Speak the ethnic name slowly
           const ethnicName = item.phoneticEthnicTitle || item.ethnicTitle;
           const finalUtterance = new SpeechSynthesisUtterance(ethnicName);
           finalUtterance.lang = 'vi-VN'; 
           finalUtterance.rate = 0.6; 
           finalUtterance.pitch = 1.1;
           
           finalUtterance.onend = () => setIsReading(false);
           window.speechSynthesis.speak(finalUtterance);
        };

        window.speechSynthesis.speak(transUtterance);
      } else {
        setIsReading(false);
      }
    };
    
    vnUtterance.onerror = () => setIsReading(false);
    window.speechSynthesis.speak(vnUtterance);
  };

  React.useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const icons: Record<string, any> = {
    fashion: Shirt,
    food: Utensils,
    music: Music,
    fest: Camera,
    arch: Home,
  };

  const CategoryIcon = icons[item.category] || Info;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-55 flex flex-col bg-stone-900/90 backdrop-blur-xl"
    >
      {/* Fixed Header */}
      <div className="h-16 md:h-20 w-full flex items-center justify-between px-6 md:px-12 bg-white/10 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <button 
          onClick={onClose}
          className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all text-white backdrop-blur-sm shadow-xl flex items-center gap-2"
        >
          <X size={24} />
          <span className="hidden sm:inline font-black text-sm">THOÁT</span>
        </button>
        <div className="flex items-center gap-4">
           <div className="px-4 py-2 bg-gold/20 rounded-xl flex items-center gap-2 text-gold font-black text-sm">
              <MapPin size={16} />
              <span>DI SẢN {item.ethnic.toUpperCase()}</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-4 md:pt-10 pb-20 px-4 md:px-8">
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white w-full max-w-6xl mx-auto rounded-[48px] overflow-hidden shadow-2xl relative"
        >
          <div className="grid lg:grid-cols-2">
            {/* Hero Side */}
            <div className="relative h-[300px] md:h-[500px] lg:h-auto group">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="px-4 py-1.5 bg-gold text-forest font-black rounded-full text-[10px] uppercase tracking-widest shadow-lg">
                    Dân tộc {item.ethnic}
                  </div>
                  <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {item.category}
                  </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white italic font-display leading-tight">{item.title}</h2>
                <p className="text-white/80 text-lg md:text-xl font-medium italic">{item.subtitle}</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex flex-col bg-white">
              <div className="p-6 md:p-12 space-y-10">
                {/* Navigation Tabs */}
                <div className="flex gap-2 p-1.5 bg-stone-100 rounded-2xl w-fit border border-stone-200">
                  <TabButton active={activeTab === 'info'} onClick={() => setActiveTab('info')} icon={Info} label="Thông tin" />
                  {item.gallery && <TabButton active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={Camera} label="Hình ảnh" />}
                  {item.videoUrl && <TabButton active={activeTab === 'video'} onClick={() => setActiveTab('video')} icon={Play} label="Video" />}
                </div>

                <div className="min-h-[300px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'info' && (
                      <motion.div
                        key="info"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-10"
                      >
                        <div className="space-y-4">
                          <h3 className="text-2xl font-black text-stone-900 flex items-center gap-3 italic">
                            <CategoryIcon className="text-forest" size={28} />
                            Bản sắc trường tồn
                          </h3>
                          <p className="text-stone-600 leading-relaxed text-lg font-medium">
                            {item.description}
                          </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <InfoCard title="Nguồn gốc" content={item.content.origin} />
                          <InfoCard title="Ý nghĩa" content={item.content.meaning} />
                        </div>

                        {item.content.features && (
                          <div className="p-8 bg-forest/5 rounded-[32px] border border-forest/10 space-y-6">
                            <h4 className="font-black text-forest uppercase tracking-[0.2em] text-[10px]">Đặc điểm văn hóa</h4>
                            <ul className="grid sm:grid-cols-2 gap-4">
                              {item.content.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-3 text-stone-700 font-bold leading-snug">
                                  <div className="w-2 h-2 mt-2 bg-gold rounded-full shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {item.gallery && activeTab === 'gallery' && (
                      <motion.div
                        key="gallery"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="grid grid-cols-2 gap-4"
                      >
                        {item.gallery.map((img, i) => (
                          <div key={i} className="aspect-square rounded-[32px] overflow-hidden shadow-xl border-4 border-stone-50 group">
                            <img src={img} alt="gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {item.videoUrl && activeTab === 'video' && (
                      <motion.div
                        key="video"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="aspect-video bg-stone-100 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl"
                      >
                        <iframe 
                          src={item.videoUrl} 
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="pt-10 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex gap-4">
                     <button className="w-14 h-14 rounded-2xl bg-stone-50 text-stone-400 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm flex items-center justify-center">
                        <Heart size={24} />
                     </button>
                     <button className="w-14 h-14 rounded-2xl bg-stone-50 text-stone-400 hover:bg-forest/10 hover:text-forest transition-all shadow-sm flex items-center justify-center">
                        <Share2 size={24} />
                     </button>
                  </div>
                  <button 
                    onClick={handleRead}
                    className={cn(
                      "w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-4",
                      isReading ? "bg-rose-500 text-white shadow-rose-200" : "bg-stone-900 text-white shadow-stone-900/20 hover:bg-forest"
                    )}
                  >
                     <Volume2 className={cn(isReading && "animate-pulse")} />
                     {isReading ? 'DỪNG ĐỌC AI' : 'NGHE AI GIỚI THIỆU'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
      active ? "bg-white text-forest shadow-sm" : "text-stone-400 hover:text-stone-600"
    )}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

const InfoCard = ({ title, content }: any) => (
  <div className="p-6 bg-white border border-stone-100 rounded-3xl shadow-xs">
    <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">{title}</div>
    <div className="text-stone-800 font-medium leading-relaxed">{content}</div>
  </div>
);
