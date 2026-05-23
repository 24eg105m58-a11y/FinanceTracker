import axios from "axios";

import { useSessionStore } from "../store/sessionStore";
import { useAuth } from "../store/authStore";

const publicRoutes = [
  "/",
  "/login",
  "/register",
];

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const status =
      error?.response?.status;

    const requestUrl =
      error?.config?.url || "";

    const currentPath =
      window.location.pathname;

    const isAuthCheckRequest =
      requestUrl.includes(
        "/user-api/user"
      );

    const isPublicPage =
      publicRoutes.includes(
        currentPath
      );

    // ==========================================
    // SESSION EXPIRED
    // ==========================================

    if (
      status === 401 &&
      !isPublicPage &&
      !isAuthCheckRequest
    ) {

      useSessionStore
        .getState()
        .setSessionExpired(
          true
        );

      useAuth
        .getState()
        .clearAuth();
    }

    return Promise.reject(
      error
    );
  }
);

export default api;