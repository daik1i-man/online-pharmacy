'use client'

import { useContext } from "react";
import { Toast } from "flowbite-react";
import { notificationContext } from "@/context/actionsContext/notificationsContext/notificationContext";

interface notificationProps {
    name: string,
    successfully: boolean
}

export default function Notification({ name, successfully }: notificationProps) {
    const context = useContext(notificationContext)

    if (!context) {
        throw new Error('SomeComponent must be used with Notification')
    }

    const { showToast, setShowToast } = context

    return (
        <div className="space-y-4">
            {showToast && (
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                        {successfully ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                        )}
                    </div>
                    <div className="ml-3 text-sm font-normal">{name}</div>
                    <Toast.Toggle onDismiss={() => setShowToast(false)} />
                </Toast>
            )}
        </div>
    );
}
