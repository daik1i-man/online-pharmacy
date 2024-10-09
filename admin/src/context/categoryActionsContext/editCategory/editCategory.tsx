'use client'

import { editCategoryProps, childrenProps, currentCategoryProps } from "./editCategoryTypes";
import { createContext, useContext, useState } from "react";

export const EditCategoryContext = createContext<editCategoryProps | undefined>(undefined)

export const useEditCategoryContext = () => {
    const context = useContext(EditCategoryContext)

    if (!context) {
        throw new Error('EditCategoryContext must be used context provider!')
    }

    return context
}

export default function EditCategory({ children }: childrenProps) {
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false)
    const [editCurrentCategory, setEditCurrentCategory] = useState<currentCategoryProps | undefined>(undefined)
    return (
        <EditCategoryContext.Provider value={{ openEditCategoryModal, setOpenEditCategoryModal, editCurrentCategory, setEditCurrentCategory }}>
            {children}
        </EditCategoryContext.Provider>
    );
}