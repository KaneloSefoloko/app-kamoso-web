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
        <div className="min-h-screen bg-[#f6f6f3] px-4 py-10">

            <div className="max-w-3xl mx-auto">

                {/* HEADER */}
                <div className="mb-10">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
                        Account
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight">
                        Profile Settings
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Manage your personal information and profile details.
                    </p>
                </div>

                {/* CARD */}
                <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">

                    {/* TOP SECTION */}
                    <div className="px-8 py-10 border-b border-gray-100">

                        <div className="flex flex-col items-center text-center">

                            {/* AVATAR */}
                            <div className="relative">
                                <img
                                    src={photo || "/assets/default-avatar.png"}
                                    alt="Avatar"
                                    className="w-32 h-32 rounded-full object-cover border border-gray-200 shadow-sm"
                                />

                                {uploading && (
                                    <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                                    <span className="text-white text-sm">
                                        Uploading...
                                    </span>
                                    </div>
                                )}
                            </div>

                            {/* NAME */}
                            <h2 className="text-2xl font-semibold mt-6">
                                {name || "Your Profile"}
                            </h2>

                            <p className="text-gray-500 text-sm mt-1">
                                {user.email}
                            </p>

                            {/* UPLOAD BUTTON */}
                            <label className="mt-6 inline-flex items-center justify-center px-5 h-11 rounded-full border border-gray-300 text-sm font-medium cursor-pointer hover:border-black transition">
                                Change Profile Photo

                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                    </div>

                    {/* FORM */}
                    <div className="p-8 md:p-10 space-y-8">

                        {/* NAME FIELD */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-gray-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-[#fafafa] outline-none focus:border-black transition"
                            />
                        </div>

                        {/* EMAIL FIELD */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-gray-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={user.email || ""}
                                disabled
                                className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-[#f3f3f3] text-gray-500 cursor-not-allowed"
                            />

                            <p className="text-xs text-gray-400 mt-2">
                                Your email address cannot be changed.
                            </p>
                        </div>

                        {/* ACTIONS */}
                        <div className="pt-2">

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="w-full h-14 rounded-2xl bg-black text-white text-sm font-medium tracking-wide hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                            >
                                {saving ? "Saving Changes..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountProfilePage;
