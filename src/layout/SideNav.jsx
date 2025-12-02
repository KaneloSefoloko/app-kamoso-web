import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SideNav = () => {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("User");
    const [avatar, setAvatar] = useState("/assets/default-avatar.png");

    // Sync local state with AuthContext
    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || profile?.name || "User");
            setAvatar(user.photoURL || profile?.photoURL || "/assets/default-avatar.png");
        } else {
            setDisplayName("User");
            setAvatar("/assets/default-avatar.png");
        }
    }, [user, profile]);

    const handleSignOut = async () => {
        if (typeof logout === "function") {
            await logout();
            navigate("/login");
        }
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Profile Section */}
            <div className="p-6 border-b flex flex-col items-center text-center">
                <div className="relative group">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="h-20 w-20 rounded-full object-cover border shadow-sm"
                    />
                    <button
                        onClick={() => navigate("/account/profile")}
                        className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded
                       opacity-0 group-hover:opacity-100 transition"
                    >
                        Edit
                    </button>
                </div>

                <h3 className="mt-3 font-semibold text-gray-800">{displayName}</h3>
                <p className="text-gray-500 text-sm">{user?.email || ""}</p>

                <button
                    onClick={() => navigate("/account/profile")}
                    className="text-xs mt-2 text-blue-600 hover:underline"
                >
                    Manage Account
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4">
                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`
                    }
                >
                    Orders
                </NavLink>

                <NavLink
                    to="/account/profile"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`
                    }
                >
                    Profile
                </NavLink>
            </nav>

            {/* Sign Out */}
            <div className="p-4 border-t">
                <button
                    onClick={handleSignOut}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-700 transition"
                >
                    Sign out
                </button>
            </div>
        </aside>
    );
};

export default SideNav;