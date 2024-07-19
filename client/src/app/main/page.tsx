'use client'

import mainImage from '../../image/Main.png'
import { Button, Badge, Popover, PopoverTrigger, PopoverContent, Listbox, ListboxItem } from '@nextui-org/react';
import Image from 'next/image'
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { MainPageCategoriesProps, MainPageProductsProps } from '../types';
import ProductsCard from '@/components/productCard/productsCard';
import { getAllCaregories, getAllProducts } from '../functions';
import SkeletoComponent from '@/components/skeletonComponent/skeletonComponent';

function Main() {
    const [categories, setCategories] = useState<MainPageCategoriesProps[]>([])
    const [products, setProducts] = useState<MainPageProductsProps[]>([])
    const [limit, setLimit] = useState(12)
    const [search, setSearch] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState<MainPageProductsProps[]>([])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getAllCaregories()
            setCategories(response)
        }

        const fetchProducts = async () => {
            setLoading(true)
            const response = await getAllProducts(limit)
            setProducts(response)
            setFilteredProducts(response)
            setLoading(false)
        }

        fetchCategories()
        fetchProducts()
    }, [limit])

    const searchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setSearch(e.target.value)
        }
        else {
            setSearch(undefined)
        }
    }

    useEffect(() => {
        if (search) {
            setFilteredProducts(filteredProducts.filter(f => f.name.toLowerCase().includes(`${search}`)))
        } else {
            setFilteredProducts(products)
        }
    }, [search])


    return (
        <div>
            <div className="">
                <Image src={mainImage} alt='mainPageimage' />
            </div>
            <div className="max-w-xl mx-auto text-center mt-24">
                <h1 className='font-bold text-2xl'>You can search for our products using the search engine.</h1>
                <p className='font-extralight my-2'>Just search for your medication to find low prices.</p>
            </div>
            <div className="mt-24 max-w-8xl mx-auto flex justify-around px-4">
                <Popover placement="bottom">
                    <PopoverTrigger>
                        <Link href='/categories'>
                            <Button
                                className='rounded-md bg-[#0295a9] text-gray-50 w-44'
                            >
                                Categories
                            </Button>
                        </Link>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Listbox>
                            {categories && categories.map((category) => (
                                <ListboxItem key={category.id}>
                                    <Link href={`/categories/${category.id}`}>
                                        {category.name}
                                    </Link>
                                </ListboxItem>
                            ))}
                        </Listbox>
                    </PopoverContent>
                </Popover>

                <div className="flex h-11 items-center border pl-3 rounded-md">
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </p>
                    <div className='flex items-center'>
                        <input
                            name='search'
                            type="search"
                            autoComplete="search"
                            placeholder='Look for products'
                            value={search}
                            onChange={searchChangeHandler}
                            required
                            className="block w-96 py-2 text-gray-900 focus:ring-0 ring-0 border-none shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                        <Button type='submit' className='rounded-r-md h-11 rounded-l-none text-xs bg-[#0295a9] text-gray-50'>
                            Search
                        </Button>
                    </div>
                </div>
                <div className="flex gap-x-4">
                    <Link href='/cart'>
                        <Badge content="0" color="default">
                            <Button className='rounded-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </Button>
                        </Badge>
                    </Link>
                    <Link href='/favourites'>
                        <Badge content="0" color="default">
                            <Button className='rounded-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </Button>
                        </Badge>
                    </Link>
                </div>
            </div>
            <div className="max-w-7xl mx-auto my-12 space-x-4 grid grid-cols-2 sm:grid-cols-4">
                {loading ? (
                    "item".repeat(3).split("").map((el, index) => <SkeletoComponent key={index} />)
                ) :
                    (filteredProducts.map((product) => (
                        <ProductsCard
                            key={product?.id}
                            name={product?.name}
                            category={''}
                            price={product?.price}
                            quantity={''} id={product?.id}
                            img_url={product?.img_url}
                            description={''}
                        />
                    )))
                }
            </div>
            <div className="max-w-7xl mx-auto my-4 text-center">
                <Button
                    onClick={() => setLimit(limit + 12)}
                    className={`rounded-md px-24 ${limit === 24 && 'hidden'} py-6`}
                >
                    Show 12 more
                </Button>
            </div>
        </div>
    );
}

export default Main;