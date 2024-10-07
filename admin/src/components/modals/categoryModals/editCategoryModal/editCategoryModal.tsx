'use client'

import { useEditCategoryContext } from '@/context/categoryActionsContext/editCategory/editCategory'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { editCategory } from '@/requestFunctions/edit.category'
import { storage } from '@/Services/Firebase/firebase-config'
import { FileInput, Label } from "flowbite-react";
import { statesProps } from '@/types/types'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { format } from 'date-fns'

export default function EditCategoryModal() {
    const [hasChanges, setHasChanges] = useState(false)
    const queryClient = useQueryClient()
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
                    break;
                }
        }
    }


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setState({ ...state, loading: true })
        try {
            const url = (state.file === null) ? editCurrentCategory?.img_url : await uploadFile(state.file)
            const formattedDate = format(new Date(), 'dd.MM.yyyy HH:mm')

            const datas = {
                id: editCurrentCategory?.id,
                categoryName: state?.categoryName,
                url: url,
                formattedDate: formattedDate
            }

            const response = await editCategory(datas)

            if (response.status === 200) {
                queryClient.invalidateQueries({ queryKey: ['categories'] })
                setState(prevState => ({
                    ...prevState,
                    categoryName: '',
                    file: null,
                    loading: false
                }))
                setOpenEditCategoryModal(false)
            } else {
                setState(prevState => ({
                    ...prevState,
                    loading: false,
                    error: 'Something went wrong!'
                }))
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                loading: false,
                error: 'Something went wrong!'
            }))
        }
    }

    return (
        <Transition show={openEditCategoryModal}>
            <Dialog className="relative z-50" onClose={setOpenEditCategoryModal}>
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
                            <DialogPanel className="relative transform overflow-hidden rounded-lg justify-center bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                                <div className="max-w-xl mx-auto">
                                    <div className="m-8">
                                        <h2 className="text-start text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                            {t('title')}
                                        </h2>
                                    </div>
                                    <p className='text-red-500 text-center'>{state.error}</p>
                                    <form action="" method="post" onSubmit={onSubmit}>
                                        <div className='max-w-lg mx-auto'>
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
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
                                                    className="block w-full rounded-md focus:outline-none border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="max-w-lg mx-auto items-center justify-center">
                                            <label htmlFor="name" className=" my-4 block text-sm font-medium leading-6 text-gray-900">
                                                {t('inputsLabel.file')}
                                            </label>
                                            {state.file !== null ? (
                                                <div className="my-2 relative">
                                                    <div
                                                        onClick={() => setState({ ...state, file: null })}
                                                        className="absolute w-8 h-8 rounded-full cursor-pointer p-1 bg-gray-400 right-2 top-2 backdrop-filter blur-10">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-50">
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
                                                            <div className='flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100'>
                                                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                                                    <svg
                                                                        className="mb-4 h-6 w-6 text-gray-500 dark:text-gray-400"
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
                                                                    <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                                                                        <span className="font-semibold">{t('fileInputdescription')}</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <label htmlFor='dropzone-file'>
                                                            <div className='justify-center w-full py-2'>
                                                                <img className='mx-auto' src={state.url} alt="" />
                                                            </div>
                                                            <div className='text-end py-2.5 my-4'>
                                                                <label
                                                                    className='bg-gray-200 p-3 rounded-md cursor-pointer'
                                                                    htmlFor="dropzone-file">
                                                                    {t('newFileButton')}
                                                                </label>
                                                            </div>
                                                            <FileInput id="dropzone-file" name='file' required onChange={onChange} className="hidden" />
                                                        </label>
                                                    )}
                                                </Label>
                                            )}
                                        </div>
                                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <Button
                                                disabled={!hasChanges}
                                                isLoading={state.loading}
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md disabled:opacity-50 bg-gray-900 disabled:hover:bg-gray-500 px-8 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                            >
                                                {state.loading ? t('loadingButton') : t('addButton')}
                                            </Button>
                                            <Button
                                                onClick={() => setOpenEditCategoryModal(false)}
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            >
                                                {t('cancelButton')}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
