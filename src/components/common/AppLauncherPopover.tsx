import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  Users,
  LifeBuoy,
  GraduationCap,
  CreditCard,
  CalendarCheck2,
  FileSpreadsheet,
  X,
} from 'lucide-react';
import { PortalAppItem } from '../../data/portalApps';

interface AppLauncherPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

// Exactly 7 CKB applications matching visily-container (4).png
// Note: Chatbot is excluded because this is accessed from within Chatbot.
const chatbotAppsList: PortalAppItem[] = [
  // Row 1
  { name: 'ERP System', icon: Database, desc: 'Enterprise Resource Planning', route: '/' },
  { name: 'Cash Advance', icon: CreditCard, desc: 'Operational Finance Claims', route: '/' },
  { name: 'FASS Web Booking', icon: CalendarCheck2, desc: 'Fleet & Cargo Booking', route: '/' },
  // Row 2
  { name: 'Report Manager', icon: FileSpreadsheet, desc: 'Analytics & Management Reports', route: '/' },
  { name: 'HRIS System', icon: Users, desc: 'Human Resource Information', route: '/' },
  { name: 'Helpdesk Ticket', icon: LifeBuoy, desc: 'IT & Operational Support', route: '/' },
  // Row 3
  { name: 'Learning Center', icon: GraduationCap, desc: 'Knowledge & Documents', route: '/' },
];

export const AppLauncherPopover: React.FC<AppLauncherPopoverProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handlePointerDown);
    }
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectApp = (app: PortalAppItem) => {
    onClose();
    if (app.route.startsWith('http')) {
      window.open(app.route, '_blank', 'noopener,noreferrer');
    } else {
      navigate(app.route);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-2xs md:hidden"
        onClick={onClose}
      />

      {/* Popover Card matching visily-container (4).png */}
      <div
        ref={popoverRef}
        className="fixed md:absolute z-50 top-16 left-3 right-3 md:right-auto md:left-2 md:w-[360px] bg-white rounded-3xl shadow-2xl border border-gray-100/90 p-6 text-gray-900 animate-in fade-in zoom-in-95 duration-150 select-none"
      >
        {/* Subtle close button */}
        <div className="flex justify-end mb-1 -mt-2 -mr-2">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Columns Grid matching visily-container (4).png */}
        <div className="grid grid-cols-3 gap-y-7 gap-x-3 sm:gap-x-5">
          {chatbotAppsList.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.name}
                onClick={() => handleSelectApp(app)}
                className="flex flex-col items-center text-center group cursor-pointer transition-transform duration-200 hover:-translate-y-1 focus:outline-none"
              >
                {/* Light Mint Squircle Container */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E8F8F2] text-[#006C4E] flex items-center justify-center mb-2 group-hover:bg-[#006C4E] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-2xs">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                </div>

                {/* Pure App Name */}
                <span className="text-xs sm:text-[13px] font-semibold text-gray-800 text-center leading-snug group-hover:text-[#006C4E] transition-colors max-w-[95px]">
                  {app.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
