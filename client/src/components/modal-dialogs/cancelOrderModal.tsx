'use client'

import { useCancelOrderModalContext } from '@/contexts/actionsContext/actionContexts'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { cancelOrder } from '@/app/functions/functions'
import { Button } from '@nextui-org/react'
import { useToast } from '../ui/use-toast'

export default function CancelOrderModal() {
    const { open, setOpen, orderId } = useCancelOrderModalContext()
    const queryClient = useQueryClient()
    const { toast } = useToast()

    const mutation = useMutation({
        mutationKey: ['orders'],
        mutationFn: (id: string) => cancelOrder(id),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['orders'] })
            toast({
                title: "Your order has been successfully canceled",
                description: `${new Date().toLocaleString()}`,
            })
            setOpen(false)
        },
        onError: (error) => {
            toast({
                title: "Something went wrong!",
                description: `${error.message}`,
            })
        }
    })

    const onClick = async () => {
        if (orderId) {
            mutation.mutate(orderId)
        }
    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-sm font-semibold leading-6 text-gray-900">
                                        Cancel the order
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500">
                                            Are you sure to cancel the order, once the order is cancelled, you cannot return it
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <Button
                                type="button"
                                onClick={onClick}
                                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Cancel the order
                            </Button>
                            <Button
                                type="button"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="w-full rounded-md sm:w-auto bg-gray-200 px-12"
                            >
                                Cancel
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
