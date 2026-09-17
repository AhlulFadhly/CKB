import React from 'react';

export const LearningCenterFooter: React.FC = () => {
  return (
    <footer className="mt-auto pt-8 pb-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs select-none bg-transparent">
      {/* Left: System Status Badges matching Visily */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-2xs text-[11px] font-bold text-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>API GATEWAY: ONLINE</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-2xs text-[11px] font-bold text-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>DATABASE: TERHUBUNG</span>
        </div>
      </div>

      {/* Right: Copyright & Version matching Visily */}
      <div className="text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
        &copy; 2026 CIPTA KRIDHA BAHARI &bull; VERSI 2.0-STABLE
      </div>
    </footer>
  );
};
