import React from 'react';
import { X, Download, FileText, CheckCircle2, ShieldAlert, Building2, Calendar, Hash } from 'lucide-react';
import { LearningDocument } from '../../types/learningCenter';

interface DocumentPreviewModalProps {
  document: LearningDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (doc: LearningDocument) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  isOpen,
  onClose,
  onDownload,
}) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {document.docNumber}
                </span>
                <span className="text-xs text-gray-400">Rev. {document.revision}</span>
                {document.isConfidential && (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> Rahasia
                  </span>
                )}
              </div>
              <h2 className="text-sm sm:text-base font-semibold text-gray-100 truncate mt-0.5">
                {document.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-4">
            <button
              onClick={() => onDownload(document)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#006C4E] hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Document Preview Viewer */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-gray-100 flex justify-center">
          {/* Simulated A4 Document Paper */}
          <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8 sm:p-12 border border-gray-200 text-gray-800 flex flex-col min-h-[650px]">
            {/* CKB Header / Kop Surat */}
            <div className="border-b-2 border-[#006C4E] pb-5 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/logo-ckb.svg"
                  alt="CKB Logistics Logo"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <div className="border-l border-gray-200 pl-3">
                  <div className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight leading-tight">
                    PT CIPTA KRIDHA BAHARI
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">
                    INTEGRATED LOGISTICS SERVICES
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-bold text-xs uppercase tracking-wider">
                  {document.docType}
                </span>
              </div>
            </div>

            {/* Document Metadata Grid */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/80 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <div className="text-gray-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <Hash className="w-3 h-3 text-emerald-600" /> No. Dokumen
                </div>
                <div className="font-semibold text-gray-800 mt-0.5 font-mono">{document.docNumber}</div>
              </div>
              <div>
                <div className="text-gray-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-emerald-600" /> Perusahaan
                </div>
                <div className="font-semibold text-gray-800 mt-0.5">{document.company} ({document.division})</div>
              </div>
              <div>
                <div className="text-gray-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-600" /> Pembaruan
                </div>
                <div className="font-semibold text-gray-800 mt-0.5">{document.lastUpdated}</div>
              </div>
              <div>
                <div className="text-gray-400 text-[10px] uppercase font-bold">Status Versi</div>
                <div className="font-semibold text-emerald-700 mt-0.5">Revisi {document.revision} (Active)</div>
              </div>
            </div>

            {/* Document Title Header */}
            <div className="mb-6 text-center">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                {document.title}
              </h1>
              <p className="text-xs text-gray-500 mt-1.5">
                Pengunggah: <span className="font-medium text-gray-700">{document.uploadedBy || 'Shabuama Palaska'}</span> &bull; Ukuran File: <span className="font-medium text-gray-700">{document.fileSize || '1.2 MB'}</span>
              </p>
            </div>

            {/* Content Preview Simulation */}
            <div className="space-y-4 text-xs leading-relaxed text-gray-600 flex-1">
              <div className="p-4 bg-emerald-50/50 border-l-4 border-emerald-600 rounded-r-lg">
                <h3 className="font-bold text-emerald-950 mb-1">1. TUJUAN & RUANG LINGKUP</h3>
                <p>
                  Dokumen ini menetapkan standar operasional baku dan panduan tata kelola proses bisnis di lingkungan {document.company}. Seluruh pihak terkait diwajibkan untuk menaati setiap klausul dalam prosedur ini untuk menjamin kepatuhan, keandalan, dan efisiensi rantai pasok.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5">2. KETENTUAN UMUM</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                  <li>Setiap personil operasional wajib melakukan verifikasi berkala terhadap keabsahan dokumen revisi terkini ({document.revision}).</li>
                  <li>Proses pencatatan dan pelaporan harus disinkronkan melalui platform CKB Ramco ERP dan modul pendukung.</li>
                  <li>Dokumen berstatus rahasia hanya dapat diakses oleh personil yang telah memiliki hak otorisasi keamanan data.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5">3. DIAGRAM ALUR & VALIDASI</h3>
                <div className="p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center text-gray-400 text-xs py-6">
                  [ Diagram Alur Proses Bisnis & Verifikasi Standard Operasional - Versi Digital ]
                </div>
              </div>
            </div>

            {/* Document Sign-off / Footer Stamp */}
            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center text-xs">
              <div className="border border-gray-200 rounded p-2.5">
                <div className="text-[10px] text-gray-400 uppercase font-bold">Disiapkan Oleh</div>
                <div className="font-semibold text-gray-800 mt-2">{document.uploadedBy || 'Process Owner'}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">BPI Specialist</div>
              </div>
              <div className="border border-gray-200 rounded p-2.5">
                <div className="text-[10px] text-gray-400 uppercase font-bold">Ditinjau Oleh</div>
                <div className="font-semibold text-gray-800 mt-2">Section Head</div>
                <div className="text-[10px] text-gray-400 mt-0.5">Quality Assurance</div>
              </div>
              <div className="border border-emerald-200 bg-emerald-50/50 rounded p-2.5">
                <div className="text-[10px] text-emerald-800 uppercase font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Disetujui
                </div>
                <div className="font-semibold text-gray-900 mt-2">VP Logistics & Ops</div>
                <div className="text-[10px] text-emerald-700 font-mono mt-0.5">VERIFIED {document.lastUpdated}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-3.5 bg-white border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Format: PDF Dokumen Resmi &bull; Status: Aktif Terverifikasi
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={() => onDownload(document)}
              className="px-4 py-2 bg-[#006C4E] hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Dokumen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
