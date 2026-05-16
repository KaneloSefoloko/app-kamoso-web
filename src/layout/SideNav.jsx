import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SideNav = () => {
    const { user, profile, logout } = useAuth(); // Make sure logout exists
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
        <aside className="w-full md:w-72 bg-[#f6f6f3] border-r border-gray-200 flex flex-col min-h-screen">

            {/* PROFILE */}
            <div className="p-6 border-b border-gray-200 bg-white">

                <div className="flex flex-col items-center text-center">

                    {/* AVATAR */}
                    <div className="relative group">
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="h-24 w-24 rounded-full object-cover border border-gray-200 shadow-sm"
                        />

                        <button
                            onClick={() => navigate("/account/profile")}
                            className="absolute bottom-1 right-1 bg-black text-white text-[10px] px-2 py-1 rounded-full
                        opacity-0 group-hover:opacity-100 transition"
                        >
                            Edit
                        </button>
                    </div>

                    {/* NAME */}
                    <h3 className="mt-4 text-lg font-semibold tracking-tight">
                        {displayName}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {user?.email || ""}
                    </p>

                    {/* CTA */}
                    <button
                        onClick={() => navigate("/account/profile")}
                        className="mt-4 text-xs tracking-wide uppercase text-gray-600 hover:text-black transition"
                    >
                        Manage Account
                    </button>
                </div>
            </div>

            {/* NAV */}
            <nav className="flex-1 p-4 space-y-2">

                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-2xl text-sm font-medium transition ${
                            isActive
                                ? "bg-white border border-gray-200 shadow-sm text-black"
                                : "text-gray-600 hover:bg-white hover:border hover:border-gray-200"
                        }`
                    }
                >
                    Orders
                </NavLink>

                <NavLink
                    to="/account/profile"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-2xl text-sm font-medium transition ${
                            isActive
                                ? "bg-white border border-gray-200 shadow-sm text-black"
                                : "text-gray-600 hover:bg-white hover:border hover:border-gray-200"
                        }`
                    }
                >
                    Profile
                </NavLink>
            </nav>

            {/* FOOTER */}
            <div className="p-4 border-t border-gray-200 bg-white">

                <button
                    onClick={handleSignOut}
                    className="w-full h-12 rounded-2xl bg-black text-white text-sm font-medium tracking-wide
                hover:opacity-90 transition"
                >
                    Sign out
                </button>

                <p className="text-[11px] text-gray-400 text-center mt-3">
                    Secure session management
                </p>
            </div>
        </aside>
    );
};

export default SideNav;