import { Providers } from "./providers";
import ContextsProvider from "@/context/context";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ContextsProvider>
          <Providers>
            {children}
          </Providers>
        </ContextsProvider>
      </body>
    </html>
  );
}
