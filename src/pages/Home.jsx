import { useContext, useState } from "react";
import CreatePostModal from "../components/CreatePostModal";
import LoginRequiredModal from "../components/LoginRequiredModal";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { currentUser, userData } = useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const openCreatePostModal = () => {
    if (!currentUser) {
      return setOpenLoginModal(true);
    }

    setOpenModal(true);
  };

  return (
    <>
      <main className=" bg-[#F8F7FC]">
        <div className="mx-auto w-full max-w-[1920px] h-screen">
          <Navbar />
          <div className="bg-white border border-[#E5E2EC] rounded-2xl p-5 my-5 w-full max-w-[800px] mx-auto">
            {/* User + Textarea */}
            <div className="flex gap-3">
              {/* User Avatar */}
              <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-[#F8F7FC]">
                <img
                  src={
                    userData?.profileImage ||
                    "https://res.cloudinary.com/h9rncg6u/image/upload/v1789581622/qukb1ttnuzfhgs8vcng8.jpg"
                  }
                  alt={userData?.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Input */}
              <button
                onClick={openCreatePostModal}
                className="w-full text-left font-semibold resize-none rounded-lg border border-[#DDD9E5] bg-[#FDFDFF] px-4 py-3 text-sm text-[#77738A] transition hover:bg-[#F8F7FC] cursor-pointer"
              >
                What's on your mind?
              </button>
            </div>
          </div>
        </div>
      </main>
      <CreatePostModal openModal={openModal} setOpenModal={setOpenModal} />
      <LoginRequiredModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </>
  );
};

export default Home;
