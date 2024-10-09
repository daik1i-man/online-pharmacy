import { axiosInstance } from "@/configs/axios.config";
import { isAxiosError } from "axios";

export const getProductById = async (id: string | string[]) => {
    try {
        const response = await axiosInstance.get(`/admin-controll/products/product?id=${id}`)

        return response?.data?.product
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}