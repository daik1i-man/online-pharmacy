'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import { getCurrentAdmin } from "@/requestFunctions/get.current.admin";
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import { MoonIcon } from "@/icons/moonIcon";
import { SunIcon } from "@/icons/sunIcon";
import { useTheme } from "next-themes";

export default function Header() {
    const router = useRouter()
    const pathname = usePathname();
    const locale = pathname.split('/')[1]
    const { setTheme } = useTheme()

    const { data: admin, isLoading: loading } = useQuery({
        queryKey: ['admin'],
        queryFn: () => getCurrentAdmin()
    })

    const languageSwitcher = (locale: string) => {
        router.replace(`/${locale}/dashboard/categories`)
    }

    return (
        <header className="w-full h-[80px] z-50 justify-center items-center backdrop-blur-lg fixed top-0 left-0 right-0 bottom-0">
            <nav className="flex items-center justify-end gap-8 pr-4">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="h-12 w-36"
                            variant="solid"
                        >
                            {locale === 'uz' ? (
                                <div className="flex items-center gap-3">
                                    <img alt="" src='https://i.pinimg.com/564x/9d/67/dd/9d67dd7f9b0555cfec4db9ca252166f2.jpg' className="flex-shrink-0 w-8 h-8 rounded-full" />
                                    <span className="block font-normal truncate">
                                        O'zbekcha
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <img alt="" src='https://i.pinimg.com/564x/35/0b/cc/350bcc9117a8bf46e3e6dbb8463f2aa2.jpg' className="flex-shrink-0 w-8 h-8 rounded-full" />
                                    <span className="block font-normal truncate">
                                        Русский
                                    </span>
                                </div>
                            )}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Languages dropdown"
                    >
                        <DropdownItem key="ru" onClick={() => languageSwitcher('ru')}>
                            <div className="flex items-center gap-3">
                                <img alt="" src='https://i.pinimg.com/564x/35/0b/cc/350bcc9117a8bf46e3e6dbb8463f2aa2.jpg' className="flex-shrink-0 w-8 h-8 rounded-full" />
                                <span className="block font-normal truncate">
                                    Русский
                                </span>
                            </div>
                        </DropdownItem>
                        <DropdownItem key="uz" onClick={() => languageSwitcher('uz')}>
                            <div className="flex items-center gap-3">
                                <img alt="" src='https://i.pinimg.com/564x/9d/67/dd/9d67dd7f9b0555cfec4db9ca252166f2.jpg' className="flex-shrink-0 w-8 h-8 rounded-full" />
                                <span className="block font-normal truncate">
                                    O'zbekcha
                                </span>
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="h-12 w-28"
                            variant="solid"
                        >
                            <MoonIcon className="size-5" /> / <SunIcon className="size-5" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Modes dropdown"
                    >
                        <DropdownItem key="light" onClick={() => setTheme('light')}>
                            <p className="flex items-center gap-3" >
                                <SunIcon className="size-5" />
                                Light
                            </p>
                        </DropdownItem>
                        <DropdownItem key="dark" onClick={() => setTheme('dark')}>
                            <p className="flex items-center gap-3" >
                                <MoonIcon className="size-5" />
                                Dark
                            </p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div>
                    {loading ? (
                        <div className="flex justify-end gap-x-4 h-[80px] items-center">
                            <div className="w-24 h-3.5 bg-gray-200 animate-pulse rounded-md" />
                            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                    ) : (
                        <div className="flex justify-end gap-x-4 h-[80px] items-center">
                            <div className="flex gap-x-4 items-center dark:border py-1.5 px-6 rounded-md">
                                <div>
                                    <h1 className="text-[16px] font-medium">{admin.name}</h1>
                                </div>
                                <div className="rounded-full bg-[#0076FF] text-[20px] font-bold text-gray-50 py-[10px] px-[20px]">{admin.name.substring(0, 1)}</div>
                            </div>
                        </div>
                    )}
                </div>
            </nav >
        </header >
    );
}
