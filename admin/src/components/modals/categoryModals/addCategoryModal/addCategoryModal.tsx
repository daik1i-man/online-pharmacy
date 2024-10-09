'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useAddCategoryModalContext } from '@/context/categoryActionsContext/addCategory/addCategory'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/Services/Firebase/firebase-config';
import { addCategory } from '@/requestFunctions/add.category';
import { addCategoryProps, statesProps } from '@/types/types';
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from 'next-intl'
import { Label } from "flowbite-react";
import { format } from 'date-fns'
import { useState } from 'react';

export default function AddCategoryModal() {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    const t = useTranslations('Pages.Categories.Modals.add');
    const { openAddCategoryModal, setOpenAddCategoryModal } = useAddCategoryModalContext();
    const [state, setState] = useState<statesProps>({
        categoryName: '',
        error: '',
        file: null,
        loading: false,
        url: '',
        active: false
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target

        switch (name) {
            case 'name':
                setState({ ...state, categoryName: value })
                break;
            case 'file':
                if (files) {
                    setState({ ...state, file: files[0] })
                    break;
                }
        }
    }

    const uploadFile = async (file: File) => {
        if (!file) {
            return null
        }

        const storageRef = ref(storage, 'admin-panel/categories/current-images/' + file.name)
        await uploadBytes(storageRef, file)
        return await getDownloadURL(storageRef)
    }


    const closeHandler = () => {
        setState(prevState => ({
            ...prevState,
            categoryName: '',
            file: null,
            error: ''
        }))
        setOpenAddCategoryModal(false)
    }

    const AddCategoryMutation = useMutation({
        mutationKey: ['addCategory'],
        mutationFn: (data: addCategoryProps) => addCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
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
            setOpenAddCategoryModal(false)
        },
        onError: () => {
            setState(prevState => ({
                ...prevState,
                categoryName: '',
                file: null,
                loading: false
            }))
            setOpenAddCategoryModal(false)
            toast({
                title: t('messages.errorMessage'),
                description: format(new Date(), 'dd.MM.yyyy HH:mm')
            })
            setState({ ...state, loading: false })
        }
    })

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setState({ ...state, loading: true })

        if (state.file !== null) {
            const url = await uploadFile(state.file)
            const formattedDate = format(new Date(), 'dd.MM.yyyy HH:mm')

            AddCategoryMutation.mutate({ categoryName: state.categoryName, url: url, formattedDate: formattedDate })
        } else {
            setState({ ...state, loading: false })
        }
    }


    return (
        <Modal backdrop="blur" scrollBehavior="inside" size="xl" isOpen={openAddCategoryModal} onOpenChange={setOpenAddCategoryModal}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold leading-9 tracking-tight text-start">
                                {t('title')}
                            </h2>
                        </ModalHeader>
                        <ModalBody>
                            <p className='text-center text-red-500'>{state.error}</p>
                            <form id="form" className="space-y-6" action="" method="POST" onSubmit={onSubmit}>
                                <div className='max-w-lg mx-auto'>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                                        {t('inputsLabel.name')}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={state.categoryName}
                                            onChange={onChange}
                                            className="block w-full py-3 bg-transparent border-none rounded-md shadow-sm ring-1 ring-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 sm:text-sm sm:leading-6"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="items-center justify-center max-w-lg mx-auto my-4">
                                    <label htmlFor="dropzone-file" className="block my-4 text-sm font-medium leading-6 ">
                                        {t('inputsLabel.file')}
                                    </label>
                                    {state.file !== null ? (
                                        <div className="relative my-2">
                                            <div
                                                onClick={() => setState({ ...state, file: null })}
                                                className="absolute right-0 w-8 h-8 p-1 m-2 rounded-full cursor-pointer backdrop-filter blur-10"
                                            >
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
                                            htmlFor="dropzone-file"
                                            className="flex flex-col items-center justify-center w-full h-64 bg-transparent border-2 border-gray-800 border-dashed rounded-lg cursor-pointer"
                                        >
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
                                            <input type='file' id="dropzone-file" name='file' required onChange={onChange} className="hidden" />
                                        </Label>
                                    )}
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onClick={closeHandler}
                                type="button"
                                color="default"
                                size="lg"
                                className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold rounded-md shadow-sm ring-0 sm:mt-0 sm:w-auto"
                            >
                                {t('cancelButton')}
                            </Button>
                            <Button
                                type='submit'
                                isLoading={state.loading}
                                size="lg"
                                color="primary"
                                form="form"
                                className="inline-flex justify-center w-full px-8 py-3 text-sm font-semibold rounded-md shadow-sm sm:ml-3 sm:w-auto"
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


