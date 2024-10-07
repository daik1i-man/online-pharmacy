import React from "react";
import TakeOrderModal from "@/components/modals/orderModal/takeOrderModal";

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <TakeOrderModal />
            {children}
        </>
    );
}