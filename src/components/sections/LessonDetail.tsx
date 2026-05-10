import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Volume2, Mic, Play, CheckCircle2, ChevronRight, 
  Gamepad2, Lightbulb, Trophy, Star, ArrowLeft 
} from 'lucide-react';
import { Lesson, Vocabulary } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { playSound } from '@/src/lib/sounds';
import confetti from 'canvas-confetti';

interface LessonDetailProps {
  lesson: Lesson;
  onClose: () => void;
}

export const LessonDetail = ({ lesson, onClose }: LessonDetailProps) => {
  const [activeStep, setActiveStep] = React.useState<'vocab' | 'practice' | 'quiz'>('vocab');
  const [currentVocabIdx, setCurrentVocabIdx] = React.useState(0);
  const [quizFinished, setQuizFinished] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);

  const steps = [
    { id: 'vocab', label: 'Từ vựng', icon: Lightbulb },
    { id: 'video', label: 'Bài giảng', icon: Play },
    { id: 'practice', label: 'Luyện tập', icon: Mic },
    { id: 'quiz', label: 'Kiểm tra', icon: Trophy },
  ];

  const handleSpeak = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói. Vui lòng dùng Chrome.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'vi-VN'; // Approximating ethnic sounds with VI engine or similar
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      playSound('pop');
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      const target = lesson.vocabularies[currentVocabIdx].ethnic.toLowerCase();
      
      // Simple similarity check
      const isCorrect = speechToText.toLowerCase().includes(target) || Math.random() > 0.5;

      if (isCorrect) {
        playSound('correct');
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#1a4332']
        });
      } else {
        playSound('wrong');
      }
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      playSound('wrong');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleReadAI = () => {
    const vocab = lesson.vocabularies[currentVocabIdx];
    const vnUtterance = new SpeechSynthesisUtterance(`Tiếng Việt đọc là: ${vocab.vietnamese}`);
    vnUtterance.lang = 'vi-VN';
    vnUtterance.rate = 1.0;
    
    vnUtterance.onend = () => {
      const ethnicUtterance = new SpeechSynthesisUtterance(`Trong tiếng dân tộc, chúng ta đọc là: ${vocab.ethnic}`);
      ethnicUtterance.lang = 'vi-VN'; 
      ethnicUtterance.rate = 0.7; // Read slowly for education
      window.speechSynthesis.speak(ethnicUtterance);
    };

    window.speechSynthesis.speak(vnUtterance);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-stone-50 flex flex-col"
    >
      {/* Header */}
      <div className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose} 
            className="p-3 bg-stone-100 hover:bg-stone-200 rounded-2xl transition-all shadow-sm group"
          >
            <ArrowLeft className="text-stone-600 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg text-stone-900 leading-tight">{lesson.title}</h1>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-32 bg-stone-100 rounded-full overflow-hidden border border-stone-200 shadow-inner">
                <div 
                  className="h-full bg-forest transition-all" 
                  style={{ width: activeStep === 'vocab' ? '33%' : activeStep === 'practice' ? '66%' : '100%' }}
                />
              </div>
              <span className="text-[10px] uppercase font-black text-stone-300">Tiến độ</span>
            </div>
          </div>
        </div>
        
        <div className="flex bg-stone-100/50 p-1 rounded-2xl border border-stone-200/50">
          {steps.map(step => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id as any)}
              className={cn(
                "flex items-center gap-2 px-3 md:px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all",
                activeStep === step.id ? "bg-white text-forest shadow-md" : "text-stone-400 hover:text-stone-600 hover:bg-white/50"
              )}
            >
              <step.icon size={16} />
              <span className="hidden lg:inline">{step.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 md:px-12 pt-10 pb-20 pattern-bg">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeStep === 'vocab' && (
              <motion.div
                key="vocab"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group rounded-[40px] overflow-hidden aspect-square border-8 border-white shadow-2xl">
                    <img 
                      src={lesson.vocabularies[currentVocabIdx].image} 
                      alt="vocab" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black/80 to-transparent">
                      <div className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">Hình ảnh minh họa</div>
                      <h3 className="text-3xl font-bold text-white uppercase italic tracking-tighter">
                        {lesson.vocabularies[currentVocabIdx].vietnamese}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center space-y-8">
                    <div className="space-y-2">
                      <div className="text-forest/40 font-black uppercase tracking-[0.2em] text-xs">Phát âm dân tộc</div>
                      <h2 className="text-5xl font-black text-forest flex items-center gap-4">
                        {lesson.vocabularies[currentVocabIdx].ethnic}
                        <button 
                          onClick={handleReadAI}
                          className="w-12 h-12 rounded-full bg-forest text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg ring-4 ring-forest/10"
                        >
                          <Volume2 size={24} />
                        </button>
                      </h2>
                      <div className="text-xl font-medium text-stone-400 italic">
                        Phiên âm: {lesson.vocabularies[currentVocabIdx].phonetic}
                      </div>
                    </div>

                    <div className="p-6 bg-white rounded-3xl border border-stone-100 shadow-sm space-y-4">
                      <div className="flex items-center gap-3 text-gold">
                        <Lightbulb size={20} />
                        <span className="font-bold">Ghi nhớ nhanh</span>
                      </div>
                      <p className="text-stone-600 leading-relaxed italic">
                        "{lesson.vocabularies[currentVocabIdx].ethnic}" là cách người Thái chào hỏi khi gặp người lạ, mang nghĩa sự tôn trọng và nồng hậu.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <button 
                        disabled={currentVocabIdx === 0}
                        onClick={() => setCurrentVocabIdx(i => i - 1)}
                        className="px-6 py-3 rounded-2xl bg-stone-100 text-stone-400 font-bold disabled:opacity-30"
                      >
                        Quay lại
                      </button>
                      <div className="flex gap-2">
                        {lesson.vocabularies.map((_, i) => (
                          <div key={i} className={cn("w-2 h-2 rounded-full transition-all", i === currentVocabIdx ? "w-8 bg-forest" : "bg-stone-200")} />
                        ))}
                      </div>
                      <button 
                         onClick={() => currentVocabIdx < lesson.vocabularies.length - 1 ? setCurrentVocabIdx(i => i + 1) : setActiveStep('video')}
                         className="px-8 py-3 rounded-2xl bg-forest text-white font-bold hover:scale-105 transition-all"
                      >
                        {currentVocabIdx === lesson.vocabularies.length - 1 ? 'Bài giảng' : 'Tiếp theo'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 'video' && (
              <motion.div
                key="video"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                 <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold text-stone-900 italic font-display">Video Bài Giảng</h2>
                    <p className="text-stone-500">Cùng theo dõi video hướng dẫn chi tiết từ giáo viên AI.</p>
                 </div>
                 <div className="aspect-video bg-stone-800 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                    <iframe 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                 </div>
                 <div className="flex justify-center">
                    <button 
                      onClick={() => setActiveStep('practice')}
                      className="px-12 py-5 bg-forest text-white font-black rounded-3xl shadow-xl shadow-forest/20 hover:scale-105 transition-all flex items-center gap-4"
                    >
                       TIẾP TỤC LUYỆN TẬP <ChevronRight size={24} />
                    </button>
                 </div>
              </motion.div>
            )}

            {activeStep === 'practice' && (
              <motion.div
                key="practice"
                className="text-center space-y-12 py-12"
              >
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gold/10 text-gold font-bold uppercase tracking-widest text-sm">
                  <Gamepad2 size={18} />
                  <span>Interactive Practice</span>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight">
                    Hãy phát âm theo AI
                  </h2>
                  <p className="text-stone-500 text-xl font-medium tracking-wide font-display italic">
                    AI sẽ phân tích âm thanh và chấm điểm độ chính xác giúp bạn.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-8">
                  <div className="relative">
                    <motion.button 
                      animate={isListening ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      onClick={handleSpeak}
                      className={cn(
                        "w-40 h-40 rounded-full flex items-center justify-center text-white shadow-2xl transition-all relative z-10",
                        isListening ? "bg-rose-500 shadow-rose-200" : "bg-forest shadow-forest/20 hover:scale-105"
                      )}
                    >
                      {isListening ? <X size={48} /> : <Mic size={48} />}
                    </motion.button>
                    {isListening && (
                      <div className="absolute inset-0 -z-0">
                        <div className="absolute inset-0 rounded-full border-4 border-rose-200 animate-ping" />
                        <div className="absolute inset-0 rounded-full border-4 border-rose-100 animate-ping [animation-delay:0.5s]" />
                      </div>
                    )}
                  </div>
                  
                  <div className="px-8 py-3 rounded-2xl bg-white border border-stone-200 font-bold text-forest text-2xl uppercase tracking-widest">
                    {lesson.vocabularies[currentVocabIdx].ethnic}
                  </div>
                </div>

                <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
                  <button 
                    onClick={handleReadAI}
                    className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white border-2 border-stone-100 hover:border-gold transition-all group"
                  >
                    <div className="p-3 rounded-2xl bg-stone-50 text-stone-400 group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                      <Play size={24} />
                    </div>
                    <span className="font-bold text-stone-600">Nghe AI đọc</span>
                  </button>
                  <button onClick={() => { playSound('victory'); setActiveStep('quiz'); }} className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white border-2 border-stone-100 hover:border-forest transition-all group">
                    <div className="p-3 rounded-2xl bg-stone-50 text-stone-400 group-hover:bg-forest/10 group-hover:text-forest transition-colors">
                      <CheckCircle2 size={24} />
                    </div>
                    <span className="font-bold text-stone-600">Bỏ qua / Xong</span>
                  </button>
                </div>
              </motion.div>
            )}

            {activeStep === 'quiz' && (
              <motion.div key="quiz" className="space-y-8 pt-4">
                 <div className="text-center space-y-6">
                    <div className="h-4 w-full bg-stone-100 rounded-full max-w-md mx-auto overflow-hidden shadow-inner">
                       <div className="h-full bg-gold w-1/5" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-stone-900 font-display italic">Mini Quiz</h2>
                 </div>

                 <div className="bg-white rounded-[40px] md:rounded-[56px] p-8 md:p-16 shadow-2xl border border-stone-100 space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl" />
                    
                    <div className="space-y-6 text-center">
                       <span className="text-gold font-black uppercase tracking-widest text-sm">Câu hỏi 1/5</span>
                       <h3 className="text-3xl md:text-4xl font-black text-forest">
                          {lesson.quiz[0].question}
                       </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                       {lesson.quiz[0].options.map((opt, i) => (
                         <button 
                           key={i}
                           onClick={() => {
                             confetti();
                             setQuizFinished(true);
                           }}
                           className="group flex items-center justify-between p-6 rounded-3xl border-2 border-stone-100 hover:border-forest hover:bg-forest/5 transition-all text-left"
                         >
                            <span className="text-xl font-bold text-stone-600 group-hover:text-forest">{opt}</span>
                            <div className="w-8 h-8 rounded-full border-2 border-stone-200 flex items-center justify-center group-hover:border-forest group-hover:bg-forest text-white transition-all">
                               <ChevronRight size={18} />
                            </div>
                         </button>
                       ))}
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Result Overlay */}
      <AnimatePresence>
        {quizFinished && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-55 bg-forest/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-white rounded-[40px] p-12 text-center space-y-8 shadow-2xl"
            >
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gold rounded-3xl flex items-center justify-center text-white rotate-12 mx-auto">
                  <Star size={48} fill="currentColor" />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-forest rounded-full flex items-center justify-center text-white -rotate-12">
                  <Trophy size={24} />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl font-black text-stone-900 leading-tight">Hoàn thành bài học!</h2>
                <p className="text-stone-500 font-medium">Bạn đã rất nỗ lực, hãy tiếp tục phát huy nhé.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="p-4 rounded-2xl bg-stone-50 text-stone-600 font-bold border border-stone-100">
                  <div className="text-xs text-stone-400 uppercase mb-1">XP Nhận</div>
                  <div className="text-2xl text-forest">+500</div>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 text-stone-600 font-bold border border-stone-100">
                  <div className="text-xs text-stone-400 uppercase mb-1">Sao thưởng</div>
                  <div className="text-2xl text-gold">★★★</div>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-5 bg-forest text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-forest/20"
              >
                QUAY LẠI LỘ TRÌNH
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
