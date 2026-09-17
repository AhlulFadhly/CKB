import React, { useState, useMemo } from 'react';
import { Folder, Plus, Search, Star } from 'lucide-react';
import { ChatProject } from '../../types/chatbot';

interface ProjectViewProps {
  projects: ChatProject[];
  onSelectProject: (project: ChatProject) => void;
  onOpenNewProjectModal: () => void;
  onToggleStar?: (projectId: string, e: React.MouseEvent) => void;
  onOpenMobileSidebar?: () => void;
}

export const ProjectView: React.FC<ProjectViewProps> = ({
  projects,
  onSelectProject,
  onOpenNewProjectModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const query = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
    );
  }, [projects, searchQuery]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto select-none">
      {/* Full-width Internal Content Area matching visily-chatbot-4-1.png */}
      <div className="pt-24 sm:pt-28 pb-6 px-6 sm:px-10 lg:px-12 w-full flex-1 flex flex-col">
        {/* Top Header Row inside content area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-700 uppercase tracking-tight">
            JUDUL PROJECT
          </h2>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-48 sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Project Anda"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-[#006C4E] text-xs sm:text-sm text-gray-800 placeholder-gray-400 shadow-2xs transition-all"
              />
            </div>

            {/* "+ Baru" Button */}
            <button
              onClick={onOpenNewProjectModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2B675A] hover:bg-[#006C4E] active:bg-[#00553D] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Baru</span>
            </button>
          </div>
        </div>

        {/* Project List Items (Full width) matching visily-chatbot-4-1.png */}
        <div className="space-y-4 sm:space-y-5 flex-1">
          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center text-gray-400 bg-white rounded-2xl border border-gray-100 p-8">
              <Folder className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="font-medium text-gray-600">Tidak ada project yang cocok</p>
              <p className="text-xs mt-1">Coba kata kunci lain atau buat project baru.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 hover:bg-white border border-transparent hover:border-gray-200/80 hover:shadow-xs transition-all cursor-pointer group"
              >
                {/* Folder Outline Icon Box */}
                <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200/80 text-gray-600 flex items-center justify-center shrink-0 group-hover:text-[#006C4E] group-hover:border-[#006C4E]/40 transition-colors">
                  <Folder className="w-5 h-5 stroke-[1.5]" />
                </div>

                {/* Project Details */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#006C4E] transition-colors truncate">
                    {project.name}
                  </h3>
                  {project.isStarred && (
                    <div className="flex items-center gap-1 mt-0.5 text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                      <Star className="w-3 h-3 text-blue-600 fill-blue-600" />
                      <span>STARRED</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info matching visily-chatbot-4-1.png */}
        <div className="mt-10 pt-6 border-t border-gray-200/60 flex items-center gap-3 text-xs text-gray-400">
          <span className="px-3 py-1 rounded-full bg-gray-200/70 text-gray-700 font-medium">
            {projects.length} Project Tersimpan
          </span>
          <span>Diperbaharui 2 menit yang lalu</span>
        </div>
      </div>
    </div>
  );
};
