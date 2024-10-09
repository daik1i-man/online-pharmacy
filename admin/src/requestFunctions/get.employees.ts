import { axiosInstance } from '@/configs/axios.config';
import { isAxiosError } from 'axios'

export const getEmployees = async () => {
    try {
        const response = await axiosInstance.get('/admin-controll/employees/get-all')

        return response.data.allEmployees
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}