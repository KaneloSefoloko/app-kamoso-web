import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MobileAccountBar = () => {
    const { user, profile, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to sign out?");
        if (!confirmLogout) return;

        logout();
        navigate("/");
    };

    return (
        <div className="md:hidden bg-white border-b px-4 py-3">
            {/* User info */}
            <div className="flex items-center gap-3 mb-3">
                <img
                    src={user?.photoURL || profile?.photoURL || "/assets/default-avatar.png"}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">
                        {user?.displayName || profile?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between text-sm font-medium">
                <div className="flex gap-4">
                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            isActive
                                ? "text-black border-b-2 border-black pb-1"
                                : "text-gray-500"
                        }
                    >
                        Orders
                    </NavLink>

                    <NavLink
                        to="/account/profile"
                        className={({ isActive }) =>
                            isActive
                                ? "text-black border-b-2 border-black pb-1"
                                : "text-gray-500"
                        }
                    >
                        Profile
                    </NavLink>
                </div>

                {/* Sign out */}
                <button
                    onClick={handleLogout}
                    className="text-red-500 text-sm font-semibold"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default MobileAccountBar;
