import { useForm } from "react-hook-form";
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  mutedText,
  loadingClass,
} from "../styles/common";

import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import api from "../services/api";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login, loading, error, isAuthenticated } = useAuth(
    (state) => state
  );

  const onUserLogin = async (userCredObj) => {
    try {
      await login(userCredObj);
      navigate("/overall");
    } catch (err) {
      // error handled in store
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/overall");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div
        className={`${pageBackground} flex items-center justify-center min-h-screen`}
      >
        <p className={loadingClass}>Checking session...</p>
      </div>
    );
  }

 return (
  <div
    className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50 to-sky-100 flex items-center justify-center px-4 py-8"
  >

    <div
      className={`${formCard} w-full max-w-lg px-10 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/40 backdrop-blur-xl bg-white/80`}
    >

      <h2 className={`${formTitle} text-center`}>
        Welcome Back
      </h2>

      <p className="text-slate-500 text-center mt-2 mb-8">
        Sign in to continue managing your finances ✨
      </p>

      {error && (
        <p className={`${errorClass} mb-4`}>
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onUserLogin)}
      >

        {/* EMAIL */}
        <div className="mb-5">

          <label className={labelClass}>
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className={inputClass}
            {...register("email", {
              required:
                "Email is required",

              validate: (
                value
              ) =>
                value.trim()
                  .length >
                  0 ||
                "Email cannot be empty",
            })}
          />

          {errors.email && (
            <p
              className={`${errorClass} mt-2`}
            >
              {
                errors.email
                  .message
              }
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-6">

          <label className={labelClass}>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            className={inputClass}
            {...register("password", {
              required:
                "Password is required",

              validate: (
                value
              ) =>
                value.trim()
                  .length >
                  0 ||
                "Password cannot be empty",
            })}
          />

          {errors.password && (
            <p
              className={`${errorClass} mt-2`}
            >
              {
                errors.password
                  .message
              }
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className={`${submitBtn} px-8 mx-auto block`}
          disabled={loading}
        >
          {loading
            ? "Signing in..."
            : "Sign In"}
        </button>
      </form>

      <p
        className={`${mutedText} text-center mt-6`}
      >
        Don't have an account?{" "}

        <NavLink
          to="/register"
          className="text-cyan-500 hover:text-cyan-600 font-semibold transition-colors"
        >
          Create one
        </NavLink>
      </p>
    </div>
  </div>
);
}

export default Login;