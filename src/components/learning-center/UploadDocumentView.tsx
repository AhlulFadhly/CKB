import React, { useState, useEffect } from 'react';
import { UploadCloud, FileText, ArrowLeft, Check, ShieldAlert, AlertCircle, RefreshCw } from 'lucide-react';
import { LearningDocument, DocumentType } from '../../types/learningCenter';

interface UploadDocumentViewProps {
  mode: 'create' | 'revision';
  initialDocument?: LearningDocument | null;
  onSave: (docData: Partial<LearningDocument>, mode: 'create' | 'revision') => void;
  onCancel: () => void;
}

export const UploadDocumentView: React.FC<UploadDocumentViewProps> = ({
  mode,
  initialDocument,
  onSave,
  onCancel,
}) => {
  const [docNumber, setDocNumber] = useState('');
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState<DocumentType>('FORM');
  const [company, setCompany] = useState<'CKB' | 'ATR' | 'ABM'>('CKB');
  const [division, setDivision] = useState('BPI');
  const [revision, setRevision] = useState('00');
  const [isConfidential, setIsConfidential] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFileSize, setSelectedFileSize] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'revision' && initialDocument) {
      setDocNumber(initialDocument.docNumber);
      setTitle(initialDocument.title);
      setDocType(initialDocument.docType);
      setCompany(initialDocument.company);
      setDivision(initialDocument.division);
      setIsConfidential(initialDocument.isConfidential);
      
      // Auto-suggest next revision (e.g. '00' -> '01')
      const numRev = parseInt(initialDocument.revision, 10);
      if (!isNaN(numRev)) {
        const nextRev = String(numRev + 1).padStart(2, '0');
        setRevision(nextRev);
      } else {
        setRevision(initialDocument.revision + '_REV');
      }

      setSelectedFileName(initialDocument.title + '.pdf');
      setSelectedFileSize(initialDocument.fileSize || '1.5 MB');
      setRevisionNotes(`Revisi pembaruan berkala berdasarkan SOP operasional terkini.`);
    } else {
      setDocNumber('');
      setTitle('');
      setDocType('FORM');
      setCompany('CKB');
      setDivision('BPI');
      setRevision('00');
      setIsConfidential(false);
      setRevisionNotes('');
      setSelectedFileName(null);
      setSelectedFileSize(null);
    }
    setErrorMsg(null);
  }, [mode, initialDocument]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      setSelectedFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setErrorMsg(null);

      // Auto-fill title if empty
      if (!title && mode === 'create') {
        const cleanName = file.name.replace(/\.[^/.]+$/, '');
        setTitle(cleanName);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!docNumber.trim()) {
      setErrorMsg('Nomor dokumen wajib diisi.');
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Judul dokumen wajib diisi.');
      return;
    }
    if (mode === 'create' && !selectedFileName) {
      setErrorMsg('Silakan pilih berkas dokumen yang akan diunggah.');
      return;
    }

    // Format current date e.g. "17 Sep 2026"
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const formattedDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const docData: Partial<LearningDocument> = {
      ...(initialDocument ? { id: initialDocument.id } : {}),
      docNumber: docNumber.trim(),
      title: title.trim(),
      docType,
      company,
      division: division.trim().toUpperCase() || 'BPI',
      revision: revision.trim() || '00',
      lastUpdated: formattedDate,
      isConfidential,
      fileSize: selectedFileSize || '1.2 MB',
      uploadedBy: 'Shabuama Palaska',
    };

    onSave(docData, mode);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Navigation & Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Knowledge Management</span>
        </button>

        <span className="text-xs text-gray-400">
          Status Form: <span className="font-semibold text-emerald-700">{mode === 'create' ? 'Unggah Baru' : 'Mode Revisi'}</span>
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              mode === 'revision' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {mode === 'revision' ? <RefreshCw className="w-5 h-5" /> : <UploadCloud className="w-6 h-6" />}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {mode === 'create' ? 'Unggah Dokumen' : `Revisi Dokumen: ${initialDocument?.docNumber || ''}`}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {mode === 'create'
                  ? 'Unggah dokumen operasional, formulir, atau standard operating procedure (SOP) baru.'
                  : `Perbarui versi dokumen untuk "${initialDocument?.title}". Versi sebelumnya: Rev. ${initialDocument?.revision}.`}
              </p>
            </div>
          </div>

          {mode === 'revision' && (
            <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
              Revisi Dokumen
            </span>
          )}
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* File Dropzone matching Visily design */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Berkas Dokumen {mode === 'revision' ? '(Versi Revisi Baru)' : ''}
            </label>
            <div className="border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-2xl p-8 transition-colors bg-gray-50/50 flex flex-col items-center justify-center text-center relative group">
              <input
                type="file"
                id="file-upload-input"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>

              {selectedFileName ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
                    <FileText className="w-4 h-4" />
                    <span>{selectedFileName}</span>
                    <span className="text-xs text-gray-400 font-normal">({selectedFileSize})</span>
                  </div>
                  <p className="text-xs text-emerald-600">
                    Berkas siap disimpan. Klik atau seret file lain untuk mengganti.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-gray-800">
                    Pilih File <span className="font-normal text-gray-500">atau tarik dokumen ke sini</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Mendukung format PDF, DOCX, XLSX (Maks. 25MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields Grid matching Visily */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Nomor Dokumen */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Nomor Dokumen <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                placeholder="Contoh: FRM-BIS-BPI-01"
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20 focus:border-[#006C4E] transition-all"
                required
              />
            </div>

            {/* Tipe Dokumen */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Tipe Dokumen <span className="text-red-500">*</span>
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as DocumentType)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20 focus:border-[#006C4E] transition-all cursor-pointer"
              >
                <option value="FORM">FORM (Formulir)</option>
                <option value="SOP">SOP (Standard Operating Procedure)</option>
                <option value="WI">WI (Work Instruction)</option>
                <option value="JOBAID">JOBAID (Panduan Kerja)</option>
                <option value="POLICY">POLICY (Kebijakan)</option>
                <option value="MANUAL">MANUAL (Pedoman Teknis)</option>
              </select>
            </div>

            {/* Judul Dokumen (Full Width) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Judul Dokumen <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul lengkap dokumen..."
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20 focus:border-[#006C4E] transition-all"
                required
              />
            </div>

            {/* Perusahaan */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Perusahaan <span className="text-red-500">*</span>
              </label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value as 'CKB' | 'ATR' | 'ABM')}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20 focus:border-[#006C4E] transition-all cursor-pointer"
              >
                <option value="CKB">CKB (PT Cipta Kridha Bahari)</option>
                <option value="ATR">ATR (Alfa Trans Raya)</option>
                <option value="ABM">ABM (ABM Investama)</option>
              </select>
            </div>

            {/* Divisi */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Divisi / Bagian <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                placeholder="Contoh: BPI, COM, FIN, WSM, OPS"
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20 focus:border-[#006C4E] transition-all"
                required
              />
            </div>

            {/* Nomor Revisi */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Nomor Revisi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={revision}
                onChange={(e) => setRevision(e.target.value)}
                placeholder="Contoh: 00, 01, 02"
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20 focus:border-[#006C4E] transition-all"
                required
              />
              <span className="text-[11px] text-gray-400 mt-1 block">
                {mode === 'revision' ? `Versi baru dinaikkan dari sebelumnya.` : `Revisi default dokumen baru biasanya '00'.`}
              </span>
            </div>

            {/* Dokumen Rahasia Checkbox */}
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isConfidential}
                  onChange={(e) => setIsConfidential(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                    <span>Tandai Sebagai Dokumen Rahasia (Confidential)</span>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Hanya dapat diakses oleh pihak yang berwenang.
                  </div>
                </div>
              </label>
            </div>

            {/* Catatan Perubahan (Full Width) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                {mode === 'revision' ? 'Catatan Perubahan Revisi' : 'Perubahan Terakhir / Keterangan Dokumen'}
              </label>
              <textarea
                value={revisionNotes}
                onChange={(e) => setRevisionNotes(e.target.value)}
                rows={3}
                placeholder={
                  mode === 'revision'
                    ? 'Jelaskan poin-poin klausul atau konten yang diperbarui pada revisi ini...'
                    : 'Keterangan tambahan mengenai ruang lingkup dokumen...'
                }
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20 focus:border-[#006C4E] transition-all resize-none"
              />
            </div>
          </div>

          {/* Form Actions matching Visily buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#006C4E] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{mode === 'create' ? 'Kirim Dokumen' : 'Simpan Revisi Dokumen'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
