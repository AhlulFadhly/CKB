import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Printer,
  Download,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { DocumentReference } from '../../types/chatbot';
import { LearningDocument } from '../../types/learningCenter';

export type ViewableDocument = DocumentReference | LearningDocument;

interface DocViewerModalProps {
  isOpen: boolean;
  document: ViewableDocument | null;
  onClose: () => void;
  onDownload?: (doc: any) => void;
}

export const DocViewerModal: React.FC<DocViewerModalProps> = ({
  isOpen,
  document: doc,
  onClose,
  onDownload,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  if (!isOpen || !doc) return null;

  const docNumber =
    'docNumber' in doc && doc.docNumber
      ? doc.docNumber
      : (doc.id || 'DOC-P2P-RAMCO-2026-V2');
  const docType =
    'docType' in doc && doc.docType
      ? doc.docType
      : ('type' in doc ? doc.type : 'SOP');
  const companyName =
    'company' in doc && doc.company
      ? (doc.company === 'ATR' ? 'PT ALFA TRANS RAYA' : doc.company === 'ABM' ? 'PT ABM INVESTAMA' : 'PT CIPTA KRIDHA BAHARI')
      : 'PT CIPTA KRIDHA BAHARI';
  const divisionName = doc.division || 'SUPPLY CHAIN & LOGISTICS';
  const isConfidential = 'isConfidential' in doc ? !!doc.isConfidential : false;
  const fileSize = doc.fileSize || '1.2 MB';
  const displayFileName = doc.title.toLowerCase().endsWith('.pdf') ? doc.title : `${doc.title}.pdf`;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 15, 160));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 15, 70));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(doc);
      return;
    }
    // Generate a temporary link to download
    const element = document.createElement('a');
    const file = new Blob(
      [
        `${companyName} - OFFICIAL INTERNAL DOCUMENT\n` +
          `Title: ${doc.title}\n` +
          `Document No: ${docNumber}\n` +
          `Revision: ${doc.revision}\n` +
          `Division: ${divisionName}\n` +
          `Date: ${doc.lastUpdated || '2026-09-01'}\n\n` +
          `Document Content verified by Quality & Compliance Division.\n` +
          `All rights reserved.`,
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyDocLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/docs/${docNumber}`);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-3 md:p-5 bg-black/80 backdrop-blur-sm transition-opacity">
      <div
        className={`bg-[#262930] flex flex-col transition-all duration-300 overflow-hidden ${
          isFullscreen
            ? 'w-full h-full max-w-none rounded-none border-none'
            : 'w-full max-w-6xl h-[94vh] rounded-xl shadow-2xl border border-gray-700/60'
        }`}
      >
        {/* Top Control Bar matching design/docview.jpg */}
        <div className="bg-[#1E2024] text-white px-4 sm:px-6 py-3 flex items-center justify-between gap-4 border-b border-gray-700/60 select-none">
          {/* Left: Document File Name & Page 1 of 1 Capsule */}
          <div className="flex items-center min-w-0">
            <h2 className="text-sm sm:text-base font-semibold text-white truncate tracking-wide">
              {displayFileName}
            </h2>
            <span className="bg-[#343A40] text-gray-300 text-xs px-2.5 py-0.5 rounded-full font-medium ml-3 shrink-0">
              Page 1 of 1
            </span>
          </div>

          {/* Right: Controls & Tutup Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 70}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-slate-700/60 rounded-lg transition-colors disabled:opacity-40"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 160}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-slate-700/60 rounded-lg transition-colors disabled:opacity-40"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-slate-700/60 rounded-lg transition-colors hidden sm:inline-flex"
              title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <div className="h-4 w-px bg-gray-600/80 mx-1 hidden sm:block" />

            <button
              onClick={handlePrint}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-slate-700/60 rounded-lg transition-colors hidden sm:inline-flex"
              title="Cetak Dokumen"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-slate-700/60 rounded-lg transition-colors"
              title="Unduh Dokumen"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Crimson Red "Tutup" button matching design/docview.jpg */}
            <button
              onClick={onClose}
              className="bg-[#C51636] hover:bg-[#A8132E] active:bg-[#8F1027] text-white font-medium text-xs sm:text-sm px-4 py-1.5 rounded-md shadow-sm transition-colors cursor-pointer ml-1.5"
            >
              Tutup
            </button>
          </div>
        </div>

        {/* Copy Link Alert Toast */}
        {copiedNotification && (
          <div className="bg-emerald-600 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-center gap-2 border-b border-emerald-500 animate-in fade-in duration-150">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
            <span>Tautan dokumen berhasil disalin ke clipboard!</span>
          </div>
        )}

        {/* Document Content Canvas with Zoom container - Dark Slate background matching docview.jpg */}
        <div className="flex-1 bg-[#262930] overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
          <div
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full max-w-3xl bg-white shadow-2xl shadow-black/60 rounded-sm border border-gray-300/40 p-8 sm:p-12 text-gray-800 font-sans my-4"
          >
            {/* Header Surat / Kop Dokumen Resmi CKB */}
            <div className="border-b-2 border-gray-900 pb-4 mb-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black italic tracking-wider text-[#006C4E]">
                    CKB
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    LOGISTICS
                  </span>
                </div>
                <h1 className="text-lg font-bold text-gray-900 mt-1 uppercase">
                  {companyName}
                </h1>
                <p className="text-xs text-gray-500">
                  Gedung TMT 1, Lantai 7, Cilandak Barat, Jakarta Selatan 12430
                </p>
              </div>

              <div className="text-right text-xs text-gray-600 space-y-1">
                <div className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                  {docNumber}
                </div>
                <div>Status: <span className="text-emerald-700 font-bold">TERVERIFIKASI</span></div>
                <div>Revisi: {doc.revision} ({fileSize})</div>
                <div>
                  Klasifikasi:{' '}
                  <span className={isConfidential ? 'text-amber-700 font-bold' : 'text-gray-600 font-medium'}>
                    {isConfidential ? 'RAHASIA' : 'INTERNAL'}
                  </span>
                </div>
                <div>Tgl Terbit: {doc.lastUpdated || '15 Agustus 2026'}</div>
              </div>
            </div>

            {/* Document Title Banner */}
            <div className="bg-[#006C4E]/10 border-l-4 border-[#006C4E] p-4 mb-6">
              <span className="text-xs font-bold text-[#006C4E] uppercase tracking-wider block mb-1">
                {docType} • DIVISI {divisionName.toUpperCase()}
              </span>
              <h2 className="text-xl font-bold text-gray-900 leading-snug">
                {doc.title}
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Panduan Komprehensif Eksekusi Modul Operasional untuk Seluruh Unit Bisnis {companyName}.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-sm leading-relaxed text-gray-700">
              {/* Section 1 */}
              <div>
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b border-gray-200 pb-1 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs">1</span>
                  Tujuan & Ruang Lingkup
                </h3>
                <p className="text-xs text-gray-600 leading-normal">
                  Dokumen ini menetapkan alur baku proses <span className="font-semibold text-gray-900">Procure-to-Pay (P2P)</span> menggunakan enterprise system <span className="font-semibold text-gray-900">Ramco</span>. Berlaku untuk seluruh divisi pengadaan operasional darat, transshipment laut, freight forwarding, dan warehouse terminal di lingkungan CKB Logistics.
                </p>
              </div>

              {/* Section 2: Flow diagram steps */}
              <div>
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b border-gray-200 pb-1 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs">2</span>
                  Alur Proses 6 Tahap Ramco P2P
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <span className="font-bold text-[#006C4E] block mb-1">01. Purchase Requisition (PR)</span>
                    <p className="text-gray-600">User menginput kebutuhan material/jasa di Ramco dengan melampirkan Justifikasi Kebutuhan & Dokumen TOR.</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <span className="font-bold text-[#006C4E] block mb-1">02. Approval Matrix</span>
                    <p className="text-gray-600">Persetujuan berjenjang Section Head, Division Head, hingga Direktur Keuangan sesuai limit nominal.</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <span className="font-bold text-[#006C4E] block mb-1">03. Purchase Order (PO)</span>
                    <p className="text-gray-600">Buyer Procurement menerbitkan PO resmi kepada vendor yang telah terverifikasi dalam Master Vendor Ramco.</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <span className="font-bold text-[#006C4E] block mb-1">04. Goods Receipt Note (GRN)</span>
                    <p className="text-gray-600">Logistik/Warehouse mengonfirmasi penerimaan barang fisik atau Berita Acara Serah Terima (BAST).</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <span className="font-bold text-[#006C4E] block mb-1">05. 3-Way Matching Invoice</span>
                    <p className="text-gray-600">Sistem Ramco memvalidasi kesesuaian antara PO, GRN, dan Faktur Pajak dari Vendor secara otomatis.</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3">
                    <span className="font-bold text-[#006C4E] block mb-1">06. Payment Release</span>
                    <p className="text-gray-600">Divisi Treasury mengeksekusi transfer pembayaran sesuai Terms of Payment (TOP) terdaftar.</p>
                  </div>
                </div>
              </div>

              {/* Section 3: Table matrix */}
              <div>
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b border-gray-200 pb-1 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs">3</span>
                  Matriks Batas Kewenangan Otorisasi (DOA)
                </h3>
                <div className="overflow-x-auto border border-gray-200 rounded">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                      <tr>
                        <th className="p-2.5">Tingkat Nilai Transaksi</th>
                        <th className="p-2.5">Otorisator Level 1</th>
                        <th className="p-2.5">Otorisator Final</th>
                        <th className="p-2.5">SLA Ramco</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-600">
                      <tr>
                        <td className="p-2.5 font-medium">&le; Rp 50.000.000</td>
                        <td className="p-2.5">Section Head</td>
                        <td className="p-2.5">Department Head</td>
                        <td className="p-2.5 font-mono">1 Hari Kerja</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium">Rp 50.000.001 - Rp 250.000.000</td>
                        <td className="p-2.5">Department Head</td>
                        <td className="p-2.5">Division Head</td>
                        <td className="p-2.5 font-mono">2 Hari Kerja</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium">&gt; Rp 250.000.000</td>
                        <td className="p-2.5">Division Head</td>
                        <td className="p-2.5 text-[#006C4E] font-bold">Board of Directors</td>
                        <td className="p-2.5 font-mono">3 Hari Kerja</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sign-off footer block */}
              <div className="pt-6 border-t border-gray-200 grid grid-cols-2 gap-8 text-xs">
                <div>
                  <span className="text-gray-500 block mb-1">Dibuat Oleh:</span>
                  <div className="font-bold text-gray-900">
                    {'uploadedBy' in doc && doc.uploadedBy ? doc.uploadedBy : 'Tim BPI & Enterprise Procurement'}
                  </div>
                  <div className="text-gray-500">{companyName}</div>
                  <div className="mt-3 flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Digitally Signed &amp; Audited</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-gray-500 block mb-1">Disetujui Oleh:</span>
                  <div className="font-bold text-gray-900">Head of Supply Chain &amp; Operations</div>
                  <div className="text-gray-500">Compliance Committee</div>
                  <div className="mt-3 text-gray-400 font-mono text-[11px]">
                    HASH: 8F7A-29BC-CKB-2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Dark Footer Bar matching design/docview.jpg */}
        <div className="bg-[#181A1D] px-6 py-2.5 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400 select-none">
          <div className="flex-1 text-center">
            <span className="font-normal text-gray-400 text-[11px] sm:text-xs tracking-wider">
              Logistics Management System | Internal Document | Confidential
            </span>
          </div>
          <button
            onClick={handleCopyDocLink}
            className="text-gray-400 hover:text-gray-200 transition-colors hidden sm:flex items-center gap-1 text-[11px]"
            title="Salin Tautan Dokumen"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Salin tautan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
