'use client'

import { useEditEmployeeContext } from '@/context/employeeActionsContext/editEmployee/editEmployee';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editEmployee } from '@/requestFunctions/edit.employee';
import { Button, Select, SelectItem } from '@nextui-org/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { AsYouType } from 'libphonenumber-js'
import { admins } from '../addEmployee/types'
import { editEmployeeProps } from '@/types/types';

export default function EditEmployeeModal() {
    const queryClient = useQueryClient()
    const { openEditEmployeeModal, setOpenEditEmployeeModal, editCurrentEmployee } = useEditEmployeeContext()
    const [change, setChange] = useState(false)
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        name: editCurrentEmployee?.name,
        phoneNumber: editCurrentEmployee?.phone_number,
        role: editCurrentEmployee?.role,
        salary: editCurrentEmployee?.salary
    })

    useEffect(() => {
        setData(prevData => ({
            ...prevData,
            name: editCurrentEmployee?.name,
            phoneNumber: editCurrentEmployee?.phone_number,
            role: editCurrentEmployee?.role,
            salary: editCurrentEmployee?.salary
        }))
    }, [editCurrentEmployee])

    useEffect(() => {
        const isChanges = data.name !==
            editCurrentEmployee?.name ||
            data.phoneNumber !== editCurrentEmployee?.phone_number ||
            data.role !== editCurrentEmployee?.role ||
            data.salary !== editCurrentEmployee?.salary

        setChange(isChanges)
    }, [data, editCurrentEmployee])


    const formatPhoneNumber = (value: string) => {
        const asYouType = new AsYouType('UZ')
        return asYouType.input(value)
    }

    const numberWithCommas = (value: string): string => {
        return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === 'phoneNumber') {
            const formattedNumber = formatPhoneNumber(value)
            setData({ ...data, phoneNumber: formattedNumber })
        } else if (name === 'salary') {
            const formattedNumber = numberWithCommas(value)
            setData({ ...data, salary: formattedNumber })
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }))
        }
    }

    const onSubmitMutation = useMutation({
        mutationKey: ['editEmployee'],
        mutationFn: (datas: editEmployeeProps) => editEmployee(datas),
        onSuccess: () => {
            setLoading(false)
            queryClient.invalidateQueries({ queryKey: ['employees'] })
            setOpenEditEmployeeModal(false)
        }
    })

    const closeHandler = () => {
        setOpenEditEmployeeModal(false)
        setData(prevData => ({
            ...prevData,
            name: editCurrentEmployee?.name,
            phoneNumber: editCurrentEmployee?.phone_number,
            role: editCurrentEmployee?.role,
            salary: editCurrentEmployee?.salary
        }))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        const datas: editEmployeeProps = {
            id: editCurrentEmployee?.id,
            name: data.name,
            role: data.role,
            salary: data.salary,
            phone_number: data.phoneNumber
        }

        onSubmitMutation.mutate(datas)
    }

    return (
        <Dialog className="relative z-50" open={openEditEmployeeModal} onClose={closeHandler}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                            <div className="mt-3 sm:mt-0 py-6">
                                <DialogTitle as="h1" className="text-2xl font-semibold leading-6 text-gray-900">
                                    Edit Employee
                                </DialogTitle>
                            </div>
                        </div>
                        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-lg">
                            <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Full name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder='Full name'
                                            autoComplete="name"
                                            value={data.name}
                                            onChange={onChange}
                                            required
                                            className="w-full rounded-md border-0 py-2.5 focus:ring-1 focus:ring-gray-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>
                                <div className='my-2'>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone number
                                    </label>
                                    <div className="mt-2 relative items-center flex w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400">
                                        <label htmlFor="phoneNumber" className=" border-r pr-4 pl-2">+998 </label>
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="text"
                                            placeholder="00 000 00 00"
                                            value={data.phoneNumber}
                                            onChange={onChange}
                                            required
                                            className="w-full border-0 py-2 px-3 focus:outline-none focus:ring-0 text-gray-900 shadow-sm  placeholder:text-gray-400"
                                            maxLength={12}
                                        />
                                    </div>
                                </div>
                                <div className='flex max-w-xl items-center mx-auto justify-between'>
                                    <div>
                                        <label htmlFor="select" className="block mb-3 text-sm font-medium leading-6 text-gray-900">
                                            Role
                                        </label>
                                        <Select
                                            name='role'
                                            label="Role"
                                            className="w-[230px]"
                                            onChange={onChange}
                                            placeholder={data.role}
                                        >
                                            {admins.map((admin) => (
                                                <SelectItem key={admin.name} value={admin.name}>
                                                    {admin.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div>
                                        <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                            Salary
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex items-center ring-1 ring-gray-200 border-0 rounded-md p-1 px-2 pr-4 border-gray-900">
                                                <input
                                                    id="salary"
                                                    name="salary"
                                                    type="text"
                                                    placeholder='10 000 000'
                                                    autoComplete="salary"
                                                    value={data.salary}
                                                    onChange={onChange}
                                                    required
                                                    className="block py-2.5 border-0 focus:ring-0 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                />
                                                <span>UZS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3 sm:flex sm:flex-row-reverse sm:px-1">
                                    <Button
                                        disabled={!change}
                                        isLoading={loading}
                                        type="submit"
                                        className="inline-flex w-full justify-center disabled:opacity-50 disabled:hover:bg-gray-500 disabled:hover:cursor-pointer rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                                    >
                                        {loading ? 'Saving...' : 'Save changes'}
                                    </Button>
                                    <Button
                                        onClick={closeHandler}
                                        type="button"
                                        className="mt-3 inline-flex w-full border-gray-300 justify-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
