import React, { useContext, useState } from "react";
import googleIcon from "../images/google-icon.png";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.js";
import { db } from "../firebase/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "../context/UserContext.jsx";

const Signup = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await setDoc(doc(db, "users", user.uid), {
      
    });

    setCurrentUser(user.uid);

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#17152A]">Create Account</h1>

          <p className="text-[#77738A] mt-2">
            Create your account to get started
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E5E2EC] rounded-2xl p-6 sm:p-8">
          {/* Google Button */}
          <button
            type="button"
            className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-[#DDD9E5] bg-white text-[#292638] font-medium hover:bg-[#F9F8FC] transition cursor-pointer"
          >
            <img src={googleIcon} width={22} alt="Google" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-[#EAE7EF]"></div>

            <span className="text-xs text-[#9A96A8]">OR</span>

            <div className="h-px flex-1 bg-[#EAE7EF]"></div>
          </div>

          <form onSubmit={signupHandler} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-[#39364A] mb-2"
              >
                Full Name
              </label>

              <div className="relative">
                <i className="ph ph-user absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A96A8] text-xl"></i>

                <input
                  id="fullName"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full h-12 rounded-lg border-[1.5px] border-[#DDD9E5] bg-white pl-11 pr-4 text-[#292638] placeholder:text-[#AAA6B5] outline-none focus:border-[#6D5DFB] transition"
                />
              </div>
            </div>

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
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 rounded-lg border-[1.5px] border-[#DDD9E5] bg-white pl-11 pr-4 text-[#292638] placeholder:text-[#AAA6B5] outline-none focus:border-[#6D5DFB] transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#39364A] mb-2"
              >
                Password
              </label>

              <div className="relative">
                <i className="ph ph-lock-key absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A96A8] text-xl"></i>

                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full h-12 rounded-lg border-[1.5px] border-[#DDD9E5] bg-white pl-11 pr-11 text-[#292638] placeholder:text-[#AAA6B5] outline-none focus:border-[#6D5DFB] transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex justify-center items-center absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9A96A8] hover:text-[#6D5DFB] cursor-pointer"
                >
                  <i
                    className={`ph ${
                      showPassword ? "ph-eye-slash" : "ph-eye"
                    } text-xl`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-[#6D5DFB] text-white font-semibold hover:bg-[#5D4DED] transition cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-[#77738A] mt-6">
            Already have an account?{" "}
            <Link
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
