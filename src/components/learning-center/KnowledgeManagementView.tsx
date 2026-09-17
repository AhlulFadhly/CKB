import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  ShieldAlert,
  Search,
  Download,
  Plus,
  Eye,
  Edit2,
  Trash2,
  RefreshCw,
  AlertTriangle,
  Building2,
  Filter
} from 'lucide-react';
import { LearningDocument, DocumentFilterState } from '../../types/learningCenter';

interface KnowledgeManagementViewProps {
  documents: LearningDocument[];
  onOpenUpload: () => void;
  onStartRevision: (doc: LearningDocument) => void;
  onDeleteDocument: (docId: string) => void;
  onPreviewDocument: (doc: LearningDocument) => void;
  onDownloadDocument: (doc: LearningDocument) => void;
  initialConfidentialOnly?: boolean;
}

export const KnowledgeManagementView: React.FC<KnowledgeManagementViewProps> = ({
  documents,
  onOpenUpload,
  onStartRevision,
  onDeleteDocument,
  onPreviewDocument,
  onDownloadDocument,
  initialConfidentialOnly = false,
}) => {
  // Filters state
  const [filters, setFilters] = useState<DocumentFilterState>({
    company: 'ALL',
    docType: 'ALL',
    division: 'ALL',
    searchQuery: '',
  });
  const [onlyConfidential, setOnlyConfidential] = useState(initialConfidentialOnly);

  // Edit dropdown popup state: stores active document ID where dropdown is open
  const [activeDropdownDocId, setActiveDropdownDocId] = useState<string | null>(null);

  // Delete modal state
  const [docToDelete, setDocToDelete] = useState<LearningDocument | null>(null);

  // Dropdown click outside listener
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdownDocId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute stats
  const totalCount = documents.length;
  const publicCount = documents.filter((d) => !d.isConfidential).length;
  const confidentialCount = documents.filter((d) => d.isConfidential).length;

  // Filtered documents
  const filteredDocs = documents.filter((doc) => {
    if (onlyConfidential && !doc.isConfidential) return false;
    if (filters.company !== 'ALL' && doc.company !== filters.company) return false;
    if (filters.docType !== 'ALL' && doc.docType !== filters.docType) return false;
    if (filters.division !== 'ALL' && doc.division !== filters.division) return false;
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchNo = doc.docNumber.toLowerCase().includes(q);
      const matchTitle = doc.title.toLowerCase().includes(q);
      const matchDiv = doc.division.toLowerCase().includes(q);
      if (!matchNo && !matchTitle && !matchDiv) return false;
    }
    return true;
  });

  // Extract unique divisions for filter
  const uniqueDivisions = Array.from(new Set(documents.map((d) => d.division))).sort();

  // Export to CSV simulation
  const handleExportCSV = () => {
    const headers = ['Nomor Dokumen', 'Judul Dokumen', 'Perusahaan', 'Divisi', 'Tipe', 'Revisi', 'Pembaruan', 'Kerahasiaan'];
    const rows = filteredDocs.map((d) => [
      `"${d.docNumber}"`,
      `"${d.title.replace(/"/g, '""')}"`,
      `"${d.company}"`,
      `"${d.division}"`,
      `"${d.docType}"`,
      `"Rev. ${d.revision}"`,
      `"${d.lastUpdated}"`,
      `"${d.isConfidential ? 'Rahasia' : 'Publik'}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CKB_KM_Documents_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmDelete = () => {
    if (docToDelete) {
      onDeleteDocument(docToDelete.id);
      setDocToDelete(null);
      setActiveDropdownDocId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* 1. Top Section matching Visily: Judul & Deskripsi on Left, Informasi Dokumen Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Badge, Title (Knowledge in black, Management in green), and Description */}
        <div className="lg:col-span-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold tracking-wider uppercase">
            <span>DATA DIPERBAHARUI : 2 JAM LALU</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-bold text-black tracking-tight leading-[1.1]">
            Knowledge <br />
            <span className="text-[#006C4E]">Management</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 max-w-lg leading-relaxed pt-1">
            Kelola, telusuri, dan verifikasi repositori dokumen SOP, formulir operasional, instruksi kerja, dan kebijakan terpadu CKB Group.
          </p>
        </div>

        {/* Right: Informasi Dokumen Card with 3 stats boxes */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-200/90 shadow-2xs p-5 sm:p-6">
          <div className="flex items-center gap-2.5 text-gray-900 font-bold text-sm mb-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <FileText className="w-4 h-4" />
            </div>
            <span>Informasi Dokumen</span>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {/* Box 1: Total Dokumen */}
            <div
              onClick={() => {
                setOnlyConfidential(false);
                setFilters({ company: 'ALL', docType: 'ALL', division: 'ALL', searchQuery: '' });
              }}
              className="bg-[#EBF5F0] hover:bg-[#deede5] transition-colors p-3.5 sm:p-4 rounded-2xl border border-emerald-100 cursor-pointer text-left group"
              title="Tampilkan Semua Dokumen"
            >
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                TOTAL DOKUMEN
              </div>
              <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                {totalCount}
              </div>
            </div>

            {/* Box 2: Dokumen Publik */}
            <div
              onClick={() => setOnlyConfidential(false)}
              className="bg-[#EBF5F0] hover:bg-[#deede5] transition-colors p-3.5 sm:p-4 rounded-2xl border border-emerald-100 cursor-pointer text-left group"
              title="Filter Dokumen Publik"
            >
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                DOKUMEN PUBLIK
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">
                {publicCount}
              </div>
            </div>

            {/* Box 3: Dokumen Rahasia */}
            <div
              onClick={() => setOnlyConfidential(!onlyConfidential)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-colors cursor-pointer text-left group ${
                onlyConfidential
                  ? 'bg-amber-100 border-amber-300 ring-2 ring-amber-400'
                  : 'bg-[#EBF5F0] hover:bg-[#deede5] border-emerald-100'
              }`}
              title="Filter Dokumen Rahasia"
            >
              <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                DOKUMEN RAHASIA
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-900 mt-1">
                {confidentialCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        {/* Table Toolbar / Filters Bar matching Visily */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/60 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            {/* Filter Perusahaan */}
            <div className="lg:col-span-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Perusahaan
              </label>
              <select
                value={filters.company}
                onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20 focus:border-[#006C4E] cursor-pointer"
              >
                <option value="ALL">Semua Perusahaan</option>
                <option value="CKB">CKB</option>
                <option value="ATR">ATR</option>
                <option value="ABM">ABM</option>
              </select>
            </div>

            {/* Filter Tipe Dokumen */}
            <div className="lg:col-span-3">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Tipe Dokumen
              </label>
              <select
                value={filters.docType}
                onChange={(e) => setFilters({ ...filters, docType: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20 focus:border-[#006C4E] cursor-pointer"
              >
                <option value="ALL">Semua Tipe Dokumen</option>
                <option value="FORM">FORM</option>
                <option value="SOP">SOP</option>
                <option value="WI">WI</option>
                <option value="JOBAID">JOBAID</option>
                <option value="POLICY">POLICY</option>
                <option value="MANUAL">MANUAL</option>
              </select>
            </div>

            {/* Filter Divisi */}
            <div className="lg:col-span-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Divisi
              </label>
              <select
                value={filters.division}
                onChange={(e) => setFilters({ ...filters, division: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20 focus:border-[#006C4E] cursor-pointer"
              >
                <option value="ALL">Semua Divisi</option>
                {uniqueDivisions.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="lg:col-span-5">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Pencarian Dokumen
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  placeholder="Cari SOP, Jobaid, Prosedur, atau dokumen lainnya..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20 focus:border-[#006C4E]"
                />
              </div>
            </div>
          </div>

          {/* Sub Toolbar: Summary count & Actions matching Visily */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-200/50">
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                Menampilkan <span className="font-bold text-gray-900">{filteredDocs.length}</span> dokumen dari total database
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title="Unduh data dokumen (.xlsx/.csv)"
              >
                <Download className="w-3.5 h-3.5 text-gray-600" />
                <span>Unduh List (.xlsx)</span>
              </button>

              <button
                onClick={onOpenUpload}
                className="px-4 py-1.5 bg-[#006C4E] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Unggah Dokumen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-44">Nomor Dokumen</th>
                <th className="py-3.5 px-4">Judul Dokumen</th>
                <th className="py-3.5 px-4 w-40">Nama Perusahaan</th>
                <th className="py-3.5 px-4 w-28">Tipe Dokumen</th>
                <th className="py-3.5 px-4 w-24">Revisi</th>
                <th className="py-3.5 px-4 w-44 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => {
                  const isDropdownOpen = activeDropdownDocId === doc.id;

                  return (
                    <tr key={doc.id} className="hover:bg-gray-50/80 transition-colors group">
                      {/* Nomor Dokumen */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-gray-800 bg-gray-100 group-hover:bg-emerald-50 group-hover:text-emerald-900 border border-gray-200 group-hover:border-emerald-200 px-2 py-1 rounded-md text-[11px] inline-block transition-colors">
                          {doc.docNumber}
                        </span>
                      </td>

                      {/* Judul Dokumen */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-gray-900 leading-snug">
                          {doc.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                          <span>Pembaruan: {doc.lastUpdated}</span>
                          <span>&bull;</span>
                          <span>{doc.fileSize || '1.2 MB'}</span>
                          {doc.isConfidential && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded">
                              <ShieldAlert className="w-3 h-3" /> Rahasia
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Nama Perusahaan & Divisi */}
                      <td className="py-3.5 px-4 text-gray-600">
                        <div className="font-semibold text-gray-800 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-gray-400" />
                          <span>{doc.company}</span>
                        </div>
                        <div className="text-[11px] text-gray-400">Divisi {doc.division}</div>
                      </td>

                      {/* Tipe Dokumen */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {doc.docType}
                        </span>
                      </td>

                      {/* Revisi */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                          Rev. {doc.revision}
                        </span>
                      </td>

                      {/* Aksi matching Visily: Lihat, Unduh, Edit */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1 relative">
                          {/* 1. Lihat */}
                          <button
                            onClick={() => onPreviewDocument(doc)}
                            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                            title="Lihat Dokumen"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* 2. Unduh */}
                          <button
                            onClick={() => onDownloadDocument(doc)}
                            className="p-1.5 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Unduh Berkas"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          {/* 3. Edit (Opens Dropdown for Revisi vs Hapus) */}
                          <div className="relative">
                            <button
                              onClick={() =>
                                setActiveDropdownDocId(isDropdownOpen ? null : doc.id)
                              }
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isDropdownOpen
                                  ? 'bg-[#006C4E] text-white'
                                  : 'text-gray-500 hover:text-amber-700 hover:bg-amber-50'
                              }`}
                              title="Pilihan Edit Dokumen (Revisi / Hapus)"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            {/* Dropdown Popup when Edit is clicked */}
                            {isDropdownOpen && (
                              <div
                                ref={dropdownRef}
                                className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-200/90 py-1.5 z-40 text-left animate-in fade-in zoom-in-95 duration-150"
                              >
                                <div className="px-3 py-1.5 border-b border-gray-100 text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                                  Tindakan Dokumen
                                </div>

                                {/* Option 1: Revisi Dokumen */}
                                <button
                                  onClick={() => {
                                    setActiveDropdownDocId(null);
                                    onStartRevision(doc);
                                  }}
                                  className="w-full px-3 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-start gap-2.5 transition-colors cursor-pointer"
                                >
                                  <RefreshCw className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                                  <div>
                                    <div className="font-bold">Revisi Dokumen</div>
                                    <div className="text-[10px] text-gray-400 font-normal">
                                      Perbarui versi & naikkan revisi
                                    </div>
                                  </div>
                                </button>

                                {/* Option 2: Hapus Dokumen */}
                                <button
                                  onClick={() => {
                                    setActiveDropdownDocId(null);
                                    setDocToDelete(doc);
                                  }}
                                  className="w-full px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-start gap-2.5 transition-colors cursor-pointer border-t border-gray-50"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                  <div>
                                    <div className="font-bold">Hapus Dokumen</div>
                                    <div className="text-[10px] text-red-400 font-normal">
                                      Hapus berkas dari repositori
                                    </div>
                                  </div>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <FileText className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                    <div className="font-semibold text-gray-700">Tidak ada dokumen ditemukan</div>
                    <p className="text-xs text-gray-400 mt-1">
                      Coba ubah kata kunci pencarian atau sesuaikan filter di atas.
                    </p>
                    <button
                      onClick={() => {
                        setFilters({ company: 'ALL', docType: 'ALL', division: 'ALL', searchQuery: '' });
                        setOnlyConfidential(false);
                      }}
                      className="mt-3 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Reset Filter
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer: Summary count */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div>
            Menampilkan <span className="font-semibold text-gray-800">{filteredDocs.length}</span> dari{' '}
            <span className="font-semibold text-gray-800">{totalCount}</span> dokumen
          </div>
          <div className="text-gray-400">Repositori PT Cipta Kridha Bahari</div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {docToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Konfirmasi Hapus Dokumen</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Apakah Anda yakin ingin menghapus dokumen{' '}
              <span className="font-semibold text-gray-900">[{docToDelete.docNumber}] {docToDelete.title}</span>?
              Tindakan ini tidak dapat dibatalkan dan dokumen akan dihapus dari repositori.
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setDocToDelete(null)}
                className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Hapus Dokumen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
