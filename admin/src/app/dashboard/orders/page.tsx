'use client'

import { Table } from "flowbite-react";
import { Button, Image, Skeleton } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { takeOrderContext } from "@/context/orderActionsContext/takeOrderContext";

interface OrderProps {
    id: string,
    phonenumber: string,
    total_price: string,
    ordered_time: string,
}

export default function OrdersPage() {
    const context = useContext(takeOrderContext)
    const [orders, setOrders] = useState<OrderProps[]>([])

    if (!context) {
        throw new Error('SomeComponent must be used within an takeOrderContext')
    }

    const { setOpenTakeOrderModal, setTakeCurrentOrder } = context

    async function getOrders() {
        try {
            const response = await axios.get('http://localhost:5000/admin-controll/orders/get-all')
            setOrders(response.data.AllOrders)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrders()

        const id = setInterval(getOrders, 1000)

        return () => {
            if (id) {
                clearInterval(id)
            }
        }
    }, [orders])

    const openTakeOder = (currentOrderId: string) => {
        setOpenTakeOrderModal(true)
        setTakeCurrentOrder(currentOrderId)
    }

    return (
        <div className="w-full h-full m-0 p-0 justify-center">
            <div className="max-w-4xl mx-auto my-8">
                <h1 className="text-2xl font-regular">Orders</h1>
            </div>
            <div className="max-w-4xl mx-auto">
                {/* <Skeleton className="w-[1180px] h-5 rounded-lg" /> */}
                <div className="overflow-x-auto border w-[1180px] mx-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell className="w-4 h-4">#</Table.HeadCell>
                            <Table.HeadCell>Phone Number</Table.HeadCell>
                            <Table.HeadCell>Total Price</Table.HeadCell>
                            <Table.HeadCell>Ordered Time</Table.HeadCell>
                            <Table.HeadCell className="w-4">Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {orders && orders.map((order, i) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell
                                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                    >
                                        {i + 1}
                                    </Table.Cell>
                                    <Table.Cell className="text-md font-semibold text-gray-900">
                                        {order.phonenumber}
                                    </Table.Cell>
                                    <Table.Cell className="text-md font-semibold text-gray-900">
                                        {`${order.total_price} so'm`}
                                    </Table.Cell>
                                    <Table.Cell className="text-md font-semibold text-gray-900">
                                        {order.ordered_time}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            onClick={() => openTakeOder(order.id)}
                                            className="bg-gray-900 text-gray-50 outline-none -ml-4 rounded-md"
                                        >
                                            Take the order
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