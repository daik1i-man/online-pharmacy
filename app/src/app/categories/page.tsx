'use client'

import { Card, CardHeader, Avatar } from "@nextui-org/react";
import { getAllCaregories } from "../functions/functions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import '../../response.css'
import React from "react";

export default function Categories() {
    const router = useRouter()
    const { data: categories, isLoading: loading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getAllCaregories()
    })

    const backHandler = () => {
        router.back()
    }

    return (
        <>
            <div className="mx-auto relative main">
                <div className='w-8 h-8 px-0.5 py-1 absolute bg-gray-100 rounded-full cursor-pointer z-20 -mt-12 mx-4' onClick={backHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div className="grid grid-cols-3 gap-3 px-4 mt-28 mb-12">
                    {loading ? "ite".repeat(2).split("").map((el, index) => (
                        <Card key={index} className="justify-center h-32 border shadow-none">
                            <CardHeader className="justify-between">
                                <div className="justify-center w-full gap-5">
                                    <div className="mx-auto bg-gray-300 rounded-full w-14 h-14 animate-pulse"></div>
                                    <div className="items-start justify-center my-4 text-center">
                                        <h4 className="text-small max-w-[140px] mx-auto rounded-md h-2 font-semibold leading-none text-default-600 bg-gray-300 animate-pulse"></h4>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    )) :
                        (categories && categories.map((category: any) => (
                            <Link key={category.id} href={`/categories/${category.id}`}>
                                <Card className="justify-center h-32 py-5 border shadow-none">
                                    <CardHeader className="justify-between">
                                        <div className="justify-center w-full gap-5">
                                            <Avatar isBordered className="mx-auto" radius="full" size="md" src={category.img_url} />
                                            <div className="items-start justify-center my-4 text-center">
                                                <h4 className="text-xs font-semibold leading-none text-default-600">{category.name}</h4>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))
                        )}
                </div>
            </div>
            <div className='relative information_text'>
                <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full mx-auto space-y-4 text-center py-36 max-w-7xl'>
                    <img className='w-[300px] mx-auto' src="https://i.pinimg.com/564x/b5/79/d2/b579d2c58e40859f67db0127965b8a96.jpg" alt="" />
                    <p className='text-xl font-semibold'>Sorry!</p>
                    <p className='text-sm w-[400px] mx-auto'>This platform is for mobile devices only. If you want to continue on the desktop version, you can visit our desktop platform!</p>
                    <Link href='https://www.opharm.uz' className='text-[14px] bg-gray-200 w-[250px] py-2.5 rounded-md mx-auto'>Visit to desktop platform</Link>
                </div>
            </div>
        </>
    );
}
