import React, { useState } from "react";
import googleIcon from "../images/google-icon.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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

          <form className="space-y-5">
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
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-[#6D5DFB] text-white font-semibold hover:bg-[#5D4DED] transition cursor-pointer"
            >
              Login
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-sm text-[#77738A] mt-6">
            Don't have an account?{" "}
            <Link
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
