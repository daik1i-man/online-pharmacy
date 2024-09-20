'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { useTakeOrderContext } from "@/context/orderActionsContext/takeOrderContext";
import { getOrders } from "@/requestFunctions/get.orders";
import { Button, Chip } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function OrdersPage() {
    const [page, setPage] = React.useState(1);
    const { setOpenTakeOrderModal, setTakeCurrentOrder } = useTakeOrderContext()

    const { data: orders } = useQuery({ queryKey: ['userOrders'], queryFn: getOrders })

    const onClick = (id: string) => {
        setOpenTakeOrderModal(true)
        setTakeCurrentOrder(id)
    }

    const rowsPerPage = 10;

    const pages = Math.ceil(orders?.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return orders?.slice(start, end);
    }, [page, orders]);

    return (
        <div className="px-6 h-screen overflow-y-scroll">
            <div className="">
                <div className="sm:max-w-6xl xl:max-w-screen-2xl mx-auto mt-24 mb-4">
                    <h1 className="text-2xl font-regular">Orders</h1>
                </div>
                <Table
                    shadow="none"
                    border={1}
                    className="sm:max-w-6xl xl:max-w-screen-2xl mx-auto border rounded-lg mb-8"
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
                        <TableColumn>First name</TableColumn>
                        <TableColumn>Last name</TableColumn>
                        <TableColumn>Phone number</TableColumn>
                        <TableColumn>Total price</TableColumn>
                        <TableColumn>Ordered time</TableColumn>
                        <TableColumn className="px-10">Status</TableColumn>
                        <TableColumn className="text-center">Action</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                        {items?.map((order: any, i: number) => (
                            <TableRow key={order.id} className="border-b">
                                <TableCell
                                    className="font-medium text-gray-900 dark:text-white w-20 text-center"
                                >
                                    {i + 1}
                                </TableCell>
                                <TableCell className="text-sm font-semibold text-gray-900">
                                    {order?.last_name}
                                </TableCell>
                                <TableCell className="text-sm font-semibold text-gray-900">
                                    {order?.first_name}
                                </TableCell>
                                <TableCell className="text-sm font-semibold text-gray-900">
                                    {order?.phonenumber}
                                </TableCell>
                                <TableCell className="text-sm font-semibold text-gray-900">
                                    {`${order?.total_price} UZS`}
                                </TableCell>
                                <TableCell className="text-sm font-semibold text-gray-900">
                                    {order.ordered_time}
                                </TableCell>
                                <TableCell className="text-sm font-semibold text-gray-900">
                                    <Chip className="capitalize" color='warning' size="sm" variant="flat">
                                        {order.status}
                                    </Chip>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        onClick={() => onClick(order?.id)}
                                        className="bg-gray-800 text-white">
                                        Take the order
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