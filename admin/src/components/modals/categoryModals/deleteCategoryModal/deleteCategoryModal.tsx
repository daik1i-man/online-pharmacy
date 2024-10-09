'use client'

import { useDeleteCategoryContext } from '@/context/categoryActionsContext/deleteCategory/deleteCategory'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { deleteCategory } from '@/requestFunctions/delete.category'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function DeleteCategoryModal() {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    const t = useTranslations('Pages.Categories.Modals.delete');

    const { openDeleteCategoryModal, setOpenDeleteCategoryModal, deletecurrentCategory } = useDeleteCategoryContext();

    const deleteMutation = useMutation({
        mutationKey: ['deleteCategory'],
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess() {
            setLoading(false)
            setOpenDeleteCategoryModal(false)
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast({
                title: t('messages.successMessage')
            })
        },
        onError() {
            setLoading(false)
            setOpenDeleteCategoryModal(false)
            toast({
                title: t('messages.errorMessage')
            })
        },
    })

    async function DeleteCategoryHandler() {
        setLoading(true)
        if (deletecurrentCategory?.id) {
            deleteMutation.mutate(deletecurrentCategory?.id)
        }
    }

    return (
        <Modal backdrop='blur' isOpen={openDeleteCategoryModal} onOpenChange={setOpenDeleteCategoryModal}>
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
                                onClick={() => setOpenDeleteCategoryModal(false)}
                                type="button"
                                color='default'
                                className="rounded-md"
                            >
                                {t('cancelButton')}
                            </Button>
                            <Button
                                isLoading={loading}
                                type="button"
                                color='primary'
                                className="rounded-md"
                                onClick={DeleteCategoryHandler}
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
