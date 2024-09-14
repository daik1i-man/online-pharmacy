'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ContextsProvider from "@/context/context";
import { childrenProps } from "@/types/types";
import { CookiesProvider } from 'react-cookie'
import { Providers } from "./providers";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: childrenProps) {
  return (
    <html lang="en">
      <head>
        <title>Admin Panel - Online Pharmacy</title>
        <meta name="description" content="Admin Panel - Online Pharmacy" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <CookiesProvider>
            <ContextsProvider>
              <Providers>
                {children}
              </Providers>
            </ContextsProvider>
          </CookiesProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
