'use client'

import { Table, TableHeader, TableColumn, Image, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { useDeleteProductContext } from "@/context/productActionsContext/deleteProduct/deleteProduct";
import { useEditProductContext } from "@/context/productActionsContext/editProduct/editProduct";
import { getProducts } from "@/requestFunctions/get.products";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from 'next-intl'
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function ProductsPage() {
    const [page, setPage] = React.useState(1);
    const t = useTranslations('Pages.Products');
    const { setCurrentProductId } = useEditProductContext()
    const { setDeleteCurrentProduct, setOpenDeleteProductModal } = useDeleteProductContext()
    const [search, setSearch] = React.useState('')

    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

    const filteredProducts = products?.filter((el: any) => el.name.toLowerCase().includes(search.toLocaleLowerCase()))

    const rowsPerPage = 10

    const pages = filteredProducts ? Math.ceil(filteredProducts.length / rowsPerPage) : 1;

    const items = React.useMemo(() => {
        if (!filteredProducts || filteredProducts.length === 0) {
            return []
        }

        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredProducts.slice(start, end);
    }, [page, filteredProducts]);

    const onClick = (id: string) => {
        setOpenDeleteProductModal(true)
        setDeleteCurrentProduct(id)
    }

    return (
        <div className="px-6 h-screen overflow-y-scroll w-full max-w-screen-[1480px] justify-center">
            <div className="flex items-center justify-between mx-auto mt-24 mb-4">
                <div className="">
                    <h1 className="text-2xl font-regular">{t('title')}</h1>
                </div>
                <div className="relative mt-2 rounded-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </span>
                    </div>
                    <input
                        name="search"
                        type="search"
                        value={search}
                        placeholder={t('search.placeholder')}
                        onChange={onChange}
                        className="block w-80 bg-transparent rounded-md border-0 py-2.5 pl-12 ring-1 ring-inset ring-gray-700 focus:ring-1 focus:ring-gray-600"
                    />
                </div>
            </div>
            <Table
                shadow="none"
                className="mx-auto mb-8 border rounded-xl"
                aria-label="Example static collection table"
                bottomContent={
                    <div className="flex justify-center w-full">
                        <Pagination
                            showControls
                            color="default"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }>
                <TableHeader>
                    <TableColumn className="text-center">#</TableColumn>
                    <TableColumn className="w-64 px-10">{t('table.photo')}</TableColumn>
                    <TableColumn className="px-12 ">{t('table.name')}</TableColumn>
                    <TableColumn className="w-80 text-start">{t('table.category')}</TableColumn>
                    <TableColumn className="">{t('table.price')}</TableColumn>
                    <TableColumn className="">{t('table.quantity')}</TableColumn>
                    <TableColumn>
                        <Link href='products/add'>
                            <Button
                                className="my-2 rounded-md"
                            >
                                {t('table.addButton')}
                            </Button>
                        </Link>
                    </TableColumn>
                </TableHeader>
                <TableBody emptyContent={t('table.emptyContent')} items={items || []} className="h-screen overflow-y-scroll">
                    {items?.map((product: any, i: number) => (
                        <TableRow key={product.id} className="border-b">
                            <TableCell
                                className="w-20 font-medium text-center"
                            >
                                {i + 1}
                            </TableCell>
                            <TableCell className="px-8">
                                <Image
                                    width={55}
                                    alt="NextUI hero Image"
                                    src={product.img_url}
                                    className="border rounded-md shadow-sm"
                                />
                            </TableCell>
                            <TableCell className="text-base font-semibold">
                                {product?.name}
                            </TableCell>
                            <TableCell className="text-base font-semibold">
                                {product?.category}
                            </TableCell>
                            <TableCell className="text-base font-semibold text-start">
                                {product?.price} UZS
                            </TableCell>
                            <TableCell className="px-8 text-base font-semibold">
                                {product?.quantity}
                            </TableCell>
                            <TableCell className="w-28">
                                <div className="flex items-center gap-x-8">
                                    <Link href={`products/${product?.id}/edit`} onClick={() => setCurrentProductId(product?.id)}>
                                        <span className="text-lg cursor-pointer text-danger active:opacity-50">
                                            <svg
                                                aria-hidden="true"
                                                fill="none"
                                                focusable="false"
                                                height="1em"
                                                role="presentation"
                                                viewBox="0 0 20 20"
                                                width="1em"
                                            >
                                                <path
                                                    d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit={10}
                                                    strokeWidth={1.5}
                                                />
                                                <path
                                                    d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit={10}
                                                    strokeWidth={1.5}
                                                />
                                                <path
                                                    d="M2.5 18.3333H17.5"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit={10}
                                                    strokeWidth={1.5}
                                                />
                                            </svg>
                                        </span>
                                    </Link>
                                    <span onClick={() => onClick(product?.id)} className="text-lg cursor-pointer text-danger active:opacity-50">
                                        <svg
                                            aria-hidden="true"
                                            fill="none"
                                            focusable="false"
                                            height="1em"
                                            role="presentation"
                                            viewBox="0 0 20 20"
                                            width="1em"
                                        >
                                            <path
                                                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                            />
                                            <path
                                                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                            />
                                            <path
                                                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                            />
                                            <path
                                                d="M8.60834 13.75H11.3833"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                            />
                                            <path
                                                d="M7.91669 10.4167H12.0834"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}