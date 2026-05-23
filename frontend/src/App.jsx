import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router";

import RootLayout from "./components/RootLayout";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

import Overall from "./components/Overall";
import Expenses from "./components/Expenses";
import Savings from "./components/Savings";
import Profile from "./components/Profile";

import SessionExpiredModal from "./components/SessionExpiredModal";

import { useSessionStore } from "./store/sessionStore";
import { useAuth } from "./store/authStore";

function ProtectedOutlet() {
  const isAuthenticated = useAuth(
    (state) => state.isAuthenticated
  );

  const authChecked = useAuth(
    (state) => state.authChecked
  );

  const location = useLocation();

  if (!authChecked) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}

function App() {
  const { sessionExpired } = useSessionStore();

  return (
    <>
      <RouterProvider router={routerObj} />

      <SessionExpiredModal open={sessionExpired} />
    </>
  );
}

export default App;

// ROUTES (keep router stable; don't recreate on state changes)
const routerObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Home />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <ProtectedOutlet />,
        children: [
          {
            path: "overall",
            element: <Overall />,
          },
          {
            path: "expenses",
            element: <Expenses />,
          },
          {
            path: "savings",
            element: <Savings />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
