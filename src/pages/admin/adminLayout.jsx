import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
    const linkStyle = ({ isActive }) =>
        `block px-4 py-2 rounded ${
            isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
        }`;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white shadow-md p-4">
                <h2 className="text-xl font-bold mb-6">Admin</h2>

                <nav className="space-y-2">
                    <NavLink to="/admin" className={linkStyle}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/products" className={linkStyle}>
                        Products
                    </NavLink>
                    <NavLink to="/admin/slides" className={linkStyle}>
                        Slides
                    </NavLink>
                </nav>
            </aside>

            {/* CONTENT */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;