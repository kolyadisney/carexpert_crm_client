import { create } from 'zustand';
import { getCookie, getCookies } from 'cookies-next';
import { useSession } from 'next-auth/react';
import { http } from './../../services/http/index';
export const useUserStore = create((set) => ({
  user: {},
  setUser: (user: any) => set((state: any) => ({ user })),
  fetchUser: async () => {
    const cookie = getCookie('access_token');
    const user = await http.get('/user/me');
    if (user?.data) {
      set(() => ({ user: user?.data }));
    }
  },
}));
