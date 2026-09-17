import React, { useEffect } from 'react';
import { X, Play, Film, Clock } from 'lucide-react';
import { VideoItem } from '../../types/video';

export interface VideoPlayerModalProps {
  isOpen: boolean;
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  video,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1D2128] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-gray-700/80 flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-4 sm:px-6 sm:py-4 flex items-center justify-between border-b border-gray-700/80 text-white select-none">
          <div className="flex items-center gap-2.5 truncate max-w-[85%]">
            <Film className="w-5 h-5 text-[#006C4E] shrink-0" />
            <h4 className="font-bold text-sm sm:text-base truncate">
              {video.title}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Tutup pemutar video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display Area with Thumbnail Background */}
        <div
          className="relative aspect-video bg-black flex flex-col items-center justify-center text-white p-6 sm:p-8 bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: `url('${video.thumbnail || '/assets/ckb-background-login.png'}')`,
          }}
        >
          {/* Dark Overlay & Subtle Blur */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

          {/* Interactive Play Button */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#006C4E] hover:bg-[#00553d] text-white flex items-center justify-center mb-4 shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5 group-hover:scale-105 transition-transform" />
            </div>

            {/* Video Title */}
            <h3 className="text-base sm:text-xl font-bold mb-2 max-w-md sm:max-w-lg text-center leading-snug drop-shadow-sm">
              {video.title}
            </h3>

            {/* Badges: Category & Duration */}
            <div className="flex items-center gap-2.5 mt-1 text-xs text-gray-300">
              <span className="px-2.5 py-0.5 bg-[#006C4E]/60 text-emerald-200 font-semibold rounded-md uppercase tracking-wider text-[11px]">
                {video.category || 'Dokumentasi'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>Durasi: {video.duration || '05:00'}</span>
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Dokumentasi Resmi PT Cipta Kridha Bahari • Kualitas Full HD
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-6 bg-slate-900/90 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Status: Video Siap Diputar</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white font-semibold rounded-lg transition-colors cursor-pointer text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
