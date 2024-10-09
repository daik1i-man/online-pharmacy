'use client'

import { childrenProps } from "@/context/categoryActionsContext/addCategory/addCategoryTypes";
import { useState } from "react";
import { createContext } from "react";

interface AddProductContextProps {
    openAddProductModal: boolean,
    setOpenAddProductModal: (openAddProductModal: boolean) => void
}

export const AddProductContext = createContext<AddProductContextProps | undefined>(undefined)

export default function AddProduct({ children }: childrenProps) {
    const [openAddProductModal, setOpenAddProductModal] = useState(false)
    return (
        <AddProductContext.Provider value={{ openAddProductModal, setOpenAddProductModal }}>
            {children}
        </AddProductContext.Provider>
    );
}