import React, { useContext, useRef, useState } from "react";
import googleIcon from "../images/google-icon.png";
import { Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { UserContext } from "../context/UserContext";
import { auth, db, googleProvider } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let errorTimeout = useRef(null);

  if (currentUser) {
    return <Navigate to={"/"} />;
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

  const loginWithGoogle = async () => {
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

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return document.getElementById("email").focus();
    }

    if (!password.trim()) {
      return document.getElementById("password").focus();
    }

    setLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      setCurrentUser(user.uid);

      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        showError("Invalid email or password.");
      } else if (error.code === "auth/user-disabled") {
        showError("This account has been disabled.");
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
    <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#17152A]">Welcome Back</h1>

          <p className="text-[#77738A] mt-2">
            Login to your account to continue
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E5E2EC] rounded-2xl p-6 sm:p-8">
          {/* Google Button */}
          <button
            onClick={loginWithGoogle}
            disabled={loading}
            type="button"
            className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-[#DDD9E5] bg-white text-[#292638] font-medium hover:bg-[#F9F8FC] transition cursor-pointer"
          >
            <img src={googleIcon} width={22} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-[#EAE7EF]"></div>

            <span className="text-xs text-[#9A96A8]">OR</span>

            <div className="h-px flex-1 bg-[#EAE7EF]"></div>
          </div>

          <form onSubmit={loginHandler} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#39364A] mb-2"
              >
                Email
              </label>

              <div className="relative">
                <i className="ph ph-envelope-simple absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A96A8] text-xl"></i>

                <input
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 rounded-lg border-[1.5px] border-[#DDD9E5] bg-white pl-11 pr-4 text-[#292638] placeholder:text-[#AAA6B5] outline-none focus:border-[#6D5DFB] transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#39364A]"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <i className="ph ph-lock-key absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A96A8] text-xl"></i>

                <input
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-12 rounded-lg border-[1.5px] border-[#DDD9E5] bg-white pl-11 pr-11 text-[#292638] placeholder:text-[#AAA6B5] outline-none focus:border-[#6D5DFB] transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex justify-center items-center absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-[#9A96A8] hover:text-[#6D5DFB] cursor-pointer"
                >
                  <i
                    className={`ph ${
                      showPassword ? "ph-eye-slash" : "ph-eye"
                    } text-xl`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Error Message */}
            <div
              className={`flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 ${error ? "" : "hidden"}`}
            >
              <i className="ph ph-warning-circle text-lg"></i>
              <span>{error}</span>
            </div>

            {/* Login Button */}
            <button
              disabled={loading}
              type="submit"
              className="relative w-full h-12 rounded-lg bg-[#6D5DFB] text-white font-semibold hover:bg-[#5D4DED] transition cursor-pointer"
            >
              <span className={loading ? "opacity-0" : "opacity-100"}>
                Login
              </span>

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-sm text-[#77738A] mt-6">
            Don't have an account?{" "}
            <Link
              onClick={(e) => { if (loading) { e.preventDefault(); } }}
              to={"/signup"}
              className="font-semibold text-[#6D5DFB] hover:text-[#5848E8]"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
