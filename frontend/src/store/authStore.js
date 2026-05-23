import { create } from "zustand";
import api from "../services/api";

export const useAuth =
  create((set) => ({

    currentUser: null,

    loading: false,

    isAuthenticated: false,

    error: null,

    isNewUser: false,

    authChecked: false,

    clearAuth: () =>
      set({
        currentUser: null,
        isAuthenticated: false,
        error: null,
        loading: false,
        isNewUser: false,
      }),

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

            authChecked: true,
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

          authChecked: true,
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

            authChecked: true,
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

          authChecked: true,
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
          error: null,
        });

        await api
          .get("/user-api/logout", {
            withCredentials: true,
          })
          .catch(() => {});

        set({
          currentUser: null,
          isAuthenticated: false,
          error: null,
          loading: false,
          isNewUser: false,
          authChecked: true,
        });

      } catch (err) {

        set({
          currentUser: null,
          isAuthenticated: false,
          error: null,
          loading: false,
          isNewUser: false,
          authChecked: true,
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

          authChecked: true,
        });

      } catch (err) {

        set({

          currentUser:
            null,

          isAuthenticated:
            false,

          loading:
            false,

          authChecked: true,
        });
      }
    },
  }));
