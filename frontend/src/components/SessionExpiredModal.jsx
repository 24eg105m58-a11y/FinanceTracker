import {
  useSessionStore,
} from "../store/sessionStore";

function SessionExpiredModal({
  open,
}) {

  const {
    setSessionExpired,
  } = useSessionStore();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 p-7">

        {/* ICON */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center mx-auto mb-5">

          <span className="text-3xl">
            🔒
          </span>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-slate-800 text-center">
          Session Expired
        </h2>

        {/* MESSAGE */}
        <p className="text-slate-500 text-center mt-3 leading-relaxed">

          Your login session has expired.

          Please login again
          to continue using
          Expense Tracker.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => {

  // RESET MODAL
  setSessionExpired(
    false
  );

  // REMOVE TOKEN
  localStorage.removeItem(
    "token"
  );
  
  // REMOVE SESSION
localStorage.removeItem(
  "sessionExpiry"
);

  // RESET MONTH
  localStorage.removeItem(
    "selectedDate"
  );

  // REDIRECT
  window.location.href =
    "/login";
}}
          className="mt-7 w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
        >
          Login Again
        </button>
      </div>
    </div>
  );
}

export default SessionExpiredModal;