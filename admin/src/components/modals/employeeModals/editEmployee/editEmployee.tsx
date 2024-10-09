'use client'

import { useEditEmployeeContext } from '@/context/employeeActionsContext/editEmployee/editEmployee';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editEmployee } from '@/requestFunctions/edit.employee';
import { Button, Select, SelectItem } from '@nextui-org/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { editEmployeeProps } from '@/types/types';
import { AsYouType } from 'libphonenumber-js'
import { admins } from '../addEmployee/types'
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl'

export default function EditEmployeeModal() {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const { openEditEmployeeModal, setOpenEditEmployeeModal, editCurrentEmployee } = useEditEmployeeContext()
    const [change, setChange] = useState(false)
    const [loading, setLoading] = useState(false)
    const t = useTranslations('Pages.Emloyees.Modals.edit');

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
            toast({
                title: t('messages.successMessage')
            })
        },
        onError: () => {
            setLoading(false)
            setOpenEditEmployeeModal(false)
            toast({
                title: t('messages.errorMessage')
            })
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
        <Modal size='xl' backdrop='blur' isOpen={openEditEmployeeModal} onOpenChange={setOpenEditEmployeeModal}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {t('title')}
                        </ModalHeader>
                        <ModalBody>
                            <form id='form' className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6">
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
                                            className="w-full rounded-md border-0 py-2.5 bg-transparent focus:ring-1 focus:ring-gray-600 ring-gray-700 shadow-sm ring-1 ring-inset"
                                        />
                                    </div>
                                </div>
                                <div className='my-2'>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                        {t('phoneNumber')}
                                    </label>
                                    <div className="relative flex items-center w-full p-1 mt-2 border-0 rounded-md shadow-sm ring-1 ring-gray-700 ring-inset">
                                        <label htmlFor="phoneNumber" className="pl-2 pr-4 border-r ">+998 </label>
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="text"
                                            placeholder="00 000 00 00"
                                            value={data.phoneNumber}
                                            onChange={onChange}
                                            required
                                            className="w-full px-3 py-2 bg-transparent border-0 shadow-sm focus:outline-none focus:ring-0"
                                            maxLength={12}
                                        />
                                    </div>
                                </div>
                                <div className='flex items-center justify-between w-full mx-auto'>
                                    <div>
                                        <label htmlFor="select" className="block mb-3 text-sm font-medium leading-6">
                                            {t('role')}
                                        </label>
                                        <Select
                                            name='role'
                                            label="Rolni tanlang"
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
                                        <label htmlFor="number" className="block text-sm font-medium leading-6">
                                            {t('salary')}
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex items-center p-1 px-2 pr-4 border-0 rounded-md ring-1 ring-gray-700">
                                                <input
                                                    id="salary"
                                                    name="salary"
                                                    type="text"
                                                    placeholder='10 000 000'
                                                    autoComplete="salary"
                                                    value={data.salary}
                                                    onChange={onChange}
                                                    required
                                                    className="block py-2.5 border-0 focus:ring-0 bg-transparent"
                                                />
                                                <span>UZS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onClick={closeHandler}
                                type="button"
                                className="rounded-md"
                                color='default'
                            >
                                {t('cancelButton')}
                            </Button>
                            <Button
                                disabled={!change}
                                form='form'
                                isLoading={loading}
                                color='primary'
                                type="submit"
                                className="rounded-md disabled:opacity-50 disabled:hover:opacity-50"
                            >
                                {loading ? t('loadingButton') : t('addButton')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

