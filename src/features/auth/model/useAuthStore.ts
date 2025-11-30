// features/auth/model/useAuthStore.ts
import { create } from "zustand";

export type AuthStatus =
  | "idle"
  | "checking"
  | "authenticated"
  | "unauthenticated";

interface AuthState {
  accessToken: string | null;
  status: AuthStatus;

  setAccessToken: (token: string | null) => void;
  setStatus: (status: AuthStatus) => void;

  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  status: "idle",

  setAccessToken: (accessToken) => set({ accessToken }),
  setStatus: (status) => set({ status }),

  resetAuth: () =>
    set({
      accessToken: null,
      status: "unauthenticated",
    }),
}));
