'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { EditProductContext } from '@/context/productActionsContext/editProduct/editProduct'
import { FileInput, Label } from "flowbite-react";
import { Button, Select, SelectItem, Textarea } from '@nextui-org/react'
import { dataProps } from '../addProduct/types'
import { fetchAllcategories } from '../addProduct/fetAllCategories'
import { uploadFile } from './functions';
import axios, { AxiosResponse } from 'axios';

export default function EditProductModal() {
    const context = useContext(EditProductContext)
    const [file, setFile] = useState<File | undefined>(undefined)
    const [categories, setCategories] = useState<dataProps[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: ''
    })

    if (!context) {
        throw new Error('SomeComponent must be used EditProduct')
    }
    const { openEditProductModal, setOpenEditProductModal, currentProductId } = context


    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await fetchAllcategories()
            setCategories(fetchedCategories)
        }

        fetchCategories()

        const id = setTimeout(fetchAllcategories, 1000)

        return () => {
            if (id) {
                clearInterval(id)
            }
        }
    }, [])

    const numberWithCommas = (value: string): string => {
        return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    const priceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.replace(/ /g, '');
        const formattedNumber = numberWithCommas(inputValue);
        setData({ ...data, price: formattedNumber })
    }

    const selectCategoryChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const FilesOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const closeHandler = () => {
        setOpenEditProductModal(false)
        setFile(undefined)
        setSelectedCategory(null)
        setData({
            ...data, name: '', price: '', quantity: '', description: ''
        })
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (file && data.name && data.price && data.quantity && data.description) {
            const url = await uploadFile(file)
            await axios.post('http://localhost:5000/admin-controll/products/update', {
                img_url: url,
                category: selectedCategory,
                price: data.price,
                id: currentProductId,
                quantity: data.quantity,
                name: data.name,
                description: data.description
            })
                .then((response: AxiosResponse<any>) => {
                    console.log(response);
                    setData({
                        ...data, name: '', price: '', quantity: '', description: ''
                    })
                    setOpenEditProductModal(false)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        setLoading(false)
    }

    return (
        <Dialog className="relative z-50" open={openEditProductModal} onClose={closeHandler}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white py-6 max-w-xl mx-auto">
                            <div className="sm:flex sm:items-center">
                                <div className="mt-3 text-center sm:mt-0">
                                    <DialogTitle as="h1" className="text-xl font-semibold text-3xl leading-6 text-gray-900">
                                        Update Product
                                    </DialogTitle>
                                </div>
                            </div>
                        </div>
                        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
                            <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                                <div className="w-full my-3 ustify-center">
                                    <p className='block text-sm font-medium leading-6 text-gray-900 my-3'>Upload new image</p>
                                    {file === undefined ? (
                                        <Label
                                            htmlFor="dropzone-file"
                                            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                                <svg
                                                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
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
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <FileInput id="dropzone-file" className="hidden" onChange={FilesOnChange} required />
                                        </Label>
                                    ) : (
                                        <div className="my-2 relative">
                                            <div
                                                onClick={() => setFile(undefined)}
                                                className="absolute w-8 h-8 rounded-full cursor-pointer p-1 bg-gray-400 right-0 m-2 backdrop-filter blur-10"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-50">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <img
                                                className='rounded-md'
                                                src={URL.createObjectURL(file)}
                                                alt=""
                                            />
                                        </div>
                                    )}
                                </div>
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
                                            value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                            required
                                            className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center max-w-xl justify-between mx-auto">
                                    <div>
                                        <label htmlFor="email" className="block mb-3 text-sm font-medium leading-6 text-gray-900">
                                            Category
                                        </label>
                                        <Select
                                            label="Select a Category"
                                            className="w-[300px]"
                                            onChange={selectCategoryChangeHandler}
                                        >
                                            {categories.map((category) => (
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
                                            <div className="flex items-center ring-1 ring-gray-300 rounded-md p-1 px-4 border-gray-900">
                                                <input
                                                    id="price"
                                                    name="price"
                                                    type="text"
                                                    placeholder='10 000 000'
                                                    autoComplete="price"
                                                    value={data.price}
                                                    onChange={priceChangeHandler}
                                                    required
                                                    className="block w-full py-2.5 border-none focus:outline-none focus:ring-0 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                                />
                                                <span>UZS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <label htmlFor='quantity' className='block text-sm font-medium leading-6 text-gray-900 my-3'>Quantity</label>
                                    <input
                                        id="quantity"
                                        name="quantity"
                                        type="text"
                                        autoComplete="quantity"
                                        value={data.quantity}
                                        onChange={(e) => setData({ ...data, quantity: e.target.value })}
                                        required
                                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="">
                                    <Textarea
                                        label="Description"
                                        variant="bordered"
                                        placeholder="Enter your description"
                                        disableAnimation
                                        disableAutosize
                                        value={data.description}
                                        onChange={(e) => setData({ ...data, description: e.target.value })}
                                        classNames={{
                                            base: "max-w-xl",
                                            input: "resize min-h-[120px] border-none focus:ring-0",
                                        }}
                                    />
                                </div>
                                <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-x-4">
                                    <Button
                                        onClick={handleSubmit}
                                        isLoading={loading}
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                                    >
                                        {loading ? 'Saving...' : 'Save changes'}
                                    </Button>
                                    <Button
                                        onClick={closeHandler}
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
