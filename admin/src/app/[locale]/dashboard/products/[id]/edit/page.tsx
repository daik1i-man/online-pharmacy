'use client'

const Quill = dynamicImport(() => import("@/components/editor/Quill"), { ssr: false });
import { getProductById } from '@/requestFunctions/get.product.by.id';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useParams, useRouter, usePathname } from "next/navigation";
import { getCategories } from '@/requestFunctions/get.categories';
import { editProductProps, productsProps } from '@/types/types';
import { Button, Select, SelectItem } from '@nextui-org/react'
import { storage } from '@/Services/Firebase/firebase-config';
import { editProduct } from '@/requestFunctions/edit.product';
import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl'
import { FileInput } from "flowbite-react"
import dynamicImport from "next/dynamic";
import 'react-quill/dist/quill.snow.css';


export default function Edit() {
    const { id } = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const pathname = usePathname()
    const locale = pathname.split('/')[1]
    const [change, setChange] = useState(false)
    const t = useTranslations('Pages.Products.editProductPage');

    const { data: product, isLoading: loading } = useQuery({
        queryKey: ['product'],
        queryFn: () => getProductById(id)
    })

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    });

    const [state, setState] = useState<productsProps>({
        file: null,
        loading: false,
        selectedCategory: product?.category,
        price: product?.price,
        name: product?.name,
        quantity: product?.quantity,
        description: product?.description,
        active: true
    })

    useEffect(() => {
        if (product) {
            setState(prevState => ({
                ...prevState,
                selectedCategory: product.category || prevState.selectedCategory,
                price: product.price || prevState.price,
                name: product.name || prevState.name,
                quantity: product.quantity || prevState.quantity,
                description: product.description || prevState.description,
            }));
        }
    }, [product]);

    useEffect(() => {
        const isChanges = state.file !== null ||
            state.selectedCategory !== product?.category ||
            state.price !== product?.price ||
            state.name !== product?.name ||
            state.quantity !== product?.quantity ||
            state.description !== product?.description

        setChange(isChanges);
    }, [state])


    const numberWithCommas = (value: string): string => {
        return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement

        switch (name) {
            case 'file':
                if (files) {
                    setState({ ...state, file: files[0] })
                }
                break;
            case 'select':
                setState({ ...state, selectedCategory: value })
                break;
            case 'price':
                const formattedNumber = numberWithCommas(value)
                setState({ ...state, price: formattedNumber })
                break;
            case 'name':
                setState({ ...state, name: value })
                break;
            case 'quantity':
                setState({ ...state, quantity: value })
                break;
        }
    }

    const quillOnChange = (value: string) => {
        setState({ ...state, description: value })
    }

    const cancelHandler = () => {
        setState(prevState => ({
            ...prevState,
            file: null,
            selectedCategory: product.category || prevState.selectedCategory,
            price: product.price || prevState.price,
            name: product.name || prevState.name,
            quantity: product.quantity || prevState.quantity,
            description: product.description || prevState.description,
        }));
    }

    const uploadFile = async (file: File) => {
        if (!file) {
            return null
        }

        const storageRef = ref(storage, 'admin-panel/products/updated-images/' + file?.name)
        await uploadBytes(storageRef, file)
        return await getDownloadURL(storageRef)
    }

    const onSubmitMutation = useMutation({
        mutationKey: ['productDatas'],
        mutationFn: (datas: editProductProps) => editProduct(datas),
        onSuccess: () => {
            setState({ ...state, loading: false })
            router.push(`/${locale}/dashboard/products`);
            toast({
                title: t('messages.successMessage')
            })
        },
        onError() {
            setState({ ...state, loading: false })
            toast({
                title: t('messages.errorMessage')
            })
        },
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setState({ ...state, loading: true })
        const url = (state.file === null) ? product?.img_url : await uploadFile(state.file)

        onSubmitMutation.mutate({
            img_url: url,
            category: state.selectedCategory,
            price: state.price,
            quantity: state.quantity,
            id: id,
            name: state.name,
            description: state.description
        })
    }

    return (
        <div className='h-screen overflow-y-scroll'>
            <div className="px-8 mx-auto mt-32 max-w-7xl">
                <h1 className="text-3xl font-semibold leading-6">
                    {t('title')}
                </h1>
            </div>
            <div className="px-8 mx-auto mt-12 max-w-7xl">
                <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                    <div className='flex items-center justify-between'>
                        <div className='w-[550px]'>
                            <div className={`my-2 border rounded-md relative`}>
                                {state.file === null ? (
                                    (loading ? (
                                        <div className='w-full h-[300px] bg-gray-200 animate-pulse' />
                                    ) : (
                                        <div>
                                            <img
                                                className='w-[300px] mx-auto'
                                                src={product?.img_url}
                                                alt=""
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className='relative'>
                                        <div
                                            onClick={() => setState({ ...state, file: null })}
                                            className="absolute w-8 h-8 p-1 bg-gray-400 rounded-full cursor-pointer right-2 top-2 backdrop-filter blur-10">
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
                            <div className={`text-end my-4 ${state.file === null ? 'block' : 'hidden'}`}>
                                <label
                                    className='py-1.5 px-2 text-[14px] rounded-md cursor-pointer backdrop-blur-lg'
                                    htmlFor="dropzone-file">
                                    {t('inputsLabel.newFileButton')}
                                </label>
                            </div>
                            <FileInput id="dropzone-file" name='file' onChange={onChange} className="hidden" />
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
                                        name='select'
                                        label={t('inputsLabel.selectLabel')}
                                        className="w-[350px]"
                                        onChange={onChange}
                                        placeholder={product?.category}
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
                                                placeholder='10 000 000'
                                                autoComplete="price"
                                                value={state.price}
                                                onChange={onChange}
                                                required
                                                className="block w-full py-2.5 border-none focus:outline-none focus:ring-0 bg-transparent"
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
                                disabled={!change}
                                isLoading={state.loading}
                                type="submit"
                                color='primary'
                                className="inline-flex justify-center w-full px-8 py-3 text-sm font-semibold rounded-md shadow-sm disabled:opacity-50 disabled:hover:cursor-pointer disabled:hover:bg-gray-500 sm:ml-3 sm:w-auto"
                            >
                                {state.loading ? t('inputsLabel.loadingButton') : t('inputsLabel.addbutton')}
                            </Button>
                            <Button
                                onClick={cancelHandler}
                                type="button"
                                color='default'
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
