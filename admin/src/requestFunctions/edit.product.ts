import { axiosInstance } from "@/configs/axios.config";
import { editProductProps } from "@/types/types";
import { isAxiosError } from "axios";

export const editProduct = async (datas: editProductProps) => {
    try {
        const response = await axiosInstance.post('/admin-controll/products/update', {
            img_url: datas.img_url,
            category: datas.category,
            price: datas.price,
            quantity: datas.quantity,
            id: datas.id,
            name: datas.name,
            description: datas.description
        })

        return response
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response
        }

        throw error
    }
}