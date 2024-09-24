'use client'

import { getAllProducts, getCart, getFavourites, getUser } from './functions/functions'
import SkeletoComponent from '@/components/skeletonComponent/skeletonComponent'
import ProductsCard from '@/components/productCard/productsCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Badge } from '@nextui-org/react';
import { useCookies } from 'react-cookie'
import mainImage from '../image/Main.png'
import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import '../response.css'

function Main() {
  const [cookie, setCookie] = useCookies(['user'])
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    search: [],
    limit: 22
  })

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', state.limit],
    queryFn: () => getAllProducts(state.limit)
  })

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart()

  })

  const { data: favorites } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => getFavourites(),
  })

  const { data: user, isLoading: loading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser()
  })

  const changeProductsLimitHandler = () => {
    setState(prevState => ({
      ...prevState,
      limit: prevState.limit + 30
    }));
    queryClient.invalidateQueries({ queryKey: ['products'] });
  }

  return (
    <div>
      <div className='justify-center w-full main'>
        <div className="w-full mt-12">
          <Image className='w-full' src={mainImage} alt='mainPageimage' />
        </div>
        <div className="fixed bottom-0 bg-gray-50 rounded-md flex items-center justify-between mx-auto z-[80] p-2.5 w-full h-17 navigation_bar px-4 pr-8">
          <Link href='/categories' className='flex flex-col items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto size-[22px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
            </svg>
            <p className='text-[13px]'>Categories</p>
          </Link>
          <Link href='/cart' className='flex flex-col items-center'>
            <Badge content={cart?.length} color="default">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </Badge>
            <p className='text-[13px]'>Cart</p>
          </Link>
          <Link href='/favourites' className='flex flex-col items-center'>
            <Badge content={favorites?.length} color="default" className=''>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </Badge>
            <p className='text-[13px]'>Favorites</p>
          </Link>
          <Link href={cookie?.user ? '/user/orders' : '/auth/login'} className='flex flex-col items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <p className='text-[13px]'>{user ? 'Profile' : 'Login'}</p>
          </Link>
        </div>
        <div className='my-12 mx-auto justify-center w-full px-2.5'>
          <div className="grid grid-cols-2 gap-y-4 mx-auto rows_container">
            {isLoadingProducts ? (
              "it".repeat(2).split("").map((el, index) => <SkeletoComponent key={index} />)
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
          <div className={`${state.limit > 25 ? 'hidden' : 'block'} mx-auto my-4 text-center`}>
            <Button
              onClick={changeProductsLimitHandler}
              className='my-4 text-xs rounded-md'
            >
              Load more - 30
            </Button>
          </div>
        </div>

      </div>
      <div className='relative information_text'>
        <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full mx-auto space-y-4 text-center py-44 max-w-7xl'>
          <img className='w-[300px] mx-auto' src="https://i.pinimg.com/564x/b5/79/d2/b579d2c58e40859f67db0127965b8a96.jpg" alt="" />
          <p className='text-xl font-semibold'>Sorry!</p>
          <p className='text-sm w-[400px] mx-auto'>This platform is for mobile devices only. If you want to continue on the desktop version, you can visit our desktop platform!</p>
          <Link href='https://www.opharm.uz' className='text-[14px] bg-gray-200 w-[250px] py-2.5 rounded-md mx-auto'>Visit to desktop platform</Link>
        </div>
      </div>
    </div>
  )
}

export default Main;
