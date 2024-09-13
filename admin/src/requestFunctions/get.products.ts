import { axiosInstance } from "@/configs/axios.config";
import { isAxiosError } from "axios";

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/admin-controll/products/get-all')

        return response?.data?.allProducts
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error
        }

        throw error
    }
}