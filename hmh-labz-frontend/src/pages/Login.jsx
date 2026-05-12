import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-paper">
      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-black/5">
        {/* Left Side: Visual/Branding */}
        <div className="w-full md:w-1/2 bg-brand-ink p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-brand-terra mb-12 hover:translate-x-[-4px] transition-transform">
              <ArrowLeft size={16} /> Back to Site
            </Link>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Strategy + build, <br />
              <span className="text-brand-terra font-serif italic">one portal.</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Access your project metrics, implementation sprints, and team performance in one unified view.
            </p>
          </div>

          <div className="relative z-10 mt-12">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Trusted Hub</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-terra animate-pulse"></div>
              <span className="text-xs font-bold text-brand-terra uppercase tracking-tighter">Secure Link Active</span>
            </div>
          </div>

          {/* Abstract shape background element */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-terra rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-brand-paper">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Welcome <span className="font-serif italic text-brand-terra">back.</span></h2>
            <p className="text-gray-600 text-sm">Please enter your credentials to access the dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2 ml-4">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com" 
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-terra outline-none transition-all font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2 ml-4">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-terra outline-none transition-all font-bold"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-black uppercase text-center">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-brand-terra text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-terra/20 hover:brightness-110 transition-all uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              Sign In to Portal
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500 text-xs font-medium">Don't have an account? <a href="#contact" className="text-brand-terra font-black hover:underline uppercase tracking-tighter">Request Access</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
