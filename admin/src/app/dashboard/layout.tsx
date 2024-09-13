import Header from "@/components/header/header"
import Sidebar from "@/components/sidebar/sidebar"
import LogoutModal from "@/components/modals/logoutModal/modal"

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <LogoutModal />
            <div className="flex fixed w-full">
                <Sidebar />
                <div className="w-full">
                    <Header />
                    {children}
                </div>
            </div>
        </>
    )
}