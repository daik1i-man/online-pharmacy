'use client'

import { childrenProps, editEmployeeContextProps, editEmployeeProps } from "@/types/types";
import { useState, createContext, useContext } from "react";


export const EditEmployeeContext = createContext<editEmployeeContextProps | undefined>(undefined)

export const useEditEmployeeContext = () => {
    const context = useContext(EditEmployeeContext)

    if (!context) {
        throw new Error('EditEmployeeContext must be used context provider')
    }

    return context
}

export default function EditEmployee({ children }: childrenProps) {
    const [openEditEmployeeModal, setOpenEditEmployeeModal] = useState(false)
    const [editCurrentEmployee, setEditCurrentEmployee] = useState<editEmployeeProps | undefined>(undefined)
    return (
        <EditEmployeeContext.Provider value={{ openEditEmployeeModal, setOpenEditEmployeeModal, editCurrentEmployee, setEditCurrentEmployee }}>
            {children}
        </EditEmployeeContext.Provider>
    );
}