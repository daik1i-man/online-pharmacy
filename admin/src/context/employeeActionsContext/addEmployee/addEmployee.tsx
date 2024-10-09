'use client'

import { childrenProps, addEmployeeContextProps } from "@/types/types";
import { useState, createContext, useContext } from "react";


export const AddEmployeeContext = createContext<addEmployeeContextProps | undefined>(undefined)

export const useAddEmployeeContext = () => {
    const context = useContext(AddEmployeeContext)

    if (!context) {
        throw new Error('AddEmployeeContext must be used context provider')
    }

    return context
}

export default function AddEmployee({ children }: childrenProps) {
    const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false)
    return (
        <AddEmployeeContext.Provider value={{ openAddEmployeeModal, setOpenAddEmployeeModal }}>
            {children}
        </AddEmployeeContext.Provider>
    );
}