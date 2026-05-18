import { useState, useEffect } from 'react';
import client from '../api/client';
import { Loader2, RefreshCw, CheckCircle2 } from 'lucide-react';

const HubSpotSync = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await client.get('/admin/leads');
      setLeads(response.data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-bold tracking-tighter">HubSpot <span className="font-serif italic text-[#c84b21]">Sync.</span></h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Lead pipeline synchronization</p>
        </div>
        <button onClick={fetchLeads} className="bg-[#1a1a1a] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#c84b21] transition-all flex items-center gap-2">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh Sync
        </button>
      </div>

      <div className="bg-white rounded-[40px] overflow-hidden border border-black/5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Lead Name</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Business Name</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Tier / Interest</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <Loader2 className="animate-spin text-[#c84b21] mx-auto" size={32} />
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                 <tr>
                  <td colSpan="4" className="py-20 text-center font-bold text-gray-400">
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#f5f1e8]/30 transition-colors">
                    <td className="px-10 py-8">
                      <p className="font-bold text-[#1a1a1a]">{lead.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{new Date(lead.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-sm font-bold text-[#1a1a1a]">{lead.businessName || 'N/A'}</p>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-sm font-bold text-[#1a1a1a]">{lead.tier || 'N/A'}</p>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-full border border-green-100">
                        <CheckCircle2 size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Synced</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HubSpotSync;
