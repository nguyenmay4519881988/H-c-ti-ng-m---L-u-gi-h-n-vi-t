import React from 'react';
import { Hero } from '@/src/components/sections/Hero';
import { CultureGallery } from '@/src/components/sections/CultureGallery';
import { LessonGrid } from '@/src/components/sections/LessonGrid';
import { AITranslator } from '@/src/components/sections/AITranslator';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, BookOpen, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="space-y-0">
      <Hero />
      
      {/* Quick Access Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            to="/learn"
            icon={BookOpen}
            title="Lộ trình học tập"
            desc="Học tiếng Thái, Mông, Khơ Mú với giáo án chuẩn 5 cấp độ."
            color="bg-emerald-500"
          />
          <FeatureCard 
            to="/culture"
            icon={Globe}
            title="Khám phá văn hóa"
            desc="Kho tàng di sản, phong tục và lễ hội đặc sắc vùng cao."
            color="bg-terracotta"
          />
          <FeatureCard 
            to="/translator"
            icon={Sparkles}
            title="Thông dịch viên AI"
            desc="Dịch thuật thông minh tích hợp giọng đọc bản xứ."
            color="bg-gold"
          />
        </div>
      </section>

      <LessonGrid />
      
      <section className="bg-stone-900 py-24 px-6 overflow-hidden relative">
        <div className="absolute inset-0 pattern-bg opacity-5" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Lưu giữ <span className="text-gold">di sản</span> <br />
              cho thế hệ mai sau
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed">
              Dự án "Hồn Việt" không chỉ là một ứng dụng học tập, mà là một nhịp cầu nối liền quá khứ và tương lai, giúp thế hệ trẻ tiếp cận và trân trọng những giá trị văn hóa tinh thần vô giá của dân tộc mình.
            </p>
            <div className="flex gap-4">
               <Link to="/history" className="px-8 py-4 bg-white text-stone-900 rounded-2xl font-bold hover:scale-105 transition-all">
                  Tìm hiểu lịch sử
               </Link>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800">
               <img src="https://images.unsplash.com/photo-1508913922359-8386c1236811?auto=format&fit=crop&q=80&w=1200" alt="Culture" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-6 -left-6 p-6 glass rounded-2xl shadow-xl max-w-xs">
                <blockquote className="text-stone-800 italic font-medium">
                  "Tiếng nói còn, dân tộc còn. Văn hóa mất, tâm hồn mất."
                </blockquote>
             </div>
          </div>
        </div>
      </section>

      <AITranslator />
      <CultureGallery />
    </div>
  );
};

const FeatureCard = ({ to, icon: Icon, title, desc, color }: any) => (
  <Link to={to} className="group p-10 bg-white rounded-[40px] border border-stone-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2">
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-bold text-stone-900 mb-3">{title}</h3>
    <p className="text-stone-500 mb-6 leading-relaxed">{desc}</p>
    <div className="flex items-center gap-2 text-forest font-bold group-hover:gap-4 transition-all">
      <span>Khám phá ngay</span>
      <ArrowRight size={18} />
    </div>
  </Link>
);
