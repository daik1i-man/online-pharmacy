import { ReactNode } from "react";

export interface editCategoryProps {
    openEditCategoryModal: boolean,
    setOpenEditCategoryModal: (openEditCategoryModal: boolean) => void
    editCurrentCategory: string | null,
    setEditCurrentCategory: (editCurrentCategory: string | null) => void
}

export interface childrenProps {
    children: ReactNode
}