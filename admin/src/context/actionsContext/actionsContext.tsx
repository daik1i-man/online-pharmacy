'use client'

import React, { createContext, useState, ReactNode } from "react";

interface MyContextProps {
    openLogoutModal: boolean,
    setOpenLogoutModal: (openLogoutModal: boolean) => void
}

interface ProviderProps {
    children: ReactNode
}

export const ActionsContext = createContext<MyContextProps | undefined>(undefined)

export default function ActionsContextComponent({ children }: ProviderProps) {
    const [openLogoutModal, setOpenLogoutModal] = useState(false)
    return (
        <ActionsContext.Provider value={{ openLogoutModal, setOpenLogoutModal }}>
            {children}
        </ActionsContext.Provider>
    );
}