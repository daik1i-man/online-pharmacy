'use client'

import { createContext, useState } from "react"
import { childrenProps } from "../categoryActionsContext/addCategory/addCategoryTypes";

interface notificationContextProps {
    showToast: boolean,
    setShowToast: (showToast: boolean) => void
}

export const notificationContext = createContext<notificationContextProps | undefined>(undefined)

export default function NotificationContextComponent({ children }: childrenProps) {
    const [showToast, setShowToast] = useState(false);
    return (
        <notificationContext.Provider value={{ showToast, setShowToast }}>
            {children}
        </notificationContext.Provider>
    );
}