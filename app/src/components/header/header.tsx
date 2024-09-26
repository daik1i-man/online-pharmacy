'use client';

import { Link, Button } from "@nextui-org/react";
import { getAllProducts, getUser } from "@/app/functions/functions";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Header() {
    const [state, setState] = useState({
        search: [],
        limit: 20
    })

    const [search, setSearch] = useState<string | undefined>(undefined);

    const { data: products } = useQuery({
        queryKey: ['products', state.limit],
        queryFn: () => getAllProducts(state.limit)
    })

    const filteredProducts = search ? products?.filter((product: any) => product.name.toLowerCase().includes(search.toLowerCase())) : products;

    const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value || undefined);
    };

    return (
        <div className="relative main">
            <div className="flex w-[97%] items-center px-2.5 py-1.5 border backdrop-blur-md backdrop-contrast-75 z-[90] fixed top-0 right-0 left-0 rounded-full m-1.5">
                <p className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[18px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </p>
                <input
                    name='search'
                    type="search"
                    placeholder='Look for products'
                    value={search || ''}
                    onChange={searchChangeHandler}
                    required
                    className="block w-full py-2 px-2 text-[11px] bg-transparent font-normal focus:ring-0 ring-0 outline-none placeholder:text-gray-400"
                />
            </div>
            <div className="z-[50] fixed top-0 right-0 left-0 mx-auto">
                <div className={`w-full bg-white rounded-md absolute top-8 left-0 right-0 z-50 ${search === undefined ? 'hidden' : 'block'}`}>
                    <div className='w-full h-[700px] p-4 overflow-y-scroll'>
                        {filteredProducts?.map((filteredProduct: any, i: number) => (
                            <div key={i} className='flex items-center w-full p-3 my-2 border-b gap-x-3 hover:bg-gray-50 hover:rounded-md'>
                                <div className='w-16'>
                                    <Link href={`product/${filteredProduct.id}`}>
                                        <img className='object-cover w-full h-full rounded-md' src={filteredProduct?.img_url} alt={filteredProduct?.name} />
                                    </Link>
                                </div>
                                <div>
                                    <Link href={`product/${filteredProduct.id}`}>
                                        <h1 className='text-[12px]'>{filteredProduct?.name}</h1>
                                    </Link>
                                    <p className='text-[12px]'>185 000 UZS</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </div>
    );
}