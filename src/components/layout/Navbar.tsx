import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close popup on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !document.getElementById('hamburger-menu-btn')?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('ckb_auth');
    navigate('/login');
  };

  return (
    <header
      className="sticky top-0 z-40 border-b border-gray-200/60 shadow-xs transition-colors bg-[#FFFFFF]/60 backdrop-blur-[8px]"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-[1520px] mx-auto px-2 sm:px-4 lg:px-5 h-20 sm:h-24 flex items-center justify-between">
        {/* Logo CKB */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
          className="flex items-center gap-3 group"
        >
          <img
            src="/assets/logo-ckb.svg"
            alt="CKB Logistics Logo"
            className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              // Fallback text if svg fails to load
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.ckb-text-logo')) {
                const fallback = document.createElement('span');
                fallback.className = 'ckb-text-logo text-3xl sm:text-4xl font-extrabold italic tracking-wider text-[#006C4E]';
                fallback.innerText = 'CKB';
                parent.appendChild(fallback);
              }
            }}
          />
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Optional Direct Portal switcher / Logout */}
          <button
            onClick={handleLogout}
            title="Keluar / Ganti Akun"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>

          {/* Hamburger Menu & Dropdown Popup Wrapper */}
          <div className="relative">
            <button
              id="hamburger-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-xl text-gray-800 hover:text-[#006C4E] hover:bg-gray-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#006C4E]/20"
              aria-label="Buka Menu"
            >
              <Menu className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>

            {/* Pop-up Menu Card directly below navigation matching visily-container (3).png */}
            <div
              ref={menuRef}
              className={`absolute right-0 top-[calc(100%+14px)] sm:top-[calc(100%+20px)] w-64 sm:w-72 bg-white rounded-2xl shadow-2xl border border-gray-100/90 p-7 z-50 transition-all duration-300 ease-out origin-top-right ${
                isMenuOpen
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                  : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'
              }`}
            >
              {/* Menu List matching Visily styling */}
              <nav className="flex flex-col space-y-6 sm:space-y-7">
                {/* 1. News */}
                <Link
                  to="/news"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  }}
                  className={`text-lg sm:text-xl font-bold transition-colors ${
                    location.pathname === '/news'
                      ? 'text-[#006C4E]'
                      : 'text-gray-900 hover:text-[#006C4E]'
                  }`}
                >
                  News
                </Link>

                {/* 2. Application */}
                <Link
                  to="/application"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  }}
                  className={`text-lg sm:text-xl font-bold transition-colors ${
                    location.pathname === '/application'
                      ? 'text-[#006C4E]'
                      : 'text-gray-900 hover:text-[#006C4E]'
                  }`}
                >
                  Application
                </Link>

                {/* 3. Video */}
                <Link
                  to="/video"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  }}
                  className={`text-lg sm:text-xl font-bold transition-colors ${
                    location.pathname === '/video'
                      ? 'text-[#006C4E]'
                      : 'text-gray-900 hover:text-[#006C4E]'
                  }`}
                >
                  Video
                </Link>

                {/* 4. Employee (Href Kosong per instruksi revisi user) */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                  }}
                  className="text-lg sm:text-xl font-bold text-gray-900 hover:text-[#006C4E] transition-colors cursor-pointer"
                  title="Employee"
                >
                  Employee
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
