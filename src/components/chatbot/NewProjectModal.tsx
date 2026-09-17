import React, { useState } from 'react';
import { X, Lightbulb, Sparkles } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (projectName: string) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) {
      setError('Silakan masukkan nama project.');
      return;
    }
    onCreateProject(projectName.trim());
    setProjectName('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs transition-opacity select-none">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header matching visily-chatbot-4-2.png */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Buat Project Baru</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-3 space-y-4">
          {/* Project Name Field */}
          <div>
            <label
              htmlFor="project-name-input"
              className="block text-xs font-semibold text-gray-600 mb-2"
            >
              Nama Project
            </label>
            <div className="relative">
              <Sparkles className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="project-name-input"
                type="text"
                autoFocus
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Ketik nama project di sini..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#006C4E] focus:ring-1 focus:ring-[#006C4E] text-gray-900 text-sm placeholder-gray-400 transition-all shadow-2xs"
              />
            </div>
            {error && <p className="mt-1.5 text-xs text-red-600 font-medium">{error}</p>}
          </div>

          {/* Lightbulb Info Callout matching visily-chatbot-4-2.png */}
          <div className="bg-gray-50/90 border border-gray-100 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-gray-500 leading-relaxed">
            <Lightbulb className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <p>
              Projects akan menyimpan percakapan, file, dan instruksi khusus dalam satu tempat. Gunakan fitur ini apabila ingin membuat suatu percakapan akan satu topik yang berkelanjutan
            </p>
          </div>

          {/* Action Button: Rounded-full Buat Project Button matching visily-chatbot-4-2.png */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={!projectName.trim()}
              className="px-7 py-2.5 rounded-full bg-[#006C4E] hover:bg-[#00553D] active:bg-[#004531] disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold text-white shadow-xs transition-all cursor-pointer"
            >
              Buat Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
