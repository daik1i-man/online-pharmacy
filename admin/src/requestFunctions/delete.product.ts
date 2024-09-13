import { axiosInstance } from "@/configs/axios.config";
import { isAxiosError } from "axios";

export const deleteProduct = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/products/delete?id=${id}`)

        return response
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}