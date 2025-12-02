import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.js"; // adjust path if needed
import { uploadToCloudinary } from "../cloudinaryUpload";

const AccountProfilePage = () => {
    const { user, profile, refreshProfile } = useAuth();

    // Local state for form
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Pre-populate form when user/profile changes
    useEffect(() => {
        if (user) setName(user.displayName || profile?.name || "");
        if (user) setPhoto(user.photoURL || profile?.photoURL || "");
    }, [user, profile]);

    // Save name changes
    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            // Update Firebase Auth
            await updateProfile(user, { displayName: name });

            // Update Firestore
            await setDoc(doc(db, "users", user.uid), { name }, { merge: true });

            // Refresh AuthContext profile
            await refreshProfile();

            alert("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    // Upload photo to Cloudinary & save
    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !user) return;

        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);

            // Update Firebase Auth
            await updateProfile(user, { photoURL: url });

            // Update Firestore
            await setDoc(doc(db, "users", user.uid), { photoURL: url }, { merge: true });

            setPhoto(url);

            // Refresh AuthContext profile
            await refreshProfile();
        } catch (err) {
            console.error(err);
            alert("Failed to upload image.");
        } finally {
            setUploading(false);
        }
    };

    if (!user) return <div className="p-6 text-center">Loading...</div>;

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Profile Settings</h1>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src={photo || "/assets/default-avatar.png"}
                    alt="Avatar"
                    className="h-28 w-28 rounded-full object-cover border shadow-sm"
                />

                <label className="mt-3 cursor-pointer text-blue-600 hover:underline text-sm">
                    {uploading ? "Uploading..." : "Change Profile Photo"}
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={uploading}
                    />
                </label>
            </div>

            {/* Name input */}
            <label className="block mb-4">
                <p className="text-sm font-semibold">Full Name</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
            </label>

            {/* Email (read-only) */}
            <label className="block mb-6">
                <p className="text-sm font-semibold">Email</p>
                <input
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="w-full mt-1 px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
                />
            </label>

            {/* Save button */}
            <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
                {saving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
};

export default AccountProfilePage;
