import { deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase/firebase";
import DeletePostModal from "./DeletePostModal";
import PostComment from "./PostComment";

const PostCard = ({ data, setOpenModal, setEditMode }) => {
  const { currentUser, userData } = useContext(UserContext);

  const [showMenu, setShowMenu] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

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

  const createComment = () => {
    if (!commentText) {
      return document.getElementById("commentInput").focus();
    }

    const newComment = {
      authorId: currentUser,
      authorProfile: userData.profileImage || "",
      authorName: userData.name,
      commentText: commentText,
      createdAt: Timestamp.now(),
      likedBy: [],
    };

    const docRef = doc(db, "posts", data.id);
    updateDoc(docRef, {
      comments: [newComment, ...data.comments],
    });
    setCommentText("");
  };

  const deleteComment = (createdAt) => {
    const filteredComments = data.comments.filter(
      (comment) => comment.createdAt !== createdAt,
    );

    const docRef = doc(db, "posts", data.id);
    updateDoc(docRef, {
      comments: filteredComments,
    });
  };

  return (
    <>
      <article className="w-[calc(100%-clamp(1rem,4vw,2rem))] max-w-[800px] mx-auto bg-white border border-[#E5E2EC] rounded-[clamp(0.8rem,1.8vw,1rem)] mb-[clamp(0.85rem,1.8vw,1.25rem)] mt-[clamp(0.85rem,1.8vw,1.25rem)] overflow-hidden">
        {/* Post Header */}
        <div className="px-[clamp(0.85rem,2vw,1.25rem)] pt-[clamp(0.85rem,2vw,1.25rem)]">
          <div className="flex items-start justify-between gap-[clamp(0.5rem,1.5vw,0.75rem)]">
            <div className="flex items-center gap-[clamp(0.6rem,1.5vw,0.75rem)] min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E5DFFF] bg-[#F0ECFF]">
                {data.authorProfile ? (
                  <img
                    src={data.authorProfile}
                    alt={data.authorName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-semibold uppercase text-[#5B4BDB] mb-0.5">
                    {data.authorName.trim().charAt(0) || ""}
                  </span>
                )}
              </div>

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
            <div className="relative shrink-0 mr-[-8px]">
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="w-[clamp(2rem,5vw,2.25rem)] h-[clamp(2rem,5vw,2.25rem)] flex items-center justify-center rounded-[clamp(0.5rem,1.2vw,0.625rem)] text-[#77738A] hover:bg-[#F8F7FC] hover:text-[#6D5DFB] transition cursor-pointer"
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
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setShowMenu(false);
                    }}
                    disabled={!isAuthor}
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
                {data.comments.length} Comments
              </span>
            </button>
          </div>
        </div>

        {/* Comments Section UI */}
        {showComments && (
          <div className="w-full border-t border-gray-200"></div>
        )}
        <div
          className={`overflow-x-hidden overflow-y-auto bg-[#FDFCFF] custom-scrollbar comments-scrollbar transition-[max-height] duration-200 ease-in-out ${
            showComments ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div>
            <div className="bg-[#FDFCFF] px-[clamp(0.85rem,2vw,1.25rem)] py-[clamp(1rem,2.5vw,1.25rem)]">
              {/* Comment Input UI */}
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <textarea
                    id="commentInput"
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
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
                      onClick={createComment}
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

              {/* Comments List */}
              <div className="mt-5 space-y-5">
                {data.comments.length > 0 ? (
                  data.comments.map((comment, idx) => {
                    const isAuthor = comment.authorId === currentUser;
                    return (
                      <PostComment
                        key={idx}
                        comment={comment}
                        getTimeAgo={getTimeAgo}
                        deleteComment={deleteComment}
                        isAuthor={isAuthor}
                        postId={data.id}
                      />
                    );
                  })
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
