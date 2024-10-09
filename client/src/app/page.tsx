'use client'

import SkeletoComponent from '@/components/skeletonComponent/skeletonComponent'
import { getAllProducts, getCart, getFavourites } from './functions/functions'
import ProductsCard from '@/components/productCard/productsCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState, useEffect } from 'react';
import { Button, Badge } from '@nextui-org/react';
import mainImage from '../image/Main.png'
import Image from 'next/image'
import Link from 'next/link';
import '../responsive.css'


function Main() {
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    search: [],
    limit: 20
  })
  const [search, setSearch] = useState<string | undefined>(undefined);

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', state.limit],
    queryFn: () => getAllProducts(state.limit)
  })

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart()

  })

  const { data: favourites } = useQuery({
    queryKey: ['favourites'],
    queryFn: () => getFavourites(),
  })

  const filteredProducts = search
    ? products?.filter((product: any) => product.name.toLowerCase().includes(search.toLowerCase()))
    : products;

  const searchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value || undefined);
  };

  const changeProductsLimitHandler = () => {
    setState(prevState => ({
      ...prevState,
      limit: prevState.limit + 30
    }));
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  return (
    <div>
      <div className='main'>
        <div className="">
          <Image src={mainImage} alt='mainPageimage' />
        </div>
        <div className="max-w-xl mx-auto text-center mt-24">
          <h1 className='font-bold text-2xl'>You can search for our products using the search engine.</h1>
          <p className='font-extralight my-2'>Just search for your medication to find low prices.</p>
        </div>
        <div className="mt-24 max-w-screen-xl mx-auto flex items-center justify-between">
          <Link href='/categories'>
            <Button className='rounded-md bg-[#0295a9] text-gray-50 w-44 py-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
              </svg>
              Categories
            </Button>
          </Link>

          <div className="flex relative h-11 items-center border rounded-md justify-center">
            <p className='ml-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </p>
            <div className='flex items-center'>
              <input
                name='search'
                type="search"
                placeholder='Look for products'
                value={search || ''}
                onChange={searchChangeHandler}
                required
                className="block w-96 py-2 px-2 text-gray-900 focus:ring-0 ring-0 outline-none border-none shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              <Button type='submit' className='rounded-r-md h-11 rounded-l-none text-xs bg-[#0295a9] text-gray-50'>
                Search
              </Button>
            </div>
            <div className={`w-full bg-white rounded-md absolute top-11 shadow-sm z-50 ${search === undefined ? 'hidden' : 'block'}`}>
              <div className='w-full p-4'>
                {filteredProducts?.map((filteredProduct: any, i: number) => (
                  <div key={i} className='w-full h-14 p-4 py-8 my-2 border-b flex items-center gap-x-3 hover:bg-gray-50 hover:rounded-md'>
                    <div className='w-16 h-16'>
                      <Link href={`product/${filteredProduct.id}`}>
                        <img className='w-full h-full object-cover rounded-md' src={filteredProduct?.img_url} alt={filteredProduct?.name} />
                      </Link>
                    </div>
                    <div>
                      <Link href={`product/${filteredProduct.id}`}>
                        <h1 className='text-[13px]'>{filteredProduct?.name}</h1>
                      </Link>
                      <p className='text-[12px]'>185 000 UZS</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-x-4">
            <Link href='/cart'>
              <Badge content={cart?.length} color="default">
                <Button className='rounded-md w-28'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </Button>
              </Badge>
            </Link>
            <Link href='/favourites'>
              <Badge content={favourites?.length} color="default">
                <Button className='rounded-md w-28'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </Button>
              </Badge>
            </Link>
          </div>
        </div>
        <div className='max-w-7xl mx-auto my-12'>
          <div className="gap-x-10 grid gap-y-4 grid-cols-2 sm:grid-cols-5">
            {isLoadingProducts ? (
              "items".repeat(3).split("").map((el, index) => <SkeletoComponent key={index} />)
            ) :
              (products?.map((product: any) => (
                <ProductsCard
                  key={product?.id}
                  name={product?.name}
                  price={product?.price}
                  id={product?.id}
                  img_url={product?.img_url}
                  cart={product?.cart}
                  favourites={product?.favourites}
                  quantity={1}
                />
              )))
            }
          </div>
          <div className={`max-w-7xl ${state.limit > 25 ? 'hidden' : 'block'} mx-auto my-4 text-center`}>
            <Button
              onClick={changeProductsLimitHandler}
              className={`rounded-md px-32 py-6`}
            >
              Load more - 30
            </Button>
          </div>
        </div>
      </div>
      <div className='relative information_text mx-auto w-[400px]'>
        <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full mx-auto space-y-4 text-center py-12 max-w-7xl'>
          <img className='w-full mx-auto' src="https://i.pinimg.com/736x/99/95/db/9995dbe1be71739b7db982a9dcf37d0c.jpg" alt="" />
          <p className='text-xl font-semibold'>Sorry!</p>
          <p className='text-sm'>This platform is for desktop devices only. If you want to continue on the mobile version, you can visit our desktop platform!</p>
          <Link href='https://www.app.opharm.uz' className='text-[14px] bg-gray-200 w-[250px] py-2.5 rounded-md mx-auto'>Visit to mobile platform</Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
