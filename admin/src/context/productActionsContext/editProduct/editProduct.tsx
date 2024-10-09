'use client'

import { useState, createContext, useContext } from "react"
import { childrenProps } from "@/types/types";

interface EditProductContextProps {
    openEditProductModal: boolean,
    setOpenEditProductModal: (openEditProductModal: boolean) => void,
    currentProductId: string | undefined,
    setCurrentProductId: (currentProductId: string) => void
}

export const EditProductContext = createContext<EditProductContextProps | undefined>(undefined)

export const useEditProductContext = () => {
    const context = useContext(EditProductContext)

    if (!context) {
        throw new Error('EditProductContext must be used context provider!')
    }

    return context
}

export default function EditProduct({ children }: childrenProps) {
    const [openEditProductModal, setOpenEditProductModal] = useState(false)
    const [currentProductId, setCurrentProductId] = useState<string | undefined>(undefined)
    return (
        <EditProductContext.Provider value={{ openEditProductModal, setOpenEditProductModal, currentProductId, setCurrentProductId }}>
            {children}
        </EditProductContext.Provider>
    )
}