const DeletePostModal = ({
  openDeleteModal,
  setOpenDeleteModal,
  deletePost,
}) => {
  const closeModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-[#17152A]/45 backdrop-blur-[3px] px-4 transition-all duration-300 ${
        openDeleteModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[420px] bg-white rounded-xl border border-[#E5E2EC] shadow-[0_20px_50px_rgba(23,21,42,0.12)] overflow-hidden transform transition-all duration-300 ${
          openDeleteModal ? "scale-100 translate-y-0" : "scale-95 translate-y-6"
        }`}
      >
        {/* Body */}
        <div className="px-6 py-7 text-center">
          {/* Icon */}
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <i className="ph-bold ph-trash text-3xl text-red-500"></i>
          </div>

          {/* Heading */}
          <h2 className="text-xl font-bold text-[#17152A]">Delete Post?</h2>

          {/* Description */}
          <p className="text-sm text-[#77738A] mt-2 leading-6">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 h-11 rounded-lg border border-[#DDD9E5] bg-white text-[#5F5B6D] font-medium hover:bg-[#F8F7FC] hover:border-[#CCC8D8] transition text-sm cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={deletePost}
            type="button"
            className="flex-1 h-11 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition text-sm cursor-pointer shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
