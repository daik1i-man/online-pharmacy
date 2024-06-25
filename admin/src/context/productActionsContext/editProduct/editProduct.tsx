'use client'

import { useState, createContext } from "react"
import { childrenProps } from '../../categoryActionsContext/addCategory/addCategoryTypes';

interface EditProductContextProps {
    openEditProductModal: boolean,
    setOpenEditProductModal: (openEditProductModal: boolean) => void,
    currentProductId: string | undefined,
    setCurrentProductId: (currentProductId: string) => void
}

export const EditProductContext = createContext<EditProductContextProps | undefined>(undefined)

export default function EditProduct({ children }: childrenProps) {
    const [openEditProductModal, setOpenEditProductModal] = useState(false)
    const [currentProductId, setCurrentProductId] = useState<string | undefined>(undefined)
    return (
        <EditProductContext.Provider value={{ openEditProductModal, setOpenEditProductModal, currentProductId, setCurrentProductId }}>
            {children}
        </EditProductContext.Provider>
    )
}