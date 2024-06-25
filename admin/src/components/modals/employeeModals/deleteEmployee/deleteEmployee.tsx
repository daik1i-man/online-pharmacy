'use client'

import { useContext, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import { DeleteEmployeeContext } from '@/context/employeeActionsContext/deleteEmployee/deleteEmployee'
import axios from 'axios'

export default function DeleteEmployeeModal() {
    const context = useContext(DeleteEmployeeContext)
    const [loading, setLoading] = useState(false)

    if (!context) {
        throw new Error('SomeComponent must be used DeleteEmployee')
    }
    const { openDeleteEmployeeModal, setOpenDeleteEmployeeModal, deleteCurrentEmployee } = context

    const deleteHandler = async () => {
        setLoading(true)
        try {
            await axios.post('http://localhost:5000/admin-controll/employees/delete', {
                id: deleteCurrentEmployee
            })
                .then(() => {
                    setOpenDeleteEmployeeModal(false)
                })
                .catch((error) => console.log(error))
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    return (
        <Dialog className="relative z-50" open={openDeleteEmployeeModal} onClose={setOpenDeleteEmployeeModal}>
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
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Delete employee
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this employee? All of your data will be permanently removed.
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <Button
                                isLoading={loading}
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                                onClick={deleteHandler}
                            >
                                {loading ? 'Deleting...' : 'Delete employee'}
                            </Button>
                            <Button
                                type="button"
                                className="mt-3 inline-flex w-full border-gray-300 justify-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                onClick={() => setOpenDeleteEmployeeModal(false)}
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
