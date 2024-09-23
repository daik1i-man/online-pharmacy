'use client'

import { useCancelOrderModalContext } from '@/contexts/actionsContext/actionContexts'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SuccessfullyOrder() {
    const router = useRouter()
    const { openSuccessfullyOrderModal, setOpenSuccessfullyOrderModal } = useCancelOrderModalContext()

    const onClose = () => {
        router.push('/user/orders')
        setOpenSuccessfullyOrderModal(false)
    }

    return (
        <Dialog open={openSuccessfullyOrderModal} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 w-screen z-50">
                <div className="flex min-h-full items-end justify-center text-center">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-t-md bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className='w-8 h-8 bg-gray-200 p-1.5 rounded-full absolute right-2 top-2' onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[22px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div className="text-center p-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-28 mx-auto text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                            <div className='my-2'>
                                <h1>You have successfully placed your order</h1>
                                <span className='text-xs'>Go to my orders to see your order status</span>
                            </div>
                            <Link href='/user/orders'>
                                <Button className='bg-gray-200 mt-4 mb-2'>
                                    Go to my orders
                                </Button>
                            </Link>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
