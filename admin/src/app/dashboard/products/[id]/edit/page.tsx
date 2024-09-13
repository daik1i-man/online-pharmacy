'use client'

const Quill = dynamicImport(() => import("@/components/editor/Quill"), { ssr: false });
import { getProductById } from '@/requestFunctions/get.product.by.id';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getCategories } from '@/requestFunctions/get.categories';
import { editProductProps, productsProps } from '@/types/types';
import { Button, Select, SelectItem } from '@nextui-org/react'
import { storage } from '@/Services/Firebase/firebase-config';
import { editProduct } from '@/requestFunctions/edit.product';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css';
import { FileInput } from "flowbite-react";
import dynamicImport from "next/dynamic";


export default function Edit() {
    const { id } = useParams()
    const router = useRouter()
    const [change, setChange] = useState(false)
    const { data: product, isLoading: loading } = useQuery({
        queryKey: ['product'],
        queryFn: () => getProductById(id)
    })

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


    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    });

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
        const url = await getDownloadURL(storageRef)

        return url
    }

    const onSubmitMutation = useMutation({
        mutationKey: ['productDatas'],
        mutationFn: (datas: editProductProps) => editProduct(datas),
        onSuccess: () => {
            setState({ ...state, loading: false })
            router.push('/dashboard/products');
        }
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setState({ ...state, loading: true })
        const url = (state.file === null) ? product?.img_url : await uploadFile(state.file)

        const datas: editProductProps = {
            img_url: url,
            category: state.selectedCategory,
            price: state.price,
            quantity: state.quantity,
            id: id,
            name: state.name,
            description: state.description
        }

        onSubmitMutation.mutate(datas)
    }

    return (
        <div>
            <div className="mt-32 max-w-7xl mx-auto">
                <h1 className="font-semibold text-3xl leading-6 text-gray-900">
                    Edit Product
                </h1>
            </div>
            <div className="max-w-7xl mt-12 mx-auto">
                <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                    <div className='flex items-center justify-between'>
                        <div className='w-[550px]'>
                            <div className={`my-2 border rounded-md relative`}>
                                {state.file === null ? (
                                    (loading ? (
                                        <div className='w-full h-[360px] bg-gray-200 animate-pulse' />
                                    ) : (
                                        <div>
                                            <img
                                                className='w-[360px] mx-auto'
                                                src={product?.img_url}
                                                alt=""
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className='relative'>
                                        <div
                                            onClick={() => setState({ ...state, file: null })}
                                            className="absolute w-8 h-8 rounded-full cursor-pointer p-1 bg-gray-400 right-2 top-2 backdrop-filter blur-10">
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
                            <div className={`text-end my-4 ${state.file === null ? 'block' : 'hidden'}`}>
                                <label
                                    className='bg-gray-200 py-1.5 px-2 text-[14px] rounded-md cursor-pointer'
                                    htmlFor="dropzone-file">
                                    Upload new file
                                </label>
                            </div>
                            <FileInput id="dropzone-file" name='file' onChange={onChange} className="hidden" />
                        </div>
                        <div>
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
                            <div className="flex items-center justify-between gap-x-12 my-4">
                                <div>
                                    <label htmlFor="email" className="block mb-3 text-sm font-medium leading-6 text-gray-900">
                                        Category
                                    </label>
                                    <Select
                                        isRequired
                                        name='select'
                                        label='Product category'
                                        className="w-[300px]"
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
                                    <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                        Price
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex w-36 items-center border-0 ring-1 ring-gray-300 rounded-md p-1 px-4 border-gray-900">
                                            <input
                                                id="price"
                                                name="price"
                                                type="text"
                                                placeholder='10 000 000'
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
                                disabled={!change}
                                isLoading={state.loading}
                                type="submit"
                                className="inline-flex w-full disabled:opacity-50 justify-center hover:bg-gray-800 disabled:hover:cursor-pointer disabled:hover:bg-gray-500 rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                            >
                                {state.loading ? 'Saving...' : 'Save changes'}
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
