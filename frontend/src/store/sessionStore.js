import { create }
from "zustand";

export const useSessionStore =
  create((set) => ({

    sessionExpired:
      false,

    setSessionExpired:
      (value) =>
        set({
          sessionExpired:
            value,
        }),
  }));