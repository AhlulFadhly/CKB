import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import {
  Calendar,
  Share2,
  Play,
  ArrowRight,
  Database,
  Users,
  LifeBuoy,
  GraduationCap,
  CreditCard,
  Bot,
  CalendarCheck2,
  FileSpreadsheet,
  Zap,
} from 'lucide-react';
import { InlineChatbotWidget } from '../components/chatbot/InlineChatbotWidget';
import { VideoPlayerModal } from '../components/video/VideoPlayerModal';
import { VideoItem } from '../types/video';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isChatbotActive, setIsChatbotActive] = useState(false);
  const [activeCoreTab, setActiveCoreTab] = useState('CONTINUOUS DEVELOPMENT');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const coreValueTabs = [
    'INTEGRITY',
    'CONTINUOUS DEVELOPMENT',
    'EXCELLENCE',
    'PROACTIVE',
    'ACCOUNTABILITY',
    'TEAMWORK'
  ];

  const quickApps = [
    { name: 'ERP System', icon: Database, desc: 'Enterprise Resource Planning', route: '/' },
    { name: 'HRIS System', icon: Users, desc: 'Human Resource Information', route: '/' },
    { name: 'Helpdesk Ticket', icon: LifeBuoy, desc: 'IT & Operational Support', route: '/' },
    { name: 'Learning Center', icon: GraduationCap, desc: 'Knowledge & Documents', route: '/learning-center' },
    { name: 'Cash Advance', icon: CreditCard, desc: 'Operational Finance Claims', route: '/' },
    { name: 'Chatbot', icon: Bot, desc: 'Smart Assistant AI', route: '/chatbot' },
    { name: 'FASS Web Booking', icon: CalendarCheck2, desc: 'Fleet & Cargo Booking', route: '/' },
    { name: 'Report Manager', icon: FileSpreadsheet, desc: 'Analytics & Management Reports', route: '/' },
  ];

  const handleAppClick = (app: typeof quickApps[0]) => {
    if (app.name === 'Chatbot') {
      setIsChatbotActive((prev) => !prev);
      return;
    }
    if (app.route.startsWith('http')) {
      window.open(app.route, '_blank', 'noopener,noreferrer');
    } else {
      navigate(app.route);
    }
  };

  const handleShareNews = () => {
    navigator.clipboard?.writeText(window.location.origin + '/news');
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleOpenVideo = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-[1520px] mx-auto px-2 sm:px-4 lg:px-5 py-8 w-full">
        
        {/* 1. Hero Greeting Section */}
        <section className="mb-16 sm:mb-20 mt-16 sm:mt-20">
          {/* Hero Text */}
          <div className="mb-14 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-[80px] font-bold text-black tracking-tight leading-[1.15] max-w-[1100px] mb-14 sm:mb-16">
              Welcome to <span className="text-[#006C4E]">CKB Portal</span>,
              <br />
              <span className="text-[#006C4E]">Shabuama Palaska</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-500 max-w-[1250px] leading-relaxed">
              Solusi digital terintegrasi untuk mendukung efisiensi operasional dan kolaborasi tim CKB Logistics.
              Akses semua layanan perusahaan dalam satu genggaman.
            </p>
          </div>

          {/* 4 Feature Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#006C4E]/30 transition-all duration-300 group flex flex-col justify-between min-h-[330px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#006C4E]/10 flex items-center justify-center text-[#006C4E] mb-4 group-hover:scale-105 group-hover:bg-[#006C4E] group-hover:text-white transition-all duration-300">
                  <Database className="w-6 h-6" />
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#006C4E] transition-colors">
                  Fleet Operations
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  Pemantauan armada darat, laut, dan udara secara real-time.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#006C4E]/30 transition-all duration-300 group flex flex-col justify-between min-h-[330px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#006C4E]/10 flex items-center justify-center text-[#006C4E] mb-4 group-hover:scale-105 group-hover:bg-[#006C4E] group-hover:text-white transition-all duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#006C4E] transition-colors">
                  Knowledge Hub
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  Repositori terpusat SOP, Jobaid, dan Prosedur Resmi CKB.
                </p>
              </div>
            </div>

            <div
              onClick={() => setIsChatbotActive(true)}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#006C4E]/30 transition-all duration-300 group flex flex-col justify-between min-h-[330px] cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EFB034]/20 flex items-center justify-center text-[#EFB034] mb-4 group-hover:scale-105 group-hover:bg-[#EFB034] group-hover:text-slate-900 transition-all duration-300">
                  <Bot className="w-6 h-6 text-[#006C4E] group-hover:text-slate-900" />
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#006C4E] transition-colors">
                  Smart Chatbot
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  Asisten cerdas berbasis NLP untuk konsultasi tata kelola kerja.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#006C4E]/30 transition-all duration-300 group flex flex-col justify-between min-h-[330px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#006C4E]/10 flex items-center justify-center text-[#006C4E] mb-4 group-hover:scale-105 group-hover:bg-[#006C4E] group-hover:text-white transition-all duration-300">
                  <Zap className="w-6 h-6" />
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#006C4E] transition-colors">
                  Integrated Portal
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  Single Sign-On menghubungkan seluruh sistem ERP & HRIS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Featured News Highlight Section */}
        <section className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Visual Thumbnail Column */}
            <div className="lg:col-span-6 min-h-[320px] lg:min-h-[460px] rounded-3xl relative bg-gradient-to-tr from-[#006C4E] to-[#1D2128] overflow-hidden flex flex-col justify-end p-8 sm:p-10 lg:p-12 shadow-sm">
              <div
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/assets/ckb-background-login.png')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 text-white max-w-lg">
                <div className="inline-block px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold tracking-wider uppercase mb-3">
                  SOROTAN UTAMA
                </div>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-2">
                  Dedikasi Keunggulan Logistik Terpadu Nusantara
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  Menghubungkan rantai pasok Indonesia dari Sabang sampai Merauke dengan standar kepabeanan terbaik.
                </p>
              </div>
            </div>

            {/* Article Detail Column */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-100 shadow-sm p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#006C4E]/10 text-[#006C4E] text-xs font-bold rounded-md uppercase tracking-wider">
                    PRESTASI
                  </span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>15 Mei 2024</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D2128] leading-tight mb-3">
                  CKB Logistics Raih Penghargaan PPJK Terbaik Tahun 2024
                </h2>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  Pencapaian luar biasa ini merupakan bukti dedikasi tim dalam memberikan layanan kepabeanan yang efisien, transparan, dan terpercaya bagi seluruh mitra bisnis kami.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#006C4E]/10 text-[#006C4E] text-xs font-bold shrink-0 mt-0.5">
                      01
                    </span>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">Optimalisasi proses audit digital untuk transparansi penuh.</p>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#006C4E]/10 text-[#006C4E] text-xs font-bold shrink-0 mt-0.5">
                      02
                    </span>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">Integrasi sistem otomatisasi gudang yang mutakhir.</p>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#006C4E]/10 text-[#006C4E] text-xs font-bold shrink-0 mt-0.5">
                      03
                    </span>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">Komitmen tinggi terhadap kepatuhan regulasi logistik global.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                <button
                  onClick={() => navigate('/news')}
                  className="flex items-center gap-2 px-6 py-3 bg-[#006C4E] hover:bg-[#00553d] text-white font-bold text-sm rounded-xl transition-all shadow-sm active:scale-95"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleShareNews}
                  className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors relative"
                  title="Bagikan tautan berita"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {copiedNotification && (
                  <span className="text-xs font-semibold text-[#006C4E] animate-fadeIn">
                    Tautan berhasil disalin!
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Video Showcase Section */}
        <section className="mb-16 sm:mb-20">
          <div className="flex items-center justify-between mb-10 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D2128] leading-tight mb-1.5">Video Dokumentasi</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Kegiatan operasional, profil perusahaan, dan pencapaian CKB</p>
            </div>
            <button
              onClick={() => navigate('/video')}
              className="text-sm font-bold text-[#006C4E] hover:underline flex items-center gap-1.5"
            >
              <span>Lihat Semua Video</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Big Featured Video Player Card */}
          <div
            onClick={() =>
              handleOpenVideo({
                id: 'featured',
                title: 'Company Profile & Operasional Logistik CKB 2024',
                duration: '05:30',
                category: 'Profil Korporat',
                thumbnail: '/assets/ckb-background-login.png',
              })
            }
            className="w-full h-64 sm:h-80 lg:h-96 rounded-3xl bg-slate-800 relative overflow-hidden cursor-pointer group shadow-lg flex items-center justify-center mb-10 sm:mb-12"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url('/assets/ckb-background-login.png')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Green Play Button */}
            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#006C4E] text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
            </div>

            <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 z-10 text-white max-w-xl">
              <span className="px-3 py-1 bg-[#EFB034] text-slate-900 text-xs font-bold rounded-md uppercase tracking-wider mb-2 inline-block">
                FEATURED VIDEO
              </span>
              <h3 className="text-lg sm:text-xl font-bold leading-snug mb-1">Company Profile & Operasional Logistik CKB 2024</h3>
              <p className="text-xs sm:text-sm text-white/80">Klik untuk memutar video dokumentasi resmi</p>
            </div>
          </div>

          {/* 4 Video Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                id: 1,
                title: 'Inovasi Digital Warehouse Management',
                duration: '04:15',
                category: 'Inovasi Digital',
                thumbnail: '/assets/video/1.jpeg',
              },
              {
                id: 2,
                title: 'Armada Kapal Laut & Transshipment ATR',
                duration: '03:40',
                category: 'Armada Laut',
                thumbnail: '/assets/video/4.jpg',
              },
              {
                id: 3,
                title: 'Keselamatan Kerja (HSE) di Pelabuhan',
                duration: '05:12',
                category: 'HSE & K3',
                thumbnail: '/assets/video/3.jpg',
              },
              {
                id: 4,
                title: 'Ekspansi Jaringan Logistik Timur Indonesia',
                duration: '06:00',
                category: 'Operasional',
                thumbnail: '/assets/video/2.jpg',
              },
            ].map((vid) => (
              <div
                key={vid.id}
                onClick={() => handleOpenVideo(vid)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-32 sm:h-36 rounded-xl bg-slate-900 relative overflow-hidden flex items-center justify-center mb-3">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = '/assets/ckb-background-login.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#006C4E] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current translate-x-0.5" />
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/75 backdrop-blur-xs text-white text-xs font-bold rounded">
                      {vid.duration}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-[#1D2128] group-hover:text-[#006C4E] transition-colors line-clamp-2 leading-snug">
                    {vid.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Akses Cepat Portal Section */}
        <section id="akses-cepat-section" className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Akses Cepat Portal Title/Info + 8 Apps */}
            <div
              className={`flex flex-col justify-between ${
                isChatbotActive ? 'lg:col-span-7' : 'lg:col-span-12'
              }`}
            >
              {/* Header Akses Cepat Portal */}
              <div className="max-w-3xl mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#006C4E]/10 text-[#006C4E] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Zap className="w-3.5 h-3.5" />
                  <span>AKSES CEPAT PORTAL</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D2128] leading-tight mb-3">
                  Gerbang mudah menuju semua sistem Anda.
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  Selamat datang kembali, Budi. Temukan semua alat kerja dan sistem internal perusahaan dalam satu platform terpusat yang aman dan efisien.
                </p>
                <div className="flex flex-wrap gap-3.5">
                  <button
                    onClick={() => navigate('/application')}
                    className="flex items-center gap-2 px-5 py-2.5 sm:py-3 bg-[#006C4E] hover:bg-[#00553d] text-white font-bold text-sm rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    <span>Mulai Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert('Panduan Pengguna CKB Portal dapat diakses melalui Learning Center.')}
                    className="px-5 py-2.5 sm:py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm rounded-xl border border-gray-200 transition-colors shadow-xs"
                  >
                    Panduan Pengguna
                  </button>
                </div>
              </div>

              {/* 8 Quick App Grid Container */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 lg:p-12">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 sm:gap-y-16 gap-x-6 sm:gap-x-10">
                  {quickApps.map((app, idx) => {
                    const IconComponent = app.icon;
                    const isActive = app.name === 'Chatbot' && isChatbotActive;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleAppClick(app)}
                        className="flex flex-col items-center text-center cursor-pointer group"
                      >
                        <div
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 shadow-xs transition-colors duration-200 ${
                            isActive
                              ? 'bg-[#006C4E] text-white ring-2 ring-[#006C4E]/40'
                              : 'bg-[#006C4E]/10 text-[#006C4E] group-hover:bg-[#006C4E] group-hover:text-white'
                          }`}
                        >
                          <IconComponent className="w-8 h-8 sm:w-9 sm:h-9" />
                        </div>
                        <span
                          className={`font-bold text-base sm:text-lg transition-colors leading-snug ${
                            isActive ? 'text-[#006C4E]' : 'text-[#1D2128] group-hover:text-[#006C4E]'
                          }`}
                        >
                          {app.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: In-Section CKB Chatbot Card spanning full section height */}
            {isChatbotActive && (
              <div className="lg:col-span-5 h-[560px] lg:h-auto lg:relative min-h-0 flex flex-col">
                <div className="h-full lg:absolute lg:inset-0 flex flex-col">
                  <InlineChatbotWidget
                    onClose={() => setIsChatbotActive(false)}
                    onMaximize={() => navigate('/chatbot')}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. Core Values Section */}
        <section className="mb-16 sm:mb-20 relative">
          <div className="text-center mb-10 sm:mb-12 relative">
            <div className="text-center font-black text-5xl sm:text-7xl lg:text-8xl text-gray-200/60 uppercase tracking-widest select-none pointer-events-none mb-3">
              CORE VALUE
            </div>
            
            {/* Core Values Tab Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 border-b border-gray-200 pb-3">
              {coreValueTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCoreTab(tab)}
                  className={`text-xs sm:text-sm font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                    activeCoreTab === tab
                      ? 'border-[#006C4E] text-[#006C4E]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Core Mission Quote Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <p className="text-sm sm:text-base font-medium text-gray-800 leading-relaxed italic mb-6">
                &ldquo;Secara terus-menerus menciptakan lapangan kerja yang layak dan berkualitas bagi sebanyak mungkin rakyat Indonesia.&rdquo;
              </p>
              <p className="mt-auto pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-400 leading-relaxed">
                To continuously create meaningful and challenging job opportunities for as many Indonesians as possible.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <p className="text-sm sm:text-base font-medium text-gray-800 leading-relaxed italic mb-6">
                &ldquo;Selalu memastikan pertumbuhan bisnis yang berkelanjutan dan menguntungkan yang akan memaksimalkan nilai pemegang saham.&rdquo;
              </p>
              <p className="mt-auto pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-400 leading-relaxed">
                To ensure sustainable and profitable growth that maximizes shareholder value.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <p className="text-sm sm:text-base font-medium text-gray-800 leading-relaxed italic mb-6">
                &ldquo;Senantiasa menyediakan solusi-solusi bernilai tambah yang akan mengoptimalkan kepuasan pelanggan.&rdquo;
              </p>
              <p className="mt-auto pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-400 leading-relaxed">
                To provide value-added solutions that will optimize customer satisfaction.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <p className="text-sm sm:text-base font-medium text-gray-800 leading-relaxed italic mb-6">
                &ldquo;Secara aktif terlibat dalam masyarakat sebagai warga korporasi yang baik.&rdquo;
              </p>
              <p className="mt-auto pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-400 leading-relaxed">
                To actively engage within communities as good corporate citizens.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Video Modal Player */}
      <VideoPlayerModal
        isOpen={!!selectedVideo}
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <Footer />
    </div>
  );
};
