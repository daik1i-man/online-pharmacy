import DeleteProductModal from "@/components/modals/productModals/deleteProduct/deleteProductModal";

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <DeleteProductModal />
            {children}
        </>
    );
}