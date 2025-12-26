import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore= create<AuthStore>()(    // 커스텀훅
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user, accessToken) => set({ user, accessToken}),
      unsetAuth: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
