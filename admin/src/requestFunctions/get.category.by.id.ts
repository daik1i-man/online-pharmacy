import { axiosInstance } from "@/configs/axios.config";
import { isAxiosError } from "axios";

export const getCategoryById = async (id: string | undefined) => {
    try {
        const response = await axiosInstance.get(`/admin-controll/categories/category?id=${id}`)

        return response?.data?.category
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}