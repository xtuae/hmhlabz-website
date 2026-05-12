const ManageInsights = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Insights</h1>
          <p className="text-slate-400">Create, edit, and publish blog articles.</p>
        </div>
        <button className="px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 transition-all font-semibold shadow-lg shadow-indigo-500/20">
          Create New Post
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-900 border border-white/5 rounded-3xl p-8 flex items-center gap-8 hover:border-indigo-500/30 transition-all">
            <div className="w-32 h-24 bg-slate-800 rounded-2xl flex-shrink-0"></div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-2">The Future of AI in Web Development</h3>
              <p className="text-slate-400 text-sm mb-4">Published on May 12, 2026</p>
              <div className="flex gap-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase">Published</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 rounded-xl border border-slate-700 hover:bg-white/5 transition-all text-sm font-medium">Edit</button>
              <button className="px-6 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageInsights;
