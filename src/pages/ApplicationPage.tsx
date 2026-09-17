import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import {
  Database,
  Users,
  LifeBuoy,
  GraduationCap,
  CreditCard,
  Bot,
  CalendarCheck2,
  FileSpreadsheet,
  Zap,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { InlineChatbotWidget } from '../components/chatbot/InlineChatbotWidget';

export const ApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isChatbotActive, setIsChatbotActive] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />

      <main className="flex-grow max-w-[1520px] mx-auto px-2 sm:px-4 lg:px-5 py-8 w-full">
        {/* Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#006C4E] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:block">
            Portal Aplikasi Resmi CKB
          </div>
        </div>

        {/* Main Section with Dynamic Side-by-Side Shift matching visily-minimize-chatbot.png */}
        <section className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Akses Cepat Portal Title/Info + 8 Apps */}
            <div
              className={`flex flex-col justify-between ${
                isChatbotActive ? 'lg:col-span-7' : 'lg:col-span-12'
              }`}
            >
              {/* Header Title & Info */}
              <div className="max-w-3xl mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#006C4E]/10 text-[#006C4E] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <Zap className="w-3.5 h-3.5" />
                  <span>AKSES CEPAT PORTAL</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D2128] leading-tight mb-3">
                  Gerbang mudah menuju semua sistem Anda.
                </h1>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  Selamat datang kembali, Budi. Temukan semua alat kerja dan sistem internal perusahaan dalam satu platform terpusat yang aman dan efisien.
                </p>

                <div className="flex flex-wrap gap-3.5">
                  <button
                    onClick={() => {
                      document.getElementById('app-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
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

              {/* 8 Quick App Grid Container matching Visily design */}
              <div
                id="app-grid"
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 lg:p-12"
              >
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

            {/* Right Column: In-Section CKB Chatbot Card spanning full section height with internal scroll */}
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
      </main>

      <Footer />
    </div>
  );
};

export default ApplicationPage;
