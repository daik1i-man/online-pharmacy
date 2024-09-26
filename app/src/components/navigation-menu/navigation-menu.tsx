'use client'

import { getCart, getFavourites, getUser } from "@/app/functions/functions";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { Badge } from "flowbite-react";
import Link from "next/link";
import '../../response.css'

function NavigationMenu() {
    const [cookie, setCookie] = useCookies(['user'])
    const { data: favorites } = useQuery({
        queryKey: ['favorites'],
        queryFn: () => getFavourites(),
    })

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    })

    const { data: cart } = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart()

    })

    return (
        <div className="main">
            <div className="fixed bottom-0 left-0 right-0 m-1.5 backdrop-blur-md backdrop-contrast-75 flex items-center rounded-full justify-between mx-auto z-[80] w-[97%] navigation_bar py-1 px-5">
                <Link href='/' className='flex flex-col items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <p className='text-[11px]'>Home</p>
                </Link>
                <Link href='/cart' className='flex flex-col items-center'>
                    <Badge content={cart?.length} color="default">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </Badge>
                    <p className='text-[11px]'>Cart</p>
                </Link>
                <Link href='/favourites' className='flex flex-col items-center'>
                    <Badge content={favorites?.length} color="default" className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </Badge>
                    <p className='text-[11px]'>Favorites</p>
                </Link>
                <Link href={cookie?.user ? '/user/orders' : '/auth/login'} className='flex flex-col items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <p className='text-[11px]'>{user ? 'Profile' : 'Login'}</p>
                </Link>
            </div>
        </div>
    )
}

export default NavigationMenu