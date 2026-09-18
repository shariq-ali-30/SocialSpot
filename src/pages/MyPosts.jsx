import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";

const MyPosts = () => {
  const { currentUser, posts, loadingPosts } = useContext(UserContext);
  const filterdPosts = posts.filter((post) => post.authorId == currentUser);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(null);

  return (
    <>
      <main className="bg-[#F8F7FC] overflow-y-scroll scrollbar-none">
        <div className="mx-auto w-full max-w-[1920px] min-h-screen pb-[clamp(1rem,2vw,1.5rem)]">
          <Navbar />

          {loadingPosts ? (
            <div className="w-full max-w-[800px] mx-auto flex flex-col items-center justify-center py-28 px-[clamp(1rem,4vw,1.25rem)] absolute top-1/2 left-1/2 translate-y-[-45%] translate-x-[-50%]">
              <div className="w-[clamp(2.25rem,6vw,2.5rem)] h-[clamp(2.25rem,6vw,2.5rem)] border-4 border-[#E5E2EC] border-t-[#6D5DFB] rounded-full animate-spin" />

              <p className="mt-[clamp(0.85rem,2vw,1rem)] text-[clamp(0.8rem,1.5vw,0.875rem)] font-medium text-[#77738A]">
                Loading your posts...
              </p>

              <p className="mt-[clamp(0.25rem,0.8vw,0.375rem)] text-[clamp(0.68rem,1.2vw,0.75rem)] text-[#A5A1B2] text-center">
                Please wait a moment
              </p>
            </div>
          ) : filterdPosts.length === 0 ? (
            <div className="w-full max-w-[800px] mx-auto flex flex-col items-center justify-center py-28 px-[clamp(1rem,4vw,1.25rem)] absolute top-1/2 left-1/2 translate-y-[-45%] translate-x-[-50%]">
              <div className="w-[clamp(3.5rem,9vw,4rem)] h-[clamp(3.5rem,9vw,4rem)] rounded-[clamp(0.9rem,2.5vw,1rem)] bg-[#EEEBFF] flex items-center justify-center text-[#6D5DFB] text-[clamp(1.65rem,4vw,1.875rem)]">
                <i className="ph ph-note-pencil"></i>
              </div>

              <h3 className="mt-[clamp(0.9rem,2vw,1.25rem)] text-[clamp(0.95rem,1.8vw,1rem)] font-semibold text-[#383544] text-center">
                No posts to show
              </h3>

              <p className="mt-[clamp(0.35rem,1vw,0.5rem)] max-w-[clamp(17rem,80vw,24rem)] text-center text-[clamp(0.74rem,1.5vw,0.875rem)] leading-[clamp(1.2rem,2vw,1.5rem)] text-[#8B8798]">
                You haven't created any posts yet. Start sharing your thoughts
                with the community.
              </p>
            </div>
          ) : (
            <div className="w-full max-w-[800px] mx-auto px-[clamp(0rem,1vw,0.25rem)]">
              {filterdPosts.map((post) => (
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
    </>
  );
};

export default MyPosts;
