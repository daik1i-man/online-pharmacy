import AddProductModal from "@/components/modals/productModals/addProduct/addProductModal";
import DeleteProductModal from "@/components/modals/productModals/deleteProduct/deleteProductModal";
import EditProductModal from "@/components/modals/productModals/EditProduct/editProductModal";

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <AddProductModal />
            <DeleteProductModal />
            <EditProductModal />
            {children}
        </>
    );
}