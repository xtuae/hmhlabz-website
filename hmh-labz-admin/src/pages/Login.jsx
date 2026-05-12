import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ShieldCheck, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
            S <span className="text-brand-orange">+</span> B
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Admin Authentication</p>
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-brand-charcoal/5 border border-black/5">
          <h2 className="text-3xl font-bold mb-8 italic font-serif leading-tight">
            Welcome <span className="text-brand-orange">back.</span>
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Secure Identifier</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hmhlabz.com"
                required
                className="w-full p-5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-brand-orange outline-none transition-all font-bold text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Access Token</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full p-5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-brand-orange outline-none transition-all font-bold text-sm"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold uppercase tracking-tight text-center">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 bg-brand-charcoal text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-all duration-300 shadow-xl shadow-brand-charcoal/10 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              Initialize Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
