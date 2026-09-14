import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const logoutHandler = () => {
    setCurrentUser(null);
    navigate("/login");
  };
  return (
    <>
      <div className="text-5xl font-bold text-center mt-5">Home Page</div>
      {currentUser ? (
        <button
          onClick={logoutHandler}
          className="py-2 px-5 block mx-auto my-4 bg-red-600 text-white rounded-[4px] cursor-pointer"
        >
          Logout
        </button>
      ) : (
        <div className="flex justify-center gap-3 my-4">
          <Link
            to={"/login"}
            className="py-2 px-5 bg-[#6D5DFB] text-white rounded-[4px] cursor-pointer hover:bg-[#7B6CFC] transition"
          >
            Login
          </Link>

          <Link
            to={"/signup"}
            className="py-2 px-5 border border-[#6D5DFB] text-[#6D5DFB] rounded-[4px] cursor-pointer hover:bg-[#F0EEFF] transition"
          >
            Signup
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
