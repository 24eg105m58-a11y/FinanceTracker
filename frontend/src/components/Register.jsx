import {
  divider,
  errorClass,
  formCard,
  formGroup,
  formTitle,
  inputClass,
  labelClass,
  pageBackground,
  submitBtn,
  mutedText,
} from "../styles/common";

import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";

import api from "../services/api";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();

  const onUserRegister = async (userObj) => {
    try {
      setLoading(true);
      setApiError(null);

      const res = await api.post("/user-api/users", {
        Name: userObj.Name,
        Mob_num: userObj.Mob_num,
        email: userObj.email,
        password: userObj.password,
      });

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
    className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50 to-sky-100 flex items-center justify-center px-4 py-8"
  >

    <div
      className={`${formCard} w-full max-w-2xl px-10 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/40 backdrop-blur-xl bg-white/80`}
    >

      <h2 className={`${formTitle} text-center`}>
        Create Your Account
      </h2>

      <p className="text-slate-500 text-center mt-2 mb-8">
        Start managing your finances smarter ✨
      </p>

      {apiError && (
        <p className={`${errorClass} mb-4`}>
          {apiError}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onUserRegister)}
      >

        {/* NAME */}
        <div className="mb-5">

          <label className={labelClass}>
            Name
          </label>

          <input
            type="text"
            className={inputClass}
            placeholder="Enter your name"
            {...register("Name", {
              required:
                "Name is required",

              minLength: {
                value: 2,
                message:
                  "At least 2 characters required",
              },

              maxLength: {
                value: 30,
                message:
                  "Max 30 characters allowed",
              },

              validate: (v) =>
                v.trim().length >
                  0 ||
                "Name cannot be empty",
            })}
          />

          {errors.Name && (
            <p
              className={`${errorClass} mt-2`}
            >
              {
                errors.Name
                  .message
              }
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-5">

          <label className={labelClass}>
            Email
          </label>

          <input
            type="email"
            className={inputClass}
            placeholder="you@example.com"
            {...register("email", {
              required:
                "Email is required",
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

        {/* MOBILE */}
        <div className="mb-5">

          <label className={labelClass}>
            Mobile Number
          </label>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={inputClass}
            placeholder="Enter mobile number"
            {...register("Mob_num", {
              required:
                "Mobile number is required",

              pattern: {
                value:
                  /^[0-9]{10}$/,

                message:
                  "Mobile number must be exactly 10 digits",
              },
            })}
          />

          {errors.Mob_num && (
            <p
              className={`${errorClass} mt-2`}
            >
              {
                errors.Mob_num
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
            className={inputClass}
            placeholder="Enter password"
            {...register("password", {
              required:
                "Password is required",

              minLength: {
                value: 8,
                message:
                  "Password should be at least 8 characters",
              },

              validate: (
                value
              ) =>
                value.trim()
                  .length >
                  0 ||
                "Password cannot be only spaces",
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
         className={`${submitBtn} mt-2 w-fit px-8 mx-auto block`}
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>
      </form>

      <p
        className={`${mutedText} text-center mt-6`}
      >
        Already have an account?{" "}

        <NavLink
          to="/login"
          className="text-cyan-500 hover:text-cyan-600 font-semibold transition-colors"
        >
          Sign in
        </NavLink>
      </p>
    </div>
  </div>
);
}

export default Register;