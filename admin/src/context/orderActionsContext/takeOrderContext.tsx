'use client'

import { createContext, useContext, useState } from "react";
import { childrenProps } from "../categoryActionsContext/addCategory/addCategoryTypes";

interface contextProps {
    openTakeOrderModal: boolean,
    setOpenTakeOrderModal: (openTakeOrderModal: boolean) => void
    takeCurrentOrder: string | null,
    setTakeCurrentOrder: (takeCurrentOrder: string) => void
}

export const takeOrderContext = createContext<contextProps | undefined>(undefined)

export const useTakeOrderContext = () => {
    const context = useContext(takeOrderContext)

    if (!context) {
        throw new Error('takeOrderContext must be used context provider')
    }

    return context
}

export default function TakeOrder({ children }: childrenProps) {
    const [openTakeOrderModal, setOpenTakeOrderModal] = useState(false)
    const [takeCurrentOrder, setTakeCurrentOrder] = useState<string | null>(null)
    return (
        <takeOrderContext.Provider value={{ openTakeOrderModal, setOpenTakeOrderModal, takeCurrentOrder, setTakeCurrentOrder }}>
            {children}
        </takeOrderContext.Provider>
    );
}