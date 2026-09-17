import React, { useState } from "react";

const PostCard = () => {
  const [showMenu, setShowMenu] = useState(false);

  const userName = "Ali Raza";
  const userImage = "https://i.pravatar.cc/100?img=12";
  const time = "2 hours ago";
  const title = "Exploring the Beauty of Northern Areas";
  const description =
    "The mountains have a way of making you feel small, yet so alive. Spent an unforgettable weekend in Hunza. The views, the fresh air and the peaceful vibes were absolutely magical. Looking forward to more adventures like this!";
  const postImage =
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80";
  const likes = 124;

  return (
    <article className=" w-full max-w-[800px] mx-auto bg-white border border-[#E5E2EC] rounded-2xl mb-5">
      {/* Header */}
      <div className="px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="flex items-start justify-between">
          {/* User */}
          <div className="flex items-center gap-3">
            <img
              src={userImage}
              alt={userName}
              className="w-11 h-11 rounded-full object-cover border border-[#E5E2EC]"
            />

            <div>
              <h3 className="text-md font-semibold text-[#17152A]">
                {userName}
              </h3>

              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs text-[#9A96A8]">{time}</span>
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
                  type="button"
                  className="w-full h-10 px-3 rounded-lg flex items-center gap-2.5 text-sm font-medium text-[#39364A] bg-white hover:bg-[#F8F7FC] hover:text-[#6D5DFB] transition cursor-pointer disabled:text-[#B2AEBB] disabled:bg-[#F8F7FC] disabled:cursor-not-allowed disabled:hover:text-[#B2AEBB]"
                >
                  <i className="ph ph-pencil-simple text-lg"></i>
                  <span>Edit</span>
                </button>

                {/* Delete */}
                <button
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
            {title}
          </h2>

          <p className="mt-1.5 text-sm leading-[21px] text-[#77738A]">
            {description}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="px-4 sm:px-5 mt-3">
        <img
          src={postImage}
          alt={title}
          className="w-full h-[300px] object-cover rounded-xl"
        />
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-5 py-4">
        <button
          type="button"
          className="flex items-center gap-2 px-3 h-9 rounded-lg cursor-pointer text-[#77738A] hover:bg-[#F4F1FF] hover:text-[#6D5DFB] transition-all duration-200"
        >
          <i className="ph ph-heart text-[21px]"></i>

          <span className="text-sm font-medium">{likes} Likes</span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;
