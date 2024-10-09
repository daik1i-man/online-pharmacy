'use client'

import { useDeleteProductContext } from '@/context/productActionsContext/deleteProduct/deleteProduct';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteProduct } from '@/requestFunctions/delete.product';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function DeleteProductModal() {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    const t = useTranslations('Pages.Products.Modals.delete');

    const { openDeleteProductModal, setOpenDeleteProductModal, deleteCurrentProduct } = useDeleteProductContext()

    const deleteMutation = useMutation({
        mutationKey: ['product'],
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            setLoading(false)
            setOpenDeleteProductModal(false)
            toast({
                title: t('messages.successMessage')
            })
        },
        onError() {
            setLoading(false)
            setOpenDeleteProductModal(false)
            toast({
                title: t('messages.errorMessage')
            })
        },
    })

    const onClick = () => {
        setLoading(true)
        deleteCurrentProduct && deleteMutation.mutate(deleteCurrentProduct)
    }

    return (
        <Modal backdrop='blur' isOpen={openDeleteProductModal} onOpenChange={setOpenDeleteProductModal}>
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
                                type="button"
                                color='default'
                                className="rounded-md"
                                onClick={() => setOpenDeleteProductModal(false)}
                                data-autofocus
                            >
                                {t('cancelButton')}
                            </Button>
                            <Button
                                onClick={onClick}
                                color='primary'
                                isLoading={loading}
                                type="submit"
                                className="rounded-md"
                            >
                                {`${loading ? t('loadingButton') : t('addButton')}`}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

