import React, { useState } from 'react';
import { initialLearningDocuments } from '../data/mockLearningCenterData';
import { LearningDocument } from '../types/learningCenter';
import { LearningCenterSidebar } from '../components/learning-center/LearningCenterSidebar';
import { LearningCenterHeader } from '../components/learning-center/LearningCenterHeader';
import { LearningCenterHomeView } from '../components/learning-center/LearningCenterHomeView';
import { KnowledgeManagementView } from '../components/learning-center/KnowledgeManagementView';
import { UploadDocumentView } from '../components/learning-center/UploadDocumentView';
import { DocViewerModal } from '../components/chatbot/DocViewerModal';
import { LearningCenterFooter } from '../components/learning-center/LearningCenterFooter';
import { CheckCircle, Info } from 'lucide-react';

export const LearningCenterPage: React.FC = () => {
  // Page view state
  const [currentView, setCurrentView] = useState<'home' | 'knowledge-management' | 'upload'>('home');
  const [uploadMode, setUploadMode] = useState<'create' | 'revision'>('create');
  const [selectedDocForRevision, setSelectedDocForRevision] = useState<LearningDocument | null>(null);

  // Document list state
  const [documents, setDocuments] = useState<LearningDocument[]>(initialLearningDocuments);

  // Filter confidential state when navigated from home alert
  const [onlyConfidential, setOnlyConfidential] = useState(false);

  // Preview modal state
  const [previewDoc, setPreviewDoc] = useState<LearningDocument | null>(null);

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Breadcrumbs
  const getBreadcrumbs = () => {
    if (currentView === 'home') {
      return ['Learning Center', 'Home Page'];
    }
    if (currentView === 'knowledge-management') {
      return ['Learning Center', 'Knowledge Management'];
    }
    if (uploadMode === 'revision') {
      return [
        'Learning Center',
        'Knowledge Management',
        `Revisi: ${selectedDocForRevision?.docNumber || 'Dokumen'}`,
      ];
    }
    return ['Learning Center', 'Knowledge Management', 'Unggah Dokumen'];
  };

  // Navigation handlers
  const handleNavigateView = (view: 'home' | 'knowledge-management') => {
    if (view === 'knowledge-management') setOnlyConfidential(false);
    setCurrentView(view);
  };

  const handleOpenUpload = () => {
    setUploadMode('create');
    setSelectedDocForRevision(null);
    setCurrentView('upload');
  };

  const handleStartRevision = (doc: LearningDocument) => {
    setUploadMode('revision');
    setSelectedDocForRevision(doc);
    setCurrentView('upload');
  };

  // Save document (Create or Revision)
  const handleSaveDocument = (docData: Partial<LearningDocument>, mode: 'create' | 'revision') => {
    if (mode === 'create') {
      const newDoc: LearningDocument = {
        id: `doc-${Date.now()}`,
        docNumber: docData.docNumber || 'FRM-NEW-01',
        title: docData.title || 'Dokumen Baru',
        company: docData.company || 'CKB',
        division: docData.division || 'BPI',
        docType: docData.docType || 'FORM',
        revision: docData.revision || '00',
        lastUpdated: docData.lastUpdated || '17 Sep 2026',
        isConfidential: !!docData.isConfidential,
        fileSize: docData.fileSize || '1.2 MB',
        uploadedBy: 'Shabuama Palaska',
      };
      setDocuments([newDoc, ...documents]);
      showToast(`Dokumen [${newDoc.docNumber}] berhasil diunggah ke repositori.`);
    } else {
      // Revision mode: update existing document
      setDocuments((prevDocs) =>
        prevDocs.map((item) => {
          if (item.id === selectedDocForRevision?.id) {
            return {
              ...item,
              ...docData,
              revision: docData.revision || item.revision,
              lastUpdated: docData.lastUpdated || item.lastUpdated,
            } as LearningDocument;
          }
          return item;
        })
      );
      showToast(
        `Revisi dokumen [${selectedDocForRevision?.docNumber}] (Rev. ${docData.revision}) berhasil disimpan.`
      );
    }
    setCurrentView('knowledge-management');
  };

  // Delete document handler
  const handleDeleteDocument = (docId: string) => {
    const target = documents.find((d) => d.id === docId);
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    showToast(`Dokumen [${target?.docNumber || docId}] berhasil dihapus dari repositori.`, 'info');
  };

  // Download simulation
  const handleDownloadDocument = (doc: LearningDocument) => {
    const dummyContent = `PT Cipta Kridha Bahari - Dokumen Resmi\nNo: ${doc.docNumber}\nJudul: ${doc.title}\nPerusahaan: ${doc.company}\nDivisi: ${doc.division}\nTipe: ${doc.docType}\nRevisi: ${doc.revision}\nPembaruan: ${doc.lastUpdated}\nKerahasiaan: ${doc.isConfidential ? 'RAHASIA' : 'PUBLIK'}\n\n[Isi Konten Prosedur Operasional CKB Logistics Standard]`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.docNumber}_Rev${doc.revision}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Mengunduh dokumen [${doc.docNumber}] Rev. ${doc.revision}...`);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-gray-900">
      {/* 1. Left Sidebar matching Visily */}
      <LearningCenterSidebar
        currentView={currentView}
        onNavigateView={handleNavigateView}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 relative flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header Bar */}
        <LearningCenterHeader
          breadcrumbs={getBreadcrumbs()}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* View Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto flex flex-col justify-between pt-20 sm:pt-24">
          <div className="flex-1">
            {currentView === 'home' && (
              <LearningCenterHomeView
                documents={documents}
                onNavigateToKM={(filterConfidential) => {
                  setOnlyConfidential(!!filterConfidential);
                  setCurrentView('knowledge-management');
                }}
              />
            )}

            {currentView === 'knowledge-management' && (
              <KnowledgeManagementView
                documents={documents}
                initialConfidentialOnly={onlyConfidential}
                onOpenUpload={handleOpenUpload}
                onStartRevision={handleStartRevision}
                onDeleteDocument={handleDeleteDocument}
                onPreviewDocument={(doc) => setPreviewDoc(doc)}
                onDownloadDocument={handleDownloadDocument}
              />
            )}

            {currentView === 'upload' && (
              <UploadDocumentView
                mode={uploadMode}
                initialDocument={selectedDocForRevision}
                onSave={handleSaveDocument}
                onCancel={() => setCurrentView('knowledge-management')}
              />
            )}
          </div>

          {/* System Footer matching Visily on all views */}
          <LearningCenterFooter />
        </main>
      </div>

      {/* 3. Document Official Preview Modal (DocViewerModal) */}
      <DocViewerModal
        document={previewDoc}
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        onDownload={handleDownloadDocument}
      />

      {/* 4. Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold text-white border ${
              toast.type === 'info'
                ? 'bg-gray-900 border-gray-700'
                : 'bg-[#006C4E] border-emerald-500/50'
            }`}
          >
            {toast.type === 'info' ? (
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};
