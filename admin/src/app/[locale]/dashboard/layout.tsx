import LogoutModal from "@/components/modals/logoutModal/modal"
import Sidebar from "@/components/sidebar/sidebar"
import Header from "@/components/header/header"
import React from "react"

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <LogoutModal />
            <div className="fixed flex w-full">
                <Sidebar />
                <div className="w-full">
                    <Header />
                    {children}
                </div>
            </div>
        </>
    )
}