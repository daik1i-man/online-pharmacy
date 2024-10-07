'use client'

import { getCurrentAdmin } from "@/requestFunctions/get.current.admin";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';

export default function Header() {
    const pathname = usePathname()

    const locale = pathname.split('/')[1]

    const { data: admin, isLoading: loading } = useQuery({
        queryKey: ['admin'],
        queryFn: () => getCurrentAdmin()
    })



    return (
        <header className="w-full h-[80px] z-30 border justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-white">
            <nav className="max-w-[1790px] mx-auto">
                <div className="flex justify-end items-center gap-8">
                    <div>
                        {loading ? (
                            <div className="flex justify-end gap-x-4 h-[80px] items-center">
                                <div className="w-24 h-3.5 bg-gray-200 animate-pulse rounded-md" />
                                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                            </div>
                        ) : (
                            <div className="flex justify-end gap-x-4 h-[80px] items-center">
                                <div className="flex gap-x-4 h-[80px] items-center">
                                    <div>
                                        <h1 className="text-[16px] font-medium">{admin.name}</h1>
                                    </div>
                                    <div className="rounded-full bg-[#0076FF] text-[20px] font-bold text-gray-50 py-[10px] px-[20px]">{admin.name.substring(0, 1)}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    {locale === 'uz' ? (
                        <Link href='/' locale='ru' className='border py-3 px-8 rounded-md'>
                            <div className="flex items-center gap-3">
                                <img alt="" src='https://i.pinimg.com/564x/35/0b/cc/350bcc9117a8bf46e3e6dbb8463f2aa2.jpg' className="h-8 w-8 flex-shrink-0 rounded-full" />
                                <span className="block truncate font-normal">
                                    Русский
                                </span>
                            </div>
                        </Link>
                    ) : (
                        <Link href='/' locale="uz" className='border py-1.5 px-4 rounded-md'>
                            <div className="flex items-center gap-3">
                                <img alt="" src='https://i.pinimg.com/564x/9d/67/dd/9d67dd7f9b0555cfec4db9ca252166f2.jpg' className="h-8 w-8 flex-shrink-0 rounded-full" />
                                <span className="block truncate font-normal">
                                    O'zbekcha
                                </span>
                            </div>
                        </Link>
                    )}
                </div>
            </nav >
        </header >
    );
}
