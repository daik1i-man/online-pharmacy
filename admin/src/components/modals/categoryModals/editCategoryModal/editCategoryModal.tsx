'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useEditCategoryContext } from '@/context/categoryActionsContext/editCategory/editCategory'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { editCategory } from '@/requestFunctions/edit.category'
import { storage } from '@/Services/Firebase/firebase-config'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FileInput, Label } from "flowbite-react";
import { useToast } from "@/hooks/use-toast";
import { editCategoryProps, statesProps } from '@/types/types'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

export default function EditCategoryModal() {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const [hasChanges, setHasChanges] = useState(false)
    const t = useTranslations('Pages.Categories.Modals.edit');
    const {
        openEditCategoryModal,
        setOpenEditCategoryModal,
        editCurrentCategory
    } = useEditCategoryContext()

    const [state, setState] = useState<statesProps>({
        categoryName: editCurrentCategory?.name,
        error: '',
        file: null,
        loading: false,
        url: editCurrentCategory?.img_url,
        active: false
    })

    useEffect(() => {
        setState({
            ...state,
            categoryName: editCurrentCategory?.name,
            url: editCurrentCategory?.img_url
        })
    }, [editCurrentCategory])

    useEffect(() => {
        const isChanges = state.categoryName !== editCurrentCategory?.name || state.url !== editCurrentCategory?.img_url || state.file !== null
        setHasChanges(isChanges)
    }, [state, editCurrentCategory])

    const uploadFile = async (file: File) => {
        if (!file) {
            return null
        }

        const storageRef = ref(storage, '/admin-panel/categories/updated-images/' + file.name)
        await uploadBytes(storageRef, file)
        return await getDownloadURL(storageRef)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target

        switch (name) {
            case 'name':
                setState({ ...state, categoryName: value })
                break;
            case 'file':
                if (files) {
                    setState({ ...state, file: files[0] })
                }
                break;
        }
    }

    const onEditMutation = useMutation({
        mutationKey: ['editCategory'],
        mutationFn: (data: editCategoryProps) => editCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            setOpenEditCategoryModal(false)
            setState(prevState => ({
                ...prevState,
                categoryName: '',
                file: null,
                loading: false
            }))
            toast({
                title: t('messages.successMessage'),
                description: format(new Date(), 'dd.MM.yyyy HH:mm')
            })
        },
        onError: () => {
            setState(prevState => ({
                ...prevState,
                categoryName: '',
                file: null,
                loading: false
            }))
            setOpenEditCategoryModal(false)
            toast({
                title: t('messages.errorMessage'),
                description: format(new Date(), 'dd.MM.yyyy HH:mm')
            })
        }
    })


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setState({ ...state, loading: true })

        const url = (state.file === null) ? editCurrentCategory?.img_url : await uploadFile(state.file)
        const formattedDate = format(new Date(), 'dd.MM.yyyy HH:mm')

        onEditMutation.mutate({
            id: editCurrentCategory?.id,
            categoryName: state?.categoryName,
            url: url,
            formattedDate: formattedDate
        })
    }

    return (
        <Modal backdrop="blur" scrollBehavior="inside" size="xl" isOpen={openEditCategoryModal} onOpenChange={setOpenEditCategoryModal}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="">
                            <h2 className="text-2xl font-bold leading-9 tracking-tight text-start">
                                {t('title')}
                            </h2>
                        </ModalHeader>
                        <ModalBody>
                            <form id="form" onSubmit={onSubmit}>
                                <div className='mx-auto'>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                                        {t('inputsLabel.name')}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            value={state.categoryName}
                                            onChange={onChange}
                                            required
                                            className="block w-full py-3 bg-transparent border-0 rounded-md shadow-sm focus:outline-none ring-1 ring-inset ring-gray-700 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <label htmlFor="name" className="block my-4 text-sm font-medium leading-6 ">
                                        {t('inputsLabel.file')}
                                    </label>
                                    {state.file !== null ? (
                                        <div className="relative my-2">
                                            <div
                                                onClick={() => setState({ ...state, file: null })}
                                                className="absolute w-8 h-8 p-1 bg-transparent rounded-full cursor-pointer right-2 top-2 backdrop-filter blur-10">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <img
                                                className='rounded-md'
                                                src={URL.createObjectURL(state.file)}
                                                alt=""
                                            />
                                        </div>
                                    ) : (
                                        <Label
                                            htmlFor="dropzone-file">
                                            {state.url === '' ? (
                                                <div>
                                                    <div className='flex flex-col items-center justify-center w-full h-64 bg-transparent border-2 border-dashed rounded-lg cursor-pointer'>
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg
                                                                className="w-6 h-6 mb-4"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 20 16"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                                />
                                                            </svg>
                                                            <p className="mb-2 text-xs">
                                                                <span className="font-semibold">{t('fileInputdescription')}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className='justify-center w-full py-2'>
                                                        <img className='mx-auto rounded-md' src={state.url} alt="" />
                                                    </div>
                                                    <Button color="primary" className="float-right rounded-md">
                                                        <label htmlFor="dropzone-file">
                                                            {t('newFileButton')}
                                                            <FileInput id="dropzone-file" name="file" onChange={onChange} className="hidden" />
                                                        </label>
                                                    </Button>
                                                </div>
                                            )}
                                        </Label>
                                    )}
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onClick={() => setOpenEditCategoryModal(false)}
                                type="button"
                                color="default"
                                className="rounded-md"
                            >
                                {t('cancelButton')}
                            </Button>
                            <Button
                                form="form"
                                disabled={!hasChanges}
                                isLoading={state.loading}
                                type="submit"
                                color="primary"
                                className="rounded-md disabled:opacity-50"
                            >
                                {state.loading ? t('loadingButton') : t('addButton')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>

    )
}

