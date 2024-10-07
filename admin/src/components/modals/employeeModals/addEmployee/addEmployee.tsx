'use client'

import { useAddEmployeeContext } from '@/context/employeeActionsContext/addEmployee/addEmployee'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { addEmployee } from '@/requestFunctions/add.employee'
import { addEmployeeProps } from '@/types/types'
import { AsYouType } from 'libphonenumber-js'
import { ChangeEvent, useState } from 'react'
import { useTranslations } from 'next-intl'
import { admins } from './types'

export default function AddEmployeeModal() {
    const queryClient = useQueryClient()
    const { openAddEmployeeModal, setOpenAddEmployeeModal } = useAddEmployeeContext()
    const t = useTranslations('Pages.Emloyees.Modals.add');
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: '',
        phoneNumber: '',
        role: '',
        salary: ''
    })

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

    const closeHandler = () => {
        setData(prevData => ({
            ...prevData,
            name: '',
            phoneNumber: '',
            salary: '',
            role: ''
        }))
        setOpenAddEmployeeModal(false)
    }

    const onSubmitMutation = useMutation({
        mutationKey: ['employee'],
        mutationFn: (datas: addEmployeeProps) => addEmployee(datas),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] })
            setData(prevData => ({
                ...prevData,
                name: '',
                phoneNumber: '',
                salary: '',
                role: ''
            }))
            setLoading(false)
            setOpenAddEmployeeModal(false)
        }
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)
        onSubmitMutation.mutate(data)
    }

    return (
        <Dialog className="relative z-50" open={openAddEmployeeModal} onClose={closeHandler}>
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
                                <DialogTitle as="h1" className="text-xl font-semibold leading-6 text-gray-900">
                                    {t('title')}
                                </DialogTitle>
                            </div>
                        </div>
                        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-lg">
                            <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t('fullName')}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder='F.I.SH'
                                            autoComplete="name"
                                            value={data.name}
                                            onChange={onChange}
                                            required
                                            className="w-full rounded-md border-0 py-2.5 focus:ring-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-gray-300 placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>
                                <div className='my-2'>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t('phoneNumber')}
                                    </label>
                                    <div className="mt-2 relative items-center flex w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400">
                                        <label htmlFor="phoneNumber" className="font-semibold border-r pr-4 pl-2">+998 </label>
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
                                            {t('role')}
                                        </label>
                                        <Select
                                            isRequired
                                            name='role'
                                            label="Rolni tanlang"
                                            className="w-[230px]"
                                            onChange={onChange}
                                            value={data.role}
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
                                            {t('salary')}
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
                                        isLoading={loading}
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                                    >
                                        {loading ? t('loadingButton') : t('addButton')}
                                    </Button>
                                    <Button
                                        onClick={closeHandler}
                                        type="button"
                                        className="mt-3 inline-flex w-full border-gray-300 justify-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                    >
                                        {t('cancelButton')}
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
