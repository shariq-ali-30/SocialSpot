import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebase/firebase";
import { UserContext } from "../context/UserContext";
import { uploadImage } from "../helper/cloudinary.js";

const CreatePostModal = ({
  openModal,
  setOpenModal,
  editMode,
  setEditMode,
}) => {
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

    if (editMode) {
      const docRef = doc(db, "posts", editMode.id);

      let imageUrl = editMode.image;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      await updateDoc(docRef, {
        title: title,
        description: description,
        image: imageUrl,
        createdAt: serverTimestamp(),
      });

      setEditMode(null);
      setLoading(false);
      closeModal();
      return;
    }

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
    setEditMode(null);
  };

  useEffect(() => {
    if (editMode) {
      setTitle(editMode.title || "");
      setDescription(editMode.description || "");
    }
  }, [editMode]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#17152A]/45 backdrop-blur-[3px] px-[clamp(0.75rem,3vw,1.5rem)] py-[clamp(0.75rem,3vw,1.5rem)] transition-all duration-300 ${
          openModal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => {
          if (!loading) {
            closeModal();
          }
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white w-full max-w-[600px] rounded-[clamp(0.8rem,2vw,1rem)] border border-[#E5E2EC] shadow-[0_20px_50px_rgba(23,21,42,0.12)] overflow-y-auto max-h-[calc(100vh-clamp(1.5rem,6vw,3rem))] transform transition-all duration-300 scrollbar-none ${
            openModal ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-between px-[clamp(1rem,3vw,1.5rem)] py-[clamp(1rem,3vw,1.25rem)] border-b border-[#EAE7EF]">
            <div className="min-w-0">
              <h2 className="text-[clamp(1rem,2.5vw,1.25rem)] font-bold text-[#17152A]">
                {editMode ? "Edit Post" : "Create a Post"}
              </h2>

              <p className="text-[clamp(0.72rem,1.6vw,0.875rem)] leading-[clamp(1.1rem,2.5vw,1.25rem)] text-[#77738A] mt-[clamp(0.2rem,0.8vw,0.25rem)]">
                {editMode
                  ? "Update your post and keep your community informed"
                  : "Share something with your community"}
              </p>
            </div>
          </div>

          <div className="p-[clamp(1rem,3vw,1.5rem)] flex flex-col gap-[clamp(1rem,2.5vw,1.25rem)]">
            <div>
              <label className="block text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium text-[#39364A] mb-[clamp(0.4rem,1vw,0.5rem)]">
                Title{" "}
                <span className="font-normal text-[#9A96A8]">
                  (Optional)
                </span>
              </label>

              <input
                disabled={loading}
                id="post-title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter post title"
                className="w-full h-[clamp(2.75rem,7vw,3rem)] px-[clamp(0.8rem,2vw,1rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] border-[1.5px] border-[#DDD9E5] bg-white text-[clamp(0.78rem,1.5vw,0.875rem)] text-[#292638] placeholder:text-[#AAA6B5] outline-none focus:border-[#6D5DFB] transition"
              />
            </div>

            <div>
              <label className="block text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium text-[#39364A] mb-[clamp(0.4rem,1vw,0.5rem)]">
                Description
              </label>

              <textarea
                disabled={loading}
                id="post-description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Write your post..."
                rows="4"
                className="w-full px-[clamp(0.8rem,2vw,1rem)] py-[clamp(0.65rem,1.5vw,0.75rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] border-[1.5px] border-[#DDD9E5] bg-white text-[clamp(0.78rem,1.5vw,0.875rem)] text-[#292638] placeholder:text-[#AAA6B5] outline-none resize-none focus:border-[#6D5DFB] transition leading-5"
              ></textarea>
            </div>

            <div>
              <label className="block text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium text-[#39364A] mb-[clamp(0.4rem,1vw,0.5rem)]">
                Image
              </label>

              <label
                htmlFor="post-image"
                className="w-full h-[clamp(5.5rem,14vw,6rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] border-[1.5px] border-dashed border-[#D8D4E2] bg-[#FCFBFE] flex flex-col items-center justify-center cursor-pointer hover:bg-[#F8F7FC] hover:border-[#AAA5BA] transition px-3 text-center"
              >
                <i className="ph ph-image text-[clamp(1.4rem,4vw,1.5rem)] text-[#6D5DFB] mb-[clamp(0.15rem,0.5vw,0.25rem)]"></i>

                <span className="text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium text-[#39364A]">
                  Choose an image
                </span>

                <span className="text-[clamp(0.65rem,1.3vw,0.75rem)] text-[#9A96A8] mt-[clamp(0.1rem,0.3vw,0.125rem)] truncate max-w-full">
                  {image?.name || "No file chosen"}
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

          <div className="px-[clamp(1rem,3vw,1.5rem)] pb-[clamp(1rem,3vw,1.25rem)] flex justify-end gap-[clamp(0.5rem,1.5vw,0.75rem)]">
            <button
              disabled={loading}
              onClick={closeModal}
              className="h-[clamp(2.6rem,6vw,2.75rem)] px-[clamp(0.9rem,2.5vw,1.25rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] border border-[#DDD9E5] bg-white text-[#5F5B6D] font-medium hover:bg-[#F8F7FC] hover:border-[#CCC8D8] transition text-[clamp(0.75rem,1.5vw,0.875rem)] cursor-pointer disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              onClick={createPost}
              disabled={(!title && !description && !image) || loading}
              className="relative h-[clamp(2.6rem,6vw,2.75rem)] px-[clamp(1rem,2.8vw,1.5rem)] rounded-[clamp(0.5rem,1.2vw,0.625rem)] bg-[#6D5DFB] text-white font-semibold hover:bg-[#5D4DED] transition text-[clamp(0.75rem,1.5vw,0.875rem)] cursor-pointer shadow-sm disabled:cursor-not-allowed"
            >
              <span className={`${loading ? "invisible" : ""}`}>
                {editMode ? "Update Post" : "Create Post"}
              </span>

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)] border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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