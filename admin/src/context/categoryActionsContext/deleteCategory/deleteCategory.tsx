'use client'

import { deleteCategoryProps, childrenProps } from './deleteCategoryTypes';
import { createContext, useState, useContext } from "react"

export const DeleteCategoryContext = createContext<deleteCategoryProps | undefined>(undefined)

export const useDeleteCategoryContext = () => {
    const context = useContext(DeleteCategoryContext)

    if (!context) {
        throw new Error('DeleteCategoryContext must be used within a StatesContextProvider')
    }

    return context
}

export default function DeleteCategory({ children }: childrenProps) {
    const [openDeleteCategoryModal, setOpenDeleteCategoryModal] = useState(false)
    const [deletecurrentCategory, setDeletecurrentCategory] = useState<{ id: string; img_url: string | null } | null>(null)
    return (
        <DeleteCategoryContext.Provider value={{ openDeleteCategoryModal, setOpenDeleteCategoryModal, deletecurrentCategory, setDeletecurrentCategory }}>
            {children}
        </DeleteCategoryContext.Provider>
    );
}