export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kavanti_hero_images");

    const response = await fetch(`https://api.cloudinary.com/v1_1/dkwfi3iku/upload`, {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    return data.secure_url;
};