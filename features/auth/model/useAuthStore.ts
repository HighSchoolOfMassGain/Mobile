import { create } from 'zustand';

import type { User } from "@entities/user";

export type AuthStatus = 'idle' | 'checking' | 'authenticated' | 'unauthenticated';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  status: AuthStatus;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setStatus: (status: AuthStatus) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  status: 'idle',

  setAccessToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),

  logout: () =>
    set({
      accessToken: null,
      user: null,
      status: 'unauthenticated',
    }),
}));
