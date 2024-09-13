'use client'

import { childrenProps, deleteEmployeeContextProps } from "@/types/types";
import { useState, createContext, useContext } from "react";


export const DeleteEmployeeContext = createContext<deleteEmployeeContextProps | undefined>(undefined)

export const useDeleteEmployeeContext = () => {
    const context = useContext(DeleteEmployeeContext)

    if (!context) {
        throw new Error('DeleteEmployeeContext must be used context provider')
    }

    return context
}

export default function DeleteEmployee({ children }: childrenProps) {
    const [openDeleteEmployeeModal, setOpenDeleteEmployeeModal] = useState(false)
    const [deleteCurrentEmployee, setDeleteCurrentEmployee] = useState<string | null>(null)
    return (
        <DeleteEmployeeContext.Provider value={{ openDeleteEmployeeModal, setOpenDeleteEmployeeModal, deleteCurrentEmployee, setDeleteCurrentEmployee }}>
            {children}
        </DeleteEmployeeContext.Provider>
    );
}