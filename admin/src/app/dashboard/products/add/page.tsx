'use client'

const Quill = dynamicImport(() => import("@/components/editor/Quill"), { ssr: false });
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getCategories } from '@/requestFunctions/get.categories';
import { Button, Select, SelectItem } from '@nextui-org/react'
import { storage } from '@/Services/Firebase/firebase-config';
import { addProductProps, productsProps } from '@/types/types'
import { useQuery, useMutation } from '@tanstack/react-query';
import { addProduct } from '@/requestFunctions/add.product'
import { FileInput, Label } from "flowbite-react";
import { useRouter } from 'next/navigation';
import dynamicImport from "next/dynamic";
import React from 'react'

export default function Add() {
    const router = useRouter()
    const [state, setState] = React.useState<productsProps>({
        file: null,
        loading: false,
        selectedCategory: null,
        price: '',
        name: '',
        quantity: '',
        description: '',
        active: true,
    })

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })

    const uploadFile = async (file: File) => {
        if (!file) {
            return null
        }

        const storageRef = ref(storage, 'admin-panel/products/current-images/' + file?.name)
        await uploadBytes(storageRef, file)
        return await getDownloadURL(storageRef)
    }

    const numberWithCommas = (value: string): string => {
        return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement

        if (name === 'file') {
            if (files) {
                setState({ ...state, file: files[0] })
            }
        } else if (name === 'price') {
            const formatteNumber = numberWithCommas(value)
            setState({ ...state, price: formatteNumber })
        } else if (name === 'select') {
            setState({ ...state, selectedCategory: value })
        } else {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    const quillOnChange = (value: string) => {
        setState({ ...state, description: value })
    }

    const onSubmitMutation = useMutation({
        mutationKey: ['datas'],
        mutationFn: (datas: addProductProps) => addProduct(datas),
        onSuccess: () => {
            router.push('/dashboard/products')
            setState(prevState => ({
                ...prevState,
                file: null,
                loading: false,
                selectedCategory: null,
                price: '',
                name: '',
                quantity: '',
                description: '',
                active: true,
            }))
        }
    })

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setState({ ...state, loading: true })

        const url = state.file && await uploadFile(state.file)

        const datas = {
            img_url: url,
            category: state.selectedCategory,
            price: state.price,
            quantity: state.quantity,
            name: state.name,
            description: state.description
        }

        if (state.file !== null) {
            onSubmitMutation.mutate(datas)
        }
    }

    const cancelHandler = () => {
        setState(prevState => ({
            ...prevState,
            file: null,
            loading: false,
            selectedCategory: null,
            price: '',
            name: '',
            quantity: '',
            description: '',
            active: true,
        }))
    }

    return (
        <div className='h-screen overflow-y-scroll'>
            <div className="mt-32 max-w-7xl mx-auto px-8">
                <h1 className="font-semibold text-3xl leading-6 text-gray-900">
                    Add Product
                </h1>
            </div>
            <div className="max-w-7xl mt-12 mx-auto px-8">
                <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                    <div className='flex items-center justify-between'>
                        <div className='w-[550px]'>
                            <p className='block text-sm font-medium leading-6 text-gray-900 mb-3' />
                            {state.file === null ? (
                                <Label
                                    htmlFor="dropzone-file"
                                    className="flex 'w-full mx-auto h-[270px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <svg
                                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16">
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <FileInput id="dropzone-file" required onChange={onChange} className="hidden" name='file' />
                                </Label>
                            ) : (
                                <div className="my-2 border rounded-md relative">
                                    <div
                                        onClick={() => setState({ ...state, file: null })}
                                        className="absolute w-8 h-8 rounded-full cursor-pointer p-1 bg-gray-400 right-0 m-2 backdrop-filter blur-10"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-50">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <img
                                        className='w-[360px] mx-auto'
                                        src={URL.createObjectURL(state.file)}
                                        alt=""
                                    />
                                </div>
                            )}
                        </div>
                        <div className='w-1/2'>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        value={state.name}
                                        onChange={onChange}
                                        required
                                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6block"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between my-4">
                                <div>
                                    <label htmlFor="email" className="block mb-3 text-sm font-medium leading-6 text-gray-900">
                                        Category
                                    </label>
                                    <Select
                                        isRequired
                                        name='select'
                                        label="Select a Category"
                                        className="w-96"
                                        onChange={onChange}
                                    >
                                        {categories?.map((category: any) => (
                                            <SelectItem key={category.name} value={category.name}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                        Price
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex w-48 items-center border-0 ring-1 ring-gray-300 rounded-md p-1 px-4 border-gray-900">
                                            <input
                                                id="price"
                                                name="price"
                                                type="text"
                                                placeholder='00 000 000'
                                                autoComplete="price"
                                                value={state.price}
                                                onChange={onChange}
                                                required
                                                className="block w-full py-2.5 border-none focus:outline-none focus:ring-0 text-gray-900"
                                            />
                                            <span>UZS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <p className='block text-sm font-medium leading-6 text-gray-900 my-3'>Quantity</p>
                                <input
                                    id="price"
                                    name="quantity"
                                    type="text"
                                    autoComplete="price"
                                    value={state.quantity}
                                    onChange={onChange}
                                    required
                                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                    <Quill className='h-56' value={state.description} onChange={quillOnChange} />
                    <div>
                        <div className="py-3 sm:flex sm:flex-row-reverse my-12">
                            <Button
                                isLoading={state.loading}
                                type='submit'
                                className="inline-flex w-full justify-center disabled:opacity-50 rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                            >
                                {state.loading ? 'Adding...' : 'Add product'}
                            </Button>
                            <Button
                                onClick={cancelHandler}
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
