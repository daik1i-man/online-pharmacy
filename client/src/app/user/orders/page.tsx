'use client'

import { useCancelOrderModalContext } from '@/contexts/actionsContext/actionContexts';
import { getOrders } from '@/app/functions/functions';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@nextui-org/react';
import Link from 'next/link'

export default function Page() {
    const { setOpen, setOrderId } = useCancelOrderModalContext()
    const { data: orders, isLoading: ordersLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: () => getOrders()
    })

    const onClick = (id: string) => {
        setOrderId(id)
        setOpen(true)
    }

    return (
        <>
            <div className="w-full h-full border rounded-md my-4">
                <div className="py-3.5 px-5 border-b ">
                    <h1 className='text-base'>My orders</h1>
                </div>
                {orders?.length === 0 || ordersLoading ? (
                    <div className='justify-center py-10 mx-auto text-center'>
                        <img className='mx-auto w-72 my-2' src="https://i.pinimg.com/564x/ae/bc/8c/aebc8c60e30c83f3ab34c978733dab26.jpg" alt="" />
                        <h1 className='text-base font-semibold my-2'>It's empty here</h1>
                        <p className='text-xs'>You have no active orders!</p>
                        <p className='text-xs'>Use the search to find everything you need.</p>
                        <Link href='/'>
                            <Button className='my-8 rounded-md py-6 bg-gray-200'>Start shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div
                        className="relative flex flex-col my-8 border w-full h-full text-gray-700 bg-white overflow-hidden">
                        <table className="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            #
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Total price
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Ordered time
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Status
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Action
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order: any, index: number) => (
                                    <tr key={order?.id}>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {index + 1}
                                            </p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {`${order?.total_price} UZS`}
                                            </p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {order?.ordered_time}
                                            </p>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {order?.status}
                                            </p>
                                        </td>
                                        <td className="border-b border-blue-gray-50" onClick={() => onClick(order?.id)}>
                                            <p className="flex items-center gap-1 font-sans cursor-pointer text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                                Cancel the order
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </>
    );
}