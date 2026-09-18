import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase/firebase";
import DeletePostModal from "./DeletePostModal";
import { UserContext } from "../context/UserContext";

const PostCard = ({ data, setOpenModal, setEditMode }) => {
  const { currentUser } = useContext(UserContext);

  const [showMenu, setShowMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  let date = data.createdAt?.toDate().toLocaleString("en-PK", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  let time = data.createdAt?.toDate().toLocaleString("en-PK", {
    hour: "numeric",
    minute: "2-digit",
  });

  let isAuthor = data.authorId == currentUser;
  let isLiked = data.likedBy.find((authorId) => authorId == currentUser);

  const deletePost = () => {
    deleteDoc(doc(db, "posts", data.id));
  };

  const likePost = (postId) => {
    const postRef = doc(db, "posts", postId);

    updateDoc(postRef, {
      likedBy: [...data.likedBy, currentUser],
    });
  };

  const unlikePost = (postId) => {
    let updatedLikes = data.likedBy.filter(
      (authorId) => authorId != currentUser,
    );
    const postRef = doc(db, "posts", postId);

    updateDoc(postRef, {
      likedBy: updatedLikes,
    });
  };

  return (
    <>
      <article className=" w-full max-w-[800px] mx-auto bg-white border border-[#E5E2EC] rounded-2xl mb-5">
        {/* Header */}
        <div className="px-4 pt-4 sm:px-5 sm:pt-5">
          <div className="flex items-start justify-between">
            {/* User */}
            <div className="flex items-center gap-3">
              <img
                src={
                  data.authorProfile ||
                  "https://res.cloudinary.com/h9rncg6u/image/upload/v1789618750/nzcseilvsvwbluzwexmy.jpg"
                }
                alt={data.authorName}
                className="w-11 h-11 rounded-full object-cover border border-[#E5E2EC]"
              />

              <div>
                <h3 className="text-md font-semibold text-[#17152A]">
                  {data.authorName}
                </h3>

                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs text-[#9A96A8]">{`${date} at ${time}`}</span>
                  <i className="ph ph-globe-hemisphere-west text-sm text-[#9A96A8]"></i>
                </div>
              </div>
            </div>

            {/* Three Dots */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#77738A] hover:bg-[#F8F7FC] hover:text-[#17152A] transition cursor-pointer"
              >
                <i className="ph-bold ph-dots-three-vertical text-2xl"></i>
              </button>

              {/* Options Menu */}
              {showMenu && (
                <div className="absolute right-0 top-10 z-20 w-40 bg-white border border-[#E5E2EC] rounded-xl p-1.5">
                  {/* Edit */}
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setOpenModal(true);
                      setEditMode(data);
                    }}
                    disabled={!isAuthor}
                    type="button"
                    className="w-full h-10 px-3 rounded-lg flex items-center gap-2.5 text-sm font-medium text-[#39364A] bg-white hover:bg-[#F8F7FC] hover:text-[#6D5DFB] transition cursor-pointer disabled:text-[#B2AEBB] disabled:bg-[#F8F7FC] disabled:cursor-not-allowed disabled:hover:text-[#B2AEBB]"
                  >
                    <i className="ph ph-pencil-simple text-lg"></i>
                    <span>Edit</span>
                  </button>

                  {/* Delete */}
                  <button
                    disabled={!isAuthor}
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setShowMenu(false);
                    }}
                    type="button"
                    className="w-full h-10 px-3 mt-1 rounded-lg flex items-center gap-2.5 text-sm font-medium text-[#39364A] bg-white hover:bg-red-50 hover:text-red-500 transition cursor-pointer disabled:text-[#B2AEBB] disabled:bg-[#F8F7FC] disabled:cursor-not-allowed disabled:hover:text-[#B2AEBB]"
                  >
                    <i className="ph ph-trash text-lg"></i>
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="mt-3">
            <h2 className="text-[17px] font-semibold text-[#17152A] leading-6">
              {data.title}
            </h2>

            <p className="mt-1.5 text-sm leading-[21px] text-[#77738A]">
              {data.description}
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="px-4 sm:px-5 mt-3">
          <img
            src={data.image}
            alt={data.title}
            className="max-w-full max-h-[500px] object-cover rounded-xl mx-auto"
          />
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-4 select-none">
          <button
            onClick={() => {
              if (!currentUser) {
                return;
              }

              isLiked ? unlikePost(data.id) : likePost(data.id);
            }}
            type="button"
            className={`flex items-center gap-1.5 px-3 h-9 rounded-lg cursor-pointer ${isLiked ? "text-[#6D5DFB]" : "text-[#77738A]"} hover:bg-[#F4F1FF] hover:text-[#6D5DFB] transition-all duration-200`}
          >
            <i
              className={`ph${isLiked ? "-fill" : ""} ph-heart text-[21px]`}
            ></i>

            <span className="text-sm font-medium">
              {data.likedBy.length} Likes
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
