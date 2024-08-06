'use client'

import { getCategoryById, getProductsByCategoryName } from "../../functions/functions";
import SkeletoComponent from "@/components/skeletonComponent/skeletonComponent";
import ProductsCard from "@/components/productCard/productsCard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Page() {
    const { id } = useParams()

    const { data: category } = useQuery({
        queryKey: ['category'],
        queryFn: () => getCategoryById(id)
    })

    const { data: product, isLoading: productLoading } = useQuery({
        queryKey: ['product'],
        queryFn: () => getProductsByCategoryName(category)
    })

    return (
        <>
            <div className="my-12 max-w-7xl mx-auto">
                <h1 className="text-2xl font-medium">{category}</h1>
            </div>
            {product ?
                (< div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
                    {productLoading ? (
                        "item".repeat(3).split("").map((el, index) => <SkeletoComponent key={index} />)) :
                        (product && product.map((item: any) => (
                            <ProductsCard
                                key={item.id}
                                price={item.price}
                                quantity={1}
                                id={item.id}
                                img_url={item.img_url}
                                name={item.name}
                                cart={item?.cart}
                                favourites={item?.favourites}
                            />
                        )))
                    }
                </ div>
                ) : (
                    <div>
                        <img className="mx-auto w-96 my-4" src="https://i.pinimg.com/564x/eb/61/41/eb614141450093184d1b657697047b5f.jpg" alt="" />
                        <div className="text-center">
                            <h1 className="text-lg font-medium">No products found in this category</h1>
                            <p className="text-small font-light">Look at other categories</p>
                            <Link href="/categories">
                                <Button className="my-4 rounded-md px-8 bg-[#0295a9] text-gray-50">Go back</Button>
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    )
}