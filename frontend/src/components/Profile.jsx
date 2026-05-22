import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../store/authStore";

import {
  pageBackground,
  pageWrapper,
  headingClass,
  bodyText,
  glassCard,
  inputClass,
  primaryBtn,
  errorClass,
} from "../styles/common";

function Profile() {

  const navigate = useNavigate();

  const currentUser = useAuth(
    (state) => state.currentUser
  );

  const logout = useAuth(
    (state) => state.logout
  );

  const [isEditing,
    setIsEditing,
  ] = useState(false);

  const [loading,
    setLoading,
  ] = useState(false);

  const [successMessage,
    setSuccessMessage,
  ] = useState("");

  const [errors,
    setErrors,
  ] = useState({});

  const [profileData,
    setProfileData,
  ] = useState({
    username: "",

    email: "",

    mobile: "",

    currentPassword: "",

    newPassword: "",

    confirmPassword: "",
  });

  // LOAD USER DATA
  useEffect(() => {

    if (currentUser) {

      setProfileData({
        username:
          currentUser?.Name || "",

        email:
          currentUser?.email || "",

        mobile:
          currentUser?.Mob_num || "",

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",
      });
    }

  }, [currentUser]);

  const handleChange = (
    e
  ) => {

    setProfileData({
      ...profileData,

      [e.target.name]:
        e.target.value,
    });

    // CLEAR FIELD ERROR
    setErrors({
      ...errors,

      [e.target.name]:
        "",
    });
  };

  const resetPasswordFields =
    () => {

      setProfileData(
        (prev) => ({
          ...prev,

          currentPassword:
            "",

          newPassword:
            "",

          confirmPassword:
            "",
        })
      );
    };

  const handleCancel =
    () => {

      if (currentUser) {

        setProfileData({
          username:
            currentUser?.Name || "",

          email:
            currentUser?.email || "",

          mobile:
            currentUser?.Mob_num || "",

          currentPassword:
            "",

          newPassword:
            "",

          confirmPassword:
            "",
        });
      }

      setErrors({});

      setSuccessMessage("");

      setIsEditing(false);
    };

  const handleSave =
    async () => {

      let newErrors = {};

      // NAME VALIDATION
      if (
        !profileData.username.trim()
      ) {

        newErrors.username =
          "Name is required";
      }

      else if (
        profileData.username.trim()
          .length < 2
      ) {

        newErrors.username =
          "At least 2 characters required";
      }

      else if (
        profileData.username.trim()
          .length > 30
      ) {

        newErrors.username =
          "Max 30 characters allowed";
      }

      // MOBILE VALIDATION
      if (
        !/^[0-9]{10}$/.test(
          profileData.mobile
        )
      ) {

        newErrors.mobile =
          "Mobile number must be exactly 10 digits";
      }

      // PASSWORD VALIDATION
      if (
        profileData.currentPassword ||
        profileData.newPassword ||
        profileData.confirmPassword
      ) {

        if (
          !profileData.currentPassword.trim()
        ) {

          newErrors.currentPassword =
            "Current password is required";
        }

        if (
          profileData.newPassword.length <
          8
        ) {

          newErrors.newPassword =
            "Password should be at least 8 characters";
        }

        if (
          profileData.newPassword.trim()
            .length === 0
        ) {

          newErrors.newPassword =
            "Password cannot contain only spaces";
        }

        // SAME PASSWORD VALIDATION
        if (
          profileData.currentPassword ===
          profileData.newPassword
        ) {

          newErrors.newPassword =
            "New password cannot be same as current password";
        }

        if (
          profileData.newPassword !==
          profileData.confirmPassword
        ) {

          newErrors.confirmPassword =
            "Passwords do not match";
        }
      }

      // SHOW VALIDATION ERRORS
      if (
        Object.keys(newErrors)
          .length > 0
      ) {

        setErrors(newErrors);

        return;
      }

      try {

        setLoading(true);

        setErrors({});

        setSuccessMessage("");

        const updateData = {
          Name:
            profileData.username,

          Mob_num:
            profileData.mobile,
        };

        // SEND PASSWORD ONLY IF ENTERED
        if (
          profileData.newPassword
        ) {

          updateData.currentPassword =
            profileData.currentPassword;

          updateData.newPassword =
            profileData.newPassword;
        }

        const res =
          await api.put(
            "/user-api/updateUser",
            updateData,
            {
              withCredentials:
                true,
            }
          );

        // UPDATE AUTH STORE
        useAuth.setState({
          currentUser:
            res.data.payload,
        });

        setSuccessMessage(
          "✅ Changes saved successfully"
        );

        resetPasswordFields();

        setIsEditing(false);

      } catch (err) {

        if (
          err.response?.data
            ?.message ===
          "Current password is incorrect"
        ) {

          setErrors({
            currentPassword:
              "Current password is incorrect",
          });
        }

        else {

          setErrors({
            general:
              err.response?.data
                ?.message ||
              "Failed to update profile",
          });
        }

      } finally {

        setLoading(false);
      }
    };

  const handleLogout =
    async () => {

      await logout();

      navigate("/login");
    };

  return (
    <div className={pageBackground}>

      <div
        className={`${pageWrapper} flex justify-center`}
      >

        <div className="w-full max-w-2xl">

          {/* HEADER */}
          <div className="mb-8 text-center">

            <h1 className={headingClass}>
              👤 My Profile
            </h1>

            <p
              className={`${bodyText} mt-2`}
            >
              Manage your account
              details and security
              settings
            </p>
          </div>

          {/* CARD */}
          <div
            className={`${glassCard} p-8`}
          >

            {/* FORM */}
            <div className="space-y-5">

              {/* NAME */}
              <div>

                <label className="block text-sm font-medium text-slate-500 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="username"
                  value={
                    profileData.username
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    !isEditing
                  }
                  className={`${inputClass} ${
                    isEditing
                      ? "bg-white cursor-text"
                      : "bg-slate-50 text-slate-700 cursor-default"
                  }`}
                />

                {errors.username && (
                  <p className={`${errorClass} mt-2`}>
                    {
                      errors.username
                    }
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-medium text-slate-500 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <input
                    type="email"
                    value={
                      profileData.email
                    }
                    disabled
                    className={`${inputClass} bg-slate-100 text-slate-500`}
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    🔒
                  </span>
                </div>
              </div>

              {/* MOBILE */}
              <div>

                <label className="block text-sm font-medium text-slate-500 mb-2">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="mobile"
                  value={
                    profileData.mobile
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    !isEditing
                  }
                  className={`${inputClass} ${
                    isEditing
                      ? "bg-white cursor-text"
                      : "bg-slate-50 text-slate-700 cursor-default"
                  }`}
                />

                {errors.mobile && (
                  <p className={`${errorClass} mt-2`}>
                    {
                      errors.mobile
                    }
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              {isEditing && (
                <>

                  <div className="pt-2">

                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                      Change Password
                    </h2>
                  </div>

                  {/* CURRENT */}
                  <div>

                    <label className="block text-sm font-medium text-slate-500 mb-2">
                      Current Password
                    </label>

                    <input
                      type="password"
                      name="currentPassword"
                      value={
                        profileData.currentPassword
                      }
                      onChange={
                        handleChange
                      }
                      className={`${inputClass} bg-white`}
                    />

                    {errors.currentPassword && (
                      <p className={`${errorClass} mt-2`}>
                        {
                          errors.currentPassword
                        }
                      </p>
                    )}
                  </div>

                  {/* NEW */}
                  <div>

                    <label className="block text-sm font-medium text-slate-500 mb-2">
                      New Password
                    </label>

                    <input
                      type="password"
                      name="newPassword"
                      value={
                        profileData.newPassword
                      }
                      onChange={
                        handleChange
                      }
                      className={`${inputClass} bg-white`}
                    />

                    {errors.newPassword && (
                      <p className={`${errorClass} mt-2`}>
                        {
                          errors.newPassword
                        }
                      </p>
                    )}
                  </div>

                  {/* CONFIRM */}
                  <div>

                    <label className="block text-sm font-medium text-slate-500 mb-2">
                      Confirm New Password
                    </label>

                    <input
                      type="password"
                      name="confirmPassword"
                      value={
                        profileData.confirmPassword
                      }
                      onChange={
                        handleChange
                      }
                      className={`${inputClass} bg-white`}
                    />

                    {errors.confirmPassword && (
                      <p className={`${errorClass} mt-2`}>
                        {
                          errors.confirmPassword
                        }
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* GENERAL ERROR */}
            {errors.general && (
              <p className={`${errorClass} mt-6`}>
                {errors.general}
              </p>
            )}

            {/* SUCCESS */}
            {successMessage && (
              <div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-600 px-4 py-3 rounded-2xl text-sm font-medium">
                {successMessage}
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              {!isEditing ? (
                <>
                  <button
                    onClick={() =>
                      setIsEditing(
                        true
                      )
                    }
                    className={`${primaryBtn} flex-1`}
                  >
                     Edit Profile
                  </button>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="flex-1 bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold py-3 rounded-2xl hover:scale-[1.03] transition-transform duration-200"
                  >
                     Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={
                      handleSave
                    }
                    disabled={
                      loading
                    }
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold py-3 rounded-2xl hover:scale-[1.03] transition-transform duration-200"
                  >
                    {loading
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                  <button
                    onClick={
                      handleCancel
                    }
                    className="flex-1 bg-gradient-to-r from-slate-500 to-slate-700 text-white font-semibold py-3 rounded-2xl hover:scale-[1.03] transition-transform duration-200"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;