'use client'

import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { MainPageCategoriesProps } from "../types";
import { getAllCaregories } from "../functions";
import Link from "next/link";

export default function Categories() {
    const [categories, setCategories] = React.useState<MainPageCategoriesProps[]>([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        const fetchAllcategories = async () => {
            setLoading(true)
            const response = await getAllCaregories()
            setCategories(response)
            setLoading(false)
        }

        fetchAllcategories()

        const id = setInterval(fetchAllcategories, 1000)

        if (id) {
            clearInterval(id)
        }

    }, [])

    return (
        <div className="max-w-7xl mx-auto">
            <div className="my-16 text-2xl font-normal">
                Categories
            </div>
            <div className="grid grid-cols-4 gap-4 mt-28">
                {loading ? "item".repeat(2).split("").map((el, index) => (
                    <Card key={index} className="max-w-[340px] h-48 shadow-none border justify-center">
                        <CardHeader className="justify-between">
                            <div className="gap-5 justify-center w-full">
                                <div className="w-14 h-14 mx-auto rounded-full bg-gray-300 animate-pulse"></div>
                                <div className="items-start justify-center text-center my-4">
                                    <h4 className="text-small max-w-[140px] mx-auto rounded-md h-2 font-semibold leading-none text-default-600 bg-gray-300 animate-pulse"></h4>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                )) :
                    (categories && categories.map((category) => (
                        <Link key={category.id} href={`/categories/${category.id}`}>
                            <Card className="max-w-[340px] h-48 shadow-none py-8 border justify-center">
                                <CardHeader className="justify-between">
                                    <div className="gap-5 justify-center w-full">
                                        <Avatar isBordered className="mx-auto" radius="full" size="lg" src={category.img_url} />
                                        <div className="items-start justify-center text-center my-4">
                                            <h4 className="text-small font-semibold leading-none text-default-600">{category.name}</h4>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))
                    )}
            </div>
        </div>
    );
}
