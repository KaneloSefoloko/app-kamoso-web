import SideNav from "./SideNav";
import MobileAccountBar from "../layout/MobileAccountBar";

const AccountLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20 sm:pt-24 md:pt-28 lg:pt-32">

            {/* MOBILE ACCOUNT BAR */}
            <MobileAccountBar />

            <div className="flex">
                {/* DESKTOP SIDEBAR */}
                <div className="hidden md:block">
                    <SideNav />
                </div>

                {/* PAGE CONTENT */}
                <main className="flex-1 px-3 sm:px-6 py-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AccountLayout;
