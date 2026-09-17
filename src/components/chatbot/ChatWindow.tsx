import React, { useState, useRef, useEffect } from 'react';
import {
  SendHorizontal,
  Paperclip,
  Mic,
  FileText,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { ChatMessage, DocumentReference } from '../../types/chatbot';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onOpenDoc: (doc: DocumentReference) => void;
  isTyping: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  onOpenDoc,
  isTyping,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleCopyLink = (doc: DocumentReference) => {
    const url = `${window.location.origin}/docs/${doc.id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(doc.id);
    setCopiedNotification(`Tautan "${doc.title}" berhasil disalin!`);
    setTimeout(() => {
      setCopiedId(null);
      setCopiedNotification(null);
    }, 2500);
  };

  const handleSuggestionClick = (pill: string) => {
    onSendMessage(pill);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] transition-all duration-200 overflow-hidden">
      {/* Copy Alert Toast */}
      {copiedNotification && (
        <div className="absolute top-20 sm:top-24 left-0 right-0 z-30 bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-800 text-center flex items-center justify-center gap-2 shadow-xs animate-in fade-in slide-in-from-top duration-200">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Chat Messages Container with Wide Margin Matching visily-chatbot-2.png */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-6 space-y-6">
        <div className="w-full space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="w-full">
              {msg.sender === 'assistant' ? (
                /* Assistant Message: Pinned to Left ("Kepinggirin"), No Avatar */
                <div className="flex flex-col items-start max-w-2xl">
                  <div className="bg-white border border-gray-200/90 text-gray-800 rounded-2xl px-6 py-4 text-sm leading-relaxed shadow-2xs">
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  {/* Timestamp underneath bubble */}
                  <span className="text-[11px] text-gray-400 mt-1.5 px-2">
                    {msg.timestamp}
                  </span>

                  {/* Smart Document Card matching visily-chatbot-2.png */}
                  {msg.referencedDoc && (
                    <div className="mt-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-4 sm:p-5 shadow-xs transition-all hover:shadow-md animate-in fade-in duration-300 w-full">
                      <div className="flex items-start gap-3.5 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white text-[#006C4E] border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#006C4E] bg-emerald-100/60 px-2 py-0.5 rounded-full inline-block mb-1">
                            {msg.referencedDoc.type} • {msg.referencedDoc.revision}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                            {msg.referencedDoc.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Ukuran: {msg.referencedDoc.fileSize} • Divisi:{' '}
                            {msg.referencedDoc.division || 'Finance & Supply Chain'}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons inside Document Card */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => onOpenDoc(msg.referencedDoc!)}
                          className="bg-[#006C4E] hover:bg-[#00553D] active:bg-[#004531] text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Buka</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyLink(msg.referencedDoc!)}
                          className="bg-white hover:bg-gray-50 border border-emerald-300 text-emerald-900 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
                        >
                          {copiedId === msg.referencedDoc.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Salin link</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Suggestions Pills */}
                  {msg.actionSuggestions && msg.actionSuggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.actionSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-4 py-2 rounded-full bg-white hover:bg-emerald-50 text-gray-700 hover:text-[#006C4E] border border-gray-200 hover:border-emerald-300 text-xs font-medium shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* User Message: Pinned to Right ("Kepinggirin"), No Avatar */
                <div className="flex flex-col items-end w-full">
                  <div className="bg-[#006C4E] text-white rounded-2xl px-6 py-4 text-sm leading-relaxed shadow-2xs max-w-2xl">
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  {/* Timestamp underneath bubble on right */}
                  <span className="text-[11px] text-gray-400 mt-1.5 px-2 text-right">
                    {msg.timestamp}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator: Clean without robot avatar */}
          {isTyping && (
            <div className="flex flex-col items-start w-full">
              <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-2xs flex items-center gap-2 text-xs text-gray-500 max-w-xs">
                <span>CKB Assistant sedang mencari berkas...</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>
      </div>

      {/* Bottom Message Input Form matching visily-chatbot-2.png */}
      <div className="bg-white border-t border-gray-200 px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4">
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center gap-2 bg-[#F8FAFC] border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:border-[#006C4E] focus-within:ring-2 focus-within:ring-[#006C4E]/20 transition-all shadow-xs"
        >
          {/* Attachment Paperclip */}
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            title="Lampirkan berkas referensi"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Input text */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ketik pertanyaan Anda di sini..."
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none px-2"
          />

          {/* Voice Mic button */}
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer hidden sm:block"
            title="Ketik dengan suara"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Circular Send Button matching visily-chatbot-2.png */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-9 h-9 rounded-full bg-[#006C4E] hover:bg-[#00553D] active:bg-[#004531] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-xs transition-all cursor-pointer shrink-0"
            title="Kirim pesan"
          >
            <SendHorizontal className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
