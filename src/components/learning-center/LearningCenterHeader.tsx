import React from 'react';
import { Bell, Menu, ChevronRight } from 'lucide-react';

interface LearningCenterHeaderProps {
  breadcrumbs: string[];
  onOpenMobileSidebar: () => void;
}

export const LearningCenterHeader: React.FC<LearningCenterHeaderProps> = ({
  breadcrumbs,
  onOpenMobileSidebar,
}) => {
  return (
    <header
      className="h-20 sm:h-24 border-b border-gray-200/60 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs select-none transition-colors absolute top-0 left-0 right-0 z-30 bg-[#FFFFFF]/60 backdrop-blur-[8px]"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Left: Mobile hamburger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          title="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium text-gray-500">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-4 h-4 mx-1.5 text-gray-400 shrink-0" />}
                <span
                  className={
                    isLast
                      ? 'text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-xs'
                      : 'hover:text-gray-700 transition-colors hidden sm:inline'
                  }
                >
                  {crumb}
                </span>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Right: User Profile & Notification (Notification on right of avatar) */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* User Card */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right leading-tight">
            <div className="text-xs sm:text-sm font-bold text-gray-900">
              Shabuama Palaska
            </div>
            <div className="text-[10px] sm:text-xs font-normal text-gray-500 tracking-wide mt-0.5">
              Business Process Improvement
            </div>
          </div>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs sm:text-sm border-2 border-white shadow-xs select-none shrink-0">
            SP
          </div>
        </div>

        {/* Subtle Divider */}
        <div className="h-6 sm:h-7 w-px bg-gray-200 mx-0.5"></div>

        {/* Notification Bell (Sebelah kanan avatar) */}
        <button
          className="relative p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          title="Notifikasi"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
};
