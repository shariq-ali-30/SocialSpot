import React, { useContext, useRef, useState } from "react";
import googleIcon from "../images/google-icon.png";
import { Link, Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "../context/UserContext.jsx";

const Signup = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const errorTimeout = useRef(null);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const showError = (message) => {
    setError(message);

    if (errorTimeout.current) {
      clearTimeout(errorTimeout.current);
    }

    errorTimeout.current = setTimeout(() => {
      setError("");
    }, 3000);
  };

  const signupWithGoogle = async () => {
    setLoading(true);

    try {
      const { user } = await signInWithPopup(auth, googleProvider);

      setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        profileImage: user.photoURL,
      });

      setCurrentUser(user.uid);
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        showError("Too many failed attempts. Please try again later.");
      } else if (error.code === "auth/network-request-failed") {
        showError("Network error. Please check your internet connection.");
      } else if (error.code === "auth/user-disabled") {
        showError("This account has been disabled.");
      } else {
        showError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return document.getElementById("fullName").focus();
    }

    if (!email.trim()) {
      return document.getElementById("email").focus();
    }

    if (!password.trim()) {
      return document.getElementById("password").focus();
    }

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: email.trim(),
        profileImage: "",
      });

      setCurrentUser(user.uid);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        showError("Password must be at least 6 characters long.");
      } else if (error.code === "auth/email-already-in-use") {
        showError("An account with this email already exists.");
      } else if (error.code === "auth/too-many-requests") {
        showError("Too many failed attempts. Please try again later.");
      } else if (error.code === "auth/network-request-failed") {
        showError("Network error. Please check your internet connection.");
      } else {
        showError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-[clamp(0.75rem,4vw,1.5rem)] py-[clamp(1.5rem,5vw,2.5rem)]">
      <div className="w-full max-w-[clamp(20rem,90vw,28rem)]">
        <div className="text-center mb-[clamp(1.5rem,4vw,2rem)]">
          <h1 className="text-[clamp(1.5rem,4vw,1.875rem)] leading-tight font-bold text-[#17152A]">
            Create Account
          </h1>

          <p className="text-[clamp(0.75rem,1.8vw,0.875rem)] leading-6 text-[#77738A] mt-[clamp(0.4rem,1vw,0.5rem)]">
            Create your account to get started
          </p>
        </div>

        <div className="bg-white border border-[#E5E2EC] rounded-[clamp(0.75rem,2vw,1rem)] p-[clamp(1rem,4vw,2rem)]">
          <button
            onClick={signupWithGoogle}
            disabled={loading}
            type="button"
            className="w-full h-[clamp(2.75rem,7vw,3rem)] flex items-center justify-center gap-[clamp(0.5rem,1.5vw,0.75rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] border border-[#DDD9E5] bg-white px-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.78rem,1.6vw,0.875rem)] text-[#292638] font-medium hover:bg-[#F9F8FC] transition cursor-pointer disabled:cursor-not-allowed"
          >
            <img
              src={googleIcon}
              alt="Google"
              className="w-[clamp(1.1rem,4vw,1.375rem)] h-[clamp(1.1rem,4vw,1.375rem)] object-contain"
            />
            Continue with Google
          </button>

          <div className="flex items-center gap-[clamp(0.65rem,2vw,1rem)] my-[clamp(1.25rem,4vw,1.5rem)]">
            <div className="h-px flex-1 bg-[#EAE7EF]"></div>

            <span className="text-[clamp(0.65rem,1.3vw,0.75rem)] text-[#9A96A8]">
              OR
            </span>

            <div className="h-px flex-1 bg-[#EAE7EF]"></div>
          </div>

          <form
            onSubmit={signupHandler}
            className="space-y-[clamp(1rem,3vw,1.25rem)]"
          >
            <div>
              <label
                htmlFor="fullName"
                className="block text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium text-[#39364A] mb-[clamp(0.4rem,1vw,0.5rem)]"
              >
                Full Name
              </label>

              <div className="relative">
                <i className="ph ph-user absolute left-[clamp(0.7rem,2vw,0.875rem)] top-1/2 -translate-y-1/2 text-[#9A96A8] text-[clamp(1rem,3vw,1.25rem)]"></i>

                <input
                  disabled={loading}
                  id="fullName"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full h-[clamp(2.75rem,7vw,3rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] border-[1.5px] border-[#DDD9E5] bg-white pl-[clamp(2.5rem,7vw,2.75rem)] pr-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.78rem,1.6vw,0.875rem)] text-[#292638] placeholder:text-[#AAA6B5] outline-none focus:border-[#6D5DFB] transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium text-[#39364A] mb-[clamp(0.4rem,1vw,0.5rem)]"
              >
                Email
              </label>

              <div className="relative">
                <i className="ph ph-envelope-simple absolute left-[clamp(0.7rem,2vw,0.875rem)] top-1/2 -translate-y-1/2 text-[#9A96A8] text-[clamp(1rem,3vw,1.25rem)]"></i>

                <input
                  disabled={loading}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-[clamp(2.75rem,7vw,3rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] border-[1.5px] border-[#DDD9E5] bg-white pl-[clamp(2.5rem,7vw,2.75rem)] pr-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.78rem,1.6vw,0.875rem)] text-[#292638] placeholder:text-[#AAA6B5] outline-none focus:border-[#6D5DFB] transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium text-[#39364A] mb-[clamp(0.4rem,1vw,0.5rem)]"
              >
                Password
              </label>

              <div className="relative">
                <i className="ph ph-lock-key absolute left-[clamp(0.7rem,2vw,0.875rem)] top-1/2 -translate-y-1/2 text-[#9A96A8] text-[clamp(1rem,3vw,1.25rem)]"></i>

                <input
                  disabled={loading}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full h-[clamp(2.75rem,7vw,3rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] border-[1.5px] border-[#DDD9E5] bg-white pl-[clamp(2.5rem,7vw,2.75rem)] pr-[clamp(2.75rem,7vw,3rem)] text-[clamp(0.78rem,1.6vw,0.875rem)] text-[#292638] placeholder:text-[#AAA6B5] outline-none focus:border-[#6D5DFB] transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex justify-center items-center absolute right-[clamp(0.25rem,0.8vw,0.375rem)] top-1/2 -translate-y-1/2 p-[clamp(0.35rem,1vw,0.5rem)] text-[#9A96A8] hover:text-[#6D5DFB] cursor-pointer"
                >
                  <i
                    className={`ph ${
                      showPassword ? "ph-eye-slash" : "ph-eye"
                    } text-[clamp(1rem,3vw,1.25rem)]`}
                  ></i>
                </button>
              </div>
            </div>

            <div
              className={`flex items-center gap-[clamp(0.4rem,1vw,0.5rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] border border-red-200 bg-red-50 px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.65rem,1.5vw,0.75rem)] text-[clamp(0.72rem,1.5vw,0.875rem)] text-red-600 ${
                error ? "" : "hidden"
              }`}
            >
              <i className="ph ph-warning-circle text-[clamp(1rem,2.5vw,1.125rem)] shrink-0"></i>

              <span className="break-words">{error}</span>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="relative w-full h-[clamp(2.75rem,7vw,3rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] bg-[#6D5DFB] text-white text-[clamp(0.78rem,1.6vw,0.875rem)] font-semibold hover:bg-[#5D4DED] transition cursor-pointer disabled:cursor-not-allowed"
            >
              <span className={loading ? "opacity-0" : "opacity-100"}>
                Create Account
              </span>

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)] border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </form>

          <p className="text-center text-[clamp(0.75rem,1.6vw,0.875rem)] text-[#77738A] mt-[clamp(1.25rem,4vw,1.5rem)] leading-6">
            Already have an account?{" "}
            <Link
              onClick={(e) => {
                if (loading) {
                  e.preventDefault();
                }
              }}
              to="/login"
              className="font-semibold text-[#6D5DFB] hover:text-[#5848E8]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
