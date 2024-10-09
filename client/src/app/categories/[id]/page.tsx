'use client'

import SkeletoComponent from "@/components/skeletonComponent/skeletonComponent";
import ProductsCard from "@/components/productCard/productsCard";
import { getCategoryById } from "../../functions/functions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Button } from "@nextui-org/react";
import '../../../responsive.css'
import Link from "next/link";

export default function Page() {
    const { id } = useParams()

    const { data: products, isLoading: loading } = useQuery({
        queryKey: ['products', id],
        queryFn: () => getCategoryById(id)
    })

    return (
        <>
            <div className="relative main">
                {loading ? (
                    <div className="grid grid-cols-5 pl-3 gap-y-4 mx-auto my-24">
                        {"item".repeat(2).split('').map((el, i) => (
                            <SkeletoComponent key={i} />
                        ))}
                    </div>
                ) : (
                    products ? (
                        <div className="grid grid-cols-5 gap-y-4 mx-auto my-16">
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
                            <img className="mx-auto my-4 w-[500px]" src="https://i.pinimg.com/564x/eb/61/41/eb614141450093184d1b657697047b5f.jpg" alt="" />
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
            <div className='relative information_text mx-auto w-[400px]'>
                <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full mx-auto space-y-4 text-center py-12 max-w-7xl'>
                    <img className='w-full mx-auto' src="https://i.pinimg.com/736x/99/95/db/9995dbe1be71739b7db982a9dcf37d0c.jpg" alt="" />
                    <p className='text-xl font-semibold'>Sorry!</p>
                    <p className='text-sm'>This platform is for desktop devices only. If you want to continue on the mobile version, you can visit our desktop platform!</p>
                    <Link href='https://www.app.opharm.uz' className='text-[14px] bg-gray-200 w-[250px] py-2.5 rounded-md mx-auto'>Visit to mobile platform</Link>
                </div>
            </div>
        </>
    )
}








