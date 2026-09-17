export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "SocialSpot");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/h9rncg6u/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    return data.secure_url;
  } catch (error) {
    console.log("Image upload failed:", error);
  }
};
