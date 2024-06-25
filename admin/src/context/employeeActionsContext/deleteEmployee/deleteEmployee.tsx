'use client'

import { childrenProps } from "@/context/categoryActionsContext/addCategory/addCategoryTypes";
import { useState, createContext } from "react";

interface DeleteEmployeeContextProps {
    openDeleteEmployeeModal: boolean,
    setOpenDeleteEmployeeModal: (openDeleteEmployeeModal: boolean) => void,
    deleteCurrentEmployee: string | null,
    setDeleteCurrentEmployee: (deleteCurrentEmploye: string) => void
}

export const DeleteEmployeeContext = createContext<DeleteEmployeeContextProps | undefined>(undefined)

export default function DeleteEmployee({ children }: childrenProps) {
    const [openDeleteEmployeeModal, setOpenDeleteEmployeeModal] = useState(false)
    const [deleteCurrentEmployee, setDeleteCurrentEmployee] = useState<string | null>(null)
    return (
        <DeleteEmployeeContext.Provider value={{ openDeleteEmployeeModal, setOpenDeleteEmployeeModal, deleteCurrentEmployee, setDeleteCurrentEmployee }}>
            {children}
        </DeleteEmployeeContext.Provider>
    );
}