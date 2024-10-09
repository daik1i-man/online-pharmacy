'use client'

import { Button, Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { useAddEmployeeContext } from '@/context/employeeActionsContext/addEmployee/addEmployee'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addEmployee } from '@/requestFunctions/add.employee'
import { addEmployeeProps } from '@/types/types'
import { AsYouType } from 'libphonenumber-js'
import { ChangeEvent, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import { admins } from './types'

export default function AddEmployeeModal() {
    const { toast } = useToast()
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
            toast({
                title: t('messages.successMessage')
            })
        },
        onError: () => {
            setData(prevData => ({
                ...prevData,
                name: '',
                phoneNumber: '',
                salary: '',
                role: ''
            }))
            setLoading(false)
            setOpenAddEmployeeModal(false)
            toast({
                title: t('messages.errorMessage')
            })
        }
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)
        onSubmitMutation.mutate(data)
    }

    return (
        <Modal backdrop='blur' size='xl' scrollBehavior='inside' isOpen={openAddEmployeeModal} onOpenChange={setOpenAddEmployeeModal}>
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
                                            className="w-full bg-transparent rounded-md border-0 py-2.5 focus:ring-1 shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-gray-600"
                                        />
                                    </div>
                                </div>
                                <div className='my-2'>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6">
                                        {t('phoneNumber')}
                                    </label>
                                    <div className="relative flex items-center w-full p-1 mt-2 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-700">
                                        <label htmlFor="phoneNumber" className="pl-2 pr-4 font-semibold border-r">+998 </label>
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="text"
                                            placeholder="00 000 00 00"
                                            value={data.phoneNumber}
                                            onChange={onChange}
                                            required
                                            className="w-full px-3 py-2 bg-transparent border-0 focus:outline-none focus:ring-0"
                                            maxLength={12}
                                        />
                                    </div>
                                </div>
                                <div className='flex items-center justify-between max-w-xl mx-auto'>
                                    <div>
                                        <label htmlFor="select" className="block mb-3 text-sm font-medium leading-6">
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
                                color="default"
                                className="rounded-md"
                            >
                                {t('cancelButton')}
                            </Button>
                            <Button
                                form='form'
                                isLoading={loading}
                                type="submit"
                                color="primary"
                                className="rounded-md"
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


