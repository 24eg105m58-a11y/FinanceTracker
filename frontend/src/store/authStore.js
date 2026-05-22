import { create } from "zustand";
import api from "../services/api";

export const useAuth =
  create((set) => ({

    currentUser: null,

    loading: false,

    isAuthenticated: false,

    error: null,

    isNewUser: false,

    // =====================================================
    // REGISTER
    // =====================================================

    register: async (
      userObj
    ) => {

      try {

        set({

          loading: true,

          currentUser:
            null,

          isAuthenticated:
            false,

          error: null,

          isNewUser:
            false,
        });

        const res =
          await api.post(

            "/user-api/users",

            {
              Name:
                userObj.Name,

              Mob_num:
                userObj.Mob_num,

              email:
                userObj.email,

              password:
                userObj.password,
            },

            {
              withCredentials:
                true,
            }
          );

        if (
          res.status ===
          201
        ) {

          // SESSION EXPIRY
          const expiryTime =
            Date.now() +
            2 *
              60 *
              1000;

          localStorage.setItem(
            "sessionExpiry",
            expiryTime
          );

          set({

            currentUser:
              res.data.payload,

            loading:
              false,

            isAuthenticated:
              true,

            error: null,

            isNewUser:
              res.data
                .isNewUser,
          });

          return res.data;
        }

      } catch (err) {

        set({

          loading:
            false,

          isAuthenticated:
            false,

          currentUser:
            null,

          error:
            err.response
              ?.data
              ?.message ||
            "Registration failed",
        });

        throw err;
      }
    },

    // =====================================================
    // LOGIN
    // =====================================================

    login: async (
      userCred
    ) => {

      try {

        set({

          loading: true,

          currentUser:
            null,

          isAuthenticated:
            false,

          error: null,

          isNewUser:
            false,
        });

        const res =
          await api.post(

            "/user-api/login",

            userCred,

            {
              withCredentials:
                true,
            }
          );

        if (
          res.status ===
          200
        ) {

          // SESSION EXPIRY
          const expiryTime =
            Date.now() +
            2 *
              60 *
              1000;

          localStorage.setItem(
            "sessionExpiry",
            expiryTime
          );

          set({

            currentUser:
              res.data.payload,

            loading:
              false,

            isAuthenticated:
              true,

            error: null,

            isNewUser:
              false,
          });

          return res.data;
        }

      } catch (err) {

        set({

          loading:
            false,

          isAuthenticated:
            false,

          currentUser:
            null,

          error:
            err.response
              ?.data
              ?.message ||
            "Login failed",
        });

        throw err;
      }
    },

    // =====================================================
    // LOGOUT
    // =====================================================

    logout: async () => {

      try {

        set({
          loading: true,
        });

        const res =
          await api.get(

            "/user-api/logout",

            {
              withCredentials:
                true,
            }
          );

        if (
          res.status ===
          200
        ) {

          localStorage.removeItem(
            "sessionExpiry"
          );

          set({

            currentUser:
              null,

            isAuthenticated:
              false,

            error: null,

            loading:
              false,

            isNewUser:
              false,
          });
        }

      } catch (err) {

        set({

          loading:
            false,

          isAuthenticated:
            false,

          currentUser:
            null,

          error:
            err.response
              ?.data
              ?.message ||
            "Logout failed",
        });
      }
    },

    // =====================================================
    // CHECK AUTH
    // =====================================================

    checkAuth: async () => {

      try {

        set({
          loading: true,
        });

        const res =
          await api.get(

            "/user-api/user",

            {
              withCredentials:
                true,
            }
          );

        set({

          currentUser:
            res.data.payload,

          isAuthenticated:
            true,

          loading:
            false,

          error: null,
        });

      } catch (err) {

        set({

          currentUser:
            null,

          isAuthenticated:
            false,

          loading:
            false,
        });
      }
    },
  }));