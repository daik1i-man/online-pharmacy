import { axiosInstance } from "@/configs/axios.config";
import { addProductProps } from "@/types/types";
import { isAxiosError } from "axios";

export const addProduct = async ({ ...datas }: addProductProps) => {

    try {
        const response = await axiosInstance.post('/admin-controll/products/add', {
            img_url: datas.img_url,
            category: datas.category,
            price: datas.price,
            quantity: datas.quantity,
            name: datas.name,
            description: datas.description
        })

        return response
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}