import { Link } from "react-router-dom";

const LoginRequiredModal = ({ openLoginModal, setOpenLoginModal }) => {
  const closeModal = () => {
    setOpenLoginModal(false);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-[#17152A]/45 backdrop-blur-[3px] px-[clamp(0.75rem,4vw,1rem)] transition-all duration-300 ${
        openLoginModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[420px] bg-white rounded-[clamp(0.8rem,2vw,1rem)] border border-[#E5E2EC] shadow-[0_20px_50px_rgba(23,21,42,0.12)] overflow-hidden transform transition-all duration-300 ${
          openLoginModal ? "scale-100 translate-y-0" : "scale-95 translate-y-6"
        }`}
      >
        <div className="px-[clamp(1rem,4vw,1.5rem)] py-[clamp(1.5rem,5vw,1.75rem)] text-center">
          <div className="w-[clamp(3.25rem,12vw,3.5rem)] h-[clamp(3.25rem,12vw,3.5rem)] mx-auto mb-[clamp(0.8rem,2vw,1rem)] rounded-full bg-[#F0EEFF] flex items-center justify-center">
            <i className="ph-bold ph-lock-key text-[clamp(1.5rem,5vw,1.875rem)] text-[#6D5DFB]"></i>
          </div>

          <h2 className="text-[clamp(1rem,3vw,1.25rem)] font-bold text-[#17152A]">
            Login Required
          </h2>

          <p className="text-[clamp(0.75rem,1.8vw,0.875rem)] text-[#77738A] mt-[clamp(0.4rem,1vw,0.5rem)] leading-[clamp(1.3rem,3vw,1.5rem)] max-w-[340px] mx-auto">
            You need to be logged in to create a post. Please login to
            continue.
          </p>
        </div>

        <div className="px-[clamp(1rem,4vw,1.5rem)] pb-[clamp(1rem,4vw,1.5rem)] flex gap-[clamp(0.5rem,1.5vw,0.75rem)]">
          <button
            onClick={closeModal}
            className="flex-1 h-[clamp(2.6rem,7vw,2.75rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] border border-[#DDD9E5] bg-white text-[#5F5B6D] font-medium hover:bg-[#F8F7FC] hover:border-[#CCC8D8] transition text-[clamp(0.75rem,1.6vw,0.875rem)] cursor-pointer"
          >
            Close
          </button>

          <Link
            to="/login"
            className="flex-1 flex justify-center items-center h-[clamp(2.6rem,7vw,2.75rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] bg-[#6D5DFB] text-white font-semibold hover:bg-[#5D4DED] transition text-[clamp(0.75rem,1.6vw,0.875rem)] cursor-pointer shadow-sm"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;