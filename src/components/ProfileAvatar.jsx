import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfileAvatar = () => {
    const { currentUser, updateProfile } = useAuth();
    const [uploading, setUploading] = useState(false);

    async function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset");

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            await updateProfile({ photoURL: data.secure_url });
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">

            {/* AVATAR WRAPPER */}
            <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-black/20 via-gray-300 to-black/10 blur-md opacity-60 group-hover:opacity-80 transition" />

                <img
                    src={currentUser?.photoURL || "/assets/default-avatar.png"}
                    alt="Avatar"
                    className="relative w-28 h-28 rounded-full object-cover border border-gray-200 shadow-lg transition-transform duration-300 group-hover:scale-[1.03]"
                />

                {/* uploading overlay */}
                {uploading && (
                    <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* INPUT WRAPPER (premium button style instead of raw input) */}
            <label className="cursor-pointer">
                <div
                    className={`
                        px-5 py-2 rounded-full text-sm font-medium
                        border transition-opacity duration-300
                        ${
                        uploading
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-900"
                    }
                    `}
                >
                    {uploading ? "Uploading..." : "Change Photo"}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                />
            </label>

            {/* subtle helper text */}
            <p className="text-xs text-gray-400 text-center">
                Recommended: square image (JPG / PNG)
            </p>
        </div>
    );
};

export default ProfileAvatar;