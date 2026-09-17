import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Search, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NewsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const recentNews = [
    {
      id: 1,
      title: 'Optimalisasi Terminal Logistik & Transshipment di Wilayah Timur',
      date: 'May 20, 2026',
      readTime: '4 min read',
    },
    {
      id: 2,
      title: 'Penerapan Inisiatif ESG & Pengurangan Jejak Karbon Armada CKB',
      date: 'May 18, 2026',
      readTime: '3 min read',
    },
    {
      id: 3,
      title: 'Peluncuran Fitur Baru Monitoring Muatan Berbasis IoT',
      date: 'May 14, 2026',
      readTime: '5 min read',
    },
    {
      id: 4,
      title: 'Standarisasi SOP Warehouse & Sistem Keselamatan Kerja HSE 2026',
      date: 'May 10, 2026',
      readTime: '6 min read',
    },
    {
      id: 5,
      title: 'Kerjasama Strategis Pengiriman Logistik Pertambangan & Energi',
      date: 'May 05, 2026',
      readTime: '4 min read',
    },
  ];

  const filteredNews = recentNews.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />

      <main className="flex-grow max-w-[1520px] mx-auto px-2 sm:px-4 lg:px-5 py-8 w-full">
        {/* Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#006C4E] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Portal Berita Resmi CKB
          </div>
        </div>

        {/* Main Grid: Left Article Content, Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16 sm:mb-20">
          
          {/* Left Column: Full Featured Article */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
            {/* Featured Image Graphic */}
            <div className="w-full h-72 sm:h-96 rounded-2xl bg-gradient-to-r from-emerald-800 to-slate-900 relative overflow-hidden mb-8 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                  backgroundImage: `url('/assets/ckb-background-login.png')`,
                }}
              />
              <div className="relative z-10 text-center text-white px-6">
                <span className="px-3.5 py-1 bg-[#EFB034] text-slate-900 text-xs font-black rounded-md uppercase tracking-wider inline-block mb-3">
                  PENGHARGAAN & PRESTASI
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                  CKB Logistics Raih Penghargaan PPJK Terbaik Tahun 2024
                </h2>
              </div>
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-gray-500 border-b border-gray-100 pb-4 mb-6">
              <span className="flex items-center gap-1.5 text-[#006C4E]">
                <Calendar className="w-4 h-4" />
                <span>15 Mei 2024</span>
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>Admin Komunikasi Korporat</span>
              </span>
              <span className="text-gray-400">•</span>
              <span>Kategori: Kepabeanan & Layanan Logistik</span>
            </div>

            {/* Article Body */}
            <article className="prose prose-slate max-w-none text-[#1D2128] space-y-5 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-base sm:text-lg text-gray-900 leading-relaxed">
                Jakarta — PT Cipta Kridha Bahari (CKB Logistics), anak perusahaan PT ABM Investama Tbk (ABMM), berhasil meraih penghargaan bergengsi sebagai Pengusaha Pengurusan Jasa Kepabeanan (PPJK) Terbaik Tahun 2024. Pencapaian ini menegaskan dedikasi perseroan dalam menghadirkan kepatuhan regulasi kepabeanan, transparansi operasional, dan efisiensi waktu bongkar muat.
              </p>

              <p className="text-gray-700">
                Layanan kepabeanan merupakan pilar penting dalam rantai pasok global. Dengan regulasi internasional dan domestik yang dinamis, integrasi sistem teknologi informasi yang mutakhir memungkinkan proses clearance dokumen menjadi lebih terarah, akurat, dan minim hambatan.
              </p>

              <div className="p-5 my-5 bg-emerald-50/60 border-l-4 border-[#006C4E] rounded-r-xl">
                <p className="text-xs sm:text-sm font-semibold text-emerald-950 italic">
                  &ldquo;Penghargaan ini adalah bukti nyata kerja keras seluruh insan CKB Logistics yang tak henti-hentinya mengedepankan integritas dan inovasi pelayanan kepabeanan di seluruh pelabuhan dan bandara strategis nusantara.&rdquo;
                </p>
                <span className="block mt-1.5 text-xs font-bold text-[#006C4E]">
                  — Manajemen Operasional CKB Logistics
                </span>
              </div>

              <p className="text-gray-700">
                Seiring dengan modernisasi portal CKB versi 2.0, perseroan juga mempercepat implementasi otomasi sistem verifikasi faktur, integrasi manifest kapal dan kargo udara, serta pelacakan status kontainer secara real-time yang dapat diakses oleh seluruh mitra korporasi.
              </p>

              <p className="text-gray-700">
                Kedepan, CKB Logistics akan terus memperluas jaringan gudang berikat dan pusat logistik berikat (PLB) di kawasan Indonesia Timur untuk mendukung percepatan industrialisasi nasional dan hilirisasi energi.
              </p>
            </article>

            {/* Bottom Sharing & Tags */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Tags:</span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">Logistics</span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">PPJK</span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">Customs</span>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Tautan artikel berhasil disalin!');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Salin Tautan</span>
              </button>
            </div>
          </div>

          {/* Right Column: Search & News List (as in visily-news-selengkapnya.png) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-24">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari berita atau pengumuman..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D2128] focus:outline-none focus:ring-2 focus:ring-[#006C4E] transition-all"
                />
              </div>

              {/* Section Title */}
              <h3 className="font-bold text-sm text-[#1D2128] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                Berita Terkini Lainnya
              </h3>

              {/* News Item List */}
              <div className="space-y-4">
                {filteredNews.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl hover:bg-[#F8F9FA] border border-transparent hover:border-gray-200 transition-all cursor-pointer group flex gap-3"
                  >
                    <div className="w-16 h-16 rounded-lg bg-emerald-900/10 text-[#006C4E] flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#006C4E] group-hover:text-white transition-colors">
                      CKB
                    </div>
                    <div className="flex flex-col justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-[#1D2128] group-hover:text-[#006C4E] transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredNews.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">
                    Tidak ditemukan berita dengan kata kunci tersebut.
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
