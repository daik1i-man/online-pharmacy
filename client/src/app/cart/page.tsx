'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductFromCart, getCart } from '../functions/functions';
import { useToast } from "@/components/ui/use-toast"
import EmptyImage from '../../image/basket.png'
import { Button } from '@nextui-org/react';
import { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
    const [count, setCount] = useState(1)
    const queryClient = useQueryClient()
    const { toast } = useToast()

    const { data: cart, isLoading: cartProductLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart()
    })

    const deleteProductFromCartMutation = useMutation({
        mutationKey: ['cart'],
        mutationFn: (id: string) => deleteProductFromCart(id),
        onSuccess: () => {
            toast({
                title: "Product deleted from cart",
                description: `${new Date().toLocaleString()}`,
            })
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        }
    })

    const deleteProduct = async (id: string) => {
        try {
            await deleteProductFromCartMutation.mutateAsync(id)
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    return (
        <div className="w-full justify-center h-full pt-24 pb-8 relative items-center">
            {cart?.length === 0 ? (
                <div className='text-center justify-center'>
                    <Image className='w-[500px] mx-auto my-4' src={EmptyImage} alt='Empty Image' />
                    <h1 className='text-2xl text-center font-semibold'>Your cart is currently no products</h1>
                    <p className='text-center my-1'>to select products go to the main page</p>
                    <Link href='/' className='justify-center'>
                        <Button className='text-center my-4 rounded-md px-16 bg-[#0295a9] text-gray-50'>Main page</Button>
                    </Link>
                </div>
            ) : (
                <div className='flex max-w-7xl mx-auto items-start justify-between relative'>
                    <ul className='flex flex-col gap-4'>
                        {cartProductLoading ? (
                            <div className='flex items-start gap-6 justify-between w-[950px] border px-2 py-2 rounded-md'>
                                <div className='flex items-center gap-6 w-36 rounded-md bg-gray-200 animate-pulse'>

                                    <div>
                                        <div className='flex items-start gap-2 my-2'>
                                            <p className='text-xs font-medium w-48 h-3 rounded-full bg-gray-200 animate-pulse mx-40' />
                                        </div>
                                        <p className='text-xs my-2 font-medium w-24 h-3 rounded-full bg-gray-200 animate-pulse mx-40' />
                                        <div className='my-2'>
                                            <div className="flex items-center mx-40 border w-44 h-10 bg-gray-200 animate-pulse rounded-md" />
                                        </div>
                                    </div>
                                </div >
                                <div className='m-3'>
                                    <p className='text-xs float-end w-16 h-3 rounded-full bg-gray-200 animate-pulse' />
                                    <div className='mt-8 w-28 h-3 rounded-full bg-gray-200 animate-pulse' />
                                </div>
                            </div >
                        ) : (cart?.map((item: any, index: number) => (
                            <li key={index}>
                                <div className='flex items-start gap-6 justify-between w-[950px] border px-2 py-2 rounded-md'>
                                    <div className='flex items-center gap-6 relative'>
                                        <Link className='relative' href={`/product/${item?.product.id}`}>
                                            <img className='w-36 rounded-md' src={item.product.img_url} alt="watches" />
                                        </Link>
                                        <div>
                                            <Link href={`/product/${item?.product.id}`}>
                                                <h2 className='text-sm my-2'>{item.product.name}</h2>
                                            </Link>
                                            <div className='flex items-start gap-2'>
                                                <p className='text-xs font-medium'>Category: </p>
                                                <p className='text-[11px] font-light'>{item.product.category}</p>
                                            </div>
                                            <div className='my-4'>
                                                <div className="flex items-center border w-44 rounded-md">
                                                    <Button disabled={count === 1} className="bg-white disabled:opacity-25 disabled:hover:text-gray-500 text-base disabled:cursor-pointer" onClick={() => setCount(count - 1)}>
                                                        -
                                                    </Button>
                                                    <p className='text-xs'>{count}</p>
                                                    <Button className="bg-white text-base" onClick={() => setCount(count + 1)}>
                                                        +
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                    <div className='relative' onClick={() => deleteProduct(item.product.id)}>
                                        <div className='flex items-center gap-2 m-3 justify-end cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            <p className='text-xs'>Delete</p>
                                        </div>
                                        <div className='mt-11'>
                                            <p>{`${item.product.price} UZS`}</p>
                                        </div>
                                    </div>
                                </div >
                            </li >
                        )))}
                    </ul >
                    <div className='absolute top-0 right-0'>
                        <div className='right-[120px] w-80 border rounded-md p-4 px-4  '>
                            <div>
                                <p className='text-sm'>{`Your orders: (${cart?.length})`}</p>
                                <div className='flex items-center justify-between my-12'>
                                    <p className='text-sm'>Total:</p>
                                    <h1 className='text-xl'>759 000 UZS</h1>
                                </div>
                            </div>
                            <Button className='w-full rounded-md bg-[#0295a9] text-gray-50'>Go to checkout</Button>
                        </div>
                    </div>
                </div >
            )
            }
            <div className='my-12' />

        </div >
    );
}