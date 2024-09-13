'use client'

import { childrenProps, notificationContextProps } from "@/types/types"
import React, { createContext, useState } from "react"

export const notificationContext = createContext<notificationContextProps | undefined>(undefined)


export default function NotificationContextComponent({ children }: childrenProps) {
    const [showToast, setShowToast] = useState(false);
    return (
        <notificationContext.Provider value={{ showToast, setShowToast }}>
            {children}
        </notificationContext.Provider>
    );
}