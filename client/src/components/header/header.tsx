'use client';

import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { getUser } from "@/app/functions/functions";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathName = usePathname();

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    })

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="z-20"
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <Link href="/" className="text-gray-900">
                        <h1 className="font-bold">Online Pharmacy</h1>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4">
                <NavbarBrand>
                    <Link href="/" className="text-gray-900">
                        <h1 className="font-bold">Online Pharmacy</h1>
                    </Link>
                </NavbarBrand>
                <NavbarItem className="space-x-5 mx-56">
                    <Link href="/" className={`text-gray-900 text-[14px] font-medium ${pathName === '/' && 'text-[#0295a9]'}`}>
                        Main
                    </Link>
                    <Link href="/about-us" className={`text-gray-900 text-[14px] font-medium ${pathName === '/about-us' && 'text-[#0295a9]'}`}>
                        About-us
                    </Link>
                    <Link href="/our-team" className={`text-gray-900 text-[14px] font-medium ${pathName === '/our-team' && 'text-[#0295a9]'}`}>
                        Our-team
                    </Link>
                </NavbarItem>
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

            <NavbarMenu>
                <NavbarMenuItem className="gap-4">
                    <Link href="/" className={`text-gray-900 font-semibold ${pathName === '/' && 'text-[#0295a9]'}`}>
                        Main
                    </Link>
                    <Link href="/about-us" className={`text-gray-900 font-semibold ${pathName === '/about-us' && 'text-[#0295a9]'}`}>
                        About-us
                    </Link>
                    <Link href="/our-team" className={`text-gray-900 font-semibold ${pathName === '/our-team' && 'text-[#0295a9]'}`}>
                        Our-team
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar >
    );
}
