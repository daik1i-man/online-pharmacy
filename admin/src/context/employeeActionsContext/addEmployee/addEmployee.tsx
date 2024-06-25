'use client'

import { useState, createContext } from "react";

interface childrenProps {
    children: React.ReactNode
}

interface AddEmployeeContextProps {
    openAddEmployeeModal: boolean,
    setOpenAddEmployeeModal: (openAddEmployeeModal: boolean) => void,
}

export const AddEmployeeContext = createContext<AddEmployeeContextProps | undefined>(undefined)

export default function AddEmployee({ children }: childrenProps) {
    const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false)
    return (
        <AddEmployeeContext.Provider value={{ openAddEmployeeModal, setOpenAddEmployeeModal }}>
            {children}
        </AddEmployeeContext.Provider>
    );
}