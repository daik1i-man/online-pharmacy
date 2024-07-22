'use client'

import { Card } from "flowbite-react";
import { Button } from "@nextui-org/react";
import { productCardDatasProps } from "@/app/types";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
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
        mutationFn: (id: string) => addProductToCart(id, 1),
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
                    <Link href='/favourites'>
                        <ToastAction altText="Goto schedule to undo">Go to favourites</ToastAction>
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
            className="max-w-xl relative my-4 shadow-none p-4"
        >
            <Link href={`/product/${id}`}>
                <img
                    className='w-full h-64'
                    alt={name}
                    src={img_url}
                />
            </Link>
            <div className="absolute top-3 right-3">
                {favourites ? (
                    <svg onClick={deleteFromFavourites} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-600 cursor-pointer">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                ) : (
                    <svg onClick={addToFavourites} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                )}
            </div>
            <div className="flex items-center">
                <span className="text-xl font-normal text-end text-gray-900">{`${price}UZS`}</span>
            </div>
            <Link href={`/product/${id}`}>
                <h5 className="text-sm font-normal text-gray-900">
                    {name}
                </h5>
            </Link>
            {cart ? (
                <Button
                    onClick={() => onDelete(id)}
                    className="rounded-lg bg-red-500 px-5 py-3 text-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                    Delete
                </Button>
            ) : (
                <Button
                    onClick={onAdd}
                    className="rounded-lg bg-cyan-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                    Add to cart
                </Button>
            )}
        </Card>
    );
}