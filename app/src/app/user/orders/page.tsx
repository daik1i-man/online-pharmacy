'use client'

import { useCancelOrderModalContext } from '@/contexts/actionsContext/actionContexts';
import { getOrders } from '@/app/functions/functions';
import { useQuery } from '@tanstack/react-query';
import { Button, Chip } from '@nextui-org/react';
import Link from 'next/link'

export default function Page() {
    const { setOpen, setOrderId } = useCancelOrderModalContext()

    const { data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: () => getOrders()
    })

    const onClick = (id: string) => {
        setOrderId(id)
        setOpen(true)
    }

    return (
        <>
            <div className='my-4'>
                <div className="py-3.5 px-5 border">
                    <h1 className='text-[14px]'>My orders</h1>
                </div>
                {orders?.length > 0 ? (
                    orders?.map((order: any) => (
                        <div key={order?.id} className='flex flex-col py-4 mx-4 space-y-2 border-b'>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-[14px]'>{order?.last_name} {order?.first_name}</h1>
                                <Chip className="capitalize text-[10px]" color='warning' size="sm" variant="flat">
                                    {order?.status}
                                </Chip>
                            </div>
                            <div className='flex items-center gap-x-8'>
                                <p className='text-[10px]'>Phone number:</p>
                                <p className='text-[10px]'>+998 {order?.phonenumber}</p>
                            </div>
                            <div className='flex items-center gap-x-8'>
                                <p className='text-[10px]'>Ordered time:</p>
                                <p className='text-[10px]'>{order?.ordered_time}</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-x-8'>
                                    <p className='text-[10px]'>Total price:</p>
                                    <p className='text-[10px]'>{order?.total_price} UZS</p>
                                </div>
                                <div onClick={() => onClick(order?.id)}>
                                    <span className='text-[11px] text-blue-600 cursor-pointer'>Cancel order</span>
                                </div>
                            </div>
                        </div>)
                    )) : (
                    <div className='justify-center py-10 mx-auto text-center'>
                        <img className='w-64 mx-auto my-2' src="https://i.pinimg.com/564x/ae/bc/8c/aebc8c60e30c83f3ab34c978733dab26.jpg" alt="" />
                        <h1 className='my-2 text-base font-semibold'>It's empty here</h1>
                        <p className='text-xs'>You have no active orders!</p>
                        <p className='text-xs'>Use the search to find everything you need.</p>
                        <Link href='/'>
                            <Button className='my-8 bg-gray-200 rounded-md text-[12px]'>Start shopping</Button>
                        </Link>
                    </div >
                )
                }
            </div >
        </>
    );
}




