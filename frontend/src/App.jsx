import {
  useEffect,
} from "react";

import {
  createBrowserRouter,
  RouterProvider,
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

import {
  useSessionStore,
} from "./store/sessionStore";

function App() {

  const {
    sessionExpired,
  } = useSessionStore();

  // AUTO SESSION EXPIRY CHECK

  const expiry =
  localStorage.getItem(
    "sessionExpiry"
  );

useEffect(() => {

  const interval =
    setInterval(() => {

      const expiry =
        localStorage.getItem(
          "sessionExpiry"
        );

      if (!expiry) {
        return;
      }

      const isExpired =
        Date.now() >=
        Number(expiry);

      if (isExpired) {

        localStorage.removeItem(
          "sessionExpiry"
        );

        useSessionStore
          .getState()
          .setSessionExpired(
            true
          );

        clearInterval(
          interval
        );
      }

    }, 1000);

  return () =>
    clearInterval(
      interval
    );

}, [expiry]);

  // ROUTES

  const routerObj =
    createBrowserRouter([
      {
        path: "/",

        element:
          <RootLayout />,

        children: [

          {
            path: "",

            element:
              <Home />,
          },

          {
            path:
              "register",

            element:
              <Register />,
          },

          {
            path:
              "login",

            element:
              <Login />,
          },

          {
            path:
              "overall",

            element:
              <Overall />,
          },

          {
            path:
              "expenses",

            element:
              <Expenses />,
          },

          {
            path:
              "savings",

            element:
              <Savings />,
          },

          {
            path:
              "profile",

            element:
              <Profile />,
          },
        ],
      },
    ]);

  return (
    <>
      <RouterProvider
        router={routerObj}
      />

      <SessionExpiredModal
        open={
          sessionExpired
        }
      />
    </>
  );
}

export default App;