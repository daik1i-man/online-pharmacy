'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NextUIProviderComponent } from "@/providers/nextUIProvider";
import { Toaster } from "@/components/toastComponent/toastComponent";
import ContextsProvider from "@/providers/contextsProvider";
import { PrimeReactProvider } from 'primereact/api';
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Lexend_Exa } from 'next/font/google'
import Provider from "./provider";
import "./globals.css";

const LexendExa = Lexend_Exa({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={LexendExa.className}>
      <body
      >
        <Header />
        <ContextsProvider>
          <PrimeReactProvider>
            <NextUIProviderComponent>
              <QueryClientProvider client={queryClient}>
                <Provider>
                  {children}
                </Provider>
              </QueryClientProvider>
            </NextUIProviderComponent>
          </PrimeReactProvider>
        </ContextsProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
