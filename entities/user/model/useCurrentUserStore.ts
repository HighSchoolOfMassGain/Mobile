import { create } from "zustand";
import type { User } from "./types";

interface CurrentUserState {
  user: User | null;
  setUser: (user: User | null) => void;
  resetUser: () => void;
}

export const useCurrentUserStore = create<CurrentUserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
}));
