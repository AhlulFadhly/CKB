import React, { useState } from 'react';
import {
  Plus,
  Folder,
  Star,
  Bot,
  ChevronRight,
  LogOut,
  LayoutGrid,
  ArrowLeft,
} from 'lucide-react';
import { ChatProject, RecentHistoryItem } from '../../types/chatbot';
import { useNavigate } from 'react-router-dom';
import { AppLauncherPopover } from '../common/AppLauncherPopover';

interface ChatSidebarProps {
  currentView: 'chat' | 'project-list' | 'project-detail';
  projects: ChatProject[];
  recentHistory: RecentHistoryItem[];
  activeChatId: string | null;
  activeProjectId: string | null;
  onNewChat: () => void;
  onSelectHistory: (item: RecentHistoryItem) => void;
  onOpenProjectsList: () => void;
  onSelectProject: (project: ChatProject) => void;
  onToggleStar: (projectId: string, e: React.MouseEvent) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  currentView,
  projects,
  recentHistory,
  activeChatId,
  activeProjectId,
  onNewChat,
  onSelectHistory,
  onOpenProjectsList,
  onSelectProject,
  onToggleStar,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navigate = useNavigate();
  const [isAppLauncherOpen, setIsAppLauncherOpen] = useState(false);
  const starredProjects = projects.filter((p) => p.isStarred);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container matching visily-chatbot-2.png */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 lg:w-72 bg-[#1D2128] text-gray-200 flex flex-col h-full border-r border-gray-800/80 transition-transform duration-300 ease-in-out select-none ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Branding Bar */}
        <div className="h-20 sm:h-24 px-4 sm:p-5 flex items-center justify-between border-b border-gray-800/80 relative shrink-0">
          {/* 1. Bot Logo Only (Solid bg-[#006C4E], non-clickable, no text) */}
          <div
            className="w-9 h-9 rounded-xl bg-[#006C4E] flex items-center justify-center text-white shadow-xs select-none"
            title="CKB Assistant"
          >
            <Bot className="w-5 h-5 text-white" />
          </div>

          {/* 2. Action Buttons Group: Aplikasi CKB & Kembali ke Portal */}
          <div className="flex items-center gap-1.5">
            {/* Aplikasi CKB Launcher Button */}
            <button
              onClick={() => setIsAppLauncherOpen(!isAppLauncherOpen)}
              className={`p-2 rounded-xl transition-colors cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 ${
                isAppLauncherOpen ? 'bg-gray-800 text-white' : ''
              }`}
              title="Aplikasi CKB"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            {/* Kembali ke Portal Button */}
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl transition-colors cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800"
              title="Kembali ke Beranda Portal"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Reusable Popover Launcher for CKB Applications */}
          <AppLauncherPopover
            isOpen={isAppLauncherOpen}
            onClose={() => setIsAppLauncherOpen(false)}
          />
        </div>

        {/* Action Button: "Chat Baru" */}
        <div className="p-3.5 sm:p-4">
          <button
            onClick={() => {
              onNewChat();
              if (isOpenMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-[#282D36] hover:bg-[#323843] active:bg-[#383F4C] border border-gray-700/60 text-white text-sm font-semibold shadow-xs transition-all cursor-pointer group"
          >
            <Plus className="w-4 h-4 text-emerald-400 group-hover:rotate-90 transition-transform duration-200" />
            <span>Chat Baru</span>
          </button>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 space-y-5 scrollbar-thin scrollbar-thumb-gray-700">
          {/* Project Section */}
          <div>
            <div
              onClick={() => {
                onOpenProjectsList();
                if (isOpenMobile) onCloseMobile();
              }}
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors group ${
                currentView === 'project-list'
                  ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                  : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider">
                <Folder className="w-4 h-4 text-white" />
                <span>Project</span>
              </div>
              <span className="text-[11px] text-gray-400 group-hover:text-white flex items-center gap-0.5">
                <span>{projects.length}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Starred Projects List */}
            <div className="mt-1 space-y-0.5 pl-2">
              {starredProjects.map((project) => {
                const isSelected =
                  currentView === 'project-detail' && activeProjectId === project.id;
                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      onSelectProject(project);
                      if (isOpenMobile) onCloseMobile();
                    }}
                    className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#282D36] text-white font-semibold pl-2.5'
                        : 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
                    }`}
                  >
                    <span className="truncate pr-2">{project.name}</span>
                    <button
                      type="button"
                      onClick={(e) => onToggleStar(project.id, e)}
                      className="text-white hover:scale-110 transition-transform p-0.5"
                      title="Hapus Bintang"
                    >
                      <Star className="w-3.5 h-3.5 text-white fill-white" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terkini (Recent Chat History) Section */}
          <div>
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Terkini
            </div>
            <div className="mt-1.5 space-y-1">
              {recentHistory.map((item) => {
                const isActive =
                  currentView === 'chat' && activeChatId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectHistory(item);
                      if (isOpenMobile) onCloseMobile();
                    }}
                    className={`group flex flex-col px-3 py-2.5 rounded-xl text-xs cursor-pointer transition-all ${
                      isActive
                        ? 'bg-[#282D36] text-white font-medium'
                        : 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
                    }`}
                  >
                    <span className="truncate text-gray-200 group-hover:text-white">
                      {item.title}
                    </span>
                    {item.timestamp && (
                      <span className="text-[10px] text-gray-400 mt-0.5 truncate">
                        {item.timestamp}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom User Profile matching visily-chatbot-2.png */}
        <div className="p-3.5 border-t border-gray-800/80 bg-[#171A20]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              {/* Initials Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                SP
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-white truncate">
                  Shabuama Palaska
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  Staff Operasional CKB
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem('ckb_auth');
                navigate('/login');
              }}
              title="Keluar"
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
