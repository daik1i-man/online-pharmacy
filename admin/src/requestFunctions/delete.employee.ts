import { axiosInstance } from "@/configs/axios.config";
import { isAxiosError } from "axios";

export const deleteEmployee = async (id: string | null) => {
    try {
        const response = await axiosInstance.get(`/admin-controll/employees/delete?id=${id}`)

        return response
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response
        }

        throw error
    }
}
