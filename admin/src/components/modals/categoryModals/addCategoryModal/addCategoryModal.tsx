'use client'

import { useContext, useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Button } from '@nextui-org/react'
import { FileInput, Label } from "flowbite-react";
import { AddCategoryModalContext } from '@/context/categoryActionsContext/addCategory/addCategory'
import { storage } from '@/Services/Firebase/firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';
import { format } from 'date-fns'

interface iState {
    categoryName: string
}

interface iErrorState {
    error: string
}

axios.defaults.withCredentials = true

export default function AddCategoryModal() {
    const [file, setFile] = useState<File | undefined>(undefined)
    const context = useContext(AddCategoryModalContext)
    const [loading, setLoading] = useState(false)

    const initialErrorState: iErrorState = {
        error: ''
    }

    const initialState: iState = {
        categoryName: ''
    }

    const [state, setState] = useState<iState>(initialState)
    const [error, setError] = useState<iErrorState>(initialErrorState)

    if (!context) {
        throw new Error('SomeComponent must be used within an AddCategory')
    }

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, categoryName: e.target.value })
    }

    const uploadFile = async (file: File) => {
        if (!file) {
            return null
        }

        const storageRef = ref(storage, 'admin-panel/categories/current-images/' + file.name)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        return url
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (file && state.categoryName) {
            setError(initialErrorState)
            try {
                const url = await uploadFile(file)
                const date = new Date()
                const formattedDate = format(date, 'dd.MM.yyyy HH:mm')

                await axios.post('http://localhost:5000/admin-controll/categories/add', {
                    name: state.categoryName,
                    img_url: url,
                    created_date: formattedDate
                }).then((res) => {
                    setState({ ...state, categoryName: '' })
                    setFile(undefined)
                    setOpenAddCategoryModal(false)
                }).catch((error) => {
                    console.log(error.message);
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            setError({ ...error, error: 'Please fill out all fields' })
        }
        setLoading(false)
    }

    const closeHandler = () => {
        setFile(undefined)
        setOpenAddCategoryModal(false)
        setError(initialErrorState)
    }

    const { openAddCategoryModal, setOpenAddCategoryModal } = context;

    return (
        <Transition show={openAddCategoryModal}>
            <Dialog className="relative z-50" onClose={setOpenAddCategoryModal}>
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
                <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
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
                                        <h2 className="mt-10 text-start text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                            Add Category
                                        </h2>
                                    </div>
                                    <p className='text-red-500 text-center'>{error.error}</p>
                                    <form className="space-y-6" action="" method="POST" onSubmit={handleSubmit}>
                                        <div className='max-w-lg mx-auto'>
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Add name to category
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    autoComplete="name"
                                                    value={state.categoryName}
                                                    onChange={nameChangeHandler}
                                                    required
                                                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="max-w-lg mx-auto my-4 items-center justify-center">
                                            <label htmlFor="name" className=" my-4 block text-sm font-medium leading-6 text-gray-900">
                                                Upload file
                                            </label>
                                            {file === undefined ? (
                                                <Label
                                                    htmlFor="dropzone-file"
                                                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                                >
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
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                    </div>
                                                    <FileInput id="dropzone-file" onChange={fileChangeHandler} className="hidden" />
                                                </Label>
                                            ) : (
                                                <div className="my-2">
                                                    <img
                                                        className='rounded-md'
                                                        src={URL.createObjectURL(file)}
                                                        alt=""
                                                    />
                                                </div>)
                                            }
                                        </div>
                                    </form>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        {loading ? (
                                            <Button
                                                isLoading
                                                className="inline-flex w-full justify-center rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                                            >
                                                Adding...
                                            </Button>
                                        ) : (<Button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                                            onClick={handleSubmit}
                                        >
                                            Add category
                                        </Button>)}
                                        <Button
                                            onClick={closeHandler}
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
