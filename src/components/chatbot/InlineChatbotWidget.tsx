import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Maximize2,
  SendHorizontal,
  FileText,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { mockDefaultDocument } from '../../data/mockChatbotData';
import { DocumentReference } from '../../types/chatbot';

interface InlineChatbotWidgetProps {
  onClose?: () => void;
  onMaximize?: () => void;
  className?: string;
}

interface MessageItem {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  referencedDoc?: DocumentReference;
}

export const InlineChatbotWidget: React.FC<InlineChatbotWidgetProps> = ({
  onMaximize,
  className,
}) => {
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Selamat datang di CKB Portal Assistant. Saya siap membantu Anda dalam mencari dokumen, jobaid, atau pertanyaan seputar Cipta Kridha Bahari!',
      timestamp: '15:00 WIB',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll ONLY the inner chat messages container, NEVER scrolling the main window/page
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: MessageItem = {
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

      const botMsg: MessageItem = {
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
    }, 600);
  };

  const handleOpenWorkspace = () => {
    if (onMaximize) {
      onMaximize();
    } else {
      navigate('/chatbot');
    }
  };

  return (
    <div
      className={`bg-white rounded-3xl border border-gray-200/90 shadow-sm flex flex-col h-full w-full min-h-0 min-w-0 overflow-hidden ${
        className || ''
      }`}
    >
      {/* Header matching visily-minimize-chatbot.png */}
      <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white select-none shrink-0">
        <div className="flex items-center gap-3">
          {/* Green squircle robot icon */}
          <div className="w-10 h-10 rounded-2xl bg-[#006C4E] text-white flex items-center justify-center shadow-xs shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 leading-tight">
              CKB Chatbot
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Terhubung ke sistem</span>
            </div>
          </div>
        </div>

        {/* Action Controls: Maximize (square icon) only */}
        <div className="flex items-center gap-1">
          {/* Maximize to /chatbot matching visily-minimize-chatbot.png */}
          <button
            onClick={handleOpenWorkspace}
            className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            title="Buka Workspace Penuh (/chatbot)"
            aria-label="Perbesar Layar Penuh"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="bg-gray-50/70 px-4 py-2 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
        {['Jobaid Ramco', 'SOP Procurement', 'Kebijakan Cuti'].map(
          (suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(suggestion)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-[11px] font-medium text-gray-700 hover:text-[#006C4E] border border-gray-200 transition-colors shadow-2xs shrink-0 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{suggestion}</span>
            </button>
          )
        )}
      </div>

      {/* Messages area with internal scroll ref matching visily-minimize-chatbot.png */}
      <div
        ref={messagesContainerRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 bg-white"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* Gray message bubble */}
            <div
              className={`max-w-[88%] rounded-2xl p-4 text-sm leading-relaxed shadow-2xs whitespace-pre-line ${
                m.sender === 'user'
                  ? 'bg-[#006C4E] text-white rounded-br-xs'
                  : 'bg-[#F1F5F9] text-gray-800 rounded-tl-xs'
              }`}
            >
              {m.text}
            </div>

            {/* Timestamp below bubble */}
            <span className="text-[11px] text-gray-400 mt-1 px-1">
              {m.timestamp}
            </span>

            {/* Smart Document Card if referenced */}
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
                  onClick={handleOpenWorkspace}
                  className="w-full py-1.5 rounded-lg bg-[#006C4E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#00553d] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Buka Dokumen di Workspace</span>
                </button>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-gray-400 pl-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
            <span>CKB Chatbot sedang merespons...</span>
          </div>
        )}
      </div>

      {/* Input area matching visily-minimize-chatbot.png */}
      <div className="p-3.5 sm:p-4 border-t border-gray-100 bg-white shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-[#F1F5F9] rounded-2xl px-4 py-2 border border-gray-200/60 focus-within:border-[#006C4E] focus-within:ring-2 focus-within:ring-[#006C4E]/20 transition-all shadow-xs"
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
    </div>
  );
};
