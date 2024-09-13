'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ContextsProvider from "@/context/context";
import { childrenProps } from "@/types/types";
import { Providers } from "./providers";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: childrenProps) {

  return (
    <html lang="en">
      <head>
        <title>Admin Panel - Online Pharmacy</title>
        <meta name="description" content="Admin Panel - Online Pharmacy" />
        <link rel="shortcut icon" href="/medicines.svg" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ContextsProvider>
            <Providers>
              {children}
            </Providers>
          </ContextsProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
