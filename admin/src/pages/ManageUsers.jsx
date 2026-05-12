const ManageUsers = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Users</h1>
          <p className="text-slate-400">View and manage your application users and their roles.</p>
        </div>
        <button className="px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 transition-all font-semibold shadow-lg shadow-indigo-500/20">
          Add New User
        </button>
      </header>

      <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-slate-400 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-8 py-5">Name</th>
              <th className="px-8 py-5">Email</th>
              <th className="px-8 py-5">Role</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-8 py-6 font-medium">Hajakif</td>
              <td className="px-8 py-6 text-slate-400">admin@hmhlabz.com</td>
              <td className="px-8 py-6">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase">Superadmin</span>
              </td>
              <td className="px-8 py-6 text-right">
                <button className="text-indigo-400 hover:text-white mr-4">Edit</button>
                <button className="text-red-400 hover:text-white">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
