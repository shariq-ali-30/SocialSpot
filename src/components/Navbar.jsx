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
      path: currentUser ? "/my-posts" : "",
      icon: "ph-bold ph-newspaper",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ECEAF4] bg-white">
      <div className="flex min-h-[clamp(3.75rem,7vw,4.375rem)] w-full items-center justify-between gap-[clamp(0.5rem,2vw,1rem)] px-[clamp(0.75rem,3vw,2.5rem)]">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-[clamp(0.4rem,1vw,0.625rem)]"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-[clamp(9rem,16vw,10.625rem)] h-auto object-contain"
          />
        </Link>

        <nav className="nav-links h-full items-center flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`link relative flex h-[clamp(3.75rem,7vw,4.375rem)] items-center gap-[clamp(0.4rem,1vw,0.5rem)] px-[clamp(0.9rem,2vw,1.25rem)] text-[clamp(0.78rem,1.3vw,0.875rem)] font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[#6D5DFB]"
                    : "text-[#625E72] hover:text-[#6D5DFB]"
                }`}
              >
                <i
                  className={`${item.icon} text-[clamp(1rem,2vw,1.1875rem)]`}
                />

                <span>{item.name}</span>

                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#6D5DFB] transition-all duration-200 ${
                    isActive ? "w-[clamp(2.5rem,5vw,3.5rem)]" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-[clamp(0.4rem,1.5vw,0.75rem)]">
          {currentUser ? (
            <>
              <div className="items-center gap-[clamp(0.4rem,1vw,0.5rem)] flex">
                <div className="h-[clamp(2.25rem,5vw,2.75rem)] w-[clamp(2.25rem,5vw,2.75rem)] flex justify-center items-center overflow-hidden rounded-full border border-[#E7E4F0] bg-[#F3F1FA]">
                  <img
                    src={
                      userData?.profileImage ||
                      "https://res.cloudinary.com/h9rncg6u/image/upload/v1789618750/nzcseilvsvwbluzwexmy.jpg"
                    }
                    alt={userData?.name || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={logoutHandler}
                className="flex h-[clamp(2.4rem,5.5vw,2.5rem)] cursor-pointer items-center justify-center gap-[clamp(0.4rem,1vw,0.5rem)] rounded-[clamp(0.4rem,1vw,0.5rem)] border border-[#E7E4F0] px-[clamp(0.7rem,2vw,1rem)] text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium text-[#302C40] transition-all duration-200 hover:border-[#F3B4B4] hover:bg-[#FFF5F5] hover:text-[#EF4444]"
              >
                <i className="ph ph-sign-out text-[clamp(1rem,2.5vw,1.125rem)]" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex h-[clamp(2.4rem,5.5vw,2.5rem)] cursor-pointer items-center justify-center rounded-[clamp(0.4rem,1vw,0.5rem)] border border-[#E7E4F0] px-[clamp(0.7rem,2vw,1rem)] text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium text-[#302C40] transition-all duration-200 hover:border-[#D8D3EE] hover:bg-[#F8F7FC] hover:text-[#6D5DFB]"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="flex h-[clamp(2.4rem,5.5vw,2.5rem)] cursor-pointer items-center justify-center rounded-[clamp(0.4rem,1vw,0.5rem)] bg-[#6D5DFB] px-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.75rem,1.5vw,0.875rem)] font-semibold text-white transition-all duration-200 hover:bg-[#5D4DED]"
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
