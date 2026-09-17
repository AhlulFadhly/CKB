import React from 'react';
import { LayoutGrid, BookOpen, LogOut, Box, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LearningCenterSidebarProps {
  currentView: 'home' | 'knowledge-management' | 'upload';
  onNavigateView: (view: 'home' | 'knowledge-management') => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const LearningCenterSidebar: React.FC<LearningCenterSidebarProps> = ({
  currentView,
  onNavigateView,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navigate = useNavigate();

  const handleItemClick = (view: 'home' | 'knowledge-management') => {
    onNavigateView(view);
    if (isOpenMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar matching visily-learning-center-home-page.png */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 lg:w-72 bg-[#1D2128] text-gray-200 flex flex-col h-full border-r border-gray-800/80 transition-transform duration-300 ease-in-out select-none ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Branding Bar */}
        <div className="p-5 sm:p-6 border-b border-gray-800/80 flex flex-col gap-4 relative">
          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="md:hidden absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 z-10"
            title="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* CKB Official Logo from Assets - Bigger & Centered */}
          <div className="flex items-center justify-center w-full pt-1">
            <div className="bg-white/95 px-5 py-3 rounded-2xl shadow-sm flex items-center justify-center w-full">
              <img
                src="/assets/logo-ckb.svg"
                alt="CKB Logistics Logo"
                className="h-12 sm:h-14 w-auto max-w-[190px] object-contain"
              />
            </div>
          </div>

          {/* Portal & Module Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#006C4E] text-white flex items-center justify-center shadow-xs shrink-0">
              <Box className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white tracking-wide leading-tight">
                CKB Portal
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                LEARNING CENTER
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu Links matching Visily */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {/* 1. Halaman Utama */}
          <button
            onClick={() => handleItemClick('home')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left ${
              currentView === 'home'
                ? 'bg-[#006C4E] text-white shadow-sm'
                : 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
            <span>Halaman Utama</span>
          </button>

          {/* 2. Knowledge Management */}
          <button
            onClick={() => handleItemClick('knowledge-management')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer text-left ${
              currentView === 'knowledge-management' || currentView === 'upload'
                ? 'bg-[#006C4E] text-white shadow-sm'
                : 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Knowledge Management</span>
          </button>
        </nav>

        {/* Footer: Keluar Portal */}
        <div className="p-4 border-t border-gray-800/80">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:text-red-400 hover:bg-gray-800/80 transition-all cursor-pointer"
            title="Kembali ke Beranda Portal"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
};
