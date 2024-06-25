'use client'

import { createContext, useState } from "react";
import { addCategoryProps, childrenProps } from "./addCategoryTypes";

export const AddCategoryModalContext = createContext<addCategoryProps | undefined>(undefined)

export default function AddCategory({ children }: childrenProps) {
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    return (
        <AddCategoryModalContext.Provider value={{ openAddCategoryModal, setOpenAddCategoryModal }}>
            {children}
        </AddCategoryModalContext.Provider>
    );
}