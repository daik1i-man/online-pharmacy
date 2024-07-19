import { Card } from "flowbite-react";
import { Button } from "@nextui-org/react";
import { MainPageProductsProps } from "@/app/types";
import Link from "next/link";

export default function ProductsCard({ name, id, img_url, price }: MainPageProductsProps) {
    return (
        <Card
            className="max-w-xl relative my-4 shadow-none"
        >
            <Link href={`/product/${id}`}>
                <img
                    className='w-full h-64'
                    alt={name}
                    src={img_url}
                />
            </Link>
            <div className="absolute top-3 right-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </div>
            <div className="flex items-center">
                <span className="text-xl font-normal text-end text-gray-900">{`${price}UZS`}</span>
            </div>
            <Link href={`/product/${id}`}>
                <h5 className="text-sm font-normal text-gray-900">
                    {name}
                </h5>
            </Link>
            <Button
                className="rounded-lg bg-cyan-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
                Add to cart
            </Button>
        </Card>
    );
}