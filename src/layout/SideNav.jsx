import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SideNav = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleSignOut() {
        await logout();
        navigate("/"); //I will decide if i want to /login
    }

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Profile */}
            <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                    <img
                        src={currentUser?.photoURL || "/assets/default-avatar.png"}
                        alt="Avatar"
                        className="h-10 w-10 rounded-full"
                    />
                    <div>
                        <div className="font-semibold">{currentUser?.displayName || "User"}</div>
                        <div className="text-xs text-gray-500">{currentUser?.email}</div>
                    </div>
                </div>
            </div>

            {/* Links */}
            <nav className="flex-1 p-4">
                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        `block px-3 py-2 rounded ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`
                    }
                >
                    Orders
                </NavLink>
            </nav>

            {/* Sign out */}
            <div className="p-4 border-t">
                <button
                    onClick={handleSignOut}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-700"
                >
                    Sign out
                </button>
            </div>
        </aside>
    );
};

export default SideNav;
