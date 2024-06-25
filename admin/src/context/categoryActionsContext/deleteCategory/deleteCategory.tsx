'use client'

import { createContext, useState } from "react"
import { deleteCategoryProps, childrenProps } from './deleteCategoryTypes';

export const DeleteCategoryContext = createContext<deleteCategoryProps | undefined>(undefined)

export default function DeleteCategory({ children }: childrenProps) {
    const [openDeleteCategoryModal, setOpenDeleteCategoryModal] = useState(false)
    const [deletecurrentCategory, setDeletecurrentCategory] = useState<{id: string; img_url: string | null} | null>(null)
    return (
        <DeleteCategoryContext.Provider value={{ openDeleteCategoryModal, setOpenDeleteCategoryModal, deletecurrentCategory, setDeletecurrentCategory }}>
            {children}
        </DeleteCategoryContext.Provider>
    );
}