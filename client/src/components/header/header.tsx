'use client'

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathName = usePathname()

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
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
                <NavbarItem className="space-x-5">
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
                <Button className="bg-[#0295a9] text-white rounded-md py-2.5 px-10">
                    Sign in
                </Button>
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
