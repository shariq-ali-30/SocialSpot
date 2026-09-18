import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase/firebase";
import DeletePostModal from "./DeletePostModal";
import { UserContext } from "../context/UserContext";

const PostCard = ({ data, setOpenModal, setEditMode }) => {
  const { currentUser } = useContext(UserContext);

  const [showMenu, setShowMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const date = data.createdAt?.toDate().toLocaleString("en-PK", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = data.createdAt?.toDate().toLocaleString("en-PK", {
    hour: "numeric",
    minute: "2-digit",
  });

  const isAuthor = data.authorId == currentUser;
  const isLiked = data.likedBy?.find((authorId) => authorId == currentUser);

  const deletePost = () => {
    deleteDoc(doc(db, "posts", data.id));
  };

  const likePost = (postId) => {
    const postRef = doc(db, "posts", postId);

    updateDoc(postRef, {
      likedBy: [...(data.likedBy || []), currentUser],
    });
  };

  const unlikePost = (postId) => {
    const updatedLikes = (data.likedBy || []).filter(
      (authorId) => authorId != currentUser,
    );

    const postRef = doc(db, "posts", postId);

    updateDoc(postRef, {
      likedBy: updatedLikes,
    });
  };

  return (
    <>
      <article className="w-[calc(100%-clamp(1rem,4vw,2rem))] max-w-[800px] mx-auto bg-white border border-[#E5E2EC] rounded-[clamp(0.8rem,1.8vw,1rem)] mb-[clamp(0.85rem,1.8vw,1.25rem)] mt-[clamp(0.85rem,1.8vw,1.25rem)] overflow-hidden">
        <div className="px-[clamp(0.85rem,2vw,1.25rem)] pt-[clamp(0.85rem,2vw,1.25rem)]">
          <div className="flex items-start justify-between gap-[clamp(0.5rem,1.5vw,0.75rem)]">
            <div className="flex items-center gap-[clamp(0.6rem,1.5vw,0.75rem)] min-w-0">
              <img
                src={
                  data.authorProfile ||
                  "https://res.cloudinary.com/h9rncg6u/image/upload/v1789618750/nzcseilvsvwbluzwexmy.jpg"
                }
                alt={data.authorName}
                className="w-[clamp(2.5rem,5vw,2.75rem)] h-[clamp(2.5rem,5vw,2.75rem)] rounded-full object-cover border border-[#E5E2EC] shrink-0"
              />

              <div className="min-w-0">
                <h3 className="text-[clamp(0.875rem,1.8vw,1rem)] font-semibold text-[#17152A] truncate">
                  {data.authorName}
                </h3>

                <div className="flex items-center gap-[clamp(0.2rem,0.6vw,0.25rem)] mt-[clamp(0.1rem,0.3vw,0.125rem)]">
                  <span className="text-[clamp(0.68rem,1.3vw,0.75rem)] text-[#9A96A8] whitespace-nowrap">
                    {`${date} at ${time}`}
                  </span>

                  <i className="ph ph-globe-hemisphere-west text-[clamp(0.8rem,1.6vw,0.875rem)] text-[#9A96A8] shrink-0"></i>
                </div>
              </div>
            </div>

            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="w-[clamp(2rem,5vw,2.25rem)] h-[clamp(2rem,5vw,2.25rem)] flex items-center justify-center rounded-[clamp(0.5rem,1.2vw,0.625rem)] text-[#77738A] hover:bg-[#F8F7FC] hover:text-[#17152A] transition cursor-pointer"
              >
                <i className="ph-bold ph-dots-three-vertical text-[clamp(1.25rem,3vw,1.5rem)]"></i>
              </button>

              {showMenu && (
                <div className="absolute right-0 top-[clamp(2.4rem,5vw,2.75rem)] z-20 w-[clamp(9.5rem,35vw,10rem)] bg-white border border-[#E5E2EC] rounded-[clamp(0.65rem,1.5vw,0.75rem)] p-[clamp(0.3rem,0.8vw,0.375rem)] shadow-sm">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setOpenModal(true);
                      setEditMode(data);
                    }}
                    disabled={!isAuthor}
                    type="button"
                    className="w-full h-[clamp(2.35rem,6vw,2.5rem)] px-[clamp(0.65rem,1.5vw,0.75rem)] rounded-[clamp(0.45rem,1vw,0.5rem)] flex items-center gap-[clamp(0.5rem,1.2vw,0.625rem)] text-[clamp(0.78rem,1.5vw,0.875rem)] font-medium text-[#39364A] bg-white hover:bg-[#F8F7FC] hover:text-[#6D5DFB] transition cursor-pointer disabled:text-[#B2AEBB] disabled:bg-[#F8F7FC] disabled:cursor-not-allowed disabled:hover:text-[#B2AEBB]"
                  >
                    <i className="ph ph-pencil-simple text-[clamp(1rem,2.5vw,1.125rem)]"></i>
                    <span>Edit</span>
                  </button>

                  <button
                    disabled={!isAuthor}
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setShowMenu(false);
                    }}
                    type="button"
                    className="w-full h-[clamp(2.35rem,6vw,2.5rem)] px-[clamp(0.65rem,1.5vw,0.75rem)] mt-[clamp(0.2rem,0.5vw,0.25rem)] rounded-[clamp(0.45rem,1vw,0.5rem)] flex items-center gap-[clamp(0.5rem,1.2vw,0.625rem)] text-[clamp(0.78rem,1.5vw,0.875rem)] font-medium text-[#39364A] bg-white hover:bg-red-50 hover:text-red-500 transition cursor-pointer disabled:text-[#B2AEBB] disabled:bg-[#F8F7FC] disabled:cursor-not-allowed disabled:hover:text-[#B2AEBB]"
                  >
                    <i className="ph ph-trash text-[clamp(1rem,2.5vw,1.125rem)]"></i>
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-[clamp(0.7rem,1.8vw,0.875rem)]">
            <h2 className="text-[clamp(0.95rem,2vw,1.0625rem)] font-semibold text-[#17152A] leading-[clamp(1.35rem,2.8vw,1.5rem)]">
              {data.title}
            </h2>

            <p className="mt-[clamp(0.3rem,0.8vw,0.375rem)] text-[clamp(0.78rem,1.5vw,0.875rem)] leading-[clamp(1.25rem,2.5vw,1.3125rem)] text-[#77738A]">
              {data.description}
            </p>
          </div>
        </div>

        <div className="px-[clamp(0.85rem,2vw,1.25rem)] mt-[clamp(0.7rem,1.8vw,0.875rem)]">
          <img
            src={data.image}
            alt={data.title}
            className="max-w-full max-h-[clamp(30rem,50vw,31.25rem)] object-cover rounded-[clamp(0.7rem,1.8vw,0.75rem)] mx-auto"
          />
        </div>

        <div className="px-[clamp(0.85rem,2vw,1.25rem)] py-[clamp(0.7rem,1.8vw,1rem)] select-none">
          <button
            onClick={() => {
              if (!currentUser) {
                return;
              }

              isLiked ? unlikePost(data.id) : likePost(data.id);
            }}
            type="button"
            className={`flex items-center gap-[clamp(0.3rem,0.8vw,0.375rem)] px-[clamp(0.6rem,1.5vw,0.75rem)] h-[clamp(2.15rem,5vw,2.25rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] cursor-pointer ${
              isLiked ? "text-[#6D5DFB]" : "text-[#77738A]"
            } hover:bg-[#F4F1FF] hover:text-[#6D5DFB] transition-all duration-200`}
          >
            <i
              className={`ph${isLiked ? "-fill" : ""} ph-heart text-[clamp(1.1rem,2.8vw,1.3125rem)]`}
            ></i>

            <span className="text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium">
              {(data.likedBy || []).length} Likes
            </span>
          </button>
        </div>
      </article>

      <DeletePostModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        deletePost={deletePost}
      />
    </>
  );
};

export default PostCard;
