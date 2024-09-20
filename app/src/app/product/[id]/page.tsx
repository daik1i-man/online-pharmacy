'use client'

import { addProductToCart, getProductById, addProductToFavourites } from '@/app/functions/functions';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast";
import { useParams } from "next/navigation";
import { Button } from "@nextui-org/react";
import dynamicImport from "next/dynamic";
import { useRef, useState } from "react";
import Link from 'next/link';
const ReactQuill = dynamicImport(() => import("@/components/editor/Quill"), {
    ssr: false,
});

export default function Page() {
    const [count, setCount] = useState(1);
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { id } = useParams();
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
        setCount(count + 1);
    }

    const decrementHandler = () => {
        setCount(count - 1);
    }

    return (
        <div>
            <div className="max-w-6xl mx-auto">
                {productLoading ? (
                    <div className="my-12 flex gap-8">
                        <div className="">
                            <div className='w-96 h-96 bg-gray-200 animate-pulse rounded-md' />
                        </div>
                        <div className="flex flex-col">
                            <div className="my-8 w-full h-12 bg-gray-200 animate-pulse rounded-md" />
                            <div className="flex items-center justify-between">
                                <div className="w-36 h-4 bg-gray-200 animate-pulse rounded-md" />
                                <div className="w-20 h-4 bg-gray-200 animate-pulse rounded-md" />
                            </div>
                            <div className="">
                            </div>
                            <hr className="my-4" />
                            <div className="mb-16">
                                <div className="text-xs my-4 w-24 h-4 bg-gray-200 rounded-md animate-pulse" />
                                <div className="flex items-center border w-44 rounded-md h-12 bg-gray-200 animate-pulse" />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border w-44 rounded-md h-12 bg-gray-200 animate-pulse" />
                                <div className="flex items-center border w-44 rounded-md h-12 bg-gray-200 animate-pulse" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="my-12 flex gap-8">
                        <div className="">
                            <img src={product?.img_url} alt={product?.name} />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-4xl my-8 mt-20 font-medium">{product?.name}</h1>
                            <div className="flex items-center justify-between">
                                <span>{`${product?.price} UZS`}</span>
                                <p className="text-xs text-[#0295a9]">{`In stock ${product?.quantity}`}</p>
                            </div>
                            <div className="">
                            </div>
                            <hr className="my-4" />
                            <div className="mb-24">
                                <h3 className="text-xs my-4">Quantities</h3>
                                <div className="flex items-center border w-44 rounded-md">
                                    <Button disabled={count === 1} className="bg-white disabled:opacity-25 disabled:hover:text-gray-500 text-xl disabled:cursor-pointer" onClick={decrementHandler}>
                                        -
                                    </Button>
                                    <p>{count}</p>
                                    <Button className="bg-white text-xl" onClick={incrementHandler}>
                                        +
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button className="rounded-md py-6 px-8 bg-[#0295a9] text-gray-50" onClick={() => addProductToCartMutation.mutate()}>
                                    Add to basket
                                </Button>
                                <Button className="rounded-md py-6 px-8 ring-1 ring-[#0295a9] border-none text-[#0295a9] bg-white" onClick={() => addProductToFavouritesMutation.mutate()}>
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
        </div>
    );
}
