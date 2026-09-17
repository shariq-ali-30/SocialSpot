import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useContext, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import { UserContext } from "../context/UserContext";
import { uploadImage } from "../helper/cloudinary.js";

const CreatePostModal = ({ openModal, setOpenModal }) => {
  const { currentUser, userData } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageRef = useRef();

  const createPost = async () => {
    if (title) {
      if (!description && !image) {
        return document.getElementById("post-description").focus();
      }
    }

    setLoading(true);

    try {
      let imageUrl = image ? await uploadImage(image) : "";

      await addDoc(collection(db, "posts"), {
        authorId: currentUser,
        authorProfile: userData.profileImage || "",
        authorName: userData.name,
        title: title,
        description: description,
        image: imageUrl,
        likedBy: [],
        createdAt: serverTimestamp(),
      });
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setTitle("");
    setDescription("");
    setImage(null);
    imageRef.current.value = "";
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#17152A]/45 backdrop-blur-[3px] px-4 py-4 sm:py-6 transition-all duration-300 ${
          openModal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => {
          if (!loading) {
            closeModal();
          }
        }}
      >
        {/* Modal Container */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white w-full max-w-[600px] rounded-xl border border-[#E5E2EC] shadow-[0_20px_50px_rgba(23,21,42,0.12)] overflow-y-auto max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] transform transition-all duration-300 scrollbar-none ${
            openModal ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-[#EAE7EF]">
            <div>
              <h2 className="text-xl font-bold text-[#17152A]">
                Create a Post
              </h2>

              <p className="text-sm text-[#77738A] mt-1">
                Share something with your community
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 flex flex-col gap-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[#39364A] mb-2">
                Title{" "}
                <span className="font-normal text-[#9A96A8]">(Optional)</span>
              </label>

              <input
                disabled={loading}
                id="post-title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter post title"
                className="w-full h-12 px-4 rounded-lg border-[1.5px] border-[#DDD9E5] bg-white text-sm text-[#292638] placeholder:text-[#AAA6B5] outline-none focus:border-[#6D5DFB] transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#39364A] mb-2">
                Description
              </label>

              <textarea
                disabled={loading}
                id="post-description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Write your post..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg border-[1.5px] border-[#DDD9E5] bg-white text-sm text-[#292638] placeholder:text-[#AAA6B5] outline-none resize-none focus:border-[#6D5DFB] transition"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-[#39364A] mb-2">
                Image
              </label>

              <label
                htmlFor="post-image"
                className="w-full h-24 rounded-lg border-[1.5px] border-dashed border-[#D8D4E2] bg-[#FCFBFE] flex flex-col items-center justify-center cursor-pointer hover:bg-[#F8F7FC] hover:border-[#AAA5BA] transition"
              >
                <i className="ph ph-image text-2xl text-[#6D5DFB] mb-1"></i>

                <span className="text-sm font-medium text-[#39364A]">
                  Choose an image
                </span>

                <span className="text-xs text-[#9A96A8] mt-0.5">
                  {image?.name || "No file choosen"}
                </span>
              </label>

              <input
                disabled={loading}
                onChange={(e) => setImage(e.target.files[0])}
                ref={imageRef}
                id="post-image"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 pb-5 flex justify-end gap-3">
            <button
              disabled={loading}
              onClick={closeModal}
              className="h-11 px-5 rounded-lg border border-[#DDD9E5] bg-white text-[#5F5B6D] font-medium hover:bg-[#F8F7FC] hover:border-[#CCC8D8] transition text-sm cursor-pointer disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              onClick={createPost}
              disabled={(!title && !description && !image) || loading}
              className="relative h-11 px-6 rounded-lg bg-[#6D5DFB] text-white font-semibold hover:bg-[#5D4DED] transition text-sm cursor-pointer shadow-sm disabled:cursor-not-allowed"
            >
              <span className={`${loading ? "invisible" : ""}`}>Post</span>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostModal;
