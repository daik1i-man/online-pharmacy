'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NextUIProviderComponent } from "@/providers/nextUIProvider";
import { Toaster } from "@/components/toastComponent/toastComponent";
import ContextsProvider from "@/providers/contextsProvider";
import { PrimeReactProvider } from 'primereact/api';
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { CookiesProvider } from 'react-cookie'
import { Lexend_Exa } from 'next/font/google'
import { childrenProps } from "./types";
import Provider from "./provider";
import React from "react";
import "./globals.css";

const LexendExa = Lexend_Exa({ subsets: ['latin'] });
const queryClient = new QueryClient();

export default function RootLayout({ children }: childrenProps) {
  return (
    <html lang="en" className={LexendExa.className}>
      <head>
        <title>Online Pharmacy - Search for medicines and low prices for medicines</title>
        <meta name="description" content="Поиск лекарств и низкие цены на медикаменты" />
        <link rel="shortcut icon" href="/medicines.svg" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <CookiesProvider>
            <ContextsProvider>
              <Header />
              <PrimeReactProvider>
                <NextUIProviderComponent>
                  <Provider>
                    {children}
                  </Provider>
                </NextUIProviderComponent>
              </PrimeReactProvider>
              <Toaster />
              <Footer />
            </ContextsProvider>
          </CookiesProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
