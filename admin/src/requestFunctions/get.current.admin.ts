import { axiosInstance } from '@/configs/axios.config';
import { isAxiosError } from 'axios';

export const getCurrentAdmin = async () => {
    try {
        const response = await axiosInstance.get('/auth/admin/current-admin')

        return response?.data?.admin[0]
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response
        }

        throw error
    }
}