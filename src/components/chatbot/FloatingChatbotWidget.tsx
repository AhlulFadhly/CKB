import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Maximize2,
  X,
  SendHorizontal,
  FileText,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useChatbotPanel } from '../../context/ChatbotPanelContext';
import { mockDefaultDocument } from '../../data/mockChatbotData';
import { DocumentReference } from '../../types/chatbot';

interface MinimizedMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  referencedDoc?: DocumentReference;
}

export const FloatingChatbotWidget: React.FC = () => {
  const navigate = useNavigate();
  const { isPanelOpen, closePanel } = useChatbotPanel();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<MinimizedMessage[]>([
    {
      id: 'mini-welcome',
      sender: 'assistant',
      text: 'Selamat datang di CKB Portal Assistant. Saya siap membantu Anda dalam mencari dokumen, jobaid, atau pertanyaan seputar Cipta Kridha Bahari!',
      timestamp: '15:00 WIB',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (isPanelOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isPanelOpen, isTyping]);

  if (!isPanelOpen) {
    // No standalone floating button per instruction: "Tanya CKB Assistant di hapus"
    return null;
  }

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: MinimizedMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp:
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
        ' WIB',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Smart assistant response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botReply = `Terima kasih atas pertanyaannya. Terkait "${text}", sistem basis data pengetahuan CKB Logistics telah memverifikasi prosedur operasional yang bersangkutan.`;
      let docToAttach: DocumentReference | undefined = undefined;

      if (
        lower.includes('ramco') ||
        lower.includes('procure') ||
        lower.includes('p2p') ||
        lower.includes('jobaid')
      ) {
        botReply = 'Berikut jobaid resmi Procure-to-Pay Ramco yang Anda butuhkan:';
        docToAttach = mockDefaultDocument;
      } else if (lower.includes('cuti')) {
        botReply =
          'Pengajuan cuti tahunan (12 hari kerja per tahun) dilakukan secara online melalui portal HCIS CKB dengan persetujuan atasan langsung.';
      } else if (lower.includes('sop')) {
        botReply =
          'Standar Operasional Prosedur (SOP) 2026 telah diperbarui di Knowledge Hub. Buka halaman penuh untuk membaca dokumen lengkap.';
        docToAttach = mockDefaultDocument;
      }

      const botMsg: MinimizedMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botReply,
        timestamp:
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
          ' WIB',
        referencedDoc: docToAttach,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleMaximize = () => {
    closePanel();
    navigate('/chatbot');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        onClick={closePanel}
        className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs transition-opacity"
      />

      {/* Docked Right-Hand Chatbot Panel matching visily-minimize-chatbot.png */}
      <aside
        aria-label="CKB Chatbot Panel"
        className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] md:w-[450px] lg:w-[470px] bg-white border-l border-gray-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 select-none"
      >
        {/* Panel Header matching visily-minimize-chatbot.png */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            {/* Robot Icon in Teal/Green Container */}
            <div className="w-11 h-11 rounded-2xl bg-[#006C4E] text-white flex items-center justify-center shadow-xs shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                CKB Chatbot
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Terhubung ke sistem</span>
              </div>
            </div>
          </div>

          {/* Header Controls: Maximize & Close */}
          <div className="flex items-center gap-1">
            {/* Maximize to /chatbot full workspace matching visily-minimize-chatbot.png */}
            <button
              onClick={handleMaximize}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              title="Perbesar Layar Penuh (Buka Workspace Lengkap)"
              aria-label="Perbesar Layar Penuh"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Close panel */}
            <button
              onClick={closePanel}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              title="Tutup Panel Chatbot"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="bg-gray-50/80 px-4 py-2 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {['Jobaid Ramco', 'SOP Procurement', 'Kebijakan Cuti'].map(
            (suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(suggestion)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-xs font-medium text-gray-700 hover:text-[#006C4E] border border-gray-200 transition-colors shadow-2xs shrink-0 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>{suggestion}</span>
              </button>
            )
          )}
        </div>

        {/* Messages List matching visily-minimize-chatbot.png */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-white">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[88%] rounded-2xl p-4 text-sm leading-relaxed shadow-2xs whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-[#006C4E] text-white rounded-br-xs'
                    : 'bg-[#F1F5F9] text-gray-800 rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>

              {/* Timestamp */}
              <span className="text-[11px] text-gray-400 mt-1 px-1">
                {m.timestamp}
              </span>

              {/* Smart Document Card inside mini chat if referenced */}
              {m.referencedDoc && (
                <div className="mt-2 w-[88%] bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-3 shadow-2xs">
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white text-[#006C4E] border border-emerald-200 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {m.referencedDoc.title}
                      </h4>
                      <p className="text-[10px] text-gray-500">
                        {m.referencedDoc.type} • {m.referencedDoc.fileSize}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleMaximize}
                    className="w-full py-1.5 rounded-lg bg-[#006C4E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#00553d] transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Buka di Layar Penuh</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-gray-400 pl-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
              <span>CKB Chatbot sedang mengetik...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Full Workspace Quick Link Footer */}
        <div className="px-5 py-2 bg-emerald-50/70 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
          <span className="text-gray-600">Ingin fitur analisis project lengkap?</span>
          <button
            onClick={handleMaximize}
            className="font-bold text-[#006C4E] hover:underline flex items-center gap-1"
          >
            <span>Buka Workspace</span>
            <span>→</span>
          </button>
        </div>

        {/* Input Form matching visily-minimize-chatbot.png */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-[#F1F5F9] rounded-2xl px-4 py-2 border border-gray-200/80 focus-within:border-[#006C4E] focus-within:ring-2 focus-within:ring-[#006C4E]/20 transition-all shadow-xs"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ketik pertanyaan Anda di sini..."
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-9 h-9 rounded-full bg-[#006C4E] hover:bg-[#00553d] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-xs"
              title="Kirim"
            >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
};
