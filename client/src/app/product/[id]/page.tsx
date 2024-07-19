'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Image, Button } from "@nextui-org/react";
import { getProductById } from "@/app/functions";
import { MainPageProductsProps } from "@/app/types";

export default function Page() {
    const [count, setCount] = useState(1)
    const [data, setData] = useState<MainPageProductsProps | undefined>(undefined)
    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        const fetchProductDatas = async () => {
            setLoading(true)
            const product = await getProductById(id)
            setData(product)
            setLoading(false)
        }

        fetchProductDatas()

        const intervalId = setInterval(fetchProductDatas, 1000)

        if (intervalId) {
            clearInterval(intervalId)
        }


    }, [id])

    return (
        <div>
            <div className="max-w-6xl mx-auto">
                <div className="my-12 flex gap-8">
                    <div className="">
                        {loading ? (
                            <div className="w-96 h-96 bg-gray-300 animate-pulse rounded-md" />
                        ) : (
                            <Image src={data?.img_url} alt="example" />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-4xl my-8 mt-20 font-medium">{data?.name}</h1>
                        <div className="flex items-center justify-between">
                            <span className="">{`${data?.price} UZS`}</span>
                            <p className="text-xs text-[#0295a9]">{`In stock ${data?.quantity}`}</p>
                        </div>
                        <div className="">
                        </div>
                        <hr className="my-4" />
                        <div className="mb-24">
                            <h3 className="text-xs my-4">Quantities</h3>
                            <div className="flex items-center border w-44 rounded-md">
                                <Button disabled={count === 1} className="bg-white disabled:opacity-25 disabled:hover:text-gray-500 text-xl disabled:cursor-pointer" onClick={() => setCount(count - 1)}>
                                    -
                                </Button>
                                <p>{count}</p>
                                <Button className="bg-white text-xl" onClick={() => setCount(count + 1)}>
                                    +
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button className="rounded-md py-6 px-8 bg-[#0295a9] text-gray-50">
                                Add to basket
                            </Button>
                            <Button className="rounded-md py-6 px-8 ring-1 ring-[#0295a9] border-none text-[#0295a9] bg-white">
                                Buy in 1 click
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}