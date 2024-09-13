import { axiosInstance } from "@/configs/axios.config";
import { isAxiosError } from "axios";

export const getOrders = async () => {
    try {
        const response = await axiosInstance.get('/admin-controll/orders/get-all')

        return response.data.AllOrders
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}