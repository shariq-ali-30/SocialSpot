import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const location = useLocation();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

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
                className={`relative flex h-[70px] text-sm items-center gap-2 px-5 font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[#6D5DFB]"
                    : "text-[#625E72] hover:text-[#6D5DFB]"
                }`}
              >
                <i
                  className={`${item.icon} text-[19px] ${
                    isActive ? "font-bold" : ""
                  }`}
                />

                <span>{item.name}</span>

                {isActive ? (
                  <span className="absolute bottom-0 left-1/2 translate-x-[-50%] h-[2px] rounded-full w-14 bg-[#6D5DFB]" />
                ) : (
                  <span className="absolute bottom-0 left-1/2 translate-x-[-50%] h-[2px] rounded-full w-0 bg-[#6D5DFB]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-3">
          {/* User */}
          <Link to={"/profile"} className="hidden items-center gap-2 sm:flex">
            <div className="h-11 w-11 overflow-hidden rounded-full border border-[#E7E4F0] bg-[#F3F1FA]">
              <img
                src={currentUser?.avatar || "https://i.pravatar.cc/100?img=12"}
                alt={currentUser?.name || "User"}
                className="h-full w-full object-cover"
              />
            </div>
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={logoutHandler}
            className="flex h-10 items-center gap-2 rounded-lg border border-[#E7E4F0] px-4 text-sm font-medium text-[#302C40] transition-all duration-200 hover:border-[#D8D3EE] hover:bg-[#F8F7FC] hover:text-[#6D5DFB] cursor-pointer"
          >
            <i className="ph ph-sign-out text-[18px]" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
