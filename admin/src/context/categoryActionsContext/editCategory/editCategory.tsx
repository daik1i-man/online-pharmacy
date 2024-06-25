'use client'

import { createContext, useState } from "react";
import { editCategoryProps, childrenProps } from "./editCategoryTypes";

export const EditCategoryContext = createContext<editCategoryProps | undefined>(undefined)

export default function EditCategory({ children }: childrenProps) {
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false)
    const [editCurrentCategory, setEditCurrentCategory] = useState<string | null>(null)
    return (
        <EditCategoryContext.Provider value={{ openEditCategoryModal, setOpenEditCategoryModal, editCurrentCategory, setEditCurrentCategory }}>
            {children}
        </EditCategoryContext.Provider>
    );
}