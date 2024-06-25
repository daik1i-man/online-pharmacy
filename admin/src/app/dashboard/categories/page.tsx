'use client'

import { useContext, useEffect, useState } from "react";
import { Table, Spinner } from "flowbite-react";
import { Button, Image } from "@nextui-org/react";
import { AddCategoryModalContext } from "@/context/categoryActionsContext/addCategory/addCategory";
import { EditCategoryContext } from "@/context/categoryActionsContext/editCategory/editCategory";
import { DeleteCategoryContext } from "@/context/categoryActionsContext/deleteCategory/deleteCategory";
import axios from "axios";

interface dataProps {
    id: string,
    name: string,
    img_url: string,
    created_date: string
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<dataProps[]>([])
    const [loading, setLoading] = useState(false)
    const addCategoryTempContext = useContext(AddCategoryModalContext)
    const editCategoryTempContext = useContext(EditCategoryContext)
    const deleteCategoryTempContext = useContext(DeleteCategoryContext)

    if (!addCategoryTempContext || !editCategoryTempContext || !deleteCategoryTempContext) {
        throw new Error('SomeComponent must be used within an useContext')
    }

    const { setOpenAddCategoryModal } = addCategoryTempContext
    const { setOpenEditCategoryModal, setEditCurrentCategory } = editCategoryTempContext;
    const { setOpenDeleteCategoryModal, setDeletecurrentCategory } = deleteCategoryTempContext

    async function fetchDatas() {
        try {
            const response = await axios.get('http://localhost:5000/admin-controll/categories/get-all')
            setCategories(response.data.categories)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDatas()

        const id = setInterval(fetchDatas, 1000)

        return () => {
            if (id) {
                clearInterval(id)
            }
        }
    }, [])

    const openDeleteModal = (currentCategoryId: string, img_url: string) => {
        setDeletecurrentCategory({ id: currentCategoryId, img_url });
        setOpenDeleteCategoryModal(true);
    };

    const openEditModal = (currentCategoryId: string) => {
        setOpenEditCategoryModal(true)
        setEditCurrentCategory(currentCategoryId)
    }

    return (
        <div className="w-full h-full m-0 p-0 justify-center">
            <div className="max-w-4xl my-8 mx-auto">
                <h1 className="text-2xl font-regular">Categories</h1>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="overflow-x-auto border w-[1180px] mx-auto" >
                    <Table>
                        <Table.Head>
                            <Table.HeadCell className="w-4 h-4">#</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Photo</Table.HeadCell>
                            <Table.HeadCell>Created Date</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                            <Table.HeadCell className="w-12 h-4">
                                <Button
                                    className="bg-gray-900 text-gray-50 rounded-md py-3"
                                    onClick={() => setOpenAddCategoryModal(true)}
                                >
                                    + Add category
                                </Button>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {categories && categories.map((category, i) => (
                                <Table.Row key={category.id} className={`bg-white`}>
                                    <Table.Cell
                                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                    >
                                        {i + 1}
                                    </Table.Cell>
                                    <Table.Cell className="text-lg font-semibold text-gray-900">
                                        {category.name && category.name}
                                    </Table.Cell>
                                    <Table.Cell className="text-center">
                                        <Image
                                            width={60}
                                            alt="NextUI hero Image"
                                            src={category.img_url}
                                            className="rounded-md"
                                        />
                                    </Table.Cell>
                                    <Table.Cell className="text-md font-semibold text-gray-900">
                                        {category.created_date}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            onClick={() => openEditModal(category.id)}
                                            className="bg-white outline-none -ml-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell className="text-center">
                                        <Button
                                            onClick={() => openDeleteModal(category.id, category.img_url)}
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