'use client'

import { useDeleteEmployeeContext } from '@/context/employeeActionsContext/deleteEmployee/deleteEmployee'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { deleteEmployee } from '@/requestFunctions/delete.employee'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl'
import { format } from 'date-fns'
import { useState } from 'react'

export default function DeleteEmployeeModal() {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    const t = useTranslations('Pages.Emloyees.Modals.delete');

    const { openDeleteEmployeeModal, setOpenDeleteEmployeeModal, deleteCurrentEmployee } = useDeleteEmployeeContext()

    const deleteEmployeeMutation = useMutation({
        mutationKey: ['employee'],
        mutationFn: (id: string | null) => deleteEmployee(id),
        onSuccess: () => {
            setLoading(false)
            queryClient.removeQueries({ queryKey: ['employees'] })
            setOpenDeleteEmployeeModal(false)
            toast({
                title: t('messages.successMessage'),
                description: format(new Date(), 'dd.MM.yyyy HH:mm')
            })
        },
        onError() {
            setLoading(false)
            setOpenDeleteEmployeeModal(false)
            toast({
                title: t('messages.successMessage'),
                description: format(new Date(), 'dd.MM.yyyy HH:mm')
            })
        },
    })

    const onClick = (id: string | null) => {
        setLoading(true)
        deleteEmployeeMutation.mutate(id)
    }

    return (
        <Modal backdrop='blur' isOpen={openDeleteEmployeeModal} onOpenChange={setOpenDeleteEmployeeModal}>
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
                                color="default"
                                className="rounded-md"
                                onClick={() => setOpenDeleteEmployeeModal(false)}
                                data-autofocus
                            >
                                {t('cancelButton')}
                            </Button>
                            <Button
                                isLoading={loading}
                                type="button"
                                color="primary"
                                className="rounded-md"
                                onClick={() => onClick(deleteCurrentEmployee)}
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