'use client'

import { useActionsContext } from "@/context/actionsContext/actionsContext";
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query'
import LogoLightIcon from "@/icons/logoLight";
import { usePathname } from "next/navigation"
import { useTranslations } from 'next-intl';
import LogoDarkIcon from "@/icons/logoDark";
import { useTheme } from "next-themes";
import Link from "next/link"

export default function Sidebar() {
    const pathname = usePathname()
    const { theme } = useTheme()
    const t = useTranslations('Sidebar')

    const locale = pathname.split('/')[1]

    const { setOpenLogoutModal,
        sidebarStateHandler
    } = useActionsContext();

    const getSidebarStateFromLocalStorage = () => {
        return localStorage.getItem('sidebarState')
    }

    const { data: sidebarState } = useQuery({
        queryKey: ['localStorageItem'],
        queryFn: getSidebarStateFromLocalStorage,
        enabled: typeof window !== undefined
    })


    return (
        <div className={`relative z-[60] px-2 transition-all ease-in-out border-r ${sidebarState === 'close' ? 'transition-all ease-in-out  max-w-[4.5rem]' : 'transition-all ease-in duration-100  max-w-[24rem]'}`}>
            <div className={`relative flex flex-col ${sidebarState === 'close' ? 'hidden' : 'block'}`}>
                <Link className="" href={`/${locale}/dashboard/categories`}>
                    {theme === 'light' ? <LogoDarkIcon className="mx-auto size-60" /> : <LogoLightIcon className="mx-auto size-60" />}
                </Link>
            </div>
            <div className={`h-[240px] ${sidebarState === 'close' ? 'block' : 'hidden'}`} />
            <div>
                {sidebarState === 'close' ?
                    (<CircleChevronRight onClick={() => sidebarStateHandler('open')} className="absolute cursor-pointer -right-2 top-10 size-4" />) :
                    (<CircleChevronLeft onClick={() => sidebarStateHandler('close')} className="absolute cursor-pointer -right-2 top-10 size-4" />)
                }
            </div>
            <div className="justify-center h-full px-2 -translate-y-16">
                <div className="">
                    <Link href={`/${locale}/dashboard/categories`}>
                        <div className={`${sidebarState === 'close' ? 'block p-1.5 my-2' : 'flex items-center gap-x-4 p-4'} ${pathname === `/${locale}/dashboard/categories` ? 'rounded-md shadow-sm border bg-transparent' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                            </svg>
                            {sidebarState === 'open' && t('categories')}
                        </div>
                    </Link>
                    <Link href={`/${locale}/dashboard/orders`}>
                        <div className={`${sidebarState === 'close' ? 'block p-1.5 my-2' : 'flex items-center gap-x-4 p-4'} ${pathname === `/${locale}/dashboard/orders` ? 'rounded-md shadow-sm border bg-transparent' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                            </svg>
                            {sidebarState === 'open' && t('orders')}
                        </div>
                    </Link>
                    <Link href={`/${locale}/dashboard/products`}>
                        <div className={`${sidebarState === 'close' ? 'block p-1.5 my-2' : 'flex items-center gap-x-4 p-4'} ${pathname === `/${locale}/dashboard/products` ? 'rounded-md shadow-sm border bg-transparent' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288" />
                            </svg>
                            {sidebarState === 'open' && t('products')}
                        </div>
                    </Link>
                    <Link href={`/${locale}/dashboard/employees`}>
                        <div className={`${sidebarState === 'close' ? 'block p-1.5 my-2' : 'flex items-center gap-x-4 p-4'} ${pathname === `/${locale}/dashboard/employees` ? 'rounded-md shadow-sm border bg-transparent' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                            </svg>
                            {sidebarState === 'open' && t('employees')}
                        </div>
                    </Link>
                </div>
                <div className={`flex cursor-pointer items-center gap-x-2.5 ${sidebarState === 'close' ? 'left-1 p-2.5' : 'px-4 left-4 py-2.5'} rounded-md absolute bottom-48 bg-red-500 text-emerald-100`} onClick={() => setOpenLogoutModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    {sidebarState === 'open' && t('logout')}
                </div>
            </div>
        </div>
    );
}