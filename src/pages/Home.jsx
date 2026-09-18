import { useContext, useState } from "react";
import CreatePostModal from "../components/CreatePostModal";
import LoginRequiredModal from "../components/LoginRequiredModal";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { currentUser, userData, posts, loadingPosts } =
    useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const openCreatePostModal = () => {
    if (!currentUser) {
      return setOpenLoginModal(true);
    }

    setOpenModal(true);
  };

  return (
    <>
      <main className="bg-[#F8F7FC] overflow-y-scroll scrollbar-none">
        <div className="mx-auto w-full max-w-[1920px] min-h-screen pb-[clamp(1rem,2vw,1.5rem)]">
          <Navbar />

          <div className="w-[calc(100%-clamp(1rem,4vw,2rem))] max-w-[800px] mx-auto bg-white border border-[#E5E2EC] rounded-[clamp(0.75rem,1.8vw,1rem)] p-[clamp(0.85rem,1.8vw,1.25rem)] my-[clamp(0.85rem,1.8vw,1.25rem)]">
            <div className="flex items-center gap-[clamp(0.6rem,1.5vw,0.75rem)]">
              <div className="w-[clamp(2.5rem,5vw,2.75rem)] h-[clamp(2.5rem,5vw,2.75rem)] rounded-full overflow-hidden shrink-0 bg-[#F8F7FC]">
                <img
                  src={
                    userData?.profileImage ||
                    "https://res.cloudinary.com/h9rncg6u/image/upload/v1789618750/nzcseilvsvwbluzwexmy.jpg"
                  }
                  alt={userData?.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                onClick={openCreatePostModal}
                className="w-full text-left rounded-[clamp(0.5rem,1.2vw,0.625rem)] border border-[#DDD9E5] bg-[#FDFDFF] px-[clamp(0.8rem,2vw,1rem)] py-[clamp(0.6rem,1.5vw,0.75rem)] text-[clamp(0.78rem,1.4vw,0.875rem)] leading-5 text-[#77738A] transition hover:bg-[#F8F7FC] cursor-pointer"
              >
                What's on your mind?
              </button>
            </div>
          </div>

          {loadingPosts ? (
            <div className="w-full max-w-[800px] mx-auto flex flex-col items-center justify-center py-28 px-[clamp(1rem,4vw,1.25rem)] absolute top-1/2 left-1/2 translate-y-[-35%] translate-x-[-50%]">
              <div className="w-[clamp(2.25rem,6vw,2.5rem)] h-[clamp(2.25rem,6vw,2.5rem)] border-4 border-[#E5E2EC] border-t-[#6D5DFB] rounded-full animate-spin" />

              <p className="mt-[clamp(0.85rem,2vw,1rem)] text-[clamp(0.8rem,1.5vw,0.875rem)] font-medium text-[#77738A]">
                Loading posts...
              </p>

              <p className="mt-[clamp(0.25rem,0.8vw,0.375rem)] text-[clamp(0.68rem,1.2vw,0.75rem)] text-[#A5A1B2]">
                Please wait a moment
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="w-full max-w-[800px] mx-auto flex flex-col items-center justify-center py-28 px-[clamp(1rem,4vw,1.25rem)] absolute top-1/2 left-1/2 translate-y-[-35%] translate-x-[-50%]">
              <div className="w-[clamp(3.5rem,9vw,4rem)] h-[clamp(3.5rem,9vw,4rem)] rounded-[clamp(0.9rem,2.5vw,1rem)] bg-[#EEEBFF] flex items-center justify-center text-[#6D5DFB] text-[clamp(1.65rem,4vw,1.875rem)]">
                <i className="ph ph-note-pencil"></i>
              </div>

              <h3 className="mt-[clamp(0.9rem,2vw,1.25rem)] text-[clamp(0.95rem,1.8vw,1rem)] font-semibold text-[#383544] text-center">
                No posts yet
              </h3>

              <p className="mt-[clamp(0.35rem,1vw,0.5rem)] max-w-[clamp(17rem,80vw,24rem)] text-center text-[clamp(0.74rem,1.5vw,0.875rem)] leading-[clamp(1.2rem,2vw,1.5rem)] text-[#8B8798]">
                There are no posts to show right now. Be the first one to share
                something!
              </p>
            </div>
          ) : (
            <div className="w-full max-w-[800px] mx-auto px-[clamp(0rem,1vw,0.25rem)]">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  data={post}
                  setOpenModal={setOpenModal}
                  setEditMode={setEditMode}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <CreatePostModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        editMode={editMode}
        setEditMode={setEditMode}
      />

      <LoginRequiredModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </>
  );
};

export default Home;
