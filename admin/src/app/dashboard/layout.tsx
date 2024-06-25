import Header from "@/components/header/header"
import Sidebar from "@/components/sidebar/sidebar"
import LogoutModal from "@/components/modals/logoutModal/modal"

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <div className="w-full h-full m-0 p-0 justify-center flex">
                <Sidebar />
                <Header />
            </div>
            <LogoutModal />
            {children}
        </div>
    )
}