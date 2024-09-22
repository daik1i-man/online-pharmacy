'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productCardDatasProps } from "@/app/types";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Card } from "flowbite-react";
import Link from "next/link";
import '../../response.css'
import {
    addProductToCart,
    addProductToFavourites,
    deleteProductFromCart,
    deleteProductFromFavourites
} from "@/app/functions/functions";

export default function ProductsCard({ name, id, img_url, price, cart, favourites }: productCardDatasProps) {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const updateProductCache = (id: string, updateFn: (product: any) => any) => {
        queryClient.setQueriesData({ queryKey: ['products'] }, (oldData: any) => {
            if (!oldData) return oldData
            return oldData.map((product: any) =>
                product.id === id ? updateFn(product) : product
            )
        })
    }

    const addProductToCartMutation = useMutation({
        mutationFn: (id: string) => addProductToCart(id, 1, price),
        onSuccess: () => {
            toast({
                title: "Product added to cart",
                description: `${new Date().toLocaleString()}`,
                action: (
                    <Link href='/cart'>
                        <ToastAction altText="Goto schedule to undo">Go to cart</ToastAction>
                    </Link>
                ),
            })
            updateProductCache(id, (product) => ({ ...product, cart: true }))
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {
            toast({
                title: "Something went wrong.",
                description: `${error.message}`,
                action: (
                    <ToastAction altText="Goto schedule to undo" onClick={onAdd}>Try again</ToastAction>
                ),
            })
            console.error("Error ading product to cart", error.message)
        }
    })

    const deleteProductFromCartMutation = useMutation({
        mutationFn: (id: string) => deleteProductFromCart(id),
        onSuccess: () => {
            toast({
                title: "Product deleted from cart",
                description: `${new Date().toLocaleString()}`,
            })
            updateProductCache(id, (product) => ({ ...product, cart: false }))
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {
            toast({
                title: "Something went wrong.",
                description: `${error.message}`,
                action: (
                    <ToastAction altText="Goto schedule to undo" onClick={() => onDelete(id)}>Try again</ToastAction>
                ),
            })
            console.error("Error ading product to cart", error.message)
        }
    })

    const addProductToFavouritesMutation = useMutation({
        mutationFn: (id: string) => addProductToFavourites(id),
        onSuccess: () => {
            toast({
                title: "Product added to favourites",
                description: `${new Date().toLocaleString()}`,
                action: (
                    <Link href='/favourites' className="">
                        <ToastAction altText="Goto schedule to undo" className="py-5 w-44">Go to favourites</ToastAction>
                    </Link>
                ),
            })
            updateProductCache(id, (product) => ({ ...product, favourites: true }))
            queryClient.invalidateQueries({ queryKey: ['favourites'] })
        },
        onError: (error) => {
            toast({
                title: "Something went wrong.",
                description: `${error.message}`,
                action: (
                    <ToastAction altText="Goto schedule to undo" onClick={addToFavourites}>Try again</ToastAction>
                ),
            })
            console.error("Error ading product to cart", error.message)
        }
    })

    const deleteProductFromFavouritesMutation = useMutation({
        mutationFn: (id: string) => deleteProductFromFavourites(id),
        onSuccess: () => {
            toast({
                title: "Product deleted from favourites",
                description: `${new Date().toLocaleString()}`,
            })
            updateProductCache(id, (product) => ({ ...product, favourites: false }))
            queryClient.invalidateQueries({ queryKey: ['favourites'] })
        },
        onError: (error) => {
            toast({
                title: "Something went wrong.",
                description: `${error.message}`,
                action: (
                    <ToastAction altText="Goto schedule to undo" onClick={deleteFromFavourites}>Try again</ToastAction>
                ),
            })
            console.error("Error ading product to cart", error.message)
        }
    })

    const onAdd = async () => {
        try {
            await addProductToCartMutation.mutateAsync(id);
            console.log("product add to cart successfully");
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const onDelete = async (id: string) => {
        try {
            await deleteProductFromCartMutation.mutateAsync(id)
            console.log("Product deleted from cart successfully")
        } catch (error) {
            console.log((error as Error).message)
        }
    }

    const addToFavourites = async () => {
        try {
            await addProductToFavouritesMutation.mutateAsync(id)
            console.log("Product added to favourites successfully");
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    const deleteFromFavourites = async () => {
        try {
            await deleteProductFromFavouritesMutation.mutateAsync(id)
            console.log("Product deleted from favourites successfully");
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    return (
        <Card
            className="shadow-none product_card"
        >
            <Link href={`/product/${id}`}>
                <img
                    className='object-cover mx-auto product_card_image'
                    alt={name}
                    src={img_url}
                />
            </Link>
            <div className="absolute top-3 right-3">
                {favourites ? (
                    <svg onClick={deleteFromFavourites} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-[22px] text-red-600 cursor-pointer">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                ) : (
                    <svg onClick={addToFavourites} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[22px] cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                )}
            </div>
            <Link href={`/product/${id}`}>
                <h5 className="text-[13px] font-medium text-gray-900">
                    {name}
                </h5>
            </Link>
            <div className="absolute bottom-2">
                <div className="flex items-center product_card_bottom">
                    <span className="text-gray-900 text-end text-[14px]">{`${price} UZS`}</span>
                    {cart ? (
                        <button
                            onClick={() => onDelete(id)}
                            className="p-2 text-xs font-medium text-center text-red-500 bg-gray-200 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={onAdd}
                            className="p-2 text-xs font-medium text-center text-gray-600 bg-gray-200 rounded-full "
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <span className="text-sm absolute top-[4px] rounded-full right-[3px] bg-gray-200">+</span>
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
}