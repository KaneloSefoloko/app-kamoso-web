import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    if (!user) {
        // Redirect to login and remember where we came from
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}
