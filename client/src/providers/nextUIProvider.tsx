import { NextUIProvider } from "@nextui-org/react";
import { childrenProps } from "@/app/types";

export function NextUIProviderComponent({ children }: childrenProps) {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    );
}