'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { useDeleteCategoryContext } from "@/context/categoryActionsContext/deleteCategory/deleteCategory";
import { useAddCategoryModalContext } from "@/context/categoryActionsContext/addCategory/addCategory";
import { useEditCategoryContext } from "@/context/categoryActionsContext/editCategory/editCategory";
import { getCategoryById } from "@/requestFunctions/get.category.by.id";
import { getCategories } from "@/requestFunctions/get.categories";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button, Image } from "@nextui-org/react";
import React from "react";

export default function CategoriesPage() {
    const [page, setPage] = React.useState(1);
    const { setOpenAddCategoryModal } = useAddCategoryModalContext()
    const { setOpenEditCategoryModal, setEditCurrentCategory } = useEditCategoryContext();
    const { setOpenDeleteCategoryModal, setDeletecurrentCategory } = useDeleteCategoryContext()

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })

    const rowsPerPage = 6;

    const pages = categories ? Math.ceil(categories?.length / rowsPerPage) : 1;

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return categories?.slice(start, end);
    }, [page, categories])

    const getCategoryMutation = useMutation({
        mutationKey: ['currentCategory'],
        mutationFn: (id: string) => getCategoryById(id),
        onSuccess: (res) => {
            setEditCurrentCategory(res)
        }
    })

    const openDeleteModal = (currentCategoryId: string, img_url: string) => {
        setDeletecurrentCategory({ id: currentCategoryId, img_url });
        setOpenDeleteCategoryModal(true);
    };

    const openEditModal = (currentCategoryId: string) => {
        setOpenEditCategoryModal(true)
        getCategoryMutation.mutate(currentCategoryId)
    }

    return (
        <div className="w-full h-screen px-8">
            <div className="xl:mt-28">
                <div className="max-w-7xl my-8 mx-auto">
                    <h1 className="text-2xl font-regular">Categories</h1>
                </div>
                <Table
                    isHeaderSticky
                    className="max-w-7xl mx-auto"
                    aria-label="Example static collection table"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="default"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }>
                    <TableHeader>
                        <TableColumn className="text-center">#</TableColumn>
                        <TableColumn className="text-center">Name</TableColumn>
                        <TableColumn className="text-center">Photo</TableColumn>
                        <TableColumn className="text-center">Created Date</TableColumn>
                        <TableColumn className="text-center">Action</TableColumn>
                        <TableColumn className="text-center">
                            <Button
                                className="my-2 bg-foreground text-gray-50 rounded-md"
                                onClick={() => setOpenAddCategoryModal(true)}
                            >
                                Add New +
                            </Button>
                        </TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."} items={items}>
                        {items?.map((category: any, i: number) => (
                            <TableRow key={category?.id} className="border-b">
                                <TableCell
                                    className="font-medium text-gray-900 dark:text-white w-20 text-center"
                                >
                                    {i + 1}
                                </TableCell>
                                <TableCell className="text-lg font-semibold text-gray-900">
                                    {category?.name && category?.name}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Image
                                        width={60}
                                        alt="NextUI hero Image"
                                        src={category?.img_url}
                                        className="rounded-md"
                                    />
                                </TableCell>
                                <TableCell className="text-md font-semibold text-gray-900">
                                    {category?.created_date}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => openEditModal(category?.id)}
                                        className="bg-white outline-none -ml-2 my-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </Button>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        onClick={() => openDeleteModal(category?.id, category?.img_url)}
                                        className="bg-white outline-none text-red-600 hover:text-red-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}