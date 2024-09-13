'use client'

import React, { createContext, useState, useContext } from "react";
import { childrenProps, MyContextProps } from "@/types/types"

export const ActionsContext = createContext<MyContextProps | undefined>(undefined)

export const useActionsContext = () => {
    const context = useContext(ActionsContext)

    if (!context) {
        throw new Error('ActionsContext must be used provider')
    }

    return context
}

export default function ActionsContextComponent({ children }: childrenProps) {
    const [openLogoutModal, setOpenLogoutModal] = useState(false)
    return (
        <ActionsContext.Provider value={{ openLogoutModal, setOpenLogoutModal }}>
            {children}
        </ActionsContext.Provider>
    );
}