import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfileAvatar = () => {
    const { currentUser, updateProfile } = useAuth(); // assume you wrap Firebase Auth updateProfile
    const [uploading, setUploading] = useState(false);

    async function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset"); // from Cloudinary settings

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await res.json();

            // Update Firebase user profile
            await updateProfile({ photoURL: data.secure_url });

        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <img
                src={currentUser?.photoURL || "/assets/default-avatar.png"}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover"
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
            />
            {uploading && <p>Uploading...</p>}
        </div>
    );
};

export default ProfileAvatar;
