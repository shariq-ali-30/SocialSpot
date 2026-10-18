import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const PostComment = ({
  comment,
  getTimeAgo,
  deleteComment,
  isAuthor,
  postId,
}) => {
  const { currentUser } = useContext(UserContext);
  const [showCommentsOption, setShowCommentsOption] = useState(false);
  const isLiked = comment.likedBy.find((authorId) => authorId === currentUser);

  return (
    <div className="flex items-start gap-3">
      {/* Comment Avatar */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E5DFFF] bg-[#F0ECFF]">
        {comment.authorProfile ? (
          <img
            src={comment.authorProfile}
            alt={comment.authorName}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xl font-semibold uppercase text-[#5B4BDB] mb-0.5">
            {comment.authorName.trim().charAt(0) || ""}
          </span>
        )}
      </div>

      {/* Comment Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-[#EAE7EF] rounded-2xl rounded-tl-md px-4 py-2.5">
          {/* Name and Time */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
            <h4 className="text-sm font-semibold text-[#292638]">
              {comment.authorName}
            </h4>

            <span className="text-[#C1BDCA] text-xs">•</span>

            <span className="text-xs text-[#9A96A8]">
              {getTimeAgo(comment.createdAt)}
            </span>

            {/* More Options */}
            <div className="relative mr-[-8px] ml-auto">
              <button
                onClick={() => setShowCommentsOption(!showCommentsOption)}
                type="button"
                aria-label={`More options for ${comment.name}'s comment`}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#A7A2B2] hover:bg-[#F8F7FC] hover:text-[#6D5DFB] transition shrink-0 cursor-pointer"
              >
                <i className="ph-bold ph-dots-three-vertical text-lg"></i>
              </button>
              {showCommentsOption && (
                <div className="absolute right-0 top-[clamp(2.4rem,5vw,2.75rem)] z-20 w-[clamp(9.5rem,35vw,10rem)] bg-white border border-[#E5E2EC] rounded-[clamp(0.65rem,1.5vw,0.75rem)] p-[clamp(0.3rem,0.8vw,0.375rem)] shadow-sm">
                  <button
                    onClick={() => {
                      deleteComment(comment.createdAt);
                      setShowCommentsOption(false);
                    }}
                    disabled={!isAuthor}
                    type="button"
                    className="w-full h-[clamp(2.35rem,6vw,2.5rem)] px-[clamp(0.65rem,1.5vw,0.75rem)] rounded-[clamp(0.45rem,1vw,0.5rem)] flex items-center gap-[clamp(0.5rem,1.2vw,0.625rem)] text-[clamp(0.78rem,1.5vw,0.875rem)] font-medium text-[#39364A] bg-white hover:bg-red-50 hover:text-red-500 transition cursor-pointer disabled:text-[#B2AEBB] disabled:bg-[#F8F7FC] disabled:cursor-not-allowed disabled:hover:text-[#B2AEBB]"
                  >
                    <i className="ph ph-trash text-[clamp(1rem,2.5vw,1.125rem)]"></i>
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Comment Text */}
          <p className="mt-1.5 text-sm leading-6 text-[#625E72] break-words">
            {comment.commentText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
