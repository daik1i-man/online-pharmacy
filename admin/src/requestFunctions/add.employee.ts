import { axiosInstance } from "@/configs/axios.config";
import { addEmployeeProps } from "@/types/types";
import { isAxiosError } from "axios"


export const addEmployee = async (datas: addEmployeeProps) => {
    try {
        const response = await axiosInstance.post('/admin-controll/employees/add', {
            phoneNumber: datas.phoneNumber,
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