'use client'

import SkeletoComponent from '@/components/skeletonComponent/skeletonComponent'
import CategoriesSlider from '@/components/categoriesSlider/categoriesSlider'
import ProductsCard from '@/components/productCard/productsCard'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllProducts } from './functions/functions'
import { Button } from '@nextui-org/react';
import mainImage from '../image/Main.png'
import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import '../response.css'

function Main() {
  const queryClient = useQueryClient()
  const [state, setState] = useState({
    search: [],
    limit: 22
  })

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', state.limit],
    queryFn: () => getAllProducts(state.limit)
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
        <div className="w-full mt-[50px]">
          <Image className='w-full' src={mainImage} alt='mainPageimage' />
        </div>
        <div className='flex items-center justify-between w-full px-3 my-4'>
          <h1 className='text-[16px]'>Categories</h1>
          <Link href='/categories' className='text-[12px] bg-gray-100 py-1.5 px-3 rounded-md'>See all</Link>
        </div>
        <CategoriesSlider />
        <div className='my-8 mx-auto justify-center w-full pl-2.5'>
          <div className="grid grid-cols-2 mx-auto gap-y-4 rows_container">
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
