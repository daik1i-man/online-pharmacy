'use client'

import { addProductToCart, getProductById, addProductToFavourites, getCart } from '@/app/functions/functions';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from "next/navigation";
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@nextui-org/react";
import dynamicImport from "next/dynamic";
import { useRef, useState } from "react";
import '../../../response.css'
import Link from 'next/link';
const ReactQuill = dynamicImport(() => import("@/components/editor/Quill"), {
    ssr: false,
});

export default function Page() {
    const [count, setCount] = useState(1);
    const queryClient = useQueryClient();
    const { toast } = useToast()
    const { id } = useParams()
    const router = useRouter()
    const ref = useRef(null)

    const options = {
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
        onSuccess: (data: any) => setCount(data?.quantity)
    };

    const { data: product, isLoading: productLoading } = useQuery(options);

    const addProductToCartMutation = useMutation({
        mutationKey: ['cart'],
        mutationFn: () => addProductToCart(product?.id, count, product?.price),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast({
                title: "Product added to cart",
                description: `${new Date().toLocaleString()}`,
                action: (
                    <Link href='/cart'>
                        <ToastAction altText="Go to cart">Go to cart</ToastAction>
                    </Link>
                ),
            });
        }
    })

    const addProductToFavouritesMutation = useMutation({
        mutationKey: ['favourites'],
        mutationFn: () => addProductToFavourites(product?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favourites'] });
            toast({
                title: "Product added to favourites",
                description: `${new Date().toLocaleString()}`,
                action: (
                    <Link href='/favourites'>
                        <ToastAction altText="Go to favourites">Go to favourites</ToastAction>
                    </Link>
                ),
            });
        }
    })

    const incrementHandler = () => {
        setCount(prevCount => prevCount + 1)
    }

    const decrementHandler = () => {
        setCount(prevCount => prevCount - 1)
    }

    const backHandler = () => {
        router.back()
    }

    return (
        <div>
            <div className="p-8 mx-auto main">
                <div className='relative'>
                    <div className='w-8 h-8 px-[7px] absolute top-6 py-[8px] -left-5 my-2 bg-gray-100 rounded-full cursor-pointer' onClick={backHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[16px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                </div>
                {productLoading ? (
                    <div className="gap-8 my-20">
                        <div className="">
                            <div className='mx-auto bg-gray-200 rounded-md w-80 h-80 animate-pulse' />
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full h-6 my-8 bg-gray-200 rounded-md animate-pulse" />
                            <div className="flex items-center justify-between">
                                <div className="mb-8">
                                    <div className="w-24 h-4 my-4 text-xs bg-gray-200 rounded-md animate-pulse" />
                                    <div className="flex items-center h-12 bg-gray-200 border rounded-md w-44 animate-pulse" />
                                </div>
                                <div className="h-4 bg-gray-200 rounded-md w-28 animate-pulse" />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center h-12 bg-gray-200 border rounded-md w-44 animate-pulse" />
                                <div className="flex items-center h-12 bg-gray-200 border rounded-md w-44 animate-pulse" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <div className="bg-gray-100">
                            <img className='w-[350px] mx-auto' src={product?.img_url} alt={product?.name} />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="mt-20 text-[20px] font-medium">{product?.name}</h1>
                            <div className='mt-2 mb-12'>
                                <h3 className="my-4 text-xs">Quantities</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-between w-32 px-3 border rounded-md">
                                        <button disabled={count <= 1} className="p-2 text-base bg-white disabled:opacity-25 disabled:hover:text-gray-500 disabled:cursor-pointer" onClick={decrementHandler}>
                                            -
                                        </button>
                                        <p className='text-xs'>{count}</p>
                                        <button className="p-2 text-base bg-white" onClick={incrementHandler}>
                                            +
                                        </button>
                                    </div>
                                    <span>{`${product?.price} UZS`}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <Button className="rounded-md text-[12px] bg-[#0295a9] text-gray-50" onClick={() => addProductToCartMutation.mutate()}>
                                    Add to basket
                                </Button>
                                <Button className="rounded-md text-[12px] ring-1 ring-[#0295a9] border-none text-[#0295a9] bg-white" onClick={() => addProductToFavouritesMutation.mutate()}>
                                    Add to favourites
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                <ReactQuill
                    rrefferef={ref}
                    content={product?.description}
                    className='my-16'
                    ReadOnly
                />
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
