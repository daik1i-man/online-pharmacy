'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useActionsContext } from '@/context/actionsContext/actionsContext'
import { useRouter, usePathname } from 'next/navigation'
import { axiosInstance } from '@/configs/axios.config'
import { useMutation } from '@tanstack/react-query'
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from 'next-intl'
import { useCookies } from 'react-cookie'
import { useState } from 'react'


export default function LogoutModal() {
    const { toast } = useToast()
    const router = useRouter()
    const pahtname = usePathname()
    const t = useTranslations('LogoutModal');
    const [loading, setLoading] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(['admin'])

    const locale = pahtname.split('/')[1]

    const { openLogoutModal, setOpenLogoutModal } = useActionsContext()

    const onClickMutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => await axiosInstance.get('/auth/admin/logout'),
        onSuccess: () => {
            setLoading(false)
            router.push(`/${locale}`)
            setOpenLogoutModal(false)
            removeCookie('admin', { path: '/' })
            toast({
                title: t('messages.successMessage')
            })
        },
        onError() {
            setLoading(false)
            setOpenLogoutModal(false)
            toast({
                title: t('messages.errorMessage')
            })
        },
    })

    const onClick = () => {
        setLoading(true)
        onClickMutation.mutate()
    }

    return (
        <Modal backdrop="blur" isOpen={openLogoutModal} onOpenChange={setOpenLogoutModal}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {t('title')}
                        </ModalHeader>
                        <ModalBody>
                            {t('description')}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color='default'
                                className="rounded-md"
                                onClick={() => setOpenLogoutModal(false)}
                            >
                                {t('cancelButton')}
                            </Button>
                            <Button
                                isLoading={loading}
                                color='primary'
                                className="rounded-md"
                                onClick={onClick}
                            >
                                {loading ? t('addButton') : t('addButton')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

