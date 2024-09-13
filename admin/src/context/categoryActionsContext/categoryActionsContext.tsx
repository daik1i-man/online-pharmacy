import { ReactNode } from "react";
import AddCategory from "./addCategory/addCategory";
import DeleteCategory from "./deleteCategory/deleteCategory";
import EditCategory from "./editCategory/editCategory";

export default function CategoryActionsContext({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <AddCategory>
            <DeleteCategory>
                <EditCategory>
                    {children}
                </EditCategory>
            </DeleteCategory>
        </AddCategory>
    );
}