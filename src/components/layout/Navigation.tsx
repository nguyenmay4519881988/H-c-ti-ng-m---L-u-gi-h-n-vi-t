import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Star, Award, Zap, Languages, Music, Compass, User, Search, Menu, X, Mic, Play, ArrowRight, Home, Layout, History, Palette, Gamepad2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Logo = () => (
  <Link to="/" className="flex items-center gap-2 group cursor-pointer">
    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-forest to-terracotta flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
      <Zap size={24} fill="currentColor" />
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-xl tracking-tight leading-none text-forest">HỒN VIỆT</span>
      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-terracotta">Học tiếng dân tộc</span>
    </div>
  </Link>
);

export const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const active = location.pathname === to;
  
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium",
        active ? "bg-forest text-white" : "text-stone-600 hover:bg-stone-100"
      )}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  );
};

export const BottomNavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link 
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 flex-1 py-1 transition-all",
        active ? "text-forest" : "text-stone-400"
      )}
    >
      <div className={cn("p-1 rounded-xl", active && "bg-forest/10")}>
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
};
