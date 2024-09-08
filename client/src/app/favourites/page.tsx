'use client'

import SkeletoComponent from "@/components/skeletonComponent/skeletonComponent";
import ProductsCard from "@/components/productCard/productsCard";
import EmptyFavourites from '../../image/favourites.png'
import { getFavourites } from "../functions/functions";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Favourites() {
    const { data: favourites, isLoading: loadingFavourites } = useQuery({
        queryKey: ['favourites'],
        queryFn: () => getFavourites(),
    })

    return (
        <div>
            {favourites?.length === 0 ? (
                <div className='text-center justify-center my-8'>
                    <Image className='w-[400px] mx-auto my-4' src={EmptyFavourites} alt='Empty Image' />
                    <h1 className='text-2xl text-center font-semibold'>Add what you like</h1>
                    <p className='text-center w-[550px] mx-auto my-2'>Click on ♡ in the product. Log in to your account and all your favorites will be saved.</p>
                    <Link href='/' className='justify-center'>
                        <Button className='text-center my-4 rounded-md px-16 bg-[#0295a9] text-gray-50'>Main page</Button>
                    </Link>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto my-12 gap-4 grid grid-cols-2 sm:grid-cols-5">
                    {loadingFavourites ? (
                        "items".repeat(1).split("").map((el, index) => <SkeletoComponent key={index} />)
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