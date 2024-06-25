import { childrenProps } from "../categoryActionsContext/addCategory/addCategoryTypes";
import AddProduct from "./addProduct/addProduct";
import DeleteProduct from "./deleteProduct/deleteProduct";
import EditProduct from "./editProduct/editProduct";


export default function ProductContextsProvider({ children }: childrenProps) {
    return (
        <AddProduct>
            <DeleteProduct>
                <EditProduct>
                    {children}
                </EditProduct>
            </DeleteProduct>
        </AddProduct>
    );
}