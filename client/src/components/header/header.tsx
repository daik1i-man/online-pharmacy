'use client';

import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { getUser } from "@/app/functions/functions";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import '../../responsive.css'
import React from "react";

export default function Header() {
    const pathName = usePathname();

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    })

    return (
        <div className="header">
            <Navbar isBordered className="z-20">
                <div className="flex justify-between items-center w-full mx-auto">
                    <NavbarContent className="hidden sm:flex gap-4">
                        <NavbarBrand>
                            <Link href="/" className="text-gray-900">
                                <h1 className="font-bold">Online Pharmacy</h1>
                            </Link>
                        </NavbarBrand>
                    </NavbarContent>
                    <NavbarContent justify="end">
                        {userLoading ? (
                            <div className="w-40 bg-gray-200 rounded-md py-5 px-10 transition-all animate-pulse relative" />
                        ) :
                            (user === undefined ? (
                                <Link href='/auth/login'>
                                    <Button className="bg-gray-200 rounded-md py-2.5 px-10">
                                        Sign in
                                    </Button>
                                </Link>
                            ) : (
                                <Link href='/user/orders'>
                                    <Button className="bg-gray-200 rounded-md py-2.5 px-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        Profile
                                    </Button>
                                </Link>
                            ))
                        }
                    </NavbarContent>
                </div>
            </Navbar >
        </div>
    );
}