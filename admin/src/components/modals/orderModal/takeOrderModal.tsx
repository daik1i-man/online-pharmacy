'use client'

import { useTakeOrderContext } from '@/context/orderActionsContext/takeOrderContext';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { takeTheOrder } from '@/requestFunctions/take.order';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

export default function TakeOrderModal() {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    const t = useTranslations('Pages.Orders.Modals.delete');

    const { openTakeOrderModal, setOpenTakeOrderModal, takeCurrentOrder } = useTakeOrderContext()

    const takeOrderMutation = useMutation({
        mutationKey: ['orders'],
        mutationFn: (id: string) => takeTheOrder(id),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['orders'] })
            setOpenTakeOrderModal(false)
            setLoading(false)
        }
    })

    const onClick = async () => {
        setLoading(true)
        if (takeCurrentOrder) {
            takeOrderMutation.mutate(takeCurrentOrder)
        }
    }

    return (
        <Dialog className="relative z-50" open={openTakeOrderModal} onClose={setOpenTakeOrderModal}>
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
                            <div className="sm:flex sm:items-center">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        {t('title')}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {t('description')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <Button
                                onClick={onClick}
                                isLoading={loading}
                                className="inline-flex w-full rounded-md justify-center bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                            >
                                {loading ? t('loadingButton') : t('addButton')}
                            </Button>
                            <Button
                                onClick={() => setOpenTakeOrderModal(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                {t('cancelButton')}
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
