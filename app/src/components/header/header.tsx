'use client';

import { Link, Button } from "@nextui-org/react";
import { getUser } from "@/app/functions/functions";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
    const pathName = usePathname();

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    })

    return (
        <div className="max-w-[500px] z-[50] fixed top-0 right-0 left-0 mx-auto backdrop-blur-lg">
            <div className="px-2.5 py-1.5">
                <div className="flex items-center justify-between w-full">
                    <div className="">
                        <div>
                            <Link href="/" className="text-gray-900">
                                <h1 className="font-bold">Online Pharmacy</h1>
                            </Link>
                        </div>
                    </div>
                    <div>
                        {userLoading ? (
                            <div className="px-10 py-5 transition-all bg-gray-200 rounded-md w-28 animate-pulse" />
                        ) :
                            (user === undefined ? (
                                <Link href='/auth/login'>
                                    <Button className="bg-gray-200 rounded-md py-1.5 px-8">
                                        Sign in
                                    </Button>
                                </Link>
                            ) : (
                                <Link href='/user/orders'>
                                    <Button className="bg-gray-200 rounded-md py-1.5 px-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        Profile
                                    </Button>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}