import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { uploadToCloudinary } from "../cloudinaryUpload";

const AccountProfilePage = () => {
    const { user, profile, refreshProfile } = useAuth();

    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) setName(user.displayName || profile?.name || "");
        if (user) setPhoto(user.photoURL || profile?.photoURL || "");
    }, [user, profile]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            await updateProfile(user, { displayName: name });
            await setDoc(doc(db, "users", user.uid), { name }, { merge: true });
            await refreshProfile();
            alert("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !user) return;

        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            await updateProfile(user, { photoURL: url });
            await setDoc(doc(db, "users", user.uid), { photoURL: url }, { merge: true });
            setPhoto(url);
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
        <div className="px-4 sm:px-6 lg:px-0">
            <div className="max-w-md sm:max-w-lg mx-auto bg-white rounded-xl shadow-sm sm:shadow-md mt-6 sm:mt-10 p-5 sm:p-8">
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">
                    Profile Settings
                </h1>

                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={photo || "/assets/default-avatar.png"}
                        alt="Avatar"
                        className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border shadow-sm"
                    />

                    <label className="mt-3 text-sm text-blue-600 hover:underline cursor-pointer">
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

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* Email */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={user.email || ""}
                        disabled
                        className="w-full px-3 py-2 text-sm sm:text-base border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Save */}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-black text-white py-2.5 rounded-sm hover:bg-gray-800 transition text-sm sm:text-base"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
};

export default AccountProfilePage;
