// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Link
                    to="/admin/slides"
                    className="p-6 border rounded-xl hover:shadow-md transition"
                >
                    <h2 className="text-xl font-semibold">Hero Slides</h2>
                    <p className="text-gray-500">Manage homepage banners</p>
                </Link>

                <Link
                    to="/admin/products"
                    className="p-6 border rounded-xl hover:shadow-md transition"
                >
                    <h2 className="text-xl font-semibold">Products</h2>
                    <p className="text-gray-500">Manage store inventory</p>
                </Link>

            </div>
        </div>
    );
};

export default AdminDashboard;