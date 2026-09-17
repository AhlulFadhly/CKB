import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Minus } from 'lucide-react';
import { ChatSidebar } from '../components/chatbot/ChatSidebar';
import { ChatWindow } from '../components/chatbot/ChatWindow';
import { ProjectView } from '../components/chatbot/ProjectView';
import { ProjectDetailView } from '../components/chatbot/ProjectDetailView';
import { DocViewerModal } from '../components/chatbot/DocViewerModal';
import { NewProjectModal } from '../components/chatbot/NewProjectModal';
import {
  ChatProject,
  ChatMessage,
  RecentHistoryItem,
  DocumentReference,
} from '../types/chatbot';
import {
  mockInitialProjects,
  mockRecentHistory,
  mockInitialMessages,
  mockDefaultDocument,
  mockPdfDocument,
} from '../data/mockChatbotData';

export const ChatbotPage: React.FC = () => {
  const navigate = useNavigate();

  // Navigation and Workspace view state
  const [currentView, setCurrentView] = useState<
    'chat' | 'project-list' | 'project-detail'
  >('chat');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<ChatProject[]>(mockInitialProjects);
  const [activeProject, setActiveProject] = useState<ChatProject | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Chat Conversations State
  const [recentHistory] = useState<RecentHistoryItem[]>(mockRecentHistory);
  const [activeChatId, setActiveChatId] = useState<string | null>('hist-01');
  const [messages, setMessages] = useState<ChatMessage[]>(mockInitialMessages);
  const [isTyping, setIsTyping] = useState(false);

  // Document Viewer Modal State
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocumentReference | null>(mockDefaultDocument);

  // Handler: Start New Chat
  const handleNewChat = () => {
    setCurrentView('chat');
    setActiveChatId(null);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Halo Shabuama, saya asisten CKB Logistics. Silakan ketik topik atau dokumen operasional yang ingin Anda cari hari ini.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        actionSuggestions: [
          'Jobaid Procure to Pay Ramco',
          'SOP Standar Operasional 2026',
          'Kebijakan Cuti Karyawan',
          'Alur Pengadaan Logistik',
        ],
      },
    ]);
  };

  // Handler: Select Recent History Item
  const handleSelectHistory = (item: RecentHistoryItem) => {
    setCurrentView('chat');
    setActiveChatId(item.id);

    if (item.id === 'hist-01') {
      setMessages(mockInitialMessages);
    } else if (item.id === 'hist-03') {
      setMessages([
        {
          id: `hist-cuti-1`,
          sender: 'user',
          text: 'Bagaimana prosedur permohonan cuti tahunan dan cuti khusus di CKB?',
          timestamp: '1 minggu lalu',
        },
        {
          id: `hist-cuti-2`,
          sender: 'assistant',
          text: 'Berdasarkan Perjanjian Kerja Bersama (PKB) CKB Logistics, setiap karyawan berhak atas 12 hari cuti tahunan setelah 1 tahun masa kerja. Pengajuan wajib disubmit minimal 3 hari kerja sebelumnya melalui sistem Human Capital.',
          timestamp: '1 minggu lalu',
          actionSuggestions: ['Buka Portal HCIS', 'Formulir Cuti Sakit', 'Kebijakan Cuti Bersama'],
        },
      ]);
    } else {
      setMessages([
        {
          id: `hist-${Date.now()}-1`,
          sender: 'user',
          text: `Tolong tampilkan ringkasan untuk topik: ${item.title}`,
          timestamp: item.timestamp,
        },
        {
          id: `hist-${Date.now()}-2`,
          sender: 'assistant',
          text: `Berikut rangkuman dan berkas referensi resmi untuk "${item.title}". Seluruh data diambil dari repositori internal PT Cipta Kridha Bahari.`,
          timestamp: item.timestamp,
          referencedDoc: mockPdfDocument,
          actionSuggestions: ['Lihat SOP', 'Formulir Pendukung', 'Dokumen Terkait'],
        },
      ]);
    }
  };

  // Handler: Select Project from List or Sidebar
  const handleSelectProject = (project: ChatProject) => {
    setActiveProject(project);
    setCurrentView('project-detail');
  };

  // Handler: Toggle Project Star
  const handleToggleStar = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, isStarred: !p.isStarred } : p))
    );
  };

  // Handler: Create New Project
  const handleCreateProject = (projectName: string) => {
    const newProj: ChatProject = {
      id: `proj-${Date.now()}`,
      name: projectName,
      isStarred: true,
      lastUpdated: 'Baru saja',
      description: `Ruang kerja dan arsip kecerdasan buatan untuk project "${projectName}".`,
      promptSuggestions: [
        `Analisis kebutuhan ${projectName}`,
        `Susun rencana kerja mingguan`,
        `Daftar dokumen pendukung`,
      ],
    };

    setProjects([newProj, ...projects]);
    setIsNewProjectModalOpen(false);
    setActiveProject(newProj);
    setCurrentView('project-detail');
  };

  // Handler: Send Message in Main Chat Window
  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Context-aware Smart Assistant response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyText = 'Berikut dokumen dan panduan yang relevan dengan pertanyaan Anda:';
      let docToAttach: DocumentReference | undefined = undefined;
      let suggestions: string[] = ['Lihat SOP', 'Formulir Pendukung', 'Dokumen Terkait', 'Panduan Terkait'];

      if (
        lower.includes('procure') ||
        lower.includes('ramco') ||
        lower.includes('p2p') ||
        lower.includes('jobaid')
      ) {
        replyText = 'Berikut jobaid yang Anda butuhkan:';
        docToAttach = mockDefaultDocument;
        suggestions = ['Lihat SOP', 'Formulir Pendukung', 'Dokumen Terkait', 'Panduan Terkait'];
      } else if (lower.includes('sop') || lower.includes('pmwi') || lower.includes('2026')) {
        replyText =
          'Ditemukan dokumen Standard Operating Procedure (SOP) Procurement 2026 terbaru:';
        docToAttach = mockPdfDocument;
        suggestions = ['Matriks Otorisasi', 'Jadwal Audit Vendor', 'Formulir Evaluasi'];
      } else if (lower.includes('cuti') || lower.includes('hcis') || lower.includes('ijin')) {
        replyText =
          'Untuk pengajuan cuti tahunan, silakan akses portal HCIS CKB. Cuti tahunan diberikan sebanyak 12 hari kerja per tahun kalender.';
        suggestions = ['Panduan HCIS', 'Formulir Cuti Khusus', 'Kontak HR CKB'];
      } else if (lower.includes('lihat sop')) {
        replyText = 'Berikut SOP pengadaan resmi CKB Logistics yang berlaku:';
        docToAttach = mockPdfDocument;
        suggestions = ['Unduh Berkas', 'Alur P2P Ramco', 'Ketentuan Pengadaan'];
      } else {
        replyText = `Terkait "${text}", data operasional CKB Logistics menyarankan langkah koordinasi berikut sesuai standar operasional yang berlaku:`;
        docToAttach = mockDefaultDocument;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        referencedDoc: docToAttach,
        actionSuggestions: suggestions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  // Handler: Open Document in Viewer Modal
  const handleOpenDoc = (doc: DocumentReference) => {
    setActiveDoc(doc);
    setIsDocModalOpen(true);
  };

  // Handler: Minimize Chatbot
  const handleMinimize = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#1D2128]">
      {/* 1. Left Sidebar matching visily-chatbot-2.png & visily-chatbot-4-1.png */}
      <ChatSidebar
        currentView={currentView}
        projects={projects}
        recentHistory={recentHistory}
        activeChatId={activeChatId}
        activeProjectId={activeProject?.id || null}
        onNewChat={handleNewChat}
        onSelectHistory={handleSelectHistory}
        onOpenProjectsList={() => setCurrentView('project-list')}
        onSelectProject={handleSelectProject}
        onToggleStar={handleToggleStar}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Workspace Dynamic View */}
      <main className="flex-1 relative flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
        {/* Persistent Top Navigation Bar across all Chatbot views matching visily-chatbot-2, 4-1, 5 */}
        <header
          className="h-20 sm:h-24 border-b border-gray-200/60 px-4 sm:px-8 flex items-center justify-between shadow-xs select-none transition-colors absolute top-0 left-0 right-0 z-20 bg-[#FFFFFF]/60 backdrop-blur-[8px]"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
              title="Buka Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                CKB Chatbot
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Terhubung ke Chatbot</span>
              </div>
            </div>
          </div>

          {/* Minimize Button */}
          <button
            onClick={handleMinimize}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 rounded-xl transition-colors cursor-pointer"
            title="Minimalkan ke Portal"
          >
            <Minus className="w-5 h-5" />
          </button>
        </header>

        {currentView === 'chat' && (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            onOpenDoc={handleOpenDoc}
            isTyping={isTyping}
          />
        )}

        {currentView === 'project-list' && (
          <ProjectView
            projects={projects}
            onSelectProject={handleSelectProject}
            onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
            onToggleStar={handleToggleStar}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          />
        )}

        {currentView === 'project-detail' && activeProject && (
          <ProjectDetailView
            project={activeProject}
            onToggleStar={handleToggleStar}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          />
        )}
      </main>

      {/* 3. Document / PDF Viewer Modal matching visily-chatbot-6.png */}
      <DocViewerModal
        isOpen={isDocModalOpen}
        document={activeDoc}
        onClose={() => setIsDocModalOpen(false)}
      />

      {/* 4. New Project Dialog Modal matching visily-chatbot-4-2.png */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default ChatbotPage;
