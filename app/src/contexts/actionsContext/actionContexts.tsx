'use client'

import { cancelOrderModalContextProps } from "../contextsType";
import { useContext, useState, createContext } from "react"
import { childrenProps } from "@/app/types";

export const cancelOrderModalContext = createContext<cancelOrderModalContextProps | null>(null)

export const useCancelOrderModalContext = () => {
    const context = useContext(cancelOrderModalContext)

    if (!context) {
        throw new Error('useCancelOrderModalContext must be used within a useCancelOrderModalContextProvider')
    }

    return context
}

export default function ActionContexts({ children }: childrenProps) {
    const [open, setOpen] = useState(false)
    const [orderId, setOrderId] = useState<string | undefined>(undefined)
    const [openSuccessfullyOrderModal, setOpenSuccessfullyOrderModal] = useState(false)
    return (
        <cancelOrderModalContext.Provider value={{
            open,
            orderId,
            setOpen,
            setOrderId,
            openSuccessfullyOrderModal,
            setOpenSuccessfullyOrderModal
        }}>
            {children}
        </cancelOrderModalContext.Provider>
    );
}