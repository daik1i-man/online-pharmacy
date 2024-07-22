'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCategoryById, getProductsByCategoryName } from "../../functions/functions";
import ProductsCard from "@/components/productCard/productsCard";
import SkeletoComponent from "@/components/skeletonComponent/skeletonComponent";
import { Button } from "@nextui-org/react";
import { MainPageProductsProps } from "@/app/types";
import Link from "next/link";

export default function Page() {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<MainPageProductsProps[]>([])
    const [category, setCategory] = useState<string | undefined>(undefined)

    useEffect(() => {

        const fetchDatas = async () => {
            setLoading(true)
            const categoryName = await getCategoryById(id)
            setCategory(categoryName)
            const products = await getProductsByCategoryName(categoryName)
            setProducts(products)
            setLoading(false)
        }

        fetchDatas()

        const intervalId = setInterval(fetchDatas, 1000)

        if (intervalId) {
            clearInterval(intervalId)
        }

    }, [id])

    return (
        <>
            <div className="my-12 max-w-7xl mx-auto">
                <h1 className="text-2xl font-medium">{category}</h1>
            </div>
            {products ?
                (< div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
                    {loading ? (
                        "item".repeat(3).split("").map((el, index) => <SkeletoComponent key={index} />)) :
                        (products && products.map((product) => (
                            <ProductsCard
                                key={product.id}
                                category={""}
                                price={product.price}
                                quantity={""}
                                id={product.id}
                                img_url={product.img_url}
                                name={product.name}
                                description={""}
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