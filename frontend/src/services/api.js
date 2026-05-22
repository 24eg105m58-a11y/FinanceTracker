import axios from "axios";

import {
  useSessionStore,
} from "../store/sessionStore";

const api = axios.create({

  baseURL:
    "http://localhost:4000/api",

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

    // ONLY SHOW POPUP
    // IF NOT ALREADY
    // ON LOGIN PAGE

    if (
      error.response
        ?.status === 401 &&

      currentPath !==
        "/login"
    ) {

      useSessionStore
        .getState()
        .setSessionExpired(
          true
        );
    }

    return Promise.reject(
      error
    );
  }
);

export default api;