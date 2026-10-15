import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase/firebase";
import DeletePostModal from "./DeletePostModal";
import { UserContext } from "../context/UserContext";

const PostCard = ({ data, setOpenModal, setEditMode }) => {
  const { currentUser, userData } = useContext(UserContext);

  const [showMenu, setShowMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const dummyComments = [
    {
      id: 1,
      name: "Ayesha Khan",
      avatar: "https://i.pravatar.cc/100?img=47",
      time: "2m ago",
      text: "This is such a great post! Really loved the idea behind it. ❤️",
      likes: 12,
    },
    {
      id: 2,
      name: "Ali Ahmed",
      avatar: "https://i.pravatar.cc/100?img=12",
      time: "15m ago",
      text: "Amazing work! Keep sharing more content like this. 👏",
      likes: 5,
    },
    {
      id: 3,
      name: "Sara Malik",
      avatar: "https://i.pravatar.cc/100?img=32",
      time: "1h ago",
      text: "I completely agree with this. Thanks for sharing your thoughts!",
      likes: 8,
    },
    {
      id: 4,
      name: "Hamza Ali",
      avatar: "https://i.pravatar.cc/100?img=13",
      time: "3h ago",
      text: "Very helpful post! Looking forward to seeing more updates.",
      likes: 3,
    },
    {
      id: 4,
      name: "Hamza Ali",
      avatar: "https://i.pravatar.cc/100?img=13",
      time: "3h ago",
      text: "Very helpful post! Looking forward to seeing more updates.",
      likes: 3,
    },
    {
      id: 4,
      name: "Hamza Ali",
      avatar: "https://i.pravatar.cc/100?img=13",
      time: "3h ago",
      text: "Very helpful post! Looking forward to seeing more updates.",
      likes: 3,
    },
    {
      id: 4,
      name: "Hamza Ali",
      avatar: "https://i.pravatar.cc/100?img=13",
      time: "3h ago",
      text: "Very helpful post! Looking forward to seeing more updates.",
      likes: 3,
    },
  ];

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "";

    const postDate = timestamp.toDate();
    const now = new Date();

    const seconds = Math.floor((now - postDate) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(days / 365);
    return `${years}y ago`;
  };

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
        {/* Post Header */}
        <div className="px-[clamp(0.85rem,2vw,1.25rem)] pt-[clamp(0.85rem,2vw,1.25rem)]">
          <div className="flex items-start justify-between gap-[clamp(0.5rem,1.5vw,0.75rem)]">
            <div className="flex items-center gap-[clamp(0.6rem,1.5vw,0.75rem)] min-w-0">
              <img
                src={
                  data.authorProfile ||
                  "https://res.cloudinary.com/h9rncg6u/image/upload/v1789618750/nzcseilvsvwbluzwexmy.jpg"
                }
                alt={data.authorName}
                className="w-[clamp(2.5rem,5vw,2.75rem)] h-[clamp(2.5rem,5vw,2.75rem)] rounded-full object-cover shrink-0"
              />

              <div className="min-w-0">
                <h3 className="text-[clamp(0.875rem,1.8vw,1rem)] font-semibold text-[#17152A] truncate">
                  {data.authorName}
                </h3>

                <div className="flex items-center gap-[clamp(0.2rem,0.6vw,0.25rem)] mt-[clamp(0.1rem,0.3vw,0.125rem)]">
                  <i className="ph ph-clock text-[clamp(0.8rem,1.6vw,0.875rem)] text-[#9A96A8] shrink-0"></i>

                  <span className="text-[clamp(0.68rem,1.3vw,0.75rem)] text-[#9A96A8] whitespace-nowrap">
                    {getTimeAgo(data.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Post Menu */}
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
                    className="w-full h-[clamp(2.35rem,6vw,2.5rem)] px-[clamp(0.65rem,1.5vw,0.75rem)] rounded-[clamp(0.45rem,1vw,0.5rem)] mt-[clamp(0.2rem,0.5vw,0.25rem)] flex items-center gap-[clamp(0.5rem,1.2vw,0.625rem)] text-[clamp(0.78rem,1.5vw,0.875rem)] font-medium text-[#39364A] bg-white hover:bg-red-50 hover:text-red-500 transition cursor-pointer disabled:text-[#B2AEBB] disabled:bg-[#F8F7FC] disabled:cursor-not-allowed disabled:hover:text-[#B2AEBB]"
                  >
                    <i className="ph ph-trash text-[clamp(1rem,2.5vw,1.125rem)]"></i>
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          <div className="mt-[clamp(0.7rem,1.8vw,0.875rem)]">
            <h2 className="text-[clamp(0.95rem,2vw,1.0625rem)] font-semibold text-[#17152A] leading-[clamp(1.35rem,2.8vw,1.5rem)]">
              {data.title}
            </h2>

            <p
              className={`mt-[clamp(0.3rem,0.8vw,0.375rem)] text-[clamp(0.78rem,1.5vw,0.875rem)] leading-[clamp(1.25rem,2.5vw,1.3125rem)] text-[#77738A] ${
                !seeMore ? "max-h-[2.6rem]" : "max-h-[clamp(12rem,30vw,25rem)]"
              } overflow-hidden transition-[max-height] duration-300 ease-in-out`}
            >
              {data.description}
            </p>

            {data.description.length > 261 && (
              <button
                type="button"
                onClick={() => setSeeMore(!seeMore)}
                className="my-[-10px] select-none inline-flex items-center gap-1 text-[clamp(0.72rem,1.4vw,0.8rem)] font-semibold text-[#6D5DFB] cursor-pointer"
              >
                <span>{seeMore ? "Show less" : "Read more"}</span>

                <i
                  className={`ph-bold ${
                    seeMore ? "ph-caret-up" : "ph-caret-down"
                  } text-[clamp(0.65rem,1.3vw,0.75rem)]`}
                ></i>
              </button>
            )}
          </div>
        </div>

        {/* Post Image */}
        {data.image && (
          <div className="px-[clamp(0.85rem,2vw,1.25rem)] mt-[clamp(0.7rem,1.8vw,0.875rem)]">
            <img
              src={data.image}
              alt={data.title}
              className="max-w-full max-h-[clamp(30rem,50vw,31.25rem)] object-cover rounded-[clamp(0.2rem,1.8vw,0.75rem)] mx-auto"
            />
          </div>
        )}

        {/* Like and Comment Actions */}
        <div className="px-[clamp(0.85rem,2vw,1.25rem)] py-[clamp(0.7rem,1.8vw,1rem)] select-none">
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => {
                if (!currentUser) {
                  return;
                }

                isLiked ? unlikePost(data.id) : likePost(data.id);
              }}
              type="button"
              className={`flex items-center gap-[clamp(0.3rem,0.8vw,0.375rem)] px-[clamp(0.6rem,1.5vw,0.75rem)] h-[clamp(2.15rem,5vw,2.25rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] cursor-pointer outline-none ${
                isLiked ? "text-[#6D5DFB]" : "text-[#77738A]"
              } hover:bg-[#F4F1FF] hover:text-[#6D5DFB] transition-all duration-200`}
            >
              <i
                key={isLiked ? "liked" : "unliked"}
                className={`ph${isLiked ? "-fill" : ""} ph-heart text-[clamp(1.1rem,2.8vw,1.3125rem)] ${
                  isLiked ? "animate-[heartPop_0.15s_ease-out]" : ""
                }`}
              ></i>

              <span className="text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium">
                {(data.likedBy || []).length} Likes
              </span>
            </button>

            {/* Toggle Comments */}
            <button
              type="button"
              onClick={() => setShowComments(!showComments)}
              aria-expanded={showComments}
              className={`flex items-center gap-[clamp(0.3rem,0.8vw,0.375rem)] px-[clamp(0.6rem,1.5vw,0.75rem)] h-[clamp(2.15rem,5vw,2.25rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] cursor-pointer transition-all duration-200 outline-none ${
                showComments
                  ? "text-[#6D5DFB] bg-[#F4F1FF]"
                  : "text-[#77738A] hover:bg-[#F4F1FF] hover:text-[#6D5DFB]"
              }`}
            >
              <i className="ph ph-chat-circle text-[clamp(1.1rem,2.8vw,1.3125rem)]"></i>

              <span className="text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium">
                5 Comments
              </span>
            </button>
          </div>
        </div>

        {/* Comments Section UI */}
        <div
          className={`overflow-x-hidden overflow-y-auto bg-[#FDFCFF] custom-scrollbar comments-scrollbar transition-[max-height] duration-200 ease-in-out ${
            showComments ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="border-t border-gray-200">
            <div className="border-t border-[#EAE7EF] bg-[#FDFCFF] px-[clamp(0.85rem,2vw,1.25rem)] py-[clamp(1rem,2.5vw,1.25rem)]">
              {/* Comment Input UI */}
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <textarea
                    rows={2}
                    placeholder={
                      currentUser
                        ? "Write a comment..."
                        : "Login to write a comment..."
                    }
                    disabled={!currentUser}
                    className="custom-scrollbar caret-[#6D5DFB] w-full resize-none rounded-xl border border-[#DDD9E5] bg-white px-3 py-2.5 text-sm text-[#292638] placeholder:text-[#AAA6B5] outline-none focus:border-[#6D5DFB] transition disabled:cursor-not-allowed disabled:bg-[#F8F7FC]"
                  />

                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      disabled={!currentUser}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6D5DFB] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5D4DED] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    >
                      <i className="ph ph-paper-plane-tilt"></i>
                      Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Empty Comments State */}
              {/* Comments List */}
              <div className="mt-5 space-y-5">
                {dummyComments.length > 0 ? (
                  dummyComments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      {/* Comment Avatar */}
                      <img
                        src={comment.avatar}
                        alt={comment.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-white"
                      />

                      {/* Comment Content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-white border border-[#EAE7EF] rounded-2xl rounded-tl-md px-4 py-3">
                          {/* Name and Time */}
                          <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                            <h4 className="text-sm font-semibold text-[#292638]">
                              {comment.name}
                            </h4>

                            <span className="text-[#C1BDCA] text-xs">•</span>

                            <span className="text-xs text-[#9A96A8]">
                              {comment.time}
                            </span>
                          </div>

                          {/* Comment Text */}
                          <p className="mt-1.5 text-sm leading-6 text-[#625E72] break-words">
                            {comment.text}
                          </p>
                        </div>

                        {/* Comment Actions */}
                        <div className="flex items-center gap-4 px-2 mt-2">
                          <span className="text-xs font-semibold text-[#77738A]">
                            Like
                          </span>

                          <div className="flex items-center gap-1 text-[#9A96A8]">
                            <i className="ph ph-heart text-sm"></i>

                            <span className="text-xs">{comment.likes}</span>
                          </div>

                          <span className="text-xs font-semibold text-[#77738A]">
                            Reply
                          </span>
                        </div>
                      </div>

                      {/* More Options */}
                      <button
                        type="button"
                        aria-label={`More options for ${comment.name}'s comment`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-[#A7A2B2] hover:bg-white hover:text-[#6D5DFB] transition shrink-0"
                      >
                        <i className="ph-bold ph-dots-three text-lg"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  /* Empty Comments State */
                  <div className="flex flex-col items-center justify-center py-7 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEEBFF] text-[#6D5DFB]">
                      <i className="ph ph-chats-circle text-2xl"></i>
                    </div>

                    <h4 className="mt-3 text-sm font-semibold text-[#39364A]">
                      No comments yet
                    </h4>

                    <p className="mt-1 max-w-xs text-xs leading-5 text-[#8B8798]">
                      Be the first to share your thoughts on this post.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
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
