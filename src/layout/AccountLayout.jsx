import React from "react";
import SideNav from "./SideNav";

const AccountLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <SideNav />

            {/* Main content */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
};

export default AccountLayout;
