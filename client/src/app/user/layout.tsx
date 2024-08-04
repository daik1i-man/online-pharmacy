'use client'

import { getUser, getCart, getFavourites } from "../functions/functions";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import CancelOrderModal from "@/components/modal-dialogs/cancelOrderModal";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../functions/functions";
import { Button } from "@nextui-org/react";
import { childrenProps } from "../types";
import Link from 'next/link'

export default function layout({ children }: childrenProps) {
    const pathname = usePathname()
    const router = useRouter()
    const queryClient = useQueryClient()

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    })

    const { data: cart } = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart()
    })

    const { data: favourites } = useQuery({
        queryKey: ['favourites'],
        queryFn: () => getFavourites()
    })

    const mutate = useMutation({
        mutationKey: ['user'],
        mutationFn: () => logout(),
        onSuccess: () => {
            router.push('/')
            queryClient.removeQueries({ queryKey: ['user'] })
        }
    })


    const formatterUserPhoneNumber = (phoneNumber: string | undefined) => {
        if (phoneNumber) {
            const match = phoneNumber.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/)

            if (match) {
                return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
            }

            return null
        }
        return null
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="border my-4 rounded-md px-4">
                <div className="flex items-center gap-8 relative">
                    <div className="gap-8 my-8 leading-snug tracking-normal text-blue-gray-900">
                        <div className={`w-44 ${userLoading && 'bg-gray-300 animate-pulse'} h-44 border rounded-md`}>
                            {userLoading ? '' : (
                                <img className="rounded-md" src={`${user?.img_url ? user?.img_url : 'https://i.pinimg.com/564x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg'}`} alt="" />
                            )}
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <p className="text-xs mt-2 font-light">Full name:</p>
                            {userLoading ? (
                                <div className="bg-gray-200 mt-2 mb-4 animate-pulse w-36 h-4 rounded-full" />
                            ) : (
                                <h1 className="mt-2 mb-4">{`${user?.last_name === undefined ? '' : user?.last_name} ${user?.first_name === undefined ? '' : user?.first_name}`}</h1>
                            )}
                        </div>
                        <div>
                            <p className="text-xs font-light">Phone number:</p>
                            {userLoading ? (
                                <div className="bg-gray-200 mt-2 mb-4 animate-pulse w-36 h-4 rounded-full" />
                            ) : (
                                <p className="text-sm mt-2 mb-4">{`+${formatterUserPhoneNumber(user?.number)}`}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            {userLoading ? (
                                <div className="bg-gray-200 p-2.5 rounded-md animate-pulse w-40 h-[38px]" />
                            ) : (
                                <div className="border p-2.5 rounded-md">
                                    <p className="text-xs">{`Products in cart: ${cart?.length}`}</p>
                                </div>
                            )}
                            {userLoading ? (
                                <div className="bg-gray-200 p-2.5 rounded-md animate-pulse w-40 h-[38px]" />
                            ) : (
                                <div className="border p-2.5 rounded-md">
                                    <p className="text-xs">{`Favourite products: ${favourites?.length}`}</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <ul className="flex items-center text-sm font-normal gap-8 relative">
                    <Link href='/user/orders'>
                        <li className={`flex items-center gap-2 py-7 ${pathname === '/user/orders' && 'text-[#0295a9] border-b border-[#0295a9]'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                            </svg>
                            My orders
                        </li>
                    </Link>
                    <Link href='/user/settings'>
                        <li className={`flex items-center gap-2 py-[28px] ${pathname === '/user/settings' && 'text-[#0295a9] border-b border-[#0295a9]'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            Settings
                        </li>
                    </Link>
                    <Button className="rounded-md bg-gray-200 absolute right-0 bottom-3" onClick={() => mutate.mutate()}>
                        Sign Out
                    </Button>
                </ul>
            </div>
            <CancelOrderModal />
            <div className="">
                {children}
            </div>
        </div>
    );
}