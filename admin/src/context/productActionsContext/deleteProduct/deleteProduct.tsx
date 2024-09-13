'use client'

import { childrenProps } from '../../categoryActionsContext/addCategory/addCategoryTypes';
import { useState, createContext, useContext } from "react"

interface deleteProductContextProps {
    openDeleteProductModal: boolean,
    setOpenDeleteProductModal: (openDeleteProductModal: boolean) => void,
    deleteCurrentProduct: string | undefined,
    setDeleteCurrentProduct: (deleteCurrentProduct: string) => void
}

export const deleteProductContext = createContext<deleteProductContextProps | undefined>(undefined)

export const useDeleteProductContext = () => {
    const context = useContext(deleteProductContext)

    if (!context) {
        throw new Error('deleteProductContext must be used context provider')
    }
    
    return context
}

export default function DeleteProduct({ children }: childrenProps) {
    const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false)
    const [deleteCurrentProduct, setDeleteCurrentProduct] = useState<string | undefined>(undefined)
    return (
        <deleteProductContext.Provider value={{ openDeleteProductModal, setOpenDeleteProductModal, deleteCurrentProduct, setDeleteCurrentProduct }}>
            {children}
        </deleteProductContext.Provider>
    );
}