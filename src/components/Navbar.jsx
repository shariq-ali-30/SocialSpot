import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser, setCurrentUser, userData } = useContext(UserContext);

  const logoutHandler = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: "ph-bold ph-house",
    },
    {
      name: "My Posts",
      path: "/my-posts",
      icon: "ph-bold ph-newspaper",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ECEAF4] bg-white">
      <div className="flex min-h-[70px] w-full items-center justify-between px-5 sm:px-6 lg:px-8 xl:px-10">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img src={Logo} alt="Logo" width={170} />
        </Link>

        {/* Navigation */}
        <nav className="hidden h-full items-center md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex h-[70px] items-center gap-2 px-5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[#6D5DFB]"
                    : "text-[#625E72] hover:text-[#6D5DFB]"
                }`}
              >
                <i className={`${item.icon} text-[19px]`} />

                <span>{item.name}</span>

                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#6D5DFB] transition-all duration-200 ${
                    isActive ? "w-14" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-3">
          {currentUser ? (
            <>
              {/* User Profile */}
              <div className="hidden items-center gap-2 sm:flex">
                <div className="h-11 w-11 flex justify-center items-center overflow-hidden rounded-full border border-[#E7E4F0] bg-[#F3F1FA]">
                  <img
                    src={
                      userData?.profileImage ||
                      "https://res.cloudinary.com/h9rncg6u/image/upload/v1789581622/qukb1ttnuzfhgs8vcng8.jpg"
                    }
                    alt={userData?.name || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={logoutHandler}
                className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-[#E7E4F0] px-4 text-sm font-medium text-[#302C40] transition-all duration-200 hover:border-[#F3B4B4] hover:bg-[#FFF5F5] hover:text-[#EF4444]"
              >
                <i className="ph ph-sign-out text-[18px]" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="flex h-10 cursor-pointer items-center rounded-md border border-[#E7E4F0] px-4 text-sm font-medium text-[#302C40] transition-all duration-200 hover:border-[#D8D3EE] hover:bg-[#F8F7FC] hover:text-[#6D5DFB]"
              >
                Login
              </Link>

              {/* Signup */}
              <Link
                to="/signup"
                className="flex h-10 cursor-pointer items-center rounded-md bg-[#6D5DFB] px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#5D4DED]"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
