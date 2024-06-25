'use client'

import { useState, useEffect } from "react";
import { Navbar, Avatar, NavbarContent } from "@nextui-org/react";
import axios from "axios";

interface adminDataProps {
    id: string;
    phonenumber: string;
    password: string;
    name: string;
}

export default function Header() {
    const [adminDatas, setAdminDatas] = useState<adminDataProps | null>(null);

    useEffect(() => {
        const fetchCurrentAdmin = async () => {
            try {
                const response = await axios.get('/api/auth/currentAdmin');
                setAdminDatas(response.data.currentAdmin);
            } catch (error) {
                console.log('Error fetching current admin', error);
            }
        };

        fetchCurrentAdmin();
    }, []); // Обратите внимание на зависимость - пустой массив, чтобы useEffect вызывался только один раз при монтировании компонента

    return (
        <Navbar isBordered className="bg-white relative flex">
            <div className="absolute right-0 flex items-center gap-x-4 cursor-pointer">
                <Avatar
                    size="md"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <NavbarContent>
                    <h1 className="font-semibold">{adminDatas && adminDatas.name}</h1>
                </NavbarContent>
            </div>
        </Navbar>
    );
}
