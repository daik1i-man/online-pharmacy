import { ReactNode } from "react"

export interface deleteCategoryProps {
    openDeleteCategoryModal: boolean,
    setOpenDeleteCategoryModal: (openDeleteCategoryModal: boolean) => void
    deletecurrentCategory: { id: string; img_url: string | null } | null,
    setDeletecurrentCategory: (deletecurrentCategory: { id: string; img_url: string | null } | null) => void
}

export interface childrenProps {
    children: ReactNode
}