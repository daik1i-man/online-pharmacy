'use client'

import { addCategoryProps, childrenProps } from "./addCategoryTypes";
import { createContext, useState, useContext } from "react";

export const AddCategoryModalContext = createContext<addCategoryProps | undefined>(undefined)

export const useAddCategoryModalContext = () => {
    const context = useContext(AddCategoryModalContext)

    if (!context) {
        throw new Error('useAddCategoryModalContext must be used within a StatesContextProvider');
    }

    return context
}

export default function AddCategory({ children }: childrenProps) {
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    return (
        <AddCategoryModalContext.Provider value={{ openAddCategoryModal, setOpenAddCategoryModal }}>
            {children}
        </AddCategoryModalContext.Provider>
    );
}