import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Play, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VideoPlayerModal } from '../components/video/VideoPlayerModal';
import { VideoItem } from '../types/video';

export const VideoPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const videos: VideoItem[] = [
    {
      id: 1,
      title: 'Company Profile & Sejarah Ekspedisi CKB Logistics',
      duration: '05:30',
      category: 'Profil Korporat',
      thumbnail: '/assets/video/1.jpeg',
    },
    {
      id: 2,
      title: 'Solusi Logistik Terpadu Rantai Pasok Tambang & Energi',
      duration: '08:15',
      category: 'Operasional',
      thumbnail: '/assets/video/2.jpg',
    },
    {
      id: 3,
      title: 'Standar Operasional Warehouse Manajemen & Keselamatan Kerja',
      duration: '04:45',
      category: 'HSE & K3',
      thumbnail: '/assets/video/3.jpg',
    },
    {
      id: 4,
      title: 'Operasional Transshipment & Armada Laut PT Alfa Trans Raya',
      duration: '06:20',
      category: 'Armada Kapal',
      thumbnail: '/assets/video/4.jpg',
    },
    {
      id: 5,
      title: 'Inovasi Digitalisasi Custom Clearance PPJK CKB 2024',
      duration: '03:50',
      category: 'Inovasi Digital',
      thumbnail: '/assets/video/1.jpeg',
    },
    {
      id: 6,
      title: 'Pusat Logistik Berikat (PLB) CKB di Seluruh Hub Strategis',
      duration: '07:10',
      category: 'Gudang & Hub',
      thumbnail: '/assets/video/2.jpg',
    },
    {
      id: 7,
      title: 'Dokumentasi Ekspedisi Pengiriman Alat Berat Pedalaman Papua',
      duration: '09:00',
      category: 'Proyek Khusus',
      thumbnail: '/assets/video/3.jpg',
    },
    {
      id: 8,
      title: 'Jingle Resmi & Budaya Kerja Insan PT Cipta Kridha Bahari',
      duration: '03:15',
      category: 'Budaya Kerja',
      thumbnail: '/assets/video/4.jpg',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />

      <main className="flex-grow max-w-[1520px] mx-auto px-2 sm:px-4 lg:px-5 py-8 w-full">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#006C4E] hover:underline mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1D2128] tracking-tight leading-[1.2] mb-2.5">
            Video
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed">
            Kumpulan dokumentasi video operasional, profil perusahaan, panduan keselamatan kerja, dan portofolio layanan logistik terintegrasi CKB Logistics.
          </p>
        </div>

        {/* Uniform Video Cards Grid (3 columns per row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16 sm:mb-20">
          {videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#006C4E]/30 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col h-full"
            >
              {/* Image Thumbnail with Center Play Button */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to default background if image fails
                    const target = e.currentTarget;
                    target.src = '/assets/ckb-background-login.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#006C4E]/90 backdrop-blur-xs text-white text-[11px] font-extrabold rounded-lg uppercase tracking-wider shadow-xs">
                  {vid.category}
                </span>

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/75 backdrop-blur-xs text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-xs">
                  <Clock className="w-3 h-3" />
                  <span>{vid.duration}</span>
                </span>

                {/* Circular Emerald Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#006C4E] text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#00553d] transition-all duration-300">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-bold text-base text-[#1D2128] group-hover:text-[#006C4E] transition-colors leading-snug line-clamp-2 mb-1.5">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Dokumentasi resmi PT Cipta Kridha Bahari
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Video Modal Player */}
      <VideoPlayerModal
        isOpen={!!activeVideo}
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      <Footer />
    </div>
  );
};
