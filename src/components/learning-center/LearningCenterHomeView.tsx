import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Database,
  TrendingUp,
} from 'lucide-react';
import { LearningDocument } from '../../types/learningCenter';
import { InlineChatbotWidget } from '../chatbot/InlineChatbotWidget';

interface LearningCenterHomeViewProps {
  documents: LearningDocument[];
  onNavigateToKM: (filterConfidential?: boolean) => void;
}

export const LearningCenterHomeView: React.FC<LearningCenterHomeViewProps> = ({
  documents,
  onNavigateToKM,
}) => {
  const navigate = useNavigate();
  const confidentialCount = documents.filter((d) => d.isConfidential).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* 1. Simple Hero Greeting matching Visily without card */}
      <div className="pt-2 pb-1">
        <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-bold text-black tracking-tight leading-[1.15] max-w-[1000px] mb-14 sm:mb-16">
          Selamat Datang,
          <br />
          <span className="text-[#006C4E]">Shabuama Palaska</span>
        </h1>
      </div>
      {/* 2. Top Row Grid: Knowledge Management Card + Inline Chatbot Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Knowledge Management Card (Col 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200/80 shadow-2xs overflow-hidden flex flex-col justify-between h-[520px]">
          {/* Visual Header Banner */}
          <div className="h-56 sm:h-64 bg-gradient-to-br from-[#0a2318] via-[#004D36] to-[#006C4E] p-6 relative overflow-hidden flex flex-col justify-between text-white">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute right-6 top-6 opacity-20">
              <BookOpen className="w-28 h-28" />
            </div>

            <div className="flex items-center gap-2.5 z-10">
              <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-xs text-[10px] font-bold tracking-wider uppercase">
                REPOSITORI DOKUMEN
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-400/30 text-[10px] font-bold tracking-wider">
                {documents.length} DOKUMEN
              </span>
            </div>

            <div className="z-10">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Knowledge Management
              </h2>
              <p className="text-xs text-emerald-100/90 mt-1.5 line-clamp-3 leading-relaxed">
                Kelola, cari, dan tinjau seluruh dokumen standard operating procedure (SOP), work instruction, formulir resmi, dan kebijakan operasional CKB Group.
              </p>
            </div>
          </div>

          {/* Card Body & Open Button */}
          <div className="p-6 flex flex-col justify-between gap-4 flex-1">
            <div className="space-y-1">
              <div className="text-xs font-bold text-gray-900">
                Pembaruan Standar Operasional 2026
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                Mencakup standardisasi operasional seluruh entitas PT Cipta Kridha Bahari, Alfa Trans Raya (ATR), dan ABM Investama.
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-gray-100">
              <button
                onClick={() => onNavigateToKM()}
                className="px-6 py-2.5 bg-[#006C4E] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Buka</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Inline Chatbot Widget (Col 7 - Fixed matching height, scrolls internally) */}
        <div className="lg:col-span-7 flex flex-col h-[520px] min-h-0">
          <InlineChatbotWidget
            onMaximize={() => navigate('/chatbot')}
          />
        </div>
      </div>

      {/* 3. Middle Row Grid: Informasi Dokumen Rahasia + Informasi Dokumen Sync */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Left: Informasi Dokumen Rahasia matching Visily */}
        <div className="bg-white rounded-3xl border border-amber-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900">
                  Informasi Dokumen Rahasia
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {confidentialCount} DOKUMEN
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                Terdapat {confidentialCount} dokumen berstatus rahasia yang memiliki otorisasi keamanan terbatas. Pastikan kepatuhan dan kerahasiaan data sesuai kebijakan Information Security CKB Group.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] text-gray-400">
              Otorisasi Akses: BPI Specialist & HR Head
            </span>
            <button
              onClick={() => onNavigateToKM(true)}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Dokumen Rahasia</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card Right: Informasi Dokumen Stats matching Visily */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Informasi Dokumen
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Sinkronisasi Repositori Knowledge Management
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              SINKRON AKTIF
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-[11px] font-bold text-gray-400 uppercase">Total Dokumen</div>
              <div className="text-2xl font-black text-gray-900 mt-1">15.482</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12% dari kuartal lalu
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-[11px] font-bold text-gray-400 uppercase">Pembaruan Hari Ini</div>
              <div className="text-2xl font-black text-emerald-800 mt-1">24 Baru</div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                Terverifikasi Quality Assurance
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
