import axios from "axios";

import {
  useSessionStore,
} from "../store/sessionStore";

const backendUrl =
  (import.meta.env
    .VITE_BACKEND_URL ||
    ""
  ).replace(/\/$/, "");

const PUBLIC_PATHS = new Set([
  "/",
  "/login",
  "/register",
]);

const isPublicPath = (
  pathname
) =>
  PUBLIC_PATHS.has(
    pathname
  );

const showSessionExpiredIfNeeded =
  () => {

    const sessionState =
      useSessionStore.getState();

    if (
      sessionState
        .sessionExpired
    ) {
      return;
    }

    import(
      "../store/authStore"
    )
      .then(
        ({ useAuth }) => {

          const authState =
            useAuth.getState();

          if (
            !authState.isAuthenticated
          ) {
            return;
          }

          authState.clearAuth?.();
          sessionState.setSessionExpired(
            true
          );
        }
      )
      .catch(() => {
        // ignore
      });
  };

const requestUrlIncludes =
  (error, needle) => {
    const url =
      error?.config?.url;

    return String(
      url || ""
    ).includes(needle);
  };

const api = axios.create({

  baseURL:
    backendUrl
      ? `${backendUrl}/api`
      : "/api",

  withCredentials:
    true,

  headers: {
    "Content-Type":
      "application/json",
  },
});

// =========================================================
// RESPONSE INTERCEPTOR
// =========================================================

api.interceptors.response.use(

  (response) =>
    response,

  (error) => {

    const currentPath =
      window.location.pathname;

    if (
      error.response
        ?.status === 401 &&
      !isPublicPath(
        currentPath
      ) &&
      !requestUrlIncludes(
        error,
        "/user-api/logout"
      )
    ) {
      showSessionExpiredIfNeeded();
    }

    return Promise.reject(
      error
    );
  }
);

export default api;
