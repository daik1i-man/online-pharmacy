'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { useTakeOrderContext } from "@/context/orderActionsContext/takeOrderContext";
import { getOrders } from "@/requestFunctions/get.orders";
import { Button, Chip } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from 'next-intl'
import React from "react";

export default function OrdersPage() {
    const [page, setPage] = React.useState(1);
    const t = useTranslations('Pages.Orders');
    const { setOpenTakeOrderModal, setTakeCurrentOrder } = useTakeOrderContext()
    const [search, setSearch] = React.useState('')

    const { data: orders } = useQuery({ queryKey: ['orders'], queryFn: getOrders })

    const onClick = (id: string) => {
        setOpenTakeOrderModal(true)
        setTakeCurrentOrder(id)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

    const filteredOrders = orders?.filter((el: any) => el.first_name.toLowerCase().includes(search.toLocaleLowerCase()) || el.last_name.toLowerCase().includes(search.toLocaleLowerCase()))

    const rowsPerPage = 10;

    const pages = filteredOrders ? Math.ceil(filteredOrders?.length / rowsPerPage) : 1;

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredOrders?.slice(start, end);
    }, [page, filteredOrders]);

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
                        type="search"
                        value={search}
                        onChange={onChange}
                        placeholder={t('search.placeholder')}
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
                    <TableColumn>{t('table.firstName')}</TableColumn>
                    <TableColumn>{t('table.lastName')}</TableColumn>
                    <TableColumn>{t('table.phoneNumber')}</TableColumn>
                    <TableColumn>{t('table.totalPrice')}</TableColumn>
                    <TableColumn>{t('table.orderedDate')}</TableColumn>
                    <TableColumn className="px-10">{t('table.status')}</TableColumn>
                    <TableColumn className="text-center"> </TableColumn>
                </TableHeader>
                <TableBody emptyContent={t('table.emptyContent')}>
                    {items?.map((order: any, i: number) => (
                        <TableRow key={order.id} className="border-b">
                            <TableCell
                                className="w-20 font-medium text-center"
                            >
                                {i + 1}
                            </TableCell>
                            <TableCell className="text-sm font-semibold">
                                {order?.last_name}
                            </TableCell>
                            <TableCell className="text-sm font-semibold">
                                {order?.first_name}
                            </TableCell>
                            <TableCell className="text-sm font-semibold">
                                {order?.phonenumber}
                            </TableCell>
                            <TableCell className="text-sm font-semibold">
                                {`${order?.total_price} UZS`}
                            </TableCell>
                            <TableCell className="text-sm font-semibold">
                                {order.ordered_time}
                            </TableCell>
                            <TableCell className="text-sm font-semibold">
                                <Chip className="capitalize" color='warning' size="sm" variant="flat">
                                    {order.status}
                                </Chip>
                            </TableCell>
                            <TableCell className="text-center">
                                <Button
                                    onClick={() => onClick(order?.id)}>
                                    {t('table.cancelAction')}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}