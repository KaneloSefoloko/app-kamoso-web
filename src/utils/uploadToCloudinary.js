const CLOUD_NAME = "dkwfi3iku";
const UPLOAD_PRESET = "your_upload_preset";

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();
    return data.secure_url; // 🔥 this is what you store in Firestore
};