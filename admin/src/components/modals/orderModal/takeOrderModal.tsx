'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useTakeOrderContext } from '@/context/orderActionsContext/takeOrderContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { takeTheOrder } from '@/requestFunctions/take.order';
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function TakeOrderModal() {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    const t = useTranslations('Pages.Orders.Modals.delete');

    const { openTakeOrderModal, setOpenTakeOrderModal, takeCurrentOrder } = useTakeOrderContext()

    const takeOrderMutation = useMutation({
        mutationKey: ['orders'],
        mutationFn: (id: string) => takeTheOrder(id),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['orders'] })
            toast({
                title: t('messages.successMessage')
            })
            setOpenTakeOrderModal(false)
            setLoading(false)
        },
        onError: () => {
            queryClient.removeQueries({ queryKey: ['orders'] })
            toast({
                title: t('messages.errorMessage')
            })
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
        <Modal backdrop='blur' isOpen={openTakeOrderModal} onOpenChange={setOpenTakeOrderModal}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {t('title')}
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-sm">
                                {t('description')}
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color='default'
                                onClick={() => setOpenTakeOrderModal(false)}
                                className="rounded-md">
                                {t('cancelButton')}
                            </Button>
                            <Button
                                color='primary'
                                onClick={onClick}
                                isLoading={loading}
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
