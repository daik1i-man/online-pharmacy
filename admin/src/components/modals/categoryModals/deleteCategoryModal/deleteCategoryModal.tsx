'use client'

import { useDeleteCategoryContext } from '@/context/categoryActionsContext/deleteCategory/deleteCategory'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { deleteCategory } from '@/requestFunctions/delete.category'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

export default function DeleteCategoryModal() {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)

    const { openDeleteCategoryModal, setOpenDeleteCategoryModal, deletecurrentCategory } = useDeleteCategoryContext();

    async function DeleteCategoryHandler() {
        setLoading(true)
        try {
            if (deletecurrentCategory) {
                const response = await deleteCategory(deletecurrentCategory?.id)

                if (response.status === 200) {
                    queryClient.invalidateQueries({ queryKey: ['categories'] })
                    setOpenDeleteCategoryModal(false)
                    setLoading(false)
                } else {
                    console.log(response.data)
                    setLoading(false)
                }
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    return (
        <Transition show={openDeleteCategoryModal}>
            <Dialog className="relative z-50" onClose={setOpenDeleteCategoryModal}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Delete category
                                            </DialogTitle>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to delete category? All of your data will be permanently
                                                    removed. This action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {loading ? (
                                        <Button
                                            isLoading
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                                        >
                                            Deleting...
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                                            onClick={DeleteCategoryHandler}
                                        >
                                            Delete category
                                        </Button>
                                    )}

                                    <Button
                                        onClick={() => setOpenDeleteCategoryModal(false)}
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
