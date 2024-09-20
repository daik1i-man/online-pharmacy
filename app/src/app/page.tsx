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
    <div className='max-w-[500px] mx-auto relative'>
      <div className="mt-14">
        <Image width={500} src={mainImage} alt='mainPageimage' />
      </div>
      <div className="fixed bottom-0 bg-gray-50 rounded-md flex items-center justify-between mx-auto z-[80] p-2.5 max-w-[500px] w-full">
        <Link href='/categories' className='text-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
          </svg>
          <p className='text-xs'>Categories</p>
        </Link>

        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <p className='text-xs'>Search</p>
        </div>
        <Link href='/cart' className='flex flex-col items-center'>
          <Badge content={cart?.length} color="default">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </Badge>
          <p className='text-xs'>Cart</p>
        </Link>
        <Link href='/favourites' className='flex flex-col items-center'>
          <Badge content={favourites?.length} color="default">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </Badge>
          <p className='text-xs'>Favourites</p>
        </Link>
      </div>
      <div className='mx-auto my-12 max-w-7xl'>
        <div className="grid grid-cols-2 gap-y-4">
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
        <div className={`max-w-5xl ${state.limit > 25 ? 'hidden' : 'block'} mx-auto my-4 text-center`}>
          <Button
            onClick={changeProductsLimitHandler}
            className='my-4 text-xs rounded-md'
          >
            Load more - 30
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Main;
