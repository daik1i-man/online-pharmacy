'use client'

import SkeletoComponent from "@/components/skeletonComponent/skeletonComponent";
import ProductsCard from "@/components/productCard/productsCard";
import EmptyFavourites from '../../image/favourites.png'
import { getFavourites } from "../functions/functions";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import '../../responsive.css'

export default function Favourites() {
    const { data: favourites, isLoading: loadingFavourites } = useQuery({
        queryKey: ['favourites'],
        queryFn: () => getFavourites(),
    })

    return (
        <div>
            <div className="main">
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
            <div className='relative information_text mx-auto w-[400px]'>
                <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full mx-auto space-y-4 text-center py-12 max-w-7xl'>
                    <img className='w-full mx-auto' src="https://i.pinimg.com/736x/99/95/db/9995dbe1be71739b7db982a9dcf37d0c.jpg" alt="" />
                    <p className='text-xl font-semibold'>Sorry!</p>
                    <p className='text-sm'>This platform is for desktop devices only. If you want to continue on the mobile version, you can visit our desktop platform!</p>
                    <Link href='https://www.app.opharm.uz' className='text-[14px] bg-gray-200 w-[250px] py-2.5 rounded-md mx-auto'>Visit to mobile platform</Link>
                </div>
            </div>
        </div>
    );
}