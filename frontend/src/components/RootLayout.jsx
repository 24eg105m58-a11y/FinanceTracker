import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../store/authStore";

function RootLayout() {
  const setAuth = useAuth((state) => state.setAuth);

  const clearAuth = useAuth((state) => state.clearAuth);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await api.get("/user-api/user");

        setAuth({
          user: res.data.payload,
          isNewUser: false,
        });
      } catch (err) {
        clearAuth();
      }
    };

    restoreSession();
  }, []);

  return <Outlet />;
}

export default RootLayout;
