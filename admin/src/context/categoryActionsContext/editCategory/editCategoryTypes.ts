import { ReactNode } from "react";

export interface currentCategoryProps {
    id: string,
    name: string,
    img_url: string,
    created_date: string
}
export interface editCategoryProps {
    openEditCategoryModal: boolean,
    setOpenEditCategoryModal: (openEditCategoryModal: boolean) => void
    editCurrentCategory: currentCategoryProps | undefined,
    setEditCurrentCategory: (editCurrentCategory: currentCategoryProps | undefined) => void
}

export interface childrenProps {
    children: ReactNode
}