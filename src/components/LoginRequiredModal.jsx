import { Link } from "react-router-dom";

const LoginRequiredModal = ({ openLoginModal, setOpenLoginModal }) => {
  const closeModal = () => {
    setOpenLoginModal(false);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-[#17152A]/45 backdrop-blur-[3px] px-4 transition-all duration-300 ${
        openLoginModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[420px] bg-white rounded-xl border border-[#E5E2EC] shadow-[0_20px_50px_rgba(23,21,42,0.12)] overflow-hidden transform transition-all duration-300 ${
          openLoginModal ? "scale-100 translate-y-0" : "scale-95 translate-y-6"
        }`}
      >
        {/* Body */}
        <div className="px-6 py-7 text-center">
          {/* Icon */}
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#F0EEFF] flex items-center justify-center">
            <i className="ph-bold ph-lock-key text-3xl text-[#6D5DFB]"></i>
          </div>

          {/* Heading */}
          <h2 className="text-xl font-bold text-[#17152A]">Login Required</h2>

          {/* Description */}
          <p className="text-sm text-[#77738A] mt-2 leading-6">
            You need to be logged in to create a post. Please login to continue.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={closeModal}
            className="flex-1 h-11 rounded-lg border border-[#DDD9E5] bg-white text-[#5F5B6D] font-medium hover:bg-[#F8F7FC] hover:border-[#CCC8D8] transition text-sm cursor-pointer"
          >
            Close
          </button>

          <Link
            to={"/login"}
            className="flex-1 flex justify-center items-center h-11 rounded-lg bg-[#6D5DFB] text-white font-semibold hover:bg-[#5D4DED] transition text-sm cursor-pointer shadow-sm"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
