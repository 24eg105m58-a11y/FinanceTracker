import { Outlet } from "react-router";

import SessionExpiredModal from "./SessionExpiredModal";

import { useSessionStore } from "../store/sessionStore";

function RootLayout() {
  const sessionExpired = useSessionStore((state) => state.sessionExpired);

  return (
    <>
      <Outlet />

      <SessionExpiredModal open={sessionExpired} />
    </>
  );
}

export default RootLayout;
