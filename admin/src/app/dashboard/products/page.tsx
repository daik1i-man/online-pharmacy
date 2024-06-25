'use client'

import { useContext, useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Button, Image, Skeleton } from "@nextui-org/react";
import { AddProductContext } from "@/context/productActionsContext/addProduct/addProduct";
import axios from "axios";
import { deleteProductContext } from "@/context/productActionsContext/deleteProduct/deleteProduct";
import { EditProductContext } from "@/context/productActionsContext/editProduct/editProduct";

interface ProductProps {
    id: string,
    img_url: string,
    category: string,
    price: string,
    quantity: number
}

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductProps[]>([])
    const addProductTempContext = useContext(AddProductContext)
    const deleteProductTempContext = useContext(deleteProductContext)
    const editProductTempContext = useContext(EditProductContext)
    const [loading, setLoading] = useState(false)

    if (!addProductTempContext || !deleteProductTempContext || !editProductTempContext) {
        throw new Error('SomeComponent must be used with an ProductContext')
    }
    const { setOpenAddProductModal } = addProductTempContext
    const { setOpenDeleteProductModal, setDeleteCurrentProduct } = deleteProductTempContext
    const { setOpenEditProductModal, setCurrentProductId } = editProductTempContext

    async function getProducts() {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/admin-controll/products/get-all')
            setProducts(response.data.allProducts)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        getProducts()

        const id = setInterval(getProducts, 1000)

        return () => {
            if (id) {
                clearInterval(id)
            }
        }
    }, [])


    const openDeleteHandler = (productId: string) => {
        setDeleteCurrentProduct(productId)
        setOpenDeleteProductModal(true)
    }

    const openEditProductHandler = (productId: string) => {
        setCurrentProductId(productId)
        setOpenEditProductModal(true)
    }

    return (
        <div className="w-full h-full m-0 p-0 justify-center">
            <div className="max-w-4xl mx-auto my-8">
                <h1 className="text-2xl font-regular">Products</h1>
            </div>
            <div className="max-w-4xl mx-auto">
                {/* <Skeleton className="w-[1180px] h-5 rounded-lg" /> */}
                <div className="overflow-x-auto border w-[1180px] mx-auto">
                    <Table>
                        <Table.Head className="text-center">
                            <Table.HeadCell className="">#</Table.HeadCell>
                            <Table.HeadCell>Photo</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell>Quantity</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                            <Table.HeadCell className="w-12 h-4">
                                <Button
                                    onClick={() => setOpenAddProductModal(true)}
                                    className="bg-gray-900 text-gray-50 rounded-md py-3"
                                >
                                    + Add product
                                </Button>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="text-center justify-center">
                            {products && products.map((product, i) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell
                                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                    >
                                        {i + 1}
                                    </Table.Cell>
                                    <Table.Cell className="">
                                        <Image
                                            width={60}
                                            alt="NextUI hero Image"
                                            src={product.img_url}
                                            className="rounded-md ml-8"
                                        />
                                    </Table.Cell>
                                    <Table.Cell className="text-md font-semibold text-gray-900">
                                        {product.category}
                                    </Table.Cell>
                                    <Table.Cell className="text-md font-semibold text-gray-900">
                                        {`${product.price} so'm`}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {product.quantity}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            onClick={() => openEditProductHandler(product.id)}
                                            className="bg-white outline-none -ml-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell className="text-center">
                                        <Button
                                            onClick={() => openDeleteHandler(product.id)}
                                            className="bg-white outline-none text-red-600 hover:text-red-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
}