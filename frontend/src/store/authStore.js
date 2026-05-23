import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      user: null,

      isLoggedIn: false,

      isNewUser: false,

      setAuth: ({
        user,
        isNewUser = false,
      }) =>
        set({
          user,
          isLoggedIn: true,
          isNewUser,
        }),

      clearAuth: () =>
        set({
          user: null,
          isLoggedIn: false,
          isNewUser: false,
        }),
    }),

    {
      name: "finance-auth",
    },
  ),
);