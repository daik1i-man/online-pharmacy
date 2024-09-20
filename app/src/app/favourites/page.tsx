'use client'

import SkeletoComponent from "@/components/skeletonComponent/skeletonComponent";
import ProductsCard from "@/components/productCard/productsCard";
import EmptyFavourites from '../../image/favourites.png'
import { getFavourites } from "../functions/functions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Favourites() {
    const router = useRouter()
    const { data: favourites, isLoading: loadingFavourites } = useQuery({
        queryKey: ['favourites'],
        queryFn: () => getFavourites(),
    })

    const onClick = () => {
        router.back()
    }

    return (
        <div className="relative items-center justify-center w-full py-14 max-w-[500px] mx-auto" >
            <div className='w-6 h-6 px-0.5 py-1 my-2 bg-gray-100 rounded-full cursor-pointer' onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>
            {favourites?.length === 0 ? (
                <div className='justify-center my-8 text-center'>
                    <Image className='w-[350px] mx-auto my-4' src={EmptyFavourites} alt='Empty Image' />
                    <h1 className='text-lg font-semibold text-center'>Add what you like</h1>
                    <p className='my-1 text-sm text-center'>Click on ♡ in the product. Log in to your account and all your favorites will be saved.</p>
                    <Link href='/' className='justify-center'>
                        <Button className='text-center my-2.5 rounded-md px-6 bg-[#0295a9] text-gray-50'>Main page</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-y-4 mx-auto my-12 max-w-[500px] sm:grid-cols-2">
                    {loadingFavourites ? (
                        "item".repeat(1).split("").map((el, index) => <SkeletoComponent key={index} />)
                    ) : (favourites?.map((product: any) => (
                        <ProductsCard
                            key={product?.id}
                            name={product?.name}
                            price={product?.price}
                            id={product?.id}
                            img_url={product?.img_url}
                            cart={product?.cart}
                            favourites={product?.favourites || product?.state}
                            quantity={1}
                        />)))}
                </div>
            )}
        </div>
    );
}