'use client'

import SuccessfullyOrder from "@/components/modal-dialogs/successfullyOrder"
import { childrenProps } from "../types";

export default function layout({ children }: childrenProps) {
    return (
        <>
            <SuccessfullyOrder />
            {children}
        </>
    );
}