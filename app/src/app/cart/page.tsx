'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductFromCart, getCart } from '../functions/functions';
import { useToast } from "@/components/ui/use-toast"
import { getUser } from "@/app/functions/functions";
import EmptyImage from '../../image/basket.png'
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { toast } = useToast()

    const { data: cart, isLoading: cartProductLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart(),
    })

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
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

    const incrementHandler = (id: string) => {
        const updatedCart = cart?.map((item: any) =>
            item?.id === id ? { ...item, quantity: Number(item.quantity) + 1 } : item
        );
        queryClient.setQueryData(['cart'], updatedCart);
    }

    const decrementHandler = (id: string) => {
        const updatedCart = cart?.map((item: any) =>
            item?.id === id && item?.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        queryClient.setQueryData(['cart'], updatedCart);
    }

    const totalPrice = cart?.reduce((acc: number, item: { price: string; quantity: any; }) => {
        const price = Number(item?.price.replace(/\s+/g, '')) || 0;
        const quantity = Number(item?.quantity) || 0;
        const total = acc + (price * quantity)
        return total;
    }, 0);

    const displayTotalPrice = (num: number | undefined) => {
        return num?.toLocaleString('ru-RU')
    }

    const formattedTotalPrice = displayTotalPrice(totalPrice)

    const checkUser = () => {
        if (user === undefined) {
            router.push('/auth/login')
            toast({
                title: "Please log in to place your order!"
            })
        } else {
            router.push('/checkout')
        }
    }

    const backHandler = () => {
        router.back()
    }

    return (
        <div className="relative items-center justify-center w-full py-14 max-w-[500px] mx-auto" >
            <div className='w-6 h-6 px-0.5 py-1 my-2 bg-gray-100 rounded-full cursor-pointer' onClick={backHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </div>
            {cart?.length === 0 ? (
                <div className='justify-center text-center'>
                    <Image className='w-[350px] mx-auto' src={EmptyImage} alt='Empty Image' />
                    <h1 className='text-lg font-semibold text-center'>Your cart is currently no products</h1>
                    <p className='my-1 text-sm text-center'>to select products go to the main page</p>
                    <Link href='/' className='justify-center'>
                        <Button className='text-center my-2.5 rounded-md px-6 bg-[#0295a9] text-gray-50'>Main page</Button>
                    </Link>
                </div>
            ) : (
                <div className='relative flex items-start justify-between mx-auto max-w-[500px]'>
                    <ul className='flex flex-col gap-4'>
                        {cartProductLoading ? (
                            "item".repeat(1).split('').map((item, index) => (
                                <div key={index} className='flex items-start gap-6 justify-between w-[950px] border px-2 py-2 rounded-md'>
                                    <div className='flex items-center gap-6 bg-gray-200 rounded-md w-36 animate-pulse'>
                                        <div>
                                            <div className='flex items-start gap-2 my-2'>
                                                <p className='w-48 h-3 mx-40 text-xs font-medium bg-gray-200 rounded-full animate-pulse' />
                                            </div>
                                            <p className='w-24 h-3 mx-40 my-2 text-xs font-medium bg-gray-200 rounded-full animate-pulse' />
                                            <div className='my-2'>
                                                <div className="flex items-center h-10 mx-40 bg-gray-200 border rounded-md w-44 animate-pulse" />
                                            </div>
                                        </div>
                                    </div >
                                    <div className='m-3'>
                                        <p className='w-16 h-3 text-xs bg-gray-200 rounded-full float-end animate-pulse' />
                                        <div className='h-3 mt-8 bg-gray-200 rounded-full w-28 animate-pulse' />
                                    </div>
                                </div >
                            ))
                        ) : (cart?.map((item: any, index: number) => (
                            <li key={index} className='flex items-center gap-4 p-3 border'>
                                <div className='flex items-start gap-6 justify-between w-[870px] px-2 py-2 rounded-md'>
                                    <div className='relative flex items-center gap-6'>
                                        <Link className='relative' href={`/product/${item?.id}`}>
                                            <img className='rounded-md w-36' src={item?.img_url} alt="watches" />
                                        </Link>
                                        <div>
                                            <Link href={`/product/${item?.id}`}>
                                                <h2 className='my-2 text-sm'>{item?.name}</h2>
                                            </Link>
                                            <div className='flex items-start gap-2'>
                                                <p className='text-xs font-medium'>Category: </p>
                                                <p className='text-[11px] font-light'>{item?.category}</p>
                                            </div>
                                            <div className='my-4'>
                                                <div className="flex items-center border rounded-md w-44">
                                                    <Button disabled={item?.quantity <= 1} className="text-base bg-white disabled:opacity-25 disabled:hover:text-gray-500 disabled:cursor-pointer" onClick={() => decrementHandler(item?.id)}>
                                                        -
                                                    </Button>
                                                    <p className='text-xs'>{item?.quantity}</p>
                                                    <Button className="text-base bg-white" onClick={() => incrementHandler(item?.id)}>
                                                        +
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                    <div className='relative' onClick={() => deleteProduct(item?.id)}>
                                        <div className='flex items-center justify-end gap-2 m-3 cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            <p className='text-xs'>Delete</p>
                                        </div>
                                        <div className='mt-11'>
                                            <p>{`${item?.price} UZS`}</p>
                                        </div>
                                    </div>
                                </div >
                            </li >
                        )))}
                    </ul >
                    {cartProductLoading ? (
                        <div className='absolute top-0 right-0'>
                            <div className='right-[120px] w-80 border rounded-md p-4 px-4  '>
                                <div>
                                    <div className='justify-start h-5 bg-gray-200 rounded-full w-44 animate-pulse' />
                                    <div className='flex items-center justify-between my-12'>
                                        <div className='w-24 h-5 bg-gray-200 rounded-full animate-pulse' />
                                        <div className='w-24 h-5 bg-gray-200 rounded-full animate-pulse' />
                                    </div>
                                </div>
                                <div className='w-full bg-gray-200 rounded-md h-9 animate-pulse' />
                            </div>
                        </div>
                    ) : (
                        <div className='absolute top-0 right-0 z-10 bg-white'>
                            <div className='right-[120px] w-80 border rounded-md p-4 px-4  '>
                                <div>
                                    <p className='text-sm'>{`Your orders: (${cart?.length})`}</p>
                                    <div className='flex items-center justify-between my-12'>
                                        <p className='text-sm'>Total:</p>
                                        <h1 className='text-xl'>{`${formattedTotalPrice} UZS`}</h1>
                                    </div>
                                </div>
                                <Button className='w-full rounded-md bg-[#0295a9] text-gray-50' onClick={checkUser}>Go to checkout</Button>
                            </div>
                        </div>
                    )}
                </div >
            )}
        </div >
    );
}