import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        localStorage.setItem('hmh-token', token);
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('hmh-token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'hmh-auth-storage',
    }
  )
);
