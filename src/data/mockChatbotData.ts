import { ChatProject, ChatMessage, RecentHistoryItem, DocumentReference } from '../types/chatbot';

export const mockDefaultDocument: DocumentReference = {
  id: 'doc-001',
  title: 'Jobaid Procure to Pay Process Ramco',
  type: 'Jobaid',
  fileUrl: '/docs/Jobaid-Procure-to-Pay-Process-Ramco.pdf',
  fileSize: '2.4 MB',
  revision: 'Rev. 02',
  division: 'PROCUREMENT & FINANCE',
  author: 'Tim BPI CKB Logistics',
  lastUpdated: '2026-08-15',
};

export const mockPdfDocument: DocumentReference = {
  id: 'doc-002',
  title: 'PMWI Procurement 2026 Updated.pdf',
  type: 'Standard Operating Procedure (SOP)',
  fileUrl: '/docs/PMWI-Procurement-2026-Updated.pdf',
  fileSize: '3.8 MB',
  revision: 'Rev. 04',
  division: 'SUPPLY CHAIN & LOGISTICS',
  author: 'Divisi Standarisasi Mutu CKB',
  lastUpdated: '2026-09-01',
};

export const mockInitialProjects: ChatProject[] = [
  {
    id: 'proj-01',
    name: 'Revenue Leakage',
    isStarred: true,
    lastUpdated: '2 menit lalu',
    description: 'Investigasi potensi kebocoran pendapatan operasional logistik darat dan transshipment.',
    promptSuggestions: [
      'Analisis invoice tertunda rute Balikpapan',
      'Cek perbedaan tarif freight forwarder Q2',
      'Audit rekonsiliasi kas operasional kapal',
    ],
  },
  {
    id: 'proj-02',
    name: 'Jingle Cipta Krida Bahari',
    isStarred: true,
    lastUpdated: '1 jam lalu',
    description: 'Brainstorming lirik, aransemen, dan konsep musik branding perusahaan.',
    promptSuggestions: [
      'Aransemen yang cocok',
      'Lirik yang futuristik',
      'Alunan musik yang cocok sebagai jingle',
      'Slogan korporat yang berima untuk bait penutup',
    ],
  },
  {
    id: 'proj-03',
    name: 'Special Project Jasum',
    isStarred: true,
    lastUpdated: '1 hari lalu',
    description: 'Dokumentasi dan pengurusan perizinan ekspedisi kargo khusus rute Jawa-Sumatera.',
    promptSuggestions: [
      'Jadwal penyeberangan kapal Ro-Ro Merak-Bakauheni',
      'Regulasi tonase muatan armada multi-axle',
      'Surat izin jalan muatan alat berat Jasum',
    ],
  },
  {
    id: 'proj-04',
    name: 'Analisis Cost Leakage',
    isStarred: false,
    lastUpdated: '3 hari lalu',
    description: 'Audit komparatif biaya bahan bakar armada trailer dan efisiensi konsumsi BBM rute reguler.',
  },
  {
    id: 'proj-05',
    name: 'Customer Portal',
    isStarred: false,
    lastUpdated: '5 hari lalu',
    description: 'Integrasi modul pelacakan kontainer dan pembaruan antarmuka portal klien eksternal.',
  },
  {
    id: 'proj-06',
    name: 'Profitability Report',
    isStarred: false,
    lastUpdated: '1 minggu lalu',
    description: 'Laporan margin keuntungan bulanan lintas lini bisnis logistik udara, laut, dan gudang berikat.',
  },
  {
    id: 'proj-07',
    name: 'TCA',
    isStarred: false,
    lastUpdated: '2 minggu lalu',
    description: 'Time & Cost Analysis per rute ekspedisi domestik dan internasional.',
  },
];

export const mockRecentHistory: RecentHistoryItem[] = [
  { id: 'hist-01', title: 'Standar Operasional Procurement', timestamp: 'Beberapa waktu lalu' },
  { id: 'hist-02', title: 'Standar Operasional Operations', timestamp: '3 hari lalu' },
  { id: 'hist-03', title: 'Kebijakan Cuti Karyawan', timestamp: '1 minggu lalu' },
  { id: 'hist-04', title: 'Dokumentasi Cipta Kridha Bahari', timestamp: '28 Juli 2026' },
  { id: 'hist-05', title: 'Prestasi Cipta Kridha Bahari', timestamp: '27 Juli 2026' },
  { id: 'hist-06', title: 'Perbedaan Direct dan Indirect', timestamp: '3 Juni 2026' },
  { id: 'hist-07', title: 'Peraturan Berpakaian di CKB', timestamp: '14 Februari 2026' },
];

export const mockInitialMessages: ChatMessage[] = [
  {
    id: 'msg-01',
    sender: 'assistant',
    text: 'Selamat datang di CKB Portal Assistant. Saya siap membantu Anda dalam mencari dokumen, jobaid, atau pertanyaan seputar Cipta Kridha Bahari!',
    timestamp: '15:00 WIB',
  },
  {
    id: 'msg-02',
    sender: 'user',
    text: 'Tolong carikan dokumen yang membahas terkait procure to pay process pada Ramco?',
    timestamp: '15:00 WIB',
  },
  {
    id: 'msg-03',
    sender: 'assistant',
    text: 'Berikut jobaid yang Anda butuhkan:',
    timestamp: '15:00 WIB',
    referencedDoc: mockDefaultDocument,
    actionSuggestions: ['Lihat SOP', 'Formulir Pendukung', 'Dokumen Terkait', 'Panduan Terkait'],
  },
];
