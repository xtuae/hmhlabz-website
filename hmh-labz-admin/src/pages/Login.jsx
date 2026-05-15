import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ShieldCheck, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1e8] p-4 font-sans text-[#1a1a1a]">
      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-black/5">
        {/* Left Side: Visual/Branding */}
        <div className="w-full md:w-1/2 bg-[#1a1a1a] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-12">
              <img src={logo} alt="HMH Labz" className="h-10 w-auto" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-6 leading-tight">
              Strategy + build, <br />
              <span className="text-[#c84b21] font-serif italic">one portal.</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed font-medium">
              Access your project metrics, implementation sprints, and team performance in one unified view.
            </p>
          </div>

          <div className="relative z-10 mt-12">
            <div className="flex -space-x-3 mb-6">
              {[1, 2, 3].map((i) => (
                <img 
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#1a1a1a] grayscale hover:grayscale-0 transition-all duration-500" 
                  src={`https://i.pravatar.cc/100?u=${i + 10}`} 
                  alt="Team" 
                />
              ))}
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-black">Trusted by Global Operations</p>
          </div>

          {/* Abstract shape background element */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#c84b21] rounded-full opacity-20 blur-3xl animate-pulse"></div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-14 bg-[#f5f1e8]/50">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-3 tracking-tighter">
              Welcome <span className="font-serif italic text-[#c84b21]">back.</span>
            </h2>
            <p className="text-gray-500 text-sm font-medium">Please enter your credentials to access the dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Secure Identifier</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hmhlabz.com"
                className="w-full px-5 py-4 rounded-2xl border border-black/5 bg-white focus:ring-2 focus:ring-[#c84b21]/20 focus:border-[#c84b21] outline-none transition-all font-bold text-sm shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Access Token</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 rounded-2xl border border-black/5 bg-white focus:ring-2 focus:ring-[#c84b21]/20 focus:border-[#c84b21] outline-none transition-all font-bold text-sm shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-widest px-1">
              <label className="flex items-center space-x-2 cursor-pointer text-gray-400 hover:text-[#1a1a1a] transition-colors">
                <input type="checkbox" className="rounded border-gray-300 text-[#c84b21] focus:ring-[#c84b21]" />
                <span>Stay Authenticated</span>
              </label>
              <a href="#" className="text-[#c84b21] hover:underline">Lost Token?</a>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-black uppercase tracking-widest text-center animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a1a1a] text-white font-black py-5 rounded-2xl shadow-xl shadow-black/10 hover:bg-[#c84b21] transition-all duration-500 transform hover:-translate-y-1 flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.2em] disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Initialize Portal
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
              Restricted Access — HMH Labz Operational Hub
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
