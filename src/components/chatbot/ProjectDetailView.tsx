import React, { useState } from 'react';
import {
  Folder,
  Star,
  SendHorizontal,
  Paperclip,
  Mic,
  Sparkles,
} from 'lucide-react';
import { ChatProject, ChatMessage } from '../../types/chatbot';

interface ProjectDetailViewProps {
  project: ChatProject;
  onToggleStar: (projectId: string, e: React.MouseEvent) => void;
  onOpenMobileSidebar?: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onToggleStar,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'proj-msg-01',
      sender: 'assistant',
      text: `Selamat datang di workspace project "${project.name}". Anda dapat mendiskusikan rencana, membuat draft dokumen, atau mengeksplorasi ide menggunakan prompt rekomendasi di bawah.`,
      timestamp: 'Baru saja',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate smart AI response for project
    setTimeout(() => {
      let reply = `Terkait "${text}" dalam project ${project.name}, berikut analisis dan rekomendasi operasional dari basis data CKB Logistics:`;

      if (text.toLowerCase().includes('aransemen') || text.toLowerCase().includes('jingle')) {
        reply = `Rekomendasi Aransemen Jingle CKB Logistics:\n\n1. Tempo: Medium-Upbeat (116 BPM) yang menggambarkan akselerasi dan efisiensi logistik.\n2. Instrumen Utama: Akustik dipadu synth modern bernuansa korporat dinamis.\n3. Hook Melodi: Nada 4 ketukan yang catchy dan mudah diingat karyawan serta klien eksternal saat event korporat.`;
      } else if (text.toLowerCase().includes('lirik')) {
        reply = `Draft Lirik Jingle CKB:\n\n(Bait 1)\nMenembus batas samudra dan daratan luas,\nCipta Kridha Bahari melayani dengan tulus dan tangkas.\nMenjaga amanah kargo setiap detak waktu,\nMenuju masa depan Indonesia yang satu!`;
      } else if (text.toLowerCase().includes('leakage') || text.toLowerCase().includes('invoice') || text.toLowerCase().includes('biaya')) {
        reply = `Laporan Audit Awal ${project.name}:\n\n- Ditemukan selisih tarif BBM rute Trans-Kalimantan sebesar 4.2% dibanding baseline Ramco.\n- Rekomendasi: Lakukan rekonsiliasi PO dan GRN pada modul Finance Ramco sebelum batas akhir penutupan buku bulan ini.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-hidden select-none">
      {/* Scrollable Project Workspace matching visily-chatbot-5.png */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-6 space-y-6">
        <div className="w-full space-y-6">
          {/* Top Bar inside content: Pure Folder Icon + Title + Star (Back button removed) */}
          <div className="flex items-center justify-between gap-4 pb-2 border-b border-gray-200/60">
            <div className="flex items-center gap-3 truncate">
              <Folder className="w-6 h-6 text-gray-700 stroke-[1.75] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                {project.name}
              </h2>
            </div>

            {/* Favorite Star Button */}
            <button
              onClick={(e) => onToggleStar(project.id, e)}
              className="p-2 text-gray-400 hover:text-amber-500 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              title={project.isStarred ? 'Hapus Bintang' : 'Tandai Berbintang'}
            >
              <Star
                className={`w-5 h-5 ${
                  project.isStarred
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          </div>

          {/* Project Description Info Box if present */}
          {project.description && (
            <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#006C4E] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ringkasan Project</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {/* Prompt Suggestions List matching visily-chatbot-5.png */}
          {project.promptSuggestions && project.promptSuggestions.length > 0 && (
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Terbaru
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5">
                {project.promptSuggestions.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-gray-800 hover:text-[#006C4E] border border-gray-200 hover:border-[#006C4E]/40 text-xs sm:text-sm font-medium shadow-2xs transition-all flex items-center gap-2 cursor-pointer text-left"
                  >
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Thread (Edge-aligned, no avatars) */}
          <div className="space-y-5 pt-2">
            {messages.map((msg) => (
              <div key={msg.id} className="w-full">
                {msg.sender === 'assistant' ? (
                  <div className="flex flex-col items-start max-w-2xl">
                    <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-2xs whitespace-pre-line">
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-gray-400 mt-1.5 px-2">
                      {msg.timestamp}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-end w-full">
                    <div className="bg-[#006C4E] text-white rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-2xs max-w-2xl whitespace-pre-line">
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-gray-400 mt-1.5 px-2 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-2xs flex items-center gap-2 text-xs text-gray-500">
                  <span>CKB Assistant sedang menganalisis project...</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Form at Bottom matching visily-chatbot-5.png */}
      <div className="bg-white border-t border-gray-200 px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="w-full flex items-center gap-2 bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:border-[#006C4E] focus-within:ring-2 focus-within:ring-[#006C4E]/20 transition-all shadow-xs"
        >
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-xl transition-colors cursor-pointer"
            title="Lampirkan Dokumen"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ketik pertanyaan Anda di sini..."
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none px-2"
          />

          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-xl transition-colors cursor-pointer hidden sm:block"
            title="Gunakan Suara"
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="w-9 h-9 rounded-full bg-[#006C4E] hover:bg-[#00553D] active:bg-[#004531] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-xs transition-all cursor-pointer shrink-0"
          >
            <SendHorizontal className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
