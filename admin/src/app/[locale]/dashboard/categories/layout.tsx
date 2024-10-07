import AddCategoryModal from "@/components/modals/categoryModals/addCategoryModal/addCategoryModal";
import EditCategoryModal from "@/components/modals/categoryModals/editCategoryModal/editCategoryModal";
import DeleteCategoryModal from "@/components/modals/categoryModals/deleteCategoryModal/deleteCategoryModal";
import React from "react";

export default async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <AddCategoryModal />
            <EditCategoryModal />
            <DeleteCategoryModal />
            {children}
        </>
    );
}