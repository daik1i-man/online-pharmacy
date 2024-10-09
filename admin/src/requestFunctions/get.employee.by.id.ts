import { axiosInstance } from "@/configs/axios.config";
import { isAxiosError } from "axios";

export const getEmployeeById = async (id: string | null) => {
    try {
        const response = await axiosInstance.get(`/admin-controll/employees/employee?id=${id}`)

        return response?.data?.employee
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}