import React from 'react';
import { ShieldCheck, Target, Handshake, Sparkles, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-20">
      {/* Trust Badges Bar */}
      <div className="max-w-[1520px] mx-auto px-2 sm:px-4 lg:px-5 py-6">
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 sm:gap-4 text-xs font-semibold text-gray-500 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-2 hover:text-[#006C4E] transition-colors">
            <ShieldCheck className="w-4 h-4 text-[#006C4E]" />
            <span>Aman & Terenkripsi</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#006C4E] transition-colors">
            <Target className="w-4 h-4 text-[#006C4E]" />
            <span>Fokus Hasil</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#006C4E] transition-colors">
            <Handshake className="w-4 h-4 text-[#006C4E]" />
            <span>Kemitraan Strategis</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#006C4E] transition-colors">
            <Sparkles className="w-4 h-4 text-[#006C4E]" />
            <span>Inovasi Berkelanjutan</span>
          </div>
          <div className="flex items-center gap-2 hover:text-[#006C4E] transition-colors">
            <Star className="w-4 h-4 text-[#EFB034]" />
            <span>Kualitas Utama</span>
          </div>
        </div>

        {/* Copyright & System Version */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <div>
            PT Cipta Kridha Bahari — Integrated Logistics Services
          </div>
          <div className="font-medium tracking-wide">
            © 2026 CIPTA KRIDHA BAHARI • VERSI 2.0-STABLE
          </div>
        </div>
      </div>
    </footer>
  );
};
