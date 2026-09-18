import { useContext, useState } from "react";
import CreatePostModal from "../components/CreatePostModal";
import LoginRequiredModal from "../components/LoginRequiredModal";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { currentUser, userData, posts } = useContext(UserContext);

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
      <main className=" bg-[#F8F7FC]">
        <div className="mx-auto w-full max-w-[1920px] min-h-screen pb-5">
          <Navbar />

          <div className="bg-white border border-[#E5E2EC] rounded-2xl p-5 my-5 w-full max-w-[800px] mx-auto">
            {/* User + Textarea */}
            <div className="flex gap-3">
              {/* User Avatar */}
              <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-[#F8F7FC]">
                <img
                  src={
                    userData?.profileImage ||
                    "https://res.cloudinary.com/h9rncg6u/image/upload/v1789618750/nzcseilvsvwbluzwexmy.jpg"
                  }
                  alt={userData?.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Input */}
              <button
                onClick={openCreatePostModal}
                className="w-full text-left resize-none rounded-lg border border-[#DDD9E5] bg-[#FDFDFF] px-4 py-3 text-sm text-[#77738A] transition hover:bg-[#F8F7FC] cursor-pointer"
              >
                What's on your mind?
              </button>
            </div>
          </div>

          {posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                data={post}
                setOpenModal={setOpenModal}
                setEditMode={setEditMode}
              />
            );
          })}
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
