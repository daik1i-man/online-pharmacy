'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from '@nextui-org/react'
import ContextsProvider from "@/context/context"

const client = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class">
            <QueryClientProvider client={client}>
                <ContextsProvider>
                    <NextUIProvider>
                        {children}
                    </NextUIProvider>
                </ContextsProvider>
            </QueryClientProvider>
        </NextThemesProvider>
    )
}