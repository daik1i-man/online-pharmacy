import { axiosInstance } from "@/configs/axios.config";
import { editEmployeeProps } from "@/types/types";
import { isAxiosError } from "axios";

export const editEmployee = async (datas: editEmployeeProps) => {
    try {
        const response = axiosInstance.post(`/admin-controll/employees/update`, {
            id: datas.id,
            phoneNumber: datas.phone_number,
            name: datas.name,
            role: datas.role,
            salary: datas.salary
        })

        return response
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error.response
        }

        throw error
    }
}

