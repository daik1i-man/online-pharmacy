'use client'

import { createContext, useState } from 'react'
import { basketDatasContextProps } from '../contextsType';
import { basketProductsProps, childrenProps } from '@/app/types';

const basketProductsDatasContext = createContext<basketDatasContextProps | null>(null)

export default function DatasContextsComponent({ children }: childrenProps) {
    const [basketDatas, setBasketDatas] = useState<basketProductsProps | null>(null)
    return (
        <basketProductsDatasContext.Provider value={{ basketDatas, setBasketDatas }}>
            {children}
        </basketProductsDatasContext.Provider>
    );
}