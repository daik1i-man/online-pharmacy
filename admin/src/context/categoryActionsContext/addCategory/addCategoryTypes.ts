import { ReactNode } from "react";

export interface addCategoryProps {
    openAddCategoryModal: boolean,
    setOpenAddCategoryModal: (openAddCategoryModal: boolean) => void
}

export interface childrenProps {
    children: ReactNode
}