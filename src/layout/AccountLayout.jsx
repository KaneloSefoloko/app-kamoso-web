import React from "react";
import SideNav from "./SideNav";

const AccountLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex bg-gray-50 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
            <SideNav />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
};

export default AccountLayout;
