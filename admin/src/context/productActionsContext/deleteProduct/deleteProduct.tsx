'use client'

import { useState, createContext } from "react"
import { childrenProps } from '../../categoryActionsContext/addCategory/addCategoryTypes';

interface deleteProductContextProps {
    openDeleteProductModal: boolean,
    setOpenDeleteProductModal: (openDeleteProductModal: boolean) => void,
    deleteCurrentProduct: string | undefined,
    setDeleteCurrentProduct: (deleteCurrentProduct: string) => void
}

export const deleteProductContext = createContext<deleteProductContextProps | undefined>(undefined)

export default function DeleteProduct({ children }: childrenProps) {
    const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false)
    const [deleteCurrentProduct, setDeleteCurrentProduct] = useState<string | undefined>(undefined)
    return (
        <deleteProductContext.Provider value={{ openDeleteProductModal, setOpenDeleteProductModal, deleteCurrentProduct, setDeleteCurrentProduct }}>
            {children}
        </deleteProductContext.Provider>
    );
}