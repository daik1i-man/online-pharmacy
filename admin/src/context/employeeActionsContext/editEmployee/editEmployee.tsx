'use client'

import { childrenProps } from "@/context/categoryActionsContext/addCategory/addCategoryTypes";
import { useState, createContext } from "react";

interface EditEmployeeContextProps {
    openEditEmployeeModal: boolean,
    setOpenEditEmployeeModal: (openAddEmployeeModal: boolean) => void,
    editCurrentEmployee: string | null,
    setEditCurrentEmployee: (editCurrentEmployee: string) => void
}

export const EditEmployeeContext = createContext<EditEmployeeContextProps | undefined>(undefined)

export default function EditEmployee({ children }: childrenProps) {
    const [openEditEmployeeModal, setOpenEditEmployeeModal] = useState(false)
    const [editCurrentEmployee, setEditCurrentEmployee] = useState<string | null>(null)
    return (
        <EditEmployeeContext.Provider value={{ openEditEmployeeModal, setOpenEditEmployeeModal, editCurrentEmployee, setEditCurrentEmployee }}>
            {children}
        </EditEmployeeContext.Provider>
    );
}