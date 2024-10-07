'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useActionsContext } from '@/context/actionsContext/actionsContext'
import { useRouter, usePathname } from 'next/navigation'
import { axiosInstance } from '@/configs/axios.config'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { Button } from '@nextui-org/react'
import { useCookies } from 'react-cookie'
import { useState } from 'react'


export default function LogoutModal() {
    const [cookie, setCookie, removeCookie] = useCookies(['admin'])
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const t = useTranslations('LogoutModal');
    const pahtname = usePathname()

    const locale = pahtname.split('/')[1]

    const { openLogoutModal, setOpenLogoutModal } = useActionsContext()

    const onClickMutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => await axiosInstance.get('/auth/admin/logout'),
        onSuccess: () => {
            setLoading(false)
            router.push(`/${locale}`)
            setOpenLogoutModal(false)
        }
    })

    const onClick = () => {
        setLoading(true)
        removeCookie('admin', { path: '/' })
        onClickMutation.mutate()
    }

    return (
        <Transition show={openLogoutModal}>
            <Dialog className="relative z-50" onClose={() => setOpenLogoutModal(false)}>
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
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                            </svg>
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
                                        isLoading={loading}
                                        className="inline-flex w-full rounded-md justify-center bg-gray-900 px-10 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                                        onClick={onClick}
                                    >
                                        {loading ? t('addButton') : t('addButton')}
                                    </Button>
                                    <Button
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpenLogoutModal(false)}
                                    >
                                        {t('cancelButton')}
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
