import { axiosInstance } from "@/configs/axios.config";
import { isAxiosError } from "axios";

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get('/admin-controll/categories/get-all')

        return response?.data?.categories
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
} 