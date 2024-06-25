'use client'

import { useContext, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { deleteProductContext } from '@/context/productActionsContext/deleteProduct/deleteProduct';
import { Button } from '@nextui-org/react'
import axios from 'axios';

export default function DeleteProductModal() {
    const context = useContext(deleteProductContext)
    const [loading, setLoading] = useState(false)

    if (!context) {
        throw new Error('SomeComponent must be used DeleteProduct')
    }

    const { openDeleteProductModal, setOpenDeleteProductModal, deleteCurrentProduct } = context

    const deleteProductHandler = async () => {
        setLoading(true)

        try {
            await axios.post('http://localhost:5000/admin-controll/products/delete', {
                id: deleteCurrentProduct
            })
                .then(() => setOpenDeleteProductModal(false))
        } catch (error) {
            console.log(error);
        }

        setLoading(false)
    }

    return (
        <Dialog className="relative z-50" open={openDeleteProductModal} onClose={setOpenDeleteProductModal}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
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
                                        Delete Product ?
                                    </DialogTitle>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <Button
                                onClick={deleteProductHandler}
                                isLoading={loading}
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                            >
                                {`${loading ? 'Deleting...' : 'Delete product'}`}
                            </Button>
                            <Button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => setOpenDeleteProductModal(false)}
                                data-autofocus
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
