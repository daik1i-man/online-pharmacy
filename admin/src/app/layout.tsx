'use client'

import { CookiesProvider } from 'react-cookie'
import { usePathname } from 'next/navigation';
import { Providers } from "./providers"
import React from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const locale = (pathname.split('/')[1] === 'uz') ? 'uz' : 'ru'
  return (
    <html lang={locale}>
      <head>
        <title>Admin Panel - Online Pharmacy</title>
        <meta name="description" content="Admin Panel - Online Pharmacy" />
      </head>
      <body>
        <CookiesProvider>
          <Providers>
            {children}
          </Providers>
        </CookiesProvider>
      </body>
    </html>
  );
}
