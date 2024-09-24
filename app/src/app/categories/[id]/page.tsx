'use client'

import SkeletoComponent from "@/components/skeletonComponent/skeletonComponent";
import ProductsCard from "@/components/productCard/productsCard";
import { getCategoryById } from "../../functions/functions";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@nextui-org/react";
import '../../../response.css'
import Link from "next/link";
import { useEffect } from "react";

export default function Page() {
    const { id } = useParams()
    const router = useRouter()

    const { data: products, isLoading: loading } = useQuery({
        queryKey: ['products', id],
        queryFn: () => getCategoryById(id)
    })

    const backHandler = () => {
        router.back()
    }

    return (
        <>
            <div className="relative main">
                <div className='w-6 h-6 px-0.5 py-1 absolute bg-gray-100 rounded-full cursor-pointer -top-9 left-3' onClick={backHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
                {loading ? (
                    <div className="grid grid-cols-2 pl-3 gap-y-4 mx-auto my-24">
                        {"it".repeat(2).split('').map((el, i) => (
                            <SkeletoComponent key={i} />
                        ))}
                    </div>
                ) : (
                    products ? (
                        <div className="grid grid-cols-2 pl-3 gap-y-4 mx-auto my-24">
                            {products?.map((product: any) => (
                                <ProductsCard key={product?.id}
                                    name={product?.name}
                                    id={product?.id}
                                    img_url={product?.img_url}
                                    price={product?.price}
                                    cart={product?.cart}
                                    favourites={product?.favourites}
                                    quantity={product?.quantity}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mx-auto px-4 my-8 relative">
                            <div className='w-8 h-8 px-0.5 absolute py-1 bg-gray-100 rounded-full cursor-pointer top-9' onClick={backHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </div>
                            <img className="mx-auto my-4 w-[350px]" src="https://i.pinimg.com/564x/eb/61/41/eb614141450093184d1b657697047b5f.jpg" alt="" />
                            <div className="mb-4 text-center">
                                <h1 className="text-base font-medium">No products found in this category</h1>
                                <p className="font-light text-xs my-2">Look at other categories</p>
                                <Link href="/categories">
                                    <Button className="my-2 rounded-md px-8 bg-[#0295a9] text-gray-50">Go back</Button>
                                </Link>
                            </div>
                        </div>
                    )
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
        </>
    )
}








