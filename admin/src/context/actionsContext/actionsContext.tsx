'use client'

import React, { createContext, useState, useContext, useEffect } from "react";
import { useQueryClient, useMutation } from '@tanstack/react-query'
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
    const queryClient = useQueryClient()
    const [openLogoutModal, setOpenLogoutModal] = useState(false)
    const [sidebarState, setSidebarState] = useState<string | null>('open')

    const sidebarStateHandler = (state: string) => {
        setSidebarState(state)
        queryClient.invalidateQueries({ queryKey: ['localStorageItem'] })
    }

    useEffect(() => {
        if (sidebarState) {
            localStorage.setItem('sidebarState', sidebarState)
        }
        queryClient.invalidateQueries({ queryKey: ['localStorageItem'] })
    }, [sidebarState])

    return (
        <ActionsContext.Provider value={{ openLogoutModal, setOpenLogoutModal, sidebarState, setSidebarState, sidebarStateHandler }}>
            {children}
        </ActionsContext.Provider>
    );
}