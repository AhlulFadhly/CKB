import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Info, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState('tas0025');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate instantaneous authentication
    setTimeout(() => {
      localStorage.setItem('ckb_auth', 'true');
      localStorage.setItem('ckb_user', 'Shabuama Palaska');
      setLoading(false);
      navigate('/');
    }, 400);
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/assets/ckb-background-login.png')`,
      }}
    >
      {/* Background Overlay for readability */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />

      {/* Login Card Modal */}
      <div className="relative z-10 w-full max-w-[480px] bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-white/40 animate-fadeIn">
        {/* CKB Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/logo-ckb.svg"
            alt="CKB Logistics Logo"
            className="h-14 w-auto object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.ckb-text-logo')) {
                const fallback = document.createElement('h1');
                fallback.className = 'ckb-text-logo text-4xl font-black italic tracking-wider text-[#006C4E]';
                fallback.innerText = 'CKB';
                parent.appendChild(fallback);
              }
            }}
          />
        </div>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1D2128]">Masuk ke CKB Portal</h2>
          <p className="text-sm text-gray-500 mt-1">
            Gunakan akun resmi internal Anda untuk mengakses portal.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* User ID Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              USER ID
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="tas0025"
                required
                className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#1D2128] focus:outline-none focus:ring-2 focus:ring-[#006C4E] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                KATA SANDI
              </label>
              <button
                type="button"
                onClick={() => alert('Silakan hubungi IT Helpdesk/BPI untuk reset kata sandi.')}
                className="text-xs font-semibold text-[#006C4E] hover:underline"
              >
                Lupa kata sandi?
              </button>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-11 pr-11 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm text-[#1D2128] focus:outline-none focus:ring-2 focus:ring-[#006C4E] focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-[#006C4E] border-gray-300 rounded focus:ring-[#006C4E] cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2.5 text-sm text-gray-700 cursor-pointer">
              Ingat Saya
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#006C4E] hover:bg-[#00553d] text-white font-bold text-sm tracking-wide rounded-lg shadow-md transition-all transform active:scale-[0.99]"
          >
            {loading ? (
              <span>Memproses...</span>
            ) : (
              <>
                <span>MASUK SEKARANG</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* HRIS / BPI Help Info Box */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-900 leading-relaxed">
            Silakan hubungi <strong>BPI</strong> jika mengalami kendala saat login menggunakan akun HRIS.
          </p>
        </div>
      </div>
    </div>
  );
};
