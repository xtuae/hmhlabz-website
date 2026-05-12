import { create } from 'zustand';
import client from '../api/client';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('admin_user')) || null,
  token: localStorage.getItem('admin_token') || null,
  isAuthenticated: !!localStorage.getItem('admin_token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await client.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Check if user has admin privileges
      if (!['ADMIN', 'SUPERADMIN'].includes(user.role)) {
        throw new Error('Access denied. Admin privileges required.');
      }

      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(user));
      
      set({ user, token, isAuthenticated: true, isLoading: false });
      return true;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || err.message || 'Login failed', 
        isLoading: false 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const token = localStorage.getItem('admin_token');
    const user = JSON.parse(localStorage.getItem('admin_user'));
    if (token && user) {
      set({ user, token, isAuthenticated: true });
    } else {
      set({ user: null, token: null, isAuthenticated: false });
    }
  }
}));
