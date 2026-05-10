import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Search, Bell, Home, Compass, Palette, Languages, User, Zap } from 'lucide-react';
import { Logo, NavItem, BottomNavItem } from '@/src/components/layout/Navigation';
import { cn } from '@/src/lib/utils';

export const Layout = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use framer motion for page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-mist selection:bg-gold selection:text-forest">
      {/* Header */}
      <header className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300 px-6",
        scrolled ? "h-16 bg-white/80 backdrop-blur-md shadow-sm" : "h-20 bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <Logo />
          
          <nav className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-xl p-1 rounded-full border border-white/40 shadow-sm">
            <NavItem to="/" icon={Home} label="Trang chủ" />
            <NavItem to="/learn" icon={Compass} label="Học bài" />
            <NavItem to="/culture" icon={Palette} label="Văn hóa" />
            <NavItem to="/translator" icon={Languages} label="Dịch AI" />
            <NavItem to="/games" icon={Zap} label="Trò chơi" />
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center bg-white/40 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/40 group focus-within:ring-2 focus-within:ring-forest/20 transition-all">
               <Search size={16} className="text-stone-400 group-focus-within:text-forest transition-colors" />
               <input type="text" placeholder="Tìm kiếm di sản..." className="bg-transparent border-none focus:outline-none text-xs ml-2 w-24 lg:w-40" />
            </div>
            <button className="p-2.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 hover:bg-white transition-all relative group">
              <Bell size={20} className="text-stone-600 group-hover:text-forest transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <Link to="/profile" className="hidden md:flex w-10 h-10 rounded-2xl bg-linear-to-br from-forest to-emerald-800 p-0.5 shadow-lg group cursor-pointer overflow-hidden ring-2 ring-white/10">
              <img src="https://i.pravatar.cc/150?u=vuduchanh" alt="user" className="w-full h-full rounded-2xl object-cover group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-0 pb-32 md:pb-12 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40 bg-white/80 backdrop-blur-xl border border-white/30 rounded-[32px] p-2 flex items-center shadow-2xl shadow-stone-900/10">
        <BottomNavItem to="/" icon={Home} label="Nhà" />
        <BottomNavItem to="/learn" icon={Compass} label="Học" />
        <div className="flex-1 -mt-8 flex justify-center">
          <Link 
            to="/games"
            className="w-16 h-16 rounded-full bg-forest text-white shadow-xl shadow-forest/30 flex items-center justify-center border-4 border-mist hover:scale-110 active:scale-95 transition-all"
          >
            <Zap fill="currentColor" size={28} />
          </Link>
        </div>
        <BottomNavItem to="/culture" icon={Palette} label="Văn hóa" />
        <BottomNavItem to="/profile" icon={User} label="Tôi" />
      </div>

      <footer className="hidden md:block py-12 px-6 border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo />
          <nav className="flex items-center gap-8 text-stone-500 font-medium text-sm tracking-wide uppercase">
            <Link to="/history" className="hover:text-forest transition-colors">Lịch sử</Link>
            <Link to="/translator" className="hover:text-forest transition-colors">Dịch AI</Link>
            <Link to="/culture" className="hover:text-forest transition-colors">Văn hóa</Link>
            <Link to="/games" className="hover:text-forest transition-colors">Trò chơi</Link>
          </nav>
          <div className="text-stone-400 text-xs font-bold uppercase tracking-widest">Bản quyền thuộc Vũ Đức Hạnh@2015</div>
        </div>
      </footer>
    </div>
  );
};
