import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../lib/api';
import { useAdminUser } from '../context/useAdminUser';
import { Lock, Mail, BookOpen, AlertCircle, Loader, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useAdminUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await loginAdmin({ email, password });

      // Store token in localStorage just in case (the api helper also uses cookies)
      if (response.token) {
        localStorage.setItem('adminToken', response.token);
      }
      console.log(response);
      setUser(response.user);
      toast.success('Successfully logged in as Admin!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans overflow-hidden">
      {/* Left Section: Editorial Hero */}
      <section className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-10 overflow-hidden border-r border-slate-900 bg-[#020617] select-none">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent"></div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj81oisGrwKyyk_EEBJdMu-GX_cONrbAsWrAJBVzFo-3siumhzxlCngqtV5BkvRAwuTx8uqluiIWko_bmwkI2UkU-77o1PkzXrybvKBkm1ZzS35V9jP4ejzQmX99AXD8oICe8ixFZ0-r_eDBoyLv6zbFCXkOjk4Wy31aZlEGCj_Z3qBa4HZ2Esv4vuDnDOPDn8ZD1CmOgtdlk5Td-ZmMJdW6BPKwm8cXHjuPwT5VVUUrKGIphKXnEkjPR01ywUhPNYIzpCWuPKna0"
            alt="Knowledge is the only treasure that grows when shared"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-xl text-center flex flex-col items-center gap-8 hero-animate">
          <div className="p-6 rounded-full bg-indigo-600/10 backdrop-blur-md border border-indigo-500/20 mb-4">
            <BookOpen size={48} className="text-indigo-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-100 leading-tight tracking-tight font-serif italic">
            "Knowledge is the only treasure that grows when shared."
          </h1>
          <p className="text-lg text-slate-400 max-w-md">
            Access the BookNest Enterprise Console to manage global assets, monitor repository
            growth, and secure shared intelligence.
          </p>

          {/* Micro Stats Grid */}
          <div className="grid grid-cols-2 gap-6 w-full mt-8">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl text-left">
              <span className="text-indigo-400 text-xs font-semibold block mb-1 uppercase tracking-widest">
                Active nodes
              </span>
              <div className="text-2xl font-bold text-slate-200">14.5K</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl text-left border-l-4 border-l-indigo-600">
              <span className="text-purple-400 text-xs font-semibold block mb-1 uppercase tracking-widest">
                Global Sync
              </span>
              <div className="text-2xl font-bold text-slate-200">98%</div>
            </div>
          </div>
        </div>

        {/* Decorative Glows */}
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/4 -right-1/4 w-1/3 h-1/3 bg-purple-600/10 rounded-full blur-[100px]"></div>
      </section>

      {/* Right Section: Login Interface */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10 bg-[#051424]">
        <div className="w-full max-w-[440px] flex flex-col items-center gap-8">
          {/* Branding */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/35">
              <BookOpen size={32} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-200 tracking-tight mt-2">
              BookNest Admin
            </span>
          </div>

          {/* Login Card */}
          <div className="w-full bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-100">Secure Access Portal</h2>
              <p className="text-sm text-slate-400 mt-1.5">
                Enter credentials to authenticate session
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 text-xs flex items-center gap-3">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Address */}
              <div className="space-y-2">
                <label
                  className="text-xs font-semibold text-slate-400 uppercase tracking-wider block ml-1"
                  htmlFor="email"
                >
                  Admin Email
                </label>
                <div className="relative group rounded-xl border border-slate-800 bg-[#010f1f] focus-within:border-indigo-500 focus-within:shadow-[0_0_12px_rgba(99,102,241,0.2)] transition-all">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                    <Mail size={18} />
                  </span>
                  <input
                    className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-0 text-sm placeholder:text-slate-600 outline-none"
                    id="email"
                    placeholder="admin@booknest.com"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Security Password */}
              <div className="space-y-2">
                <label
                  className="text-xs font-semibold text-slate-400 uppercase tracking-wider block ml-1"
                  htmlFor="password"
                >
                  Security Password
                </label>
                <div className="relative group rounded-xl border border-slate-800 bg-[#010f1f] focus-within:border-indigo-500 focus-within:shadow-[0_0_12px_rgba(99,102,241,0.2)] transition-all">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                    <Lock size={18} />
                  </span>
                  <input
                    className="w-full bg-transparent border-none py-3.5 pl-12 pr-4 text-slate-200 focus:outline-none focus:ring-0 text-sm placeholder:text-slate-600 outline-none"
                    id="password"
                    placeholder="••••••••••••"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Options row */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group select-none">
                  <input
                    className="peer h-4 w-4 rounded border-slate-800 bg-[#010f1f] text-indigo-600 focus:ring-offset-slate-900 focus:ring-indigo-500 cursor-pointer"
                    type="checkbox"
                  />
                  <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                    Remember device
                  </span>
                </label>
                <a
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-[1.01] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    <>
                      <span>Enter Console</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer Links */}
          <div className="flex gap-6 mt-4 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
            <a className="hover:text-indigo-500 transition-colors" href="#">
              Privacy Protocol
            </a>
            <span className="text-slate-700">|</span>
            <a className="hover:text-indigo-500 transition-colors" href="#">
              System Status
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
