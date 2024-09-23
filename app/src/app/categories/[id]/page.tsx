'use client'

import { getCategoryById, getProductsByCategoryName } from "../../functions/functions";
import SkeletoComponent from "@/components/skeletonComponent/skeletonComponent";
import ProductsCard from "@/components/productCard/productsCard";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@nextui-org/react";
import '../../../response.css'
import Link from "next/link";

export default function Page() {
    const { id } = useParams()
    const router = useRouter()

    const { data: category } = useQuery({
        queryKey: ['category'],
        queryFn: () => getCategoryById(id)
    })

    const { data: product, isLoading: productLoading } = useQuery({
        queryKey: ['product'],
        queryFn: () => getProductsByCategoryName(category?.name)
    })

    const backHandler = () => {
        router.back()
    }

    return (
        <>
            <div className="relative main">
                <div className='w-6 h-6 px-0.5 py-1 absolute bg-gray-100 rounded-full cursor-pointer m-4' onClick={backHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div className="mx-auto my-12 w-[600px]">
                    <h1 className="text-2xl font-medium">{category?.name}</h1>
                </div>
                {product ?
                    (<div className="grid grid-cols-3 gap-4 mx-auto my-8">
                        {productLoading ? (
                            "ite".repeat(2).split("").map((el, index) => <SkeletoComponent key={index} />)) :
                            (product && product?.map((item: any) => (
                                <ProductsCard
                                    key={item?.id}
                                    price={item?.price}
                                    quantity={1}
                                    id={item?.id}
                                    img_url={item?.img_url}
                                    name={item?.name}
                                    cart={item?.cart}
                                    favourites={item?.favourites}
                                />
                            )))
                        }
                    </ div>
                    ) : (
                        <div className="mx-auto">
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
                }
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