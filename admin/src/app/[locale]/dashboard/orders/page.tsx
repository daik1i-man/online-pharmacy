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

    const { data: orders } = useQuery({ queryKey: ['orders'], queryFn: getOrders })

    const onClick = (id: string) => {
        setOpenTakeOrderModal(true)
        setTakeCurrentOrder(id)
    }

    const rowsPerPage = 10;

    const pages = orders ? Math.ceil(orders?.length / rowsPerPage) : 1;

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return orders?.slice(start, end);
    }, [page, orders]);

    return (
        <div className="px-6 h-screen overflow-y-scroll">
            <div className="">
                <div className="sm:max-w-6xl xl:max-w-screen-2xl mx-auto mt-24 mb-4">
                    <h1 className="text-2xl font-regular">{t('title')}</h1>
                </div>
                <Table
                    shadow="none"
                    border={1}
                    className="sm:max-w-6xl xl:max-w-screen-2xl mx-auto border rounded-lg mb-8"
                    aria-label="Example static collection table"
                    bottomContent={
                        <div className="flex w-full justify-center">
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
                                    className="font-medium w-20 text-center"
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
        </div>
    );
}