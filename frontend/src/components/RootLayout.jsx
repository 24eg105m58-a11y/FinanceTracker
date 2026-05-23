import { Outlet } from "react-router";
import Header from "./Header";
import SessionExpiredModal from "./SessionExpiredModal";

import { useSessionStore } from "../store/sessionStore";

function RootLayout() {
  const sessionExpired = useSessionStore((state) => state.sessionExpired);

  return (
    <>
      <Header />
      <Outlet />

      <SessionExpiredModal open={sessionExpired} />
    </>
  );
}

export default RootLayout;
