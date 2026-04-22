import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = () => {
    const { user, profile } = useAuth();

    if (!user) return <Navigate to="/login" />;
    if (profile?.role !== "admin") return <Navigate to="/" />;

    return <Outlet />;
};

export default ProtectedAdminRoute;