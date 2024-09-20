'use client'

import { getCurrentAdmin } from "@/requestFunctions/get.current.admin";
import { useQuery } from "@tanstack/react-query";

export default function Header() {

    const { data: admin, isLoading: loading } = useQuery({
        queryKey: ['admin'],
        queryFn: () => getCurrentAdmin()
    })

    return (
        <header className="w-full h-[80px] z-30 border justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-white">
            <nav className="max-w-7xl mx-auto">
                <div>
                    {loading ? (
                        <div className="flex justify-end gap-x-4 items-center">
                            <div className="w-24 h-3.5 bg-gray-200 animate-pulse rounded-md" />
                            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                        </div>
                    ) : (
                        <div className="flex justify-end gap-x-4 h-[80px] items-center">
                            <div>
                                <h1 className="text-[16px] font-medium">{admin.name}</h1>
                            </div>
                            <div className="rounded-full bg-[#0076FF] text-[20px] font-bold text-gray-50 py-[10px] px-[20px]">{admin.name.substring(0, 1)}</div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
