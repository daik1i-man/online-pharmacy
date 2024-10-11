'use client'

const Quill = dynamicImport(() => import("@/components/editor/Quill"), { ssr: false });
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getCategories } from '@/requestFunctions/get.categories';
import { Button, Select, SelectItem } from '@nextui-org/react'
import { storage } from '@/Services/Firebase/firebase-config';
import { addProductProps, productsProps } from '@/types/types'
import { useQuery, useMutation } from '@tanstack/react-query';
import { addProduct } from '@/requestFunctions/add.product'
import { useRouter, usePathname } from 'next/navigation';
import { FileInput, Label } from "flowbite-react";
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl'
import dynamicImport from "next/dynamic";
import React from 'react'

export default function Add() {
    const router = useRouter()
    const { toast } = useToast()
    const pathname = usePathname()
    const locale = pathname.split('/')[1]
    const t = useTranslations('Pages.Products.addProductPage')
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
            toast({
                title: t('messages.successMessage')
            })
            router.push(`/${locale}/dashboard/products`)
        },
        onError: () => {
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
            toast({
                title: t('messages.errorMessage')
            })
        }
    })

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setState({ ...state, loading: true })

        const url = state.file && await uploadFile(state.file)

        if (state.file !== null) {
            onSubmitMutation.mutate({
                img_url: url,
                category: state.selectedCategory,
                price: state.price,
                quantity: state.quantity,
                name: state.name,
                description: state.description
            })
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
        <div className='px-6 h-screen overflow-y-scroll w-full max-w-screen-[1480px] justify-center'>
            <div className="px-8 mx-auto mt-32">
                <h1 className="text-3xl font-semibold leading-6">
                    {t('title')}
                </h1>
            </div>
            <div className="px-8 mx-auto mt-12">
                <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                    <div className='flex items-center gap-x-12 justify-between'>
                        <div className='w-1/2'>
                            <p className='block mb-3 text-sm font-medium leading-6' />
                            {state.file === null ? (
                                <Label
                                    htmlFor="dropzone-file"
                                    className="flex 'w-full mx-auto h-[270px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-transparent"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4"
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
                                        <p className="mb-2 text-sm">
                                            <span className="font-semibold">{t('inputsLabel.fileDescription')}</span>
                                        </p>
                                    </div>
                                    <FileInput id="dropzone-file" required onChange={onChange} className="hidden" name='file' />
                                </Label>
                            ) : (
                                <div className="relative my-2 border rounded-md">
                                    <div
                                        onClick={() => setState({ ...state, file: null })}
                                        className="absolute right-0 w-8 h-8 p-1 m-2 bg-transparent rounded-full cursor-pointer backdrop-filter blur-10"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
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
                                <label htmlFor="name" className="block text-sm font-medium leading-6">
                                    {t('inputsLabel.name')}
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
                                        className="block w-full py-3 bg-transparent border-none rounded-md shadow-sm ring-1 ring-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between my-4">
                                <div>
                                    <label htmlFor="email" className="block mb-3 text-sm font-medium leading-6">
                                        {t('inputsLabel.category')}
                                    </label>
                                    <Select
                                        isRequired
                                        name='select'
                                        label={t('inputsLabel.selectLabel')}
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
                                    <label htmlFor="number" className="block text-sm font-medium leading-6">
                                        {t('inputsLabel.price')}
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex items-center w-48 p-1 px-4 border-0 rounded-md ring-1 ring-gray-700">
                                            <input
                                                id="price"
                                                name="price"
                                                type="text"
                                                placeholder='00 000 000'
                                                autoComplete="price"
                                                value={state.price}
                                                onChange={onChange}
                                                required
                                                className="block bg-transparent w-full py-2.5 border-none focus:outline-none focus:ring-0"
                                            />
                                            <span>UZS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <p className='block my-3 text-sm font-medium leading-6'>{t('inputsLabel.quantity')}</p>
                                <input
                                    id="price"
                                    name="quantity"
                                    type="text"
                                    autoComplete="price"
                                    value={state.quantity}
                                    onChange={onChange}
                                    required
                                    className="block w-full py-3 bg-transparent border-none rounded-md shadow-sm ring-1 ring-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <p className='block my-3 text-sm font-medium leading-6'>{t('inputsLabel.description')}</p>
                        <Quill className='h-56' value={state.description} onChange={quillOnChange} />
                    </div>
                    <div>
                        <div className="py-3 my-12 sm:flex sm:flex-row-reverse">
                            <Button
                                color='primary'
                                isLoading={state.loading}
                                type='submit'
                                className="inline-flex justify-center w-full px-8 py-3 text-sm font-semibold rounded-md shadow-sm disabled:opacity-50 sm:ml-3 sm:w-auto"
                            >
                                {state.loading ? t('inputsLabel.loadingButton') : t('inputsLabel.addbutton')}
                            </Button>
                            <Button
                                onClick={cancelHandler}
                                type="button"
                                className="inline-flex justify-center w-full px-8 py-3 mt-3 text-sm font-semibold rounded-md shadow-sm sm:mt-0 sm:w-auto"
                            >
                                {t('inputsLabel.cancelButton')}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
