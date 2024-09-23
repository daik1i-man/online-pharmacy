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
import '../../response.css'

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
        <div className="relative items-center justify-center py-14 mx-auto" >
            <div className="main">
                <div className='w-8 h-8 px-0.5 py-1 my-2 bg-gray-100 rounded-full cursor-pointer mx-4' onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
                {favourites?.length === 0 ? (
                    <div className='justify-center my-8 text-center'>
                        <Image className='mx-auto w-[350px]' src={EmptyFavourites} alt='Empty Image' />
                        <h1 className='text-lg font-semibold text-center'>Add what you like</h1>
                        <p className='my-1 text-sm text-center px-8'>Click on ♡ in the product. Log in to your account and all your favorites will be saved.</p>
                        <Link href='/' className='justify-center'>
                            <Button className='text-center my-2.5 rounded-md px-6 bg-[#0295a9] text-gray-50'>Main page</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 mx-auto gap-y-4">
                        {loadingFavourites ? (
                            "it".repeat(2).split("").map((el, index) => <SkeletoComponent key={index} />)
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
            <div className='relative information_text'>
                <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full mx-auto space-y-4 text-center py-36 max-w-7xl'>
                    <img className='w-[300px] mx-auto' src="https://i.pinimg.com/564x/b5/79/d2/b579d2c58e40859f67db0127965b8a96.jpg" alt="" />
                    <p className='text-xl font-semibold'>Sorry!</p>
                    <p className='text-sm w-[400px] mx-auto'>This platform is for mobile devices only. If you want to continue on the desktop version, you can visit our desktop platform!</p>
                    <Link href='https://www.opharm.uz' className='text-[14px] bg-gray-200 w-[250px] py-2.5 rounded-md mx-auto'>Visit to desktop platform</Link>
                </div>
            </div>
        </div>
    );
}